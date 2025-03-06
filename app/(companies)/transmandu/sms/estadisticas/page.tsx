"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parseISO, subDays } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { PopoverClose } from "@radix-ui/react-popover";
import { es } from "date-fns/locale";
import { cn, formatDateRange } from "@/lib/utils";
import qs from "query-string";
import { ContentLayout } from "@/components/layout/ContentLayout";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import DataFilter from "@/components/misc/DataFilter";

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

const DateFilter = () => {
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
  return (
    <>
      <ContentLayout title="Gráficos Estadísticos de los Reportes">
        <div>
          <DataFilter />
        </div>
      </ContentLayout>
    </>
  );
};

export default DateFilter;
