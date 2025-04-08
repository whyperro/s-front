"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, DollarSign, CreditCard, Clock } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { formatCurrency } from "@/lib/utils"
import { useGetCreditStatisticsRentings } from "@/hooks/administracion/creditos/useGetCreditStatisticsRentings"

const CreditStatisticsRentingPage = () => {
  const router = useRouter()
  const { data, isLoading, isError } = useGetCreditStatisticsRentings()
  const [showCreditsTable, setShowCreditsTable] = useState(false)
  const [activeBar, setActiveBar] = useState<string | null>(null)

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

  // Preparar datos para el gráfico
  const chartData = [
    {
      name: "Estadísticas de Créditos",
      total: data.credits.length,
      pagados: data.payed_credits.length,
      pendientes: data.pending_credits.length,
      montoTotal: data.credits_total_amount,
      montoPagado: data.credits_payed_amount,
      montoDeuda: data.credits_debt_amount,
    },
  ]

  // Función para manejar el clic en la barra
  const handleBarClick = (dataKey: string) => {
    if (dataKey === "total") {
      setShowCreditsTable(!showCreditsTable)
      setActiveBar(dataKey)
    } else {
      setShowCreditsTable(false)
      setActiveBar(dataKey)
    }
  }

  // Función para formatear fechas
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Colores para las barras
  const barColors = {
    total: "#7c3aed",
    pagados: "#10b981",
    pendientes: "#f59e0b",
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

      <Card className="mb-8">
        <CardHeader>
          <div>
            <CardTitle className="text-center">ESTADÍSTICAS DE CRÉDITO DE LAS RENTAS</CardTitle>
            <CardDescription className="text-center">
              Resumen estadístico sobre los créditos de las rentas
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {/* Tarjetas de resumen */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total de Créditos</p>
                    <h3 className="text-2xl font-bold">{data.credits.length}</h3>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Monto Total</p>
                    <h3 className="text-2xl font-bold">{formatCurrency(data.credits_total_amount)}</h3>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Deuda Pendiente</p>
                    <h3 className="text-2xl font-bold">{formatCurrency(data.credits_debt_amount)}</h3>
                  </div>
                  <div className="p-2 bg-amber-500/10 rounded-full">
                    <Clock className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de barras */}
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  label={{ value: "Cantidad de Créditos", angle: -90, position: "insideLeft" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{ value: "Montos (Q)", angle: 90, position: "insideRight" }}
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "montoTotal" || name === "montoPagado" || name === "montoDeuda") {
                      return [
                        formatCurrency(value as number),
                        name === "montoTotal" ? "Monto Total" : name === "montoPagado" ? "Monto Pagado" : "Monto Deuda",
                      ]
                    }
                    return [
                      value,
                      name === "total"
                        ? "Total Créditos"
                        : name === "pagados"
                          ? "Créditos Pagados"
                          : "Créditos Pendientes",
                    ]
                  }}
                />
                <Legend
                  formatter={(value) => {
                    switch (value) {
                      case "total":
                        return "Total Créditos"
                      case "pagados":
                        return "Créditos Pagados"
                      case "pendientes":
                        return "Créditos Pendientes"
                      case "montoTotal":
                        return "Monto Total"
                      case "montoPagado":
                        return "Monto Pagado"
                      case "montoDeuda":
                        return "Monto Deuda"
                      default:
                        return value
                    }
                  }}
                />
                <Bar
                  yAxisId="left"
                  dataKey="total"
                  fill={barColors.total}
                  onClick={() => handleBarClick("total")}
                  cursor="pointer"
                  className={activeBar === "total" ? "opacity-100" : "opacity-70"}
                />
                <Bar
                  yAxisId="left"
                  dataKey="pagados"
                  fill={barColors.pagados}
                  onClick={() => handleBarClick("pagados")}
                  cursor="pointer"
                  className={activeBar === "pagados" ? "opacity-100" : "opacity-70"}
                />
                <Bar
                  yAxisId="left"
                  dataKey="pendientes"
                  fill={barColors.pendientes}
                  onClick={() => handleBarClick("pendientes")}
                  cursor="pointer"
                  className={activeBar === "pendientes" ? "opacity-100" : "opacity-70"}
                />
                <Bar yAxisId="right" dataKey="montoTotal" fill="#8884d8" className="opacity-70" />
                <Bar yAxisId="right" dataKey="montoPagado" fill="#82ca9d" className="opacity-70" />
                <Bar yAxisId="right" dataKey="montoDeuda" fill="#ffc658" className="opacity-70" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Instrucciones */}
          <p className="text-center text-muted-foreground mt-4">
            Haz clic en la barra de "Total Créditos" para ver el detalle de los créditos
          </p>
        </CardContent>
      </Card>

      {/* Tabla de créditos */}
      {showCreditsTable && (
        <Card>
          <CardHeader>
            <CardTitle>Detalle de Créditos</CardTitle>
            <CardDescription>Lista de todos los créditos registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Deuda</TableHead>
                    <TableHead>Monto Pagado</TableHead>
                    <TableHead>Fecha Límite</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.credits.map((credit) => (
                    <TableRow key={credit.id}>
                      <TableCell className="font-medium">{credit.client.name || "N/A"}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            credit.status === "PAGADO" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {credit.status}
                        </span>
                      </TableCell>
                      <TableCell>{formatCurrency(credit.debt)}</TableCell>
                      <TableCell>{formatCurrency(credit.payed_amount)}</TableCell>
                      <TableCell>{formatDate(credit.deadline)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" onClick={() => setShowCreditsTable(false)}>
              Cerrar
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default CreditStatisticsRentingPage