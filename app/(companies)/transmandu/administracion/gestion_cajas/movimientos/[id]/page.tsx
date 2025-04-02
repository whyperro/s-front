"use client"

import { useRouter } from "next/navigation"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft } from "lucide-react"
import { format, } from "date-fns"
import { es } from "date-fns/locale"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts"
import { CashMovement } from "@/types"
import { useGetIncomeStatistics } from "@/hooks/administracion/movimientos/useGetIncomeStatistics"

// Configuración de meses
const MONTHS = [
  { name: "Enero", short: "Ene", number: "01" },
  { name: "Febrero", short: "Feb", number: "02" },
  { name: "Marzo", short: "Mar", number: "03" },
  { name: "Abril", short: "Abr", number: "04" },
  { name: "Mayo", short: "May", number: "05" },
  { name: "Junio", short: "Jun", number: "06" },
  { name: "Julio", short: "Jul", number: "07" },
  { name: "Agosto", short: "Ago", number: "08" },
  { name: "Septiembre", short: "Sep", number: "09" },
  { name: "Octubre", short: "Oct", number: "10" },
  { name: "Noviembre", short: "Nov", number: "11" },
  { name: "Diciembre", short: "Dic", number: "12" },
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
  
  // Obtener años disponibles de forma segura
  const availableYears = useMemo(() => {
    if (!data?.statistics?.monthly) return [new Date().getFullYear().toString()]
    return Object.keys(data.statistics.monthly).sort((a, b) => parseInt(b) - parseInt(a))
  }, [data])

  // Estado con valor inicial seguro
  const [selectedYear, setSelectedYear] = useState<string>(() => {
    return availableYears[0] || new Date().getFullYear().toString()
  })
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

  // Preparar datos mensuales con protección completa
  const monthlyData = useMemo<MonthlyData[]>(() => {
    return MONTHS.map(month => {
      // Acceso seguro a statistics.monthly
      const monthlyStats = data?.statistics?.monthly?.[selectedYear] || {}
      const monthIncome = monthlyStats[month.number] || 0

      // Acceso seguro a cash_movement
      const yearMovements = data?.cash_movement?.[selectedYear] || {}
      const monthMovements = yearMovements[month.number] || []
      const movementsCount = monthMovements.length

      return {
        name: month.name,
        shortName: month.short,
        income: monthIncome,
        movements: movementsCount,
        monthNumber: month.number
      }
    })
  }, [data, selectedYear])

  // Obtener movimientos del mes seleccionado (solo INCOME) de forma segura
  const monthlyMovements = useMemo(() => {
    if (!selectedMonth || !data?.cash_movement?.[selectedYear]?.[selectedMonth]) return []
    return data.cash_movement[selectedYear][selectedMonth].filter(m => m.type === "INCOME")
  }, [data, selectedYear, selectedMonth])

  // Calcular estadísticas con protección
  const totalAnnualIncome = useMemo(() => {
    return data?.statistics?.total_annual || 0
  }, [data])

  const totalMovements = useMemo(() => {
    return monthlyData.reduce((sum, month) => sum + month.movements, 0)
  }, [monthlyData])

  const bestMonth = useMemo(() => {
    return monthlyData.reduce((prev, current) => 
      current.income > prev.income ? current : prev
    , { income: 0 } as MonthlyData)
  }, [monthlyData])

  // Manejadores de eventos
  const handleYearChange = (year: string) => {
    setSelectedYear(year)
    setSelectedMonth(null)
  }

  const handleBarClick = (data: any) => {
    if (data?.activePayload?.[0]?.payload) {
      setSelectedMonth(data.activePayload[0].payload.monthNumber)
    }
  }

  // Componente Tooltip personalizado
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (!active || !payload || !payload.length) return null
    
    const data = payload[0].payload
    return (
      <div className="bg-white p-3 border rounded shadow-lg text-sm">
        <p className="font-bold">{data.name}</p>
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
        />
        
        <SummaryCard 
          title="Total Movimientos" 
          value={totalMovements.toString()} 
          description="Cantidad de transacciones"
        />
        
        <SummaryCard 
          title="Mejor Mes" 
          value={bestMonth.name || "-"} 
          description={`$${bestMonth.income.toLocaleString()}`}
        />
      </div>

      {/* Selector de año */}
      <div className="flex justify-end mb-4">
        <Select 
          value={selectedYear} 
          onValueChange={handleYearChange}
          disabled={availableYears.length === 0}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar año" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map(year => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Gráfico de barras */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ingresos Mensuales - {selectedYear}</CardTitle>
          <CardDescription>Haz clic en un mes para ver los detalles</CardDescription>
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
                <XAxis 
                  dataKey="shortName" 
                  angle={-45} 
                  textAnchor="end" 
                  height={60}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(value) => `$${value}`}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="income" name="Ingresos">
                  {monthlyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.monthNumber === selectedMonth ? "#8884d8" : "#82ca9d"}
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
            <CardTitle>
              Movimientos de {MONTHS.find(m => m.number === selectedMonth)?.name} {selectedYear}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {monthlyMovements.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Cuenta</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyMovements.map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell>
                          {format(new Date(movement.date), 'dd MMM yyyy', { locale: es })}
                        </TableCell>
                        <TableCell>{movement.client?.name || 'N/A'}</TableCell>
                        <TableCell>{movement.account}</TableCell>
                        <TableCell>{movement.category}</TableCell>
                        <TableCell className="text-right">
                          ${movement.amount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 text-sm text-muted-foreground">
                  Total: {monthlyMovements.length} movimientos | 
                  Suma: ${monthlyMovements.reduce((sum, m) => sum + m.amount, 0).toLocaleString()}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No hay movimientos registrados para este mes
              </div>
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
  description 
}: {
  title: string
  value: string
  description: string
}) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
)

export default IncomeDashboard