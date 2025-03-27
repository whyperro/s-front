"use client"

import { useParams } from "next/navigation"
import { useGetAircraftById } from "@/hooks/administracion/useGetAircraftById"
import { useGetFlightsByAircraft } from "@/hooks/administracion/useGetFlightsByAircraft"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { format, addDays } from "date-fns"
import { es } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartLegend } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import type { Flight } from "@/types"

// Tipo para los datos mensuales
type MonthlyData = {
  name: string //nombre del mes enero a diciembre
  shortName: string // nombre corto del mes
  ganancias: number //sumatoria del total pagado, no puede ser null
  vuelos: number //total de vuelos en ese mes, no puede estar undefined
  month: number // del 0 al 11
}

// Generar años dinámicamente (desde 2020 hasta 5 años en el futuro)
const generateYearOptions = () => {
  const currentYear = new Date().getFullYear()
  const startYear = 2020
  const endYear = currentYear + 5
  const years = []

  for (let year = startYear; year <= endYear; year++) {
    years.push(year.toString())
  }

  return years
}

const yearOptions = generateYearOptions()

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

// Nombres cortos para los meses (para el eje X)
const shortMonthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

// Tipo para el tooltip personalizado
interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    name: string
    dataKey: string
  }>
  label?: string
}

export default function AircraftReportPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const { data: aircraftDetails, isLoading, error } = useGetAircraftById(id)
  const { data: flights, isLoading: isLoadingFlights } = useGetFlightsByAircraft(id)

  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString())
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
  const [flightsData, setFlightsData] = useState<Flight[]>([])

  // Función para procesar los datos de vuelos y generar datos mensuales
  const processFlightsData = (flights: Flight[], year: string) => {
    const data: MonthlyData[] = Array(12)
      .fill(0)
      .map((_, index) => ({
        name: monthNames[index],
        shortName: shortMonthNames[index],
        ganancias: 0,
        vuelos: 0,
        month: index,
      }))

    flights.forEach((flight) => {
      const flightDate = new Date(flight.date)
      if (flightDate.getFullYear().toString() === year) {
        const month = flightDate.getMonth()
        data[month].ganancias += flight.total_amount
        data[month].vuelos += 1
      }
    })

    return data
  }

  // Cargar datos cuando cambia el año seleccionado
  useEffect(() => {
    if (flights) {
      setMonthlyData(processFlightsData(flights, selectedYear))
      setSelectedMonth(null)
      setFlightsData([])
    }
  }, [selectedYear, flights])

  // Manejar clic en una barra del gráfico
  const handleBarClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const monthIndex = data.activePayload[0].payload.month
      setSelectedMonth(monthIndex)

      // Filtrar vuelos para el mes seleccionado
      const filteredFlights =
        flights?.filter((flight) => {
          const flightDate = new Date(flight.date)
          return flightDate.getFullYear().toString() === selectedYear && flightDate.getMonth() === monthIndex
        }) || []

      setFlightsData(filteredFlights)
    }
  }

  // Calcular estadísticas totales
  const totalEarnings = monthlyData.reduce((sum, month) => {
    const ganancias = typeof month.ganancias === "number" ? month.ganancias : 0
    return sum + ganancias
  }, 0)
  const totalFlights = monthlyData.reduce((sum, month) => {
    const vuelos = typeof month.vuelos === "number" ? month.vuelos : 0
    return sum + vuelos
  }, 0)
  const averageEarningPerFlight = totalFlights > 0 ? totalEarnings / totalFlights : 0

  // Encontrar el mes con más ganancias
  const bestMonth =
    monthlyData.length > 0
      ? monthlyData.reduce((prev, current) => {
          const prevGanancias = typeof prev.ganancias === "number" ? prev.ganancias : 0
          const currentGanancias = typeof current.ganancias === "number" ? current.ganancias : 0
          return prevGanancias > currentGanancias ? prev : current
        })
      : null

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error || !aircraftDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">Error al cargar los datos de la aeronave</p>
        <Button variant="outline" onClick={() => router.back()}>
          Volver
        </Button>
      </div>
    )
  }

  // Función personalizada para el tooltip
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const monthData = monthlyData.find((m) => m.name === label || m.shortName === label)
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-semibold">{monthData?.name || label}</p>
          <p className="text-green-600">Ganancias: ${payload[0].value.toLocaleString()}</p>
          <p className="text-gray-600">Vuelos: {monthData?.vuelos || 0}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" className="mr-4" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Reporte de Ganancias</h1>
          <p className="text-muted-foreground">
            {aircraftDetails?.acronym} - {aircraftDetails?.model}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Ganancias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Vuelos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFlights}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Promedio por Vuelo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {averageEarningPerFlight.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mejor Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bestMonth?.name}</div>
            <p className="text-xs text-muted-foreground">${bestMonth?.ganancias.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end mb-4">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar año" />
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center">Ganancias Mensuales {selectedYear}</CardTitle>
          <CardDescription className="text-center">Haz clic en un mes para ver los detalles de los vuelos</CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="h-[500px] w-full">
            <ChartContainer>
              <ResponsiveContainer width="100%" height={450} aspect={2}>
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 40, left: 40, bottom: 100 }}
                  onClick={handleBarClick}
                  barCategoryGap={8}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="shortName"
                    tickLine={false}
                    axisLine={true}
                    tick={{ fontSize: 12 }}
                    height={60}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis tickFormatter={(value) => `$${value}`} domain={["auto", "auto"]} width={80} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
                  <Bar
                    dataKey="ganancias"
                    fill="#22c55e"
                    name="Ganancias"
                    radius={[4, 4, 0, 0]}
                    isAnimationActive={true}
                    animationDuration={500}
                    onClick={(data) => {
                      if (data && typeof data.month === "number") {
                        setSelectedMonth(data.month)

                        // Filtrar vuelos para el mes seleccionado
                        const filteredFlights =
                          flights?.filter((flight) => {
                            const flightDate = new Date(flight.date)
                            return (
                              flightDate.getFullYear().toString() === selectedYear &&
                              flightDate.getMonth() === data.month
                            )
                          }) || []

                        setFlightsData(filteredFlights)
                      }
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
              <ChartLegend className="mt-2 ml-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#22c55e]" />
                  <span className="text-sm">Ganancias</span>
                </div>
              </ChartLegend>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {selectedMonth !== null && (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Vuelos de {monthNames[selectedMonth]} {selectedYear}
            </CardTitle>
            <CardDescription className="text-center">Detalle de los vuelos realizados durante el mes</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingFlights ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : flightsData.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Ruta</TableHead>
                    <TableHead>Total Pagado</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flightsData.map((flight) => (
                    <TableRow key={flight.id}>
                      <TableCell>{format(addDays(flight.date, 1), "PPP", { locale: es })}</TableCell>
                      <TableCell>{flight.client.name}</TableCell>
                      <TableCell>
                        {flight.route.from} - {flight.route.to}
                      </TableCell>
                      <TableCell>${flight.total_amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={flight.debt_status === "PAGADO" ? "bg-green-500" : "bg-yellow-500"}>
                          {flight.debt_status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption>
                  Total: {flightsData.length} vuelos | Ganancias: $
                  {flightsData.reduce((sum, flight) => sum + flight.total_amount, 0).toLocaleString()}
                </TableCaption>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No hay vuelos registrados para este mes.</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}