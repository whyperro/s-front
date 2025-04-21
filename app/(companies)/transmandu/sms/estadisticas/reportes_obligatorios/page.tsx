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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const ObligatoryReportStats = () => {
  const [selectedGraphics, setSelectedGraphics] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const graphicsOptions = [
    {
      id: "identified-vs-managed",
      label: "Identificados vs Gestionados",
      description: "comparación entre el número de informes identificados y el número de informes gestionados",
    },
    {
      id: "by-danger-type",
      label: "Según su Tipo",
      description: "número de informes clasificados por tipo específico",
    },
    {
      id: "by-area",
      label: "Identificados por Área",
      description: "número de informes por cada área específica",
    },
    {
      id: "pre-mitigation-risk",
      label: "Por Índice de Riesgo Pre-Mitigación",
      description: "número de informes clasificados por índice de riesgo antes de cualquier medida de mitigación",
    },
    {
      id: "post-mitigation-risk",
      label: "Por Índice de Riesgo Post-Mitigación",
      description: "número de informes clasificados por índice de riesgo después de aplicar medidas de mitigación",
    },
    {
      id: "by-source-type",
      label: "Por Tipo de Fuente",
      description: "número de informes clasificados por tipo de fuente",
    },
    {
      id: "by-source-name",
      label: "Por Nombre de Fuente",
      description: "número de informes clasificados por nombre de fuente",
    },
  ];

  interface Params {
    from?: string;
    to?: string;
    [key: string]: string | undefined;
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

  // Hook calls for data fetching
  const {
    data: barChartData,
    isLoading: isLoadingBarChart,
    isError: isErrorBarChart,
    refetch: refetchBarChart,
  } = useGetVoluntaryReportingStatsByYear(
    params.from || format(startOfMonth(new Date()), "yyyy-MM-dd"),
    params.to || format(new Date(), "yyyy-MM-dd"),
    "obligatory"
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

  const handleSelectChange = (value: string) => {
    if (!selectedGraphics.includes(value)) {
      setSelectedGraphics([...selectedGraphics, value]);
    }
  };

  const removeGraphic = (id: string) => {
    setSelectedGraphics(selectedGraphics.filter(graphicId => graphicId !== id));
  };

  const renderGraphic = (id: string) => {
    switch (id) {
      case "identified-vs-managed":
        return (
          <div className="flex flex-col justify-center items-center p-4 rounded-lg shadow border">
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
        );
      case "by-danger-type":
        return (
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
                title="Número de Reportes vs Tipo de Peligro"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>
        );
      case "by-area":
        return (
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
                title="Número de Reportes vs Área de Identificación"
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
        );
      case "pre-mitigation-risk":
        return (
          <>
            <div className="flex flex-col justify-center items-center p-4 rounded-lg shadow border">
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
                  title="Porcentaje de Índice de Riesgo Pre-Mitigación"
                />
              ) : (
                <p className="text-lg text-muted-foreground">
                  No hay datos para mostrar.
                </p>
              )}
              {isErrorReportsByRiskData && (
                <p className="text-sm text-muted-foreground">
                  Ha ocurrido un error al cargar el número de reportes por índice
                  de riesgo...
                </p>
              )}
            </div>
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
                  title="Número de Reportes por Cada Índice de Riesgo (Pre-Mitigación)"
                />
              ) : (
                <p className="text-lg text-muted-foreground">
                  No hay datos para mostrar.
                </p>
              )}
            </div>
          </>
        );
      case "post-mitigation-risk":
        return (
          <>
            <div className="flex flex-col justify-center items-center p-4 rounded-lg shadow border">
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
                  title="Porcentaje de Índice de Riesgo (Post-Mitigación)"
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
                  title="Número de Reportes por Cada Índice de Riesgo (Post-Mitigación)"
                />
              ) : (
                <p className="text-lg text-muted-foreground">
                  No hay datos para mostrar.
                </p>
              )}
            </div>
          </>
        );
      case "by-source-type":
        return (
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
                title="Número de Reportes vs Tipo de Fuente"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>
        );
      case "by-source-name":
        return (
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
                title="Número de Reportes Voluntarios vs Nombre de la Fuente"
              />
            ) : (
              <p className="text-lg text-muted-foreground">
                No hay datos para mostrar.
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ContentLayout title="Gráficos Estadísticos de los Reportes">
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex justify-center items-center">
          <div className="flex flex-col w-full max-w-md">
            <Label className="text-lg font-semibold mb-2">
              Seleccionar Rango de Fechas:
            </Label>
            <DataFilter />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Label className="text-lg font-semibold">
            Seleccionar Gráficos a Mostrar:
          </Label>
          <div className="flex flex-col md:flex-row gap-2">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isOpen}
                  className="w-full justify-between"
                >
                  {selectedGraphics.length > 0 ? (
                    <span>{selectedGraphics.length} gráficos seleccionados</span>
                  ) : (
                    "Seleccionar gráficos..."
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Buscar gráficos..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron gráficos</CommandEmpty>
                    <CommandGroup>
                      {graphicsOptions.map((option) => (
                        <CommandItem
                          key={option.id}
                          value={option.id}
                          onSelect={() => {
                            if (!selectedGraphics.includes(option.id)) {
                              setSelectedGraphics([...selectedGraphics, option.id]);
                            } else {
                              setSelectedGraphics(
                                selectedGraphics.filter((id) => id !== option.id)
                              );
                            }
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedGraphics.includes(option.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              onClick={() => setSelectedGraphics([])}
              disabled={selectedGraphics.length === 0}
            >
              Limpiar selección
            </Button>
          </div>
        </div>

        {selectedGraphics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedGraphics.map((graphicId) => {
              const graphic = graphicsOptions.find((g) => g.id === graphicId);
              return (
                <Badge
                  key={graphicId}
                  variant="outline"
                  className="px-3 py-1 text-sm flex items-center gap-2"
                >
                  {graphic?.label}
                  <button
                    onClick={() => removeGraphic(graphicId)}
                    className="rounded-full p-1 hover:bg-gray-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {selectedGraphics.length === 0 ? (
          <div className="col-span-full flex justify-center items-center p-8 border rounded-lg">
            <p className="text-muted-foreground">
              Seleccione al menos un gráfico para visualizar los datos
            </p>
          </div>
        ) : (
          selectedGraphics.map((graphicId) => (
            <div key={graphicId}>{renderGraphic(graphicId)}</div>
          ))
        )}
      </div>
    </ContentLayout>
  );
};

export default ObligatoryReportStats;