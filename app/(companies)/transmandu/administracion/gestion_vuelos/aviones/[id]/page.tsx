"use client";

import type React from "react";

import { useParams } from "next/navigation";
import { useGetAircraftById } from "@/hooks/administracion/useGetAircraftById";
import { useGetFlightsByAircraft } from "@/hooks/administracion/vuelos/useGetFlightsByAircraft";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ArrowLeft,
  Plane,
  Calendar,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  Legend,
} from "recharts";
import type { Flight } from "@/types";

// Tipo para los datos mensuales
type MonthlyData = {
  name: string;
  shortName: string;
  ganancias: number;
  vuelos: number;
  month: number;
};

// Función para limpiar y convertir valores a números
function cleanNumber(value: any): number {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return 0;

  // Remover caracteres no numéricos excepto punto decimal
  const cleaned = value.replace(/[^\d.]/g, "");
  const number = Number.parseFloat(cleaned);

  return isNaN(number) ? 0 : number;
}

// Generar años dinámicamente (desde 2020 hasta 5 años en el futuro)
const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2020;
  const endYear = currentYear + 5;
  const years: string[] = [];

  for (let year = startYear; year <= endYear; year++) {
    years.push(year.toString());
  }

  return years;
};

const yearOptions = generateYearOptions();

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
];

const shortMonthNames = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

// Tipo para el tooltip personalizado
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    payload: MonthlyData;
  }>;
  label?: string;
}

export default function AircraftReportPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { data: aircraftDetails, isLoading, error } = useGetAircraftById(id);
  const { data: flights, isLoading: isLoadingFlights } =
    useGetFlightsByAircraft(id);

  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [flightsData, setFlightsData] = useState<Flight[]>([]);

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
      }));

    flights?.forEach((flight) => {
      const flightDate = flight.date ? new Date(flight.date) : null;
      if (flightDate && flightDate.getFullYear().toString() === year) {
        const month = flightDate.getMonth();
        data[month].ganancias += cleanNumber(flight.total_amount);
        data[month].vuelos += 1;
      }
    });

    return data;
  };

  // Cargar datos cuando cambia el año seleccionado
  useEffect(() => {
    if (flights) {
      setMonthlyData(processFlightsData(flights, selectedYear));
      setSelectedMonth(null);
      setFlightsData([]);
    }
  }, [selectedYear, flights]);

  // Manejar clic en una barra del gráfico
  const handleBarClick = (data: any) => {
    if (data?.activePayload?.[0]?.payload) {
      const monthIndex = data.activePayload[0].payload.month;
      setSelectedMonth(monthIndex);

      // Filtrar vuelos para el mes seleccionado
      const filteredFlights =
        flights?.filter((flight) => {
          const flightDate = flight.date ? new Date(flight.date) : null;
          return (
            flightDate &&
            flightDate.getFullYear().toString() === selectedYear &&
            flightDate.getMonth() === monthIndex
          );
        }) || [];

      setFlightsData(filteredFlights);
    }
  };

  // Calcular estadísticas totales
  const totalEarnings = monthlyData.reduce((sum, month) => {
    return sum + cleanNumber(month.ganancias);
  }, 0);

  const totalFlights = monthlyData.reduce((sum, month) => {
    return sum + cleanNumber(month.vuelos);
  }, 0);

  const averageEarningPerFlight =
    totalFlights > 0
      ? Number.parseFloat((totalEarnings / totalFlights).toFixed(2))
      : 0;

  // Encontrar el mes con más ganancias
  const bestMonth =
    monthlyData.length > 0
      ? monthlyData.reduce((prev, current) =>
          prev.ganancias > current.ganancias ? prev : current
        )
      : null;

  // Estados de carga y error
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !aircraftDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">
          Error al cargar los datos de la aeronave
        </p>
        <Button variant="outline" onClick={() => router.back()}>
          Volver
        </Button>
      </div>
    );
  }

  // Función personalizada para el tooltip
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-4 border rounded-lg shadow-lg">
          <p className="font-semibold text-lg mb-1">{label}</p>
          {payload.map((entry, index) => (
            <div key={`tooltip-${index}`} className="mb-1">
              {entry.dataKey === "ganancias" && (
                <p className="text-emerald-600 font-medium text-base">
                  Ganancias: $
                  {entry.value.toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              )}
              {entry.dataKey === "vuelos" && (
                <p className="text-blue-600 font-medium">
                  Vuelos: {entry.value}
                </p>
              )}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
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
        <div>
          <h1 className="text-2xl font-bold text-center">
            Reporte de Ganancias
          </h1>
          <p className="text-muted-foreground text-center">
            {aircraftDetails?.acronym} - {aircraftDetails?.model}
          </p>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Total Ganancias"
          value={`$${totalEarnings.toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          description="Ingresos totales del año"
          icon={<DollarSign className="h-5 w-5 text-emerald-500" />}
        />

        <SummaryCard
          title="Total Vuelos"
          value={totalFlights.toString()}
          description="Número de vuelos realizados"
          icon={<Plane className="h-5 w-5 text-blue-500" />}
        />

        <SummaryCard
          title="Promedio por Vuelo"
          value={`$${averageEarningPerFlight.toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          description="Ganancia media por vuelo"
          icon={<TrendingUp className="h-5 w-5 text-indigo-500" />}
        />

        <SummaryCard
          title="Mejor Mes"
          value={bestMonth?.name || "-"}
          description={`$${
            bestMonth?.ganancias.toLocaleString("es-ES", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) || "0"
          }`}
          icon={<Calendar className="h-5 w-5 text-purple-500" />}
        />
      </div>

      {/* Selector de año */}
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

      {/* Gráfico de barras mejorado */}
      <Card className="mb-6 overflow-hidden">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-center">
            Ganancias Mensuales {selectedYear}
          </CardTitle>
          <CardDescription className="text-center">
            Haz clic en un mes para ver los detalles de los vuelos
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                onClick={handleBarClick}
                barGap={0}
                barCategoryGap={8}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="shortName"
                  tickLine={false}
                  axisLine={true}
                  tick={{ fontSize: 12 }}
                  height={60}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                  width={80}
                  domain={[0, "auto"]}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(value) => `${value}`}
                  width={50}
                  domain={[0, "auto"]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="ganancias"
                  name="Ganancias"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                >
                  {monthlyData.map((entry, index) => (
                    <Cell
                      key={`cell-ganancias-${index}`}
                      fill={
                        entry.month === selectedMonth ? "#047857" : "#10b981"
                      }
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Bar>
                <Bar
                  yAxisId="right"
                  dataKey="vuelos"
                  name="Vuelos"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                >
                  {monthlyData.map((entry, index) => (
                    <Cell
                      key={`cell-vuelos-${index}`}
                      fill={
                        entry.month === selectedMonth ? "#1d4ed8" : "#3b82f6"
                      }
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de vuelos del mes seleccionado */}
      {selectedMonth !== null && (
        <Card>
          <CardHeader className="bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  Vuelos de {monthNames[selectedMonth]} {selectedYear}
                </CardTitle>
                <CardDescription>
                  Detalle de los vuelos realizados durante el mes
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                {flightsData.length} vuelos
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {isLoadingFlights ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : flightsData.length > 0 ? (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/30">
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
                      <TableRow key={flight.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">
                          <TableCell>{formatDate(flight.date)}</TableCell>
                        </TableCell>
                        <TableCell>{flight.client?.name || "-"}</TableCell>
                        <TableCell>
                          {flight.route?.from || "-"} -{" "}
                          {flight.route?.to || "-"}
                        </TableCell>
                        <TableCell style={{ textAlign: "center", paddingRight: "110px" }} className="font-medium text-emerald-600">
                          $
                          {cleanNumber(flight.total_amount).toLocaleString(
                            "es-ES",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              flight.debt_status === "PAGADO"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            }
                          >
                            {flight.debt_status || "DESCONOCIDO"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableCaption>
                    <div className="flex justify-between items-center">
                      <span className="text-center pl-5 pb-5"> Total: {flightsData.length} vuelos</span>
                      <span className="font-medium text-emerald-600 text-center pr-8 pb-5">
                        Ganancias: $
                        {flightsData
                          .reduce(
                            (sum, flight) =>
                              sum + cleanNumber(flight.total_amount),
                            0
                          )
                          .toLocaleString("es-ES", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                      </span>
                    </div>
                  </TableCaption>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No hay vuelos registrados para este mes.
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Componente auxiliar para las tarjetas de resumen
const SummaryCard = ({
  title,
  value,
  description,
  icon,
  highlight,
}: {
  title: string;
  value: string;
  description: string;
  icon?: React.ReactNode;
  highlight?: boolean;
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
);
