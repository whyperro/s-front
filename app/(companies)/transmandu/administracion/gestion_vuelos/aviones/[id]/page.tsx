"use client"

import { useParams } from "next/navigation"
import { useGetAircraftById } from "@/hooks/administracion/useGetAircraftById"
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
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Tipo para los datos de vuelo
type Flight = {
  id: string
  date: Date
  client: {
    name: string
    dni: string
  }
  route: {
    from: string
    to: string
  }
  aircraft: {
    id: string
    acronym: string
  }
  type: string
  fee: number
  total_amount: number
  payed_amount: number
  debt_status: "PENDIENTE" | "PAGADO"
  details: string
}

// Tipo para los datos mensuales
type MonthlyData = {
  name: string
  ganancias: number
  vuelos: number
  month: number
}

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

export default function AircraftReportPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const { data: aircraftDetails, isLoading, error } = useGetAircraftById(id)

  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString())
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
  const [flightsData, setFlightsData] = useState<Flight[]>([])
  const [isLoadingFlights, setIsLoadingFlights] = useState<boolean>(false)

  // Función para generar datos de ejemplo (reemplazar con datos reales de la API)
  const generateMockData = (year: string) => {
    const data: MonthlyData[] = []

    for (let i = 0; i < 12; i++) {
      // Generar datos aleatorios para demostración
      const flights = Math.floor(Math.random() * 20) + 1
      const earnings = Math.floor(Math.random() * 10000) + 1000

      data.push({
        name: monthNames[i],
        ganancias: earnings,
        vuelos: flights,
        month: i,
      })
    }

    return data
  }

  // Función para generar vuelos de ejemplo para un mes específico
  const generateMockFlights = (month: number, year: string) => {
    const flights: Flight[] = []
    const daysInMonth = new Date(Number.parseInt(year), month + 1, 0).getDate()

    // Generar entre 5 y 15 vuelos aleatorios para el mes
    const numFlights = Math.floor(Math.random() * 10) + 5

    for (let i = 0; i < numFlights; i++) {
      const day = Math.floor(Math.random() * daysInMonth) + 1
      const flightDate = new Date(Number.parseInt(year), month, day)

      const payedAmount = Math.floor(Math.random() * 2000) + 500
      const totalAmount = payedAmount + (Math.random() > 0.7 ? Math.floor(Math.random() * 500) : 0)

      flights.push({
        id: `flight-${i}-${month}-${year}`,
        date: flightDate,
        client: {
          name: `Cliente ${i + 1}`,
          dni: `DNI${Math.floor(Math.random() * 10000000)}`,
        },
        route: {
          from: ["Caracas", "Maracaibo", "Valencia", "Barcelona", "Mérida"][Math.floor(Math.random() * 5)],
          to: ["Porlamar", "Maracay", "Puerto Ordaz", "San Cristóbal", "Barquisimeto"][Math.floor(Math.random() * 5)],
        },
        aircraft: {
          id: id,
          acronym: aircraftDetails?.acronym || "N/A",
        },
        type: ["Comercial", "Privado", "Carga"][Math.floor(Math.random() * 3)],
        fee: Math.floor(Math.random() * 200) + 50,
        total_amount: totalAmount,
        payed_amount: payedAmount,
        debt_status: payedAmount === totalAmount ? "PAGADO" : "PENDIENTE",
        details: "Detalles del vuelo",
      })
    }

    return flights
  }

  // Cargar datos cuando cambia el año seleccionado
  useEffect(() => {
    setMonthlyData(generateMockData(selectedYear))
    setSelectedMonth(null)
    setFlightsData([])
  }, [selectedYear])

  // Manejar clic en una barra del gráfico
  const handleBarClick = (data: any) => {
    if (data && data.activeTooltipIndex !== undefined) {
      const monthIndex = data.activeTooltipIndex
      setSelectedMonth(monthIndex)
      setIsLoadingFlights(true)

      // Simular carga de datos
      setTimeout(() => {
        setFlightsData(generateMockFlights(monthIndex, selectedYear))
        setIsLoadingFlights(false)
      }, 500)
    }
  }

  // Calcular estadísticas totales
  const totalEarnings = monthlyData.reduce((sum, month) => sum + month.ganancias, 0)
  const totalFlights = monthlyData.reduce((sum, month) => sum + month.vuelos, 0)
  const averageEarningPerFlight = totalFlights > 0 ? totalEarnings / totalFlights : 0

  // Encontrar el mes con más ganancias
  const bestMonth =
    monthlyData.length > 0
      ? monthlyData.reduce((prev, current) => (prev.ganancias > current.ganancias ? prev : current))
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
        <p className="text-red-500 mb-4">Error al cargar los datos del avión</p>
        <Button variant="outline" onClick={() => router.back()}>
          Volver
        </Button>
      </div>
    )
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
              ${averageEarningPerFlight.toLocaleString(undefined, { maximumFractionDigits: 2 })}
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
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ganancias Mensuales {selectedYear}</CardTitle>
          <CardDescription>Haz clic en un mes para ver los detalles de los vuelos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  onClick={handleBarClick}
                >
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, "Ganancias"]}
                    labelFormatter={(label) => `Mes: ${label}`}
                  />
                  <Bar dataKey="ganancias" fill="#22c55e" name="Ganancias" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <ChartLegend className="mt-2">
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
            <CardTitle>
              Vuelos de {monthNames[selectedMonth]} {selectedYear}
            </CardTitle>
            <CardDescription>Detalle de los vuelos realizados durante el mes</CardDescription>
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
                      <TableCell>${flight.payed_amount.toLocaleString()}</TableCell>
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
                  {flightsData.reduce((sum, flight) => sum + flight.payed_amount, 0).toLocaleString()}
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