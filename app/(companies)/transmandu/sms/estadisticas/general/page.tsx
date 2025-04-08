"use client";
import BarChartComponent from "@/components/charts/BarChartComponent";
import PieChartComponent from "@/components/charts/PieChartComponent";
import { ContentLayout } from "@/components/layout/ContentLayout";
import DataFilter from "@/components/misc/DataFilter";
import { Label } from "@/components/ui/label";
import { useGetTotalReportsCountedByArea } from "@/hooks/sms/useGetTotalReportsCountedByArea";
import { useGetTotalDangerIdentificationsCountedByType } from "@/hooks/sms/useGetTotalDangerIdentificationsCountedByType";
import { useGetTotalIdentificationStatsBySourceType } from "@/hooks/sms/useGetTotalIdentificationStatsBySoruceType";
import { useGetTotalReportsStatsByYear } from "@/hooks/sms/useGetTotalReportsStatsByYear";
import { useGetTotalRiskCountByDateRange } from "@/hooks/sms/useGetTotalRiskByDateRange";
import { format, startOfMonth } from "date-fns";
import { Loader2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DynamicBarChart from "../../../../../../components/charts/DynamicBarChart";
import { useGetTotalIdentificationStatsBySourceName } from "@/hooks/sms/useGetTotalIdentificationStatsBySoruceName";
import { useGetTotalPostRiskCountByDateRange } from "@/hooks/sms/useGetTotalPostRiskByDateRange";

const GeneralReportStats = () => {
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
  } = useGetTotalReportsStatsByYear(
    params.from || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to || format(new Date(), "yyyy-MM-dd")
  );

  const {
    data: totalIdentificationData,
    isLoading: isLoadingIdentificationData,
    isError: isErrorIdentificationData,
    refetch: refetchIdentificationData,
  } = useGetTotalDangerIdentificationsCountedByType(
    params.from || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to || format(new Date(), "yyyy-MM-dd")
  );

  const {
    data: reportsByAreaData,
    isLoading: isLoadingReportsByAreaData,
    isError: isErrorReportsByAreaData,
    refetch: refetchReportsByAreaData,
  } = useGetTotalReportsCountedByArea(
    params.from || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to || format(new Date(), "yyyy-MM-dd")
  );

  const {
    data: totalRiskData,
    isLoading: isLoadingTotalRiskData,
    isError: isErrorTotalRiskData,
    refetch: refetchTotalRiskData,
  } = useGetTotalRiskCountByDateRange(
    params.from || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to || format(new Date(), "yyyy-MM-dd")
  );

  const {
    data: reportSourceTypeData,
    isLoading: isLoadingReportSourceTypeData,
    isError: isErrorReportSourceTypeData,
    refetch: refetchReportSourceTypeChart,
  } = useGetTotalIdentificationStatsBySourceType(
    params.from || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to || format(new Date(), "yyyy-MM-dd")
  );

  const {
    data: reportSourceNameData,
    isLoading: isLoadingReportSourceNameData,
    isError: isErrorReportSourceNameData,
    refetch: refetchReportSourceNameChart,
  } = useGetTotalIdentificationStatsBySourceName(
    params.from || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to || format(new Date(), "yyyy-MM-dd")
  );

  const {
    data: totalPostRiskData,
    isLoading: isLoadingTotalPostRiskData,
    isError: isErrorTotalPostRiskData,
    refetch: refetchTotalPostRiskData,
  } = useGetTotalPostRiskCountByDateRange(
    params.from || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to || format(new Date(), "yyyy-MM-dd")
  );

  useEffect(() => {
    refetchBarChart();
    refetchIdentificationData();
    refetchReportsByAreaData();
    refetchTotalRiskData();
    refetchReportSourceTypeChart();
    refetchReportSourceNameChart();
    refetchTotalPostRiskData();
  }, [
    params.from,
    params.to,
    refetchBarChart,
    refetchIdentificationData,
    refetchReportsByAreaData,
    refetchTotalRiskData,
    refetchReportSourceTypeChart,
    refetchReportSourceNameChart,
    refetchTotalPostRiskData,
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
            {isLoadingIdentificationData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : totalIdentificationData &&
              totalIdentificationData.length > 0 ? (
              <DynamicBarChart
                height="70%"
                width="70%"
                data={totalIdentificationData}
                title="Numero de Reportes vs Tipo de Peligro (General)"
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
                title="Numero de Reportes vs Area de Identificación (General)"
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
            {isLoadingTotalRiskData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : totalRiskData && totalRiskData.length > 0 ? (
              <PieChartComponent
                radius={120}
                height="50%"
                width="50%"
                data={totalRiskData}
                title="Porcentaje de Indice de Riesgo Pre-Mitigacion"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
            {isErrorTotalRiskData && (
              <p className="text-sm text-muted-foreground">
                Ha ocurrido un error al cargar el numero de reportes por indice
                de riesgo...
              </p>
            )}
          </div>

          <div className="p-4 rounded-lg shadow border">
            {isLoadingTotalRiskData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : totalRiskData && totalRiskData.length > 0 ? (
              <DynamicBarChart
                height="70%"
                width="70%"
                data={totalRiskData}
                title="Numero de Reportes por Cada Indice de Riesgo (General)"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
            {isErrorTotalRiskData && (
              <p className="text-sm text-muted-foreground">
                Ha ocurrido un error al cargar los peligros identificados...
              </p>
            )}
          </div>

          <div
            className="flex flex-col justify-center items-center 
          p-4 rounded-lg shadow border"
          >
            {isLoadingTotalPostRiskData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : totalPostRiskData && totalPostRiskData.length > 0 ? (
              <PieChartComponent
                radius={120}
                height="50%"
                width="50%"
                data={totalPostRiskData}
                title="Porcentaje de Indice de Riesgo Post-Mitigacion"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
            {isErrorTotalRiskData && (
              <p className="text-sm text-muted-foreground">
                Ha ocurrido un error al cargar el numero de reportes por indice
                de riesgo...
              </p>
            )}
          </div>

          <div className="p-4 rounded-lg shadow border">
            {isLoadingTotalRiskData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : totalRiskData && totalRiskData.length > 0 ? (
              <DynamicBarChart
                height="70%"
                width="70%"
                data={totalRiskData}
                title="Numero de Reportes por Cada Indice de Riesgo  (Post-Mitigacion)"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
            {isErrorTotalRiskData && (
              <p className="text-sm text-muted-foreground">
                Ha ocurrido un error al cargar los peligros identificados...
              </p>
            )}
          </div>

          {/* Gráfico de Barras Dinámico (Indice de Riesgo Pre-Mitigacion) */}
          <div className="flex-col p-4 rounded-lg shadow border">
            {isLoadingTotalPostRiskData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : totalPostRiskData && totalPostRiskData.length > 0 ? (
              <DynamicBarChart
                height="100%"
                width="100%"
                data={totalPostRiskData}
                title="Numero de Reportes por Tipo de Fuente"
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

export default GeneralReportStats;
