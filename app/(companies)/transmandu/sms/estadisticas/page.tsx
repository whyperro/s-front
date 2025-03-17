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
import { useGetVoluntaryReportsCountedByArea } from "@/hooks/sms/useGetVoluntaryReportsCountedByArea";
import { Loader2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DynamicBarChart from "../../../../../components/charts/DynamicBarChart";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

const Statistics = () => {
  const [selectedGraphic, setSelectedGraphic] = useState("");
  const labels = [
    {
      label: "Identificados por Área",
      value: "número de informes por cada área específica",
    },
    {
      label: "Según su Tipo",
      value: "número de informes clasificados por tipo específico",
    },
    {
      label: "Por Índice de Riesgo Pre-Mitigación",
      value:
        "número de informes clasificados por índice de riesgo antes de cualquier medida de mitigación",
    },
    {
      label: "Por Índice de Riesgo Post-Mitigación",
      value:
        "número de informes clasificados por índice de riesgo después de aplicar medidas de mitigación",
    },
    {
      label: "Identificados vs Gestionados",
      value:
        "comparación entre el número de informes identificados y el número de informes gestionados",
    },
    {
      label: "Número de Reportes por Índice de Riesgo",
      value:
        "total de informes clasificados por diferentes niveles de índice de riesgo",
    },
    {
      label: "Número de Reportes vs Área",
      value:
        "comparación del número de informes con respecto a cada área específica",
    },
  ];

  interface Params {
    from?: string;
    to?: string;
    [key: string]: string | undefined; // Permite otros parámetros
  }
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [params, setParams] = useState<Params>({});

  // Asigna parametros cuando cambia el Pathname o el SearchParams

  const {
    data: airportLocationData,
    isLoading: isLoadingAirportLocationData,
    isError: isErrorAirportLocationData,
    refetch: refetchAirportLocationData,
  } = useGetVoluntaryReportsCountedByAirportLocation(
    params.from || "2025-03-01",
    params.to || "2025-03-15"
  );

  const {
    data: postRiskData,
    isLoading: isLoadingPostRisk,
    isError: isErrorPostRisk,
    refetch: refetchPostRisk,
  } = useGetPostRiskCountByDateRange(
    params.from || "2025-03-01",
    params.to || "2025-03-15"
  );

  const {
    data: riskData,
    isLoading: isLoadingRisk,
    isError: isErrorRisk,
    refetch: refetchRisk,
  } = useGetRiskCountByDateRange(
    params.from || "2025-03-01",
    params.to || "2025-03-15"
  );

  useEffect(() => {
    const newParams: Params = {};
    searchParams.forEach((value, key) => {
      newParams[key] = value;
    });

    const fromValue = newParams.from;
    const toValue = newParams.to;

    console.log("ESTADISTICAS PAGE -> Valor de from:", fromValue);
    console.log("ESTADISTICAS PAGE -> Valor de to:", toValue);

    setParams(newParams);
  }, [searchParams, pathname]);

  // Para extraer las estadisticas de reportes dado unos rangos de fecha, desde hasta
  const {
    data: barChartData,
    isLoading: isLoadingBarChart,
    isError: isErrorBarChart,
    refetch: refetchBarChart,
  } = useGetVoluntaryReportingStatsByYear(
    params.from || "2025-03-01",
    params.to || "2025-03-15"
  );

  // Para extraer el numero de reportes por area dado unos rangos de fecha, desde hasta
  const {
    data: pieCharData,
    isLoading: isLoadingPieCharData,
    isError: isErrorPieCharData,
    refetch: refetchPieChart,
  } = useGetVoluntaryReportsCountedByArea(
    params.from || "2025-03-01",
    params.to || "2025-03-15"
  );

  const {
    data: dynamicData,
    isLoading: isLoadingDynamicData,
    isError: isErrorDynamicData,
    refetch: refetchDynamicChart,
  } = useGetDangerIdentificationsCountedByType(
    params.from || "2025-03-01",
    params.to || "2025-03-15"
  );

  useEffect(() => {
    refetchBarChart();
    refetchPieChart();
    refetchDynamicChart();
    refetchRisk();
    refetchPostRisk();
    refetchAirportLocationData();
  }, [params.from, params.to]);

  return (
    <>
      <ContentLayout title="Gráficos Estadísticos de los Reportes">
        <div className="flex justify-center items-center mb-4">
          <div className="flex flex-col">
            <Label className="text-lg font-semibold">Seleccionar Fecha:</Label>
            <DataFilter />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {/* Gráfico de Barras (Peligros Identificados) */}
          <div className=" flex flex-col justify-center items-center p-4 rounded-lg shadow border">
            {isLoadingBarChart ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : barChartData ? (
              params.from &&
              params.to && (
                <BarChartComponent
                  from={params.from}
                  to={params.to}
                  height="100%"
                  width="100%"
                  data={barChartData}
                  title="Peligros Identificados"
                />
              )
            ) : (
              <p className="text-sm text-muted-foreground">
                Ha ocurrido un error al cargar las...
              </p>
            )}
          </div>

          {/* Gráfico de Barras Dinámico (Numero de Reportes vs Tipo) */}
          <div className="p-4 rounded-lg shadow border">
            {isLoadingDynamicData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : dynamicData && dynamicData.length > 0 ? (
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

          {/* Gráfico de Barras Dinámico (Numero de Reportes vs Tipo) */}
          <div className="p-4 rounded-lg shadow border">
            {isLoadingDynamicData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : pieCharData && pieCharData.length > 0 ? (
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

          {/* Gráfico de Torta (Porcentaje de Indice de Riesgo Pre-Mitigacion) */}
          <div
            className="flex flex-col justify-center items-center 
          p-4 rounded-lg shadow border"
          >
            {isLoadingRisk ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : riskData && riskData.length > 0 ? (
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

          {/* Gráfico de Barras Dinámico (Indice de Riesgo Pre-Mitigacion) */}
          <div className="flex-col p-4 rounded-lg shadow border">
            {isLoadingRisk ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : riskData && riskData.length > 0 ? (
              <DynamicBarChart
                height="100%"
                width="100%"
                data={riskData}
                title="Indice de Riesgo Pre-Mitigacion"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>

          {/* Gráfico de Torta (Porcentaje de Indice de Riesgo Post-Mitigacion) */}
          <div className="flex flex-col justify-center items-center p-4 rounded-lg shadow border ">
            {isLoadingPostRisk ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : postRiskData && postRiskData.length > 0 ? (
              <PieChartComponent
                radius={120}
                height="100%"
                width="100%"
                data={postRiskData}
                title="Porcentaje de Indice de Riesgo Post-Mitigacion"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>

          {/* Gráfico de Barras Dinámico (Numero de Reportes vs Localizacion) */}
          <div className="p-4 rounded-lg shadow border">
            {isLoadingAirportLocationData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : airportLocationData && airportLocationData.length > 0 ? (
              <DynamicBarChart
                height="100%"
                width="100%"
                data={airportLocationData}
                title="Numero de Reportes vs Localizacion"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>
        </div>
      </ContentLayout>
    </>
  );
};

export default Statistics;
