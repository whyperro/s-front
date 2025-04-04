"use client"

import { useGetCashMovementByAccount } from "@/hooks/administracion/movimientos/useGetCashMovementByAccount"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

const MovementsByAccountPage = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetCashMovementByAccount();

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

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
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
        <Button
          variant="outline"
          size="sm"
          className="mr-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>
      
      <Card>
        <CardHeader>
        <div>
          <CardTitle className="text-center">Reporte de Movimientos por Cuenta</CardTitle>
          <CardDescription className="text-center">Resumen de ingresos y egresos organizados por cuentas</CardDescription>
        </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Listado de movimientos por cuenta</TableCaption>
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
                      {income.toLocaleString("es-VE", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className="text-center text-red-700">
                      {outcome.toLocaleString("es-VE", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className={`text-center font-bold ${balance >= 0 ? "text-green-700" : "text-red-700"}`}>
                      {balance.toLocaleString("es-VE", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                )
              })}
              {/* Totals row */}
              {totals && (
                <TableRow className="bg-muted/50">
                  <TableCell className="font-bold text-center">TOTALES</TableCell>
                  <TableCell className="text-center font-bold text-green-500">
                    {totals.totalIncome.toLocaleString("es-VE", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-center font-bold text-red-500">
                    {totals.totalOutcome.toLocaleString("es-VE", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell
                    className={`text-center font-bold ${
                      (totals.totalIncome - totals.totalOutcome) >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {(totals.totalIncome - totals.totalOutcome).toLocaleString("es-VE", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default MovementsByAccountPage