"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, DollarSign, BarChartIcon, Calendar } from "lucide-react"
import { addDays, format } from "date-fns"
import { es } from "date-fns/locale"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts"
import { Badge } from "@/components/ui/badge"
import type { CashMovement } from "@/types"
import { useGetIncomeStatistics } from "@/hooks/administracion/movimientos/useGetIncomeStatistics"

// Configuración de meses
const months = [
  { name: "January", short: "Jan", number: "01" },
  { name: "February", short: "Feb", number: "02" },
  { name: "March", short: "Mar", number: "03" },
  { name: "April", short: "Apr", number: "04" },
  { name: "May", short: "May", number: "05" },
  { name: "June", short: "Jun", number: "06" },
  { name: "July", short: "Jul", number: "07" },
  { name: "August", short: "Aug", number: "08" },
  { name: "September", short: "Sep", number: "09" },
  { name: "October", short: "Oct", number: "10" },
  { name: "November", short: "Nov", number: "11" },
  { name: "December", short: "Dec", number: "12" },
] as const

type MonthlyData = {
  name: string
  shortName: string
  income: number
  movements: number
  monthNumber: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    payload: MonthlyData
  }>
  label?: string
}

const IncomeDashboard = () => {
  const router = useRouter()
  const { data, isLoading, isError } = useGetIncomeStatistics()

  // Obtener años disponibles
  const availableYears = useMemo(() => {
    if (!data?.statistics?.monthly) return [new Date().getFullYear().toString()]
    return Object.keys(data.statistics.monthly).sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
  }, [data])

  // Estado con valor inicial seguro
  const [selectedYear, setSelectedYear] = useState<string>(() => {
    return availableYears[0] || new Date().getFullYear().toString()
  })
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [selectedClient, setSelectedClient] = useState<string | null>("all")

  // Mostrar la estructura completa de cash_movements cuando cambia data
  useEffect(() => {
    if (data) {
      console.log("Estructura completa de cash_movements:", data.cash_movements)
      console.log("Años disponibles:", Object.keys(data.cash_movements || {}))
      console.log("Cliente seleccionado:", selectedClient)

      // Mostrar los meses disponibles para el año seleccionado
      const yearData = data.cash_movements?.[selectedYear] || {}
      console.log(`Meses disponibles para ${selectedYear}:`, Object.keys(yearData))
    }
  }, [data, selectedYear, selectedClient])

  // Preparar datos mensuales 
  const monthlyData = useMemo<MonthlyData[]>(() => {
    if (!data?.statistics?.monthly?.[selectedYear]) return []

    return months.map((m) => {
      // Acceso directo usando month.name
      let monthIncome = data.statistics.monthly[selectedYear][m.name] || 0

      // Filtrar por cliente si se ha seleccionado uno específico
      if (selectedClient && selectedClient !== "all" && data?.cash_movements?.[selectedYear]?.[m.name]) {
        const clientMovements = data.cash_movements[selectedYear][m.name].filter(
          (mov: CashMovement) => mov.type === "INCOME" && String(mov.client?.id) === selectedClient,
        )

        // Calcular el total de ingresos para este cliente en este mes
        monthIncome = clientMovements.reduce(
          (sum: number, mov: CashMovement) =>
            sum + (typeof mov.amount === "string" ? Number.parseFloat(mov.amount) : mov.amount),
          0,
        )
      }

      // Acceso a movimientos (también filtrados por cliente si es necesario)
      let monthMovements = data?.cash_movements?.[selectedYear]?.[m.name]?.length || 0

      if (selectedClient && selectedClient !== "all" && data?.cash_movements?.[selectedYear]?.[m.name]) {
        monthMovements = data.cash_movements[selectedYear][m.name].filter(
          (mov: CashMovement) => mov.type === "INCOME" && String(mov.client?.id) === selectedClient,
        ).length
      }

      return {
        name: m.name,
        shortName: m.short,
        income: monthIncome,
        movements: monthMovements,
        monthNumber: m.number,
      }
    })
  }, [data, selectedYear, selectedClient])

  // Obtener movimientos del mes seleccionado solo Ingresos
  const monthMovements = useMemo(() => {
    if (!selectedMonth || !data?.cash_movements) return []

    console.log("Buscando movimientos para:", selectedYear, selectedMonth, selectedClient)
    console.log("Estructura de cash_movements para el año:", data.cash_movements[selectedYear])

    const monthData = data.cash_movements[selectedYear]?.[selectedMonth] || []
    console.log("Datos encontrados para el mes:", monthData)

    // Filtrar solo los movimientos de tipo INCOME
    let incomeMovements = Array.isArray(monthData) ? monthData.filter((m: CashMovement) => m.type === "INCOME") : []

    // Filtrar por cliente si se ha seleccionado uno específico
    if (selectedClient && selectedClient !== "all") {
      incomeMovements = incomeMovements.filter((m: CashMovement) => String(m.client?.id) === selectedClient)
    }

    console.log("Movimientos de ingreso filtrados:", incomeMovements)
    return incomeMovements
  }, [data, selectedYear, selectedMonth, selectedClient])

  // Calcular estadísticas 
  const totalAnnualIncome = useMemo(() => {
    return data?.statistics?.total_annual || 0
  }, [data])

  const totalMovements = useMemo(() => {
    return monthlyData.reduce((sum, month) => sum + month.movements, 0)
  }, [monthlyData])

  const bestMonth = useMemo(() => {
    if (monthlyData.length === 0) return { name: "N/A", income: 0 }
    return monthlyData.reduce((prev, current) => (current.income > prev.income ? current : prev))
  }, [monthlyData])

  // Manejadores de eventos
  const handleYearChange = (year: string) => {
    setSelectedYear(year)
    setSelectedMonth(null)
  }

  const handleBarClick = (data: any) => {
    if (data?.activePayload?.[0]?.payload) {
      const clickedMonth = data.activePayload[0].payload.name
      console.log("Mes seleccionado al hacer clic:", clickedMonth)
      setSelectedMonth(clickedMonth)
    }
  }

  const handleClientChange = (clientId: string) => {
    setSelectedClient(clientId)
  }

  // Obtener clientes disponibles
  const availableClients = useMemo(() => {
    if (!data?.cash_movements) return []

    // Extraer todos los clientes únicos de los movimientos
    const clientsSet = new Set<string>()
    const clientsMap = new Map<string, { id: string; name: string }>()

    // Recorrer todos los años y meses para encontrar clientes únicos
    Object.values(data.cash_movements).forEach((yearData) => {
      Object.values(yearData).forEach((monthData) => {
        if (Array.isArray(monthData)) {
          monthData.forEach((movement: CashMovement) => {
            if (movement.type === "INCOME" && movement.client?.id && movement.client?.name) {
              // Convertir el ID a string
              const clientId = String(movement.client.id)
              clientsSet.add(clientId)
              clientsMap.set(clientId, {
                id: clientId,
                name: movement.client.name,
              })
            }
          })
        }
      })
    })

    // Convertir a array para el selector
    return Array.from(clientsMap.values())
  }, [data])

  // Componente Tooltip personalizado
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (!active || !payload || !payload.length) return null

    const data = payload[0].payload
    return (
      <div className="bg-white p-3 border rounded shadow-lg ">
        <p className="font-semibold">{data.name}</p>
        <p className="text-green-600">Ingresos: ${data.income.toLocaleString()}</p>
        <p className="text-gray-600">Movimientos: {data.movements}</p>
      </div>
    )
  }

  // Estados de carga y error
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">Error al cargar los datos</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>
    )
  }

  console.log("Renderizando con año:", selectedYear)
  console.log("Renderizando con mes:", selectedMonth)
  console.log("Movimientos para mostrar:", monthMovements)

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Encabezado */}
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" className="mr-4" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Reporte de Ingresos Anuales</h1>
          <p className="text-muted-foreground">Análisis detallado de ingresos</p>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SummaryCard
          title="Total Ingresos"
          value={`$${totalAnnualIncome.toLocaleString()}`}
          description="Suma total del año"
          icon={<DollarSign className="h-5 w-5 text-emerald-500" />}
        />

        <SummaryCard
          title="Total Movimientos"
          value={totalMovements.toString()}
          description="Cantidad de transacciones"
          icon={<BarChartIcon className="h-5 w-5 text-indigo-500" />}
        />

        <SummaryCard
          title="Mejor Mes"
          value={bestMonth.name || "-"}
          description={`$${bestMonth.income.toLocaleString()}`}
          icon={<Calendar className="h-5 w-5 text-purple-500" />}
        />
      </div>

      {/* Selectores */}
      <div className="flex justify-end mb-4 gap-4">
        {/* Selector de cliente */}
        <Select value={selectedClient || "all"} onValueChange={handleClientChange}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Todos los clientes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los clientes</SelectItem>
            {availableClients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Selector de año */}
        <Select value={selectedYear} onValueChange={handleYearChange} disabled={availableYears.length === 0}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar año" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Gráfico de barras */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center">
            Ingresos Mensuales - {selectedYear}
            {selectedClient &&
              selectedClient !== "all" &&
              ` - ${availableClients.find((c) => c.id === selectedClient)?.name || ""}`}
          </CardTitle>
          <CardDescription className="text-center">Haz clic en un mes para ver los detalles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                onClick={handleBarClick}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="shortName" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(value) => `$${value}`} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="income" name="Ingresos">
                  {monthlyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.name === selectedMonth ? "#8884d8" : "#82ca9d"}
                      className="cursor-pointer"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de movimientos del mes seleccionado */}
      {selectedMonth && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  Movimientos de {selectedMonth} {selectedYear}
                </CardTitle>
                <CardDescription>Detalle de los movimientos realizados durante el mes</CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                {monthMovements.length} movimientos
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {monthMovements && monthMovements.length > 0 ? (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Cuenta</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthMovements.map((movement) => (
                      <TableRow key={movement.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">
                          {format(addDays(movement.date, 1), "dd MMM yyyy", {
                            locale: es,
                          })}
                        </TableCell>
                        <TableCell>{movement.client?.name || "N/A"}</TableCell>
                        <TableCell>{movement.account}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-primary/5">
                            {movement.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium text-emerald-600">
                          $
                          {(typeof movement.amount === "string"
                            ? Number.parseFloat(movement.amount)
                            : movement.amount
                          ).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableCaption>
                    <div className="flex justify-between items-center">
                      <span className="text-center pl-5 pb-5">Total: {monthMovements.length} movimientos</span>
                      <span className="font-medium text-emerald-600 text-center pr-8 pb-5">
                        Suma: $
                        {monthMovements
                          .reduce(
                            (sum, m) => sum + (typeof m.amount === "string" ? Number.parseFloat(m.amount) : m.amount),
                            0,
                          )
                          .toLocaleString()}
                      </span>
                    </div>
                  </TableCaption>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No hay movimientos registrados para este mes</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Componente auxiliar para las tarjetas de resumen
const SummaryCard = ({
  title,
  value,
  description,
  icon,
  highlight,
}: {
  title: string
  value: string
  description: string
  icon?: React.ReactNode
  highlight?: boolean
}) => (
  <Card className={`${highlight ? "border-purple-200 bg-purple-50/30" : ""}`}>
    <CardHeader className="pb-2 flex flex-row items-center justify-between">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
)

export default IncomeDashboard
