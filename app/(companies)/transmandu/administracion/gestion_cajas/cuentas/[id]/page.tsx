"use client";

import { useGetCashMovementByAccount } from "@/hooks/administracion/movimientos/useGetCashMovementByAccount";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, X } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";
import DateFilter from "@/components/forms/CreateFilterDates";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const MovementsByAccountPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  // Obtener parametros
  const cashId = searchParams.get("cashId") || "";
  const from = searchParams.get("from") || undefined;
  const to = searchParams.get("to") || undefined;
  const { data, isLoading, isError } = useGetCashMovementByAccount(cashId, {
    from,
    to,
  });

  // Filtrar solo las cuentas de esta caja 
  const filteredData =
    data?.filter((account) =>
      account.movements.some((movement) => movement.cash_id === cashId)
    ) || [];

  // Calculate totals only when data is available
  const totals = filteredData
    ? filteredData.reduce(
        (acc, account) => {
          acc.totalIncome += Number(account.INCOME || 0);
          acc.totalOutcome += Number(account.OUTPUT || 0);
          return acc;
        },
        { totalIncome: 0, totalOutcome: 0 }
      )
    : null;

  // Prepare data for chart
  const chartData = filteredData
    ? filteredData.map((account) => ({
        name: account.account_name,
        Ingresos: Number(account.INCOME || 0),
        Egresos: Number(account.OUTPUT || 0),
      }))
    : [];

  // Get movements for selected account
  const selectedAccountMovements = selectedAccount
    ? filteredData?.find((account) => account.account_name === selectedAccount)
        ?.movements || []
    : [];

  // Handle bar click
  const handleBarClick = (data: any, index: number) => {
    const accountName = data.name;
    setSelectedAccount(accountName);
  };

  // Handle clear selection
  const handleClearSelection = () => {
    setSelectedAccount(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !filteredData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">Error al cargar los datos</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>
    );
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
        <h1 className="text-xl font-semibold">
          Movimientos de la caja: {cashId}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-center md:text-left">
                RESUMEN FINANCIERO
              </CardTitle>
              <CardDescription className="text-center md:text-left">
                Resumen de ingresos y egresos organizados por cuentas para esta caja
              </CardDescription>
            </div>
            <DateFilter />
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
              {filteredData.map((account) => {
                const income = Number(account.INCOME || 0);
                const outcome = Number(account.OUTPUT || 0);
                const balance = income - outcome;

                return (
                  <TableRow key={account.account_name}>
                    <TableCell className="font-medium text-center">
                      {account.account_name}
                    </TableCell>
                    <TableCell className="text-center text-green-700">
                      {formatCurrency(income)}
                    </TableCell>
                    <TableCell className="text-center text-red-700">
                      {formatCurrency(outcome)}
                    </TableCell>
                    <TableCell
                      className={`text-center font-bold ${balance >= 0 ? "text-green-700" : "text-red-700"}`}
                    >
                      {formatCurrency(balance)}
                    </TableCell>
                  </TableRow>
                );
              })}
              {/* Totals row */}
              {totals && (
                <TableRow className="bg-muted/50">
                  <TableCell className="font-bold text-center">
                    TOTALES
                  </TableCell>
                  <TableCell className="text-center font-bold text-green-500">
                    {formatCurrency(totals.totalIncome)}
                  </TableCell>
                  <TableCell className="text-center font-bold text-red-500">
                    {formatCurrency(totals.totalOutcome)}
                  </TableCell>
                  <TableCell
                    className={`text-center font-bold ${
                      totals.totalIncome - totals.totalOutcome >= 0
                        ? "text-green-500"
                        : "text-red-500"
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
            <h3 className="text-lg font-semibold text-center mb-4">
              Gráfico de Ingresos VS Egresos
            </h3>
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
                style={{ width: "70%" }}
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
                    onClick={(data) => {
                      if (data && data.activePayload && data.activePayload[0]) {
                        handleBarClick(
                          data.activePayload[0].payload,
                          data.activeTooltipIndex || 0
                        );
                      }
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={30}
                      tickMargin={25}
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        `$${value.toLocaleString("es-VE", { minimumFractionDigits: 0 })}`
                      }
                    />
                    <Bar
                      dataKey="Ingresos"
                      fill="var(--color-Ingresos)"
                      name="Ingresos"
                    />
                    <Bar
                      dataKey="Egresos"
                      fill="var(--color-Egresos)"
                      name="Egresos"
                    />
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
                        paddingLeft: "70px",
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          {/* Tabla de movimientos detallados */}
          {selectedAccount && selectedAccountMovements.length > 0 && (
            <div className="mt-8">
              <Card className="border border-muted-foreground/20 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{selectedAccount}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearSelection}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cerrar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Subcategoría</TableHead>
                        <TableHead>Monto</TableHead>
                        <TableHead>Cuenta Bancaria</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedAccountMovements.map((movement) => (
                        <TableRow key={movement.id}>
                          <TableCell>
                            {format(new Date(movement.date), "dd/MM/yyyy", {
                              locale: es,
                            })}
                          </TableCell>
                          <TableCell>{movement.category}</TableCell>
                          <TableCell>{movement.sub_category}</TableCell>
                          <TableCell
                            className={
                              movement.type === "INCOME"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {formatCurrency(movement.amount)}
                          </TableCell>
                          <TableCell>
                            {movement.bank_account?.name || "Efectivo"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MovementsByAccountPage;
