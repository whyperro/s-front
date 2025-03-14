"use client";
import BarChartComponent from "@/components/charts/BarChartComponent";
import PieChartComponent from "@/components/charts/PieChartComponent";
import { ContentLayout } from "@/components/layout/ContentLayout";
import DataFilter from "@/components/misc/DataFilter";
import { useGetDangerIdentificationsCountedByType } from "@/hooks/sms/useGetDangerIdentificationsCountedByType";
import { useGetVoluntaryReportingStatsByYear } from "@/hooks/sms/useGetVoluntaryReportingStatisticsByYear";
import { useGetVoluntaryReportsCountedByArea } from "@/hooks/sms/useGetVoluntaryReportsCountedByArea";
import { Loader2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DynamicBarChart from "../../../../../components/charts/DynamicBarChart";
import HorizontalForm from "@/components/forms/HorizontalForm";
import { FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useGetRiskCountByDateRange } from "@/hooks/sms/useGetRiskByDateRange";
import { useGetPostRiskCountByDateRange } from "@/hooks/sms/useGetPostRiskByDateRange";
import { useGetVoluntaryReportsCountedByAirportLocation } from "@/hooks/sms/useGetVoluntaryReportsCountedByAirportLocation";

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

    console.log("Valor de from:", fromValue);
    console.log("Valor de to:", toValue);

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
  }, [
    params.from,
    params.to,
    refetchBarChart,
    refetchPieChart,
    refetchDynamicChart,
    refetchRisk,
    refetchPostRisk,
    refetchAirportLocationData,
  ]);

  return (
    <>
      <ContentLayout title="Gráficos Estadísticos de los Reportes">
        <div className="flex justify-center items-center">
          <div className="flex flex-col">
            <Label className=" text-lg font-semibold">Seleccionar Fecha:</Label>
            <DataFilter />
          </div>
        </div>

        <div className="flex-col justify-center items-center gpa-2">
          {isLoadingBarChart && (
            <div className="flex w-full h-full justify-center items-center">
              <Loader2 className="size-24 animate-spin mt-48" />
            </div>
          )}

          {barChartData && (
            <BarChartComponent
              data={barChartData}
              title="Peligros Identificados"
            />
          )}

          {isErrorBarChart && (
            <p className="text-sm text-muted-foreground">
              Ha ocurrido un error al cargar las...
            </p>
          )}
        </div>

        <div className="flex-col justify-center items-center gpa-2">
          {isLoadingDynamicData && (
            <div className="flex w-full h-full justify-center items-center">
              <Loader2 className="size-24 animate-spin mt-48" />
            </div>
          )}
          {dynamicData && dynamicData.length > 0 ? (
            <DynamicBarChart
              data={dynamicData}
              title="Numero de Reportes vs Tipo"
            />
          ) : (
            <p className="text-lg text-muted-foreground">
              No hay datos para mostrar.
            </p>
          )}
        </div>

        <div className="flex justify-center items-center gpa-2">
          <div>
            {isLoadingRisk && (
              <div className="flex w-full h-full justify-center items-center">
                <Loader2 className="size-24 animate-spin mt-48" />
              </div>
            )}
            {riskData && riskData.length > 0 ? (
              <PieChartComponent
                data={riskData}
                title="Porcentaje de Indice de Riesgo Post Mitigacion"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>

          <div>
            {isLoadingPostRisk && (
              <div className="flex w-full h-full justify-center items-center">
                <Loader2 className="size-24 animate-spin mt-48" />
              </div>
            )}
            {postRiskData && postRiskData.length > 0 ? (
              <PieChartComponent data={postRiskData} />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>
        </div>

        <div className="flex-col justify-center items-center gpa-2">
          {isLoadingPostRisk && (
            <div className="flex w-full h-full justify-center items-center">
              <Loader2 className="size-24 animate-spin mt-48" />
            </div>
          )}
          {postRiskData && postRiskData.length > 0 ? (
            <PieChartComponent data={postRiskData} />
          ) : (
            <p className="text-lg text-muted-foreground">
              No hay datos para mostrar.
            </p>
          )}
        </div>

        <div className="flex-col justify-center items-center gpa-2">
          {isLoadingAirportLocationData && (
            <div className="flex w-full h-full justify-center items-center">
              <Loader2 className="size-24 animate-spin mt-48" />
            </div>
          )}
          {airportLocationData && airportLocationData.length > 0 ? (
            <DynamicBarChart
              data={airportLocationData}
              title="Numero de Reportes vs Localizacion"
            />
          ) : (
            <p className="text-lg text-muted-foreground">
              No hay datos para mostrar.
            </p>
          )}
        </div>
      </ContentLayout>
    </>
  );
};

export default Statistics;
