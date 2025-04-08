"use client"

import { useGetCashMovementByAccount } from "@/hooks/administracion/movimientos/useGetCashMovementByAccount"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { formatCurrency } from "@/lib/utils"

const MovementsByAccountPage = () => {
  const router = useRouter()
  const { data, isLoading, isError } = useGetCashMovementByAccount()

  // Calculate totals only when data is available
  const totals = data
    ? data.reduce(
        (acc, account) => {
          acc.totalIncome += Number(account.INCOME || 0)
          acc.totalOutcome += Number(account.OUTPUT || 0)
          return acc
        },
        { totalIncome: 0, totalOutcome: 0 },
      )
    : null

  // Prepare data for chart
  const chartData = data
    ? data.map((account) => ({
        name: account.account_name,
        Ingresos: Number(account.INCOME || 0),
        Egresos: Number(account.OUTPUT || 0),
      }))
    : []

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // Handle error state
  if (isError || !data) {
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
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado */}
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" className="mr-4" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle className="text-center">RESUMEN FINANCIERO</CardTitle>
            <CardDescription className="text-center">
              Resumen de ingresos y egresos organizados por cuentas
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-center">Cuenta</TableHead>
                <TableHead className=" text-center">Ingresos</TableHead>
                <TableHead className=" text-center">Egresos</TableHead>
                <TableHead className="text-center">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((account) => {
                const income = Number(account.INCOME || 0)
                const outcome = Number(account.OUTPUT || 0)
                const balance = income - outcome

                return (
                  <TableRow key={account.account_name}>
                  <TableCell className="font-medium text-center">{account.account_name}</TableCell>
                  <TableCell className="text-center text-green-700">
                    {formatCurrency(income)}
                  </TableCell>
                  <TableCell className="text-center text-red-700">
                    {formatCurrency(outcome)}
                  </TableCell>
                  <TableCell className={`text-center font-bold ${balance >= 0 ? "text-green-700" : "text-red-700"}`}>
                    {formatCurrency(balance)}
                  </TableCell>
                </TableRow>
                )
              })}
              {/* Totals row */}
              {totals && (
                <TableRow className="bg-muted/50">
                <TableCell className="font-bold text-center">TOTALES</TableCell>
                <TableCell className="text-center font-bold text-green-500">
                  {formatCurrency(totals.totalIncome)}
                </TableCell>
                <TableCell className="text-center font-bold text-red-500">
                  {formatCurrency(totals.totalOutcome)}
                </TableCell>
                <TableCell
                  className={`text-center font-bold ${
                    (totals.totalIncome - totals.totalOutcome) >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {formatCurrency(totals.totalIncome - totals.totalOutcome)}
                </TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Gráfico de Ingresos vs Egresos */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-center mb-4">Gráfico de Ingresos VS Egresos</h3>
            <div className="h-[400px] w-full flex justify-center">
              <ChartContainer
                config={{
                  Ingresos: {
                    label: "Ingresos",
                    color: "hsl(142, 76%, 36%)", // Verde para ingresos
                  },
                  Egresos: {
                    label: "Egresos",
                    color: "hsl(0, 84%, 60%)", // Rojo para egresos
                  },
                }}
                className="h-full"
                style={{ width: '70%' }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 80,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={30} tickMargin={25} />
                    <YAxis
                      tickFormatter={(value) => `$${value.toLocaleString("es-VE", { minimumFractionDigits: 0 })}`}
                    />
                    <Bar dataKey="Ingresos" fill="var(--color-Ingresos)" name="Ingresos" />
                    <Bar dataKey="Egresos" fill="var(--color-Egresos)" name="Egresos" />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) =>
                            `${value.toLocaleString("es-VE", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 2,
                            })}`
                          }
                        />
                      }
                    />
                    <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    wrapperStyle={{
                      paddingLeft: '70px'
                    }}/>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MovementsByAccountPage