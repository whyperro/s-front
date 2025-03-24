"use client";
import BarChartComponent from "@/components/charts/BarChartComponent";
import DynamicBarChart from "@/components/charts/DynamicBarChart";
import { ContentLayout } from "@/components/layout/ContentLayout";
import DoubleDateFilter from "@/components/misc/DoubleDateFilter";
import { Label } from "@/components/ui/label";
import { useGetObligatoryReportAverage } from "@/hooks/sms/useGetObligatoryReportAverage";
import { useGetTotalReportsStatsByYear } from "@/hooks/sms/useGetTotalReportsStatsByYear";
import { pieChartData } from "@/types";
import { format, startOfMonth, endOfMonth, subMonths, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ObligatoryReportIndicators = () => {
  const currentDate = new Date();
  // Obtener la fecha del mes anterior
  const previousMonth = subMonths(currentDate, 1);

  // Obtener la fecha de inicio del mes anterior
  const startDate = startOfMonth(previousMonth);

  // Obtener la fecha de fin del mes anterior
  const endDate = endOfMonth(previousMonth);

  // Formatear las fechas
  const formattedStartDate = format(startDate, "yyyy-MM-dd");
  const formattedEndDate = format(endDate, "yyyy-MM-dd");

  interface Params {
    from_first?: string; // Fecha de inicio del primer rango
    to_first?: string; // Fecha de fin del primer rango
    from_second?: string; // Fecha de inicio del segundo rango
    to_second?: string; // Fecha de fin del segundo rango
    [key: string]: string | undefined; // Permite otros parámetros
  }

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [params, setParams] = useState<Params>({
    from_first: format(startOfMonth(new Date()), "yyyy-MM-dd"),
    to_first: format(new Date(), "yyyy-MM-dd"),
    from_second: format(startOfMonth(new Date()), "yyyy-MM-dd"),
    to_second: format(new Date(), "yyyy-MM-dd"),
  });

  useEffect(() => {
    const defaultFrom = format(startOfMonth(new Date()), "yyyy-MM-dd");
    const defaultTo = format(new Date(), "yyyy-MM-dd");

    const newParams: Params = {};
    searchParams.forEach((value, key) => {
      newParams[key] = value;
    });

    const finalParams: Params = {
      from_first: newParams.from_first || defaultFrom,
      to_first: newParams.to_first || defaultTo,
      from_second: newParams.from_second || defaultFrom,
      to_second: newParams.to_second || defaultTo,
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
    params.from_first || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to_first || format(new Date(), "yyyy-MM-dd")
  );

  const {
    data: obligatoryAverageData,
    isLoading: isLoadingObligatoryAverageData,
    isError: isErrorObligatoryAverageData,
    refetch: refetchObligatoryAverageData,
  } = useGetObligatoryReportAverage(
    params.from_first || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to_first || format(new Date(), "yyyy-MM-dd"),
    params.from_second || formattedStartDate,
    params.to_second || formattedEndDate
  );

  const [resultArrayData, setResultArrayData] = useState<pieChartData[]>([]);
  const [result, setResult] = useState<number>();

  function formatDate(date: string) {
    const newDate  = addDays(new Date(date), 1);
    console.log("THIS IS THE DAAAAAAAAY",newDate);
    return format(newDate, "PPP", {
      locale: es,
    });
  }

  useEffect(() => {
    refetchBarChart();
    refetchObligatoryAverageData();
    if (barChartData && obligatoryAverageData) {
      setResultArrayData([
        {
          name: `${formatDate(params.from_first || "")} - ${formatDate(
            params.to_first || ""
          )}`,
          value: obligatoryAverageData.first_range.average_per_month,
        },
        {
          name: `${formatDate(params.from_second || "")} - ${formatDate(
            params.to_second || ""
          )}`,
          value: obligatoryAverageData.second_range.average_per_month,
        },
      ]);
    } else {
      setResultArrayData([]);
    }
    console.log(
      params.from_first,
      params.to_first,
      params.from_second,
      params.to_second,
      "FROMS"
    );
  }, [
    params.from_first,
    params.to_first,
    params.from_second,
    params.to_second,
    barChartData,
  ]); // Agregado barChartData como dependencia

  return (
    <>
      <ContentLayout title="Gráficos Estadísticos de los Reportes">
        <div className="flex justify-center items-center mb-4">
          <div className="flex flex-col w-full">
            <Label className="text-lg font-semibold text-center">
              Seleccionar Rango de Fechas :
            </Label>
            <DoubleDateFilter />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {/* Gráfico de Barras (Peligros Identificados) */}
          <div className=" flex flex-col justify-center items-center p-4 rounded-lg shadow border">
            {isLoadingObligatoryAverageData ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="size-24 animate-spin" />
              </div>
            ) : obligatoryAverageData ? (
              params.from_first &&
              params.to_first &&
              resultArrayData && (
                <DynamicBarChart
                  height="100%"
                  width="100%"
                  data={resultArrayData}
                  title="Promedio de Reportes Obligatorios"
                />
              )
            ) : (
              <p className="text-sm text-muted-foreground">
                Ha ocurrido un error al cargar los datos de Peligros
                Identificados vs Gestionados...
              </p>
            )}
          </div>
        </div>
      </ContentLayout>
    </>
  );
};

export default ObligatoryReportIndicators;
