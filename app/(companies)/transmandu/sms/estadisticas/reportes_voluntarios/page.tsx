"use client";
import BarChartComponent from "@/components/charts/BarChartComponent";
import PieChartComponent from "@/components/charts/PieChartComponent";
import { ContentLayout } from "@/components/layout/ContentLayout";
import DataFilter from "@/components/misc/DataFilter";
import { Label } from "@/components/ui/label";
import { useGetDangerIdentificationsCountedByType } from "@/hooks/sms/useGetDangerIdentificationsCountedByType";
import { useGetPostRiskCountByDateRange } from "@/hooks/sms/useGetPostRiskByDateRange";
import { useGetRiskCountByDateRange } from "@/hooks/sms/useGetRiskByDateRange";
import { useGetVoluntaryReportingStatsByYear } from "@/hooks/sms/useGetVoluntaryReportingStatisticsByYear";
import { useGetVoluntaryReportsCountedByAirportLocation } from "@/hooks/sms/useGetVoluntaryReportsCountedByAirportLocation";
import { Loader2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DynamicBarChart from "../../../../../../components/charts/DynamicBarChart";
import { format, startOfMonth } from "date-fns";
import { useGetIdentificationStatsBySourceName } from "@/hooks/sms/useGetIdentificationStatsBySoruceName";
import { useGetIdentificationStatsBySourceType } from "@/hooks/sms/useGetIdentificationStatsBySoruceType";
import { useGetReportsCountedByArea } from "@/hooks/sms/useGetReportsCountedByArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Params {
  from?: string;
  to?: string;
  [key: string]: string | undefined;
}

const labels = [
  { label: "Identificados por localizacion", value: "location" },
  { label: "Según su Tipo", value: "tipo" },
  { label: "Por Índice de Riesgo Pre-Mitigación", value: "pre-riesgo" },
  { label: "Por Índice de Riesgo Post-Mitigación", value: "post-riesgo" },
  { label: "Identificados vs Gestionados", value: "bar-chart" },
  { label: "Número de Reportes por Índice de Riesgo", value: "pre-riesgo-bar" },
  { label: "Número de Reportes vs Área", value: "area-bar" },
];

const Statistics = () => {
  const [selectedGraphic, setSelectedGraphic] = useState("Todos"); // Mostrar todos por defecto
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [params, setParams] = useState<Params>({
    from: format(startOfMonth(new Date()), "yyyy-MM-dd"),
    to: format(new Date(), "yyyy-MM-dd"),
  });

  // Hooks de datos
  const {
    data: barChartData,
    isLoading: isLoadingBarChart,
    refetch: refetchBarChart,
  } = useGetVoluntaryReportingStatsByYear(
    params.from!,
    params.to!,
    "voluntary"
  );

  const {
    data: dynamicData,
    isLoading: isLoadingDynamicData,
    refetch: refetchDynamicChart,
  } = useGetDangerIdentificationsCountedByType(
    params.from!,
    params.to!,
    "voluntary"
  );

  const {
    data: pieCharData,
    isLoading: isLoadingPieCharData,
    refetch: refetchPieChart,
  } = useGetReportsCountedByArea(params.from!, params.to!, "voluntary");

  const {
    data: riskData,
    isLoading: isLoadingRisk,
    refetch: refetchRisk,
  } = useGetRiskCountByDateRange(params.from!, params.to!, "voluntary");

  const {
    data: postRiskData,
    isLoading: isLoadingPostRisk,
    refetch: refetchPostRisk,
  } = useGetPostRiskCountByDateRange(params.from!, params.to!, "voluntary");

  const {
    data: reportsByLocationData,
    isLoading: isLoadingReportsByLocationData,
    refetch: refetchAirportLocationData,
  } = useGetVoluntaryReportsCountedByAirportLocation(params.from!, params.to!);

  const { refetch: refetchDynamicSourceNameChart } =
    useGetIdentificationStatsBySourceName(
      params.from!,
      params.to!,
      "voluntary"
    );

  const { refetch: refetchDynamicSourceTypeChart } =
    useGetIdentificationStatsBySourceType(
      params.from!,
      params.to!,
      "voluntary"
    );

  useEffect(() => {
    const defaultFrom = format(startOfMonth(new Date()), "yyyy-MM-dd");
    const defaultTo = format(new Date(), "yyyy-MM-dd");

    const newParams: Params = {};
    searchParams.forEach((value, key) => {
      newParams[key] = value;
    });

    setParams({
      from: newParams.from || defaultFrom,
      to: newParams.to || defaultTo,
    });
  }, [searchParams, pathname]);

  useEffect(() => {
    refetchBarChart();
    refetchPieChart();
    refetchDynamicChart();
    refetchRisk();
    refetchPostRisk();
    refetchAirportLocationData();
    refetchDynamicSourceNameChart();
    refetchDynamicSourceTypeChart();
  }, [params]);

  const shouldShow = (value: string) =>
    selectedGraphic === "Todos" || selectedGraphic === value;

  return (
    <ContentLayout title="Gráficos Estadísticos de los Reportes">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex flex-col">
          <Label className="text-lg font-semibold">Seleccionar Fecha:</Label>
          <DataFilter />
        </div>
        <div className="w-full max-w-md">
          <Label className="text-lg font-semibold">Seleccionar gráfico:</Label>
          <Select onValueChange={setSelectedGraphic} value={selectedGraphic}>
            <SelectTrigger>
              <SelectValue placeholder="Mostrar todos los gráficos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              {labels.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {shouldShow("bar-chart") && (
          <div className="p-4 rounded-lg shadow border">
            {isLoadingBarChart ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : barChartData ? (
              <BarChartComponent
                from={params.from!}
                to={params.to!}
                height="100%"
                width="100%"
                data={barChartData}
                title="Peligros Identificados"
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                Ha ocurrido un error al cargar los datos.
              </p>
            )}
          </div>
        )}

        {shouldShow("tipo") && (
          <div className="p-4 rounded-lg shadow border">
            {isLoadingDynamicData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : dynamicData?.length ? (
              <DynamicBarChart
                height="70%"
                width="70%"
                data={dynamicData}
                title="Numero de Reportes vs Tipo de Peligros"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>
        )}

        {shouldShow("area-bar") && (
          <div className="p-4 rounded-lg shadow border">
            {isLoadingPieCharData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : pieCharData?.length ? (
              <DynamicBarChart
                height="70%"
                width="70%"
                data={pieCharData}
                title="Numero de Reportes vs Areas"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>
        )}

        {shouldShow("location") && (
          <div className="p-4 rounded-lg shadow border">
            {isLoadingReportsByLocationData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : reportsByLocationData?.length ? (
              <DynamicBarChart
                height="70%"
                width="70%"
                data={reportsByLocationData}
                title="Numero de Reportes vs Localizacion"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>
        )}

        {shouldShow("pre-riesgo") && (
          <div className="p-4 rounded-lg shadow border">
            {isLoadingRisk ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : riskData?.length ? (
              <PieChartComponent
                radius={120}
                height="50%"
                width="50%"
                data={riskData}
                title="Porcentaje de Indice de Riesgo Pre-Mitigacion"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>
        )}

        {shouldShow("pre-riesgo-bar") && (
          <div className="p-4 rounded-lg shadow border">
            {isLoadingRisk ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : riskData?.length ? (
              <DynamicBarChart
                height="100%"
                width="100%"
                data={riskData}
                title="Numero de Reportes por Cada Indice de Riesgo"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>
        )}

        {shouldShow("post-riesgo") && (
          <div className="p-4 rounded-lg shadow border">
            {isLoadingPostRisk ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : postRiskData?.length ? (
              <PieChartComponent
                radius={120}
                height="50%"
                width="50%"
                data={postRiskData}
                title="Indice de Riesgo Post-Mitigación"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>
        )}
      </div>
    </ContentLayout>
  );
};

export default Statistics;