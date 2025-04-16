"use client";
import BarChartComponent from "@/components/charts/BarChartComponent";
import { ContentLayout } from "@/components/layout/ContentLayout";
import DataFilter from "@/components/misc/DataFilter";
import { Label } from "@/components/ui/label";
import { useGetDangerIdentificationsCountedByType } from "@/hooks/sms/useGetDangerIdentificationsCountedByType";
import { useGetVoluntaryReportingStatsByYear } from "@/hooks/sms/useGetVoluntaryReportingStatisticsByYear";
import { useGetReportsCountedByArea } from "@/hooks/sms/useGetReportsCountedByArea";
import { format, startOfMonth } from "date-fns";
import { Loader2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetRiskCountByDateRange } from "@/hooks/sms/useGetRiskByDateRange";
import PieChartComponent from "@/components/charts/PieChartComponent";
import { useGetPostRiskCountByDateRange } from "@/hooks/sms/useGetPostRiskByDateRange";
import { useGetIdentificationStatsBySourceName } from "@/hooks/sms/useGetIdentificationStatsBySoruceName";
import { useGetIdentificationStatsBySourceType } from "@/hooks/sms/useGetIdentificationStatsBySoruceType";
import DynamicBarChart from "@/components/charts/DynamicBarChart";
import { useGetTotalReportsStatsByYear } from "@/hooks/sms/useGetTotalReportsStatsByYear";

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

const ObligatoryReportStats = () => {
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

  const [params, setParams] = useState<Params>({
    from: format(startOfMonth(new Date()), "yyyy-MM-dd"),
    to: format(new Date(), "yyyy-MM-dd"),
  });

  useEffect(() => {
    const defaultFrom = format(startOfMonth(new Date()), "yyyy-MM-dd");
    const defaultTo = format(new Date(), "yyyy-MM-dd");

    const newParams: Params = {};
    searchParams.forEach((value, key) => {
      newParams[key] = value;
    });

    const finalParams: Params = {
      from: newParams.from || defaultFrom,
      to: newParams.to || defaultTo,
    };
    setParams(finalParams);
  }, [searchParams, pathname]);

  // Para extraer las estadisticas de reportes dado unos rangos de fecha, desde hasta
  const {
    data: barChartData,
    isLoading: isLoadingBarChart,
    isError: isErrorBarChart,
    refetch: refetchBarChart,
  } = useGetVoluntaryReportingStatsByYear(
    params.from || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to || format(new Date(), "yyyy-MM-dd"),"obligatory"
  );

  const {
    data: reportsByTypeData,
    isLoading: isLoadingReportsByTypeData,
    isError: isErrorReportsByTypeData,
    refetch: refetchReportsByTypeData,
  } = useGetDangerIdentificationsCountedByType(
    params.from || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to || format(new Date(), "yyyy-MM-dd"),
    "obligatory"
  );

  const {
    data: reportsByAreaData,
    isLoading: isLoadingReportsByAreaData,
    isError: isErrorReportsByAreaData,
    refetch: refetchReportsByAreaData,
  } = useGetReportsCountedByArea(
    params.from || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to || format(new Date(), "yyyy-MM-dd"),
    "obligatory"
  );

  const {
    data: reportsByRiskData,
    isLoading: isLoadingReportsByRiskData,
    isError: isErrorReportsByRiskData,
    refetch: refetchReportsByRiskData,
  } = useGetRiskCountByDateRange(
    params.from || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to || format(new Date(), "yyyy-MM-dd"),
    "obligatory"
  );

  const {
    data: reportsByPostRiskData,
    isLoading: isLoadingReportsByPostRiskData,
    isError: isErrorReportsByPostRiskData,
    refetch: refetchReportsByPostRiskData,
  } = useGetPostRiskCountByDateRange(
    params.from || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to || format(new Date(), "yyyy-MM-dd"),
    "obligatory"
  );

  const {
    data: reportSourceNameData,
    isLoading: isLoadingReportSourceNameData,
    isError: isErrorReportSourceNameData,
    refetch: refetchReportSourceNameChart,
  } = useGetIdentificationStatsBySourceName(
    params.from || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to || format(new Date(), "yyyy-MM-dd"),
    "obligatory"
  );

  const {
    data: reportSourceTypeData,
    isLoading: isLoadingReportSourceTypeData,
    isError: isErrorReportSourceTypeData,
    refetch: refetchReportSourceTypeChart,
  } = useGetIdentificationStatsBySourceType(
    params.from || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to || format(new Date(), "yyyy-MM-dd"),
    "obligatory"
  );

  useEffect(() => {
    refetchBarChart();
    refetchReportsByTypeData();
    refetchReportsByAreaData();
    refetchReportsByRiskData();
    refetchReportsByPostRiskData();
    refetchReportSourceNameChart();
    refetchReportSourceTypeChart();
  }, [
    params.from,
    params.to,
    refetchBarChart,
    refetchReportsByTypeData,
    refetchReportsByAreaData,
    refetchReportsByRiskData,
    refetchReportsByPostRiskData,
    refetchReportSourceNameChart,
    refetchReportSourceTypeChart,
  ]);

  return (
    <>
      <ContentLayout title="Gráficos Estadísticos de los Reportes">
        <div className="flex justify-center items-center mb-4">
          <div className="flex flex-col">
            <Label className="text-lg font-semibold">
              Seleccionar Rango de Fechas :
            </Label>
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
                  title="Peligros Identificados vs Gestionados"
                />
              )
            ) : (
              <p className="text-sm text-muted-foreground">
                Ha ocurrido un error al cargar los datos de Peligros
                Identificados vs Gestionados...
              </p>
            )}
          </div>

          <div className="p-4 rounded-lg shadow border">
            {isLoadingReportsByTypeData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : reportsByTypeData && reportsByTypeData.length > 0 ? (
              <DynamicBarChart
                height="70%"
                width="70%"
                data={reportsByTypeData}
                title="Numero de Reportes vs Tipo de Peligro"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>

          <div className="p-4 rounded-lg shadow border">
            {isLoadingReportsByAreaData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : reportsByAreaData && reportsByAreaData.length > 0 ? (
              <DynamicBarChart
                height="70%"
                width="70%"
                data={reportsByAreaData}
                title="Numero de Reportes vs Area de Identificación"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
            {isErrorReportsByAreaData && (
              <p className="text-sm text-muted-foreground">
                Ha ocurrido un error al cargar los peligros identificados...
              </p>
            )}
          </div>

          <div
            className="flex flex-col justify-center items-center 
          p-4 rounded-lg shadow border"
          >
            {isLoadingReportsByRiskData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : reportsByRiskData && reportsByRiskData.length > 0 ? (
              <PieChartComponent
                radius={120}
                height="50%"
                width="50%"
                data={reportsByRiskData}
                title="Porcentaje de Indice de Riesgo Pre-Mitigacion"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
            {isErrorReportsByRiskData && (
              <p className="text-sm text-muted-foreground">
                Ha ocurrido un error al cargar el numero de reportes por indice
                de riesgo...
              </p>
            )}
          </div>

          {/* Gráfico de Barras Dinámico (Indice de Riesgo Pre-Mitigacion) */}
          <div className="flex-col p-4 rounded-lg shadow border">
            {isLoadingReportsByRiskData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : reportsByRiskData && reportsByRiskData.length > 0 ? (
              <DynamicBarChart
                height="100%"
                width="100%"
                data={reportsByRiskData}
                title="Numero de Reportes por Cada Indice de Riesgo (Pre-Mitigacion)"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>

          <div className="flex flex-col justify-center items-center p-4 rounded-lg shadow border ">
            {isLoadingReportsByPostRiskData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : reportsByPostRiskData && reportsByPostRiskData.length > 0 ? (
              <PieChartComponent
                radius={120}
                height="100%"
                width="100%"
                data={reportsByPostRiskData}
                title="Porcentaje de Indice de Riesgo (Post-Mitigacion)"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>
          <div className="flex-col p-4 rounded-lg shadow border">
            {isLoadingReportsByPostRiskData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : reportsByPostRiskData && reportsByPostRiskData.length > 0 ? (
              <DynamicBarChart
                height="100%"
                width="100%"
                data={reportsByPostRiskData}
                title="Numero de Reportes por Cada Indice de Riesgo (Post-Mitigacion)"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>
          {/* Gráfico de Barras Dinámico (Indice de Riesgo Pre-Mitigacion) */}
          <div className="flex-col p-4 rounded-lg shadow border">
            {isLoadingReportSourceTypeData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : reportSourceTypeData && reportSourceTypeData.length > 0 ? (
              <DynamicBarChart
                height="100%"
                width="100%"
                data={reportSourceTypeData}
                title="Numero de Reportes vs Tipo de Fuente"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>

          {/* Gráfico de Barras Dinámico (Indice de Riesgo Pre-Mitigacion) */}
          <div className="flex-col p-4 rounded-lg shadow border">
            {isLoadingReportSourceNameData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : reportSourceNameData && reportSourceNameData.length > 0 ? (
              <DynamicBarChart
                height="100%"
                width="100%"
                data={reportSourceNameData}
                title="Numero de Reportes Voluntarios vs Nombre de la Fuente"
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

export default ObligatoryReportStats;
