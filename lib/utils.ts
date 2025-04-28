import { type ClassValue, clsx } from "clsx"
import { format, subDays } from "date-fns";
import { twMerge } from "tailwind-merge"
import {es} from "date-fns/locale"

interface Period {
  from: string | Date | undefined
  to: string | Date | undefined
}

import { type ClassValue, clsx } from "clsx";
import { addDays, format, parse, subDays } from "date-fns";
import { twMerge } from "tailwind-merge";
import { es } from "date-fns/locale";

interface Period {
  from: string | Date | undefined;
  to: string | Date | undefined;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-') // Reemplazar espacios con "-"
    .replace(/[^\w-]/g, ''); // Remover caracteres especiales excepto "-"
};

export function formatDateRange(period?: Period) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);
  const locale = es;

  if(!period?.from) {
    return `${format(defaultFrom, "LLL dd", {locale})} - ${format(defaultTo, "LLL dd, y", {locale})}`
  }

  if(period.to) {
    return `${format(period.from, "LLL dd")} - ${format(period.to, "LLL dd, y", {locale})}`
  }

  return format(period.from, "LLL dd, y", {locale});
}



export const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // Reemplazar espacios con "-"
    .replace(/[^\w-]/g, ""); // Remover caracteres especiales excepto "-"
};

export function formatDateRange(period?: Period) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);
  const locale = es;

  if (!period?.from) {
    return `${format(defaultFrom, "LLL dd", { locale })} - ${format(
      defaultTo,
      "LLL dd, y",
      { locale }
    )}`;
  }

  if (period.to) {
    return `${format(period.from, "LLL dd")} - ${format(
      period.to,
      "LLL dd, y",
      { locale }
    )}`;
  }

  return format(period.from, "LLL dd, y", { locale });
}

export function dateFormat(date: string | Date, DateFormat: string) {
  const newDate = addDays(new Date(date), 1);
  return format(newDate, DateFormat, {
    locale: es,
  });
}

export function timeFormat(hour: Date, outPutFormat: string = "HH:mm") {
  const timeString = hour.toString();
  const parsedTime = parse(timeString, "HH:mm:ss", new Date());
  const time = format(parsedTime, outPutFormat);
  return time;
}

export function getResult(index: string) {
  const INTOLERABLE: string[] = ["5A", "5B", "5C", "4A", "4B", "3A"];
  const TOLERABLE: string[] = [
    "5D",
    "5E",
    "4C",
    "4D",
    "4E",
    "3B",
    "3C",
    "3D",
    "2A",
    "2B",
    "2C",
  ];
  const ACCEPTABLE: string[] = ["3E", "2D", "2E", "1A", "1B", "1C", "1D", "1E"];

  if (INTOLERABLE.includes(index)) {
    return "INTOLERABLE";
  } else if (TOLERABLE.includes(index)) {
    return "TOLERABLE";
  } else if (ACCEPTABLE.includes(index)) {
    return "ACEPTABLE";
  }
}

// COLORES PARA LOS GRAFICOS ESTADISTICOS DYNAMIC CHART & PIE CHART COMPONENT
export const COLORS: string[] = [ // Agregamos 'export' aquí
  "#7bcac4",
  "#9e90dd",
  "#ba61f0",
  "#aa94eb",
  "#b685f5",
  "#92b1d8",
  "#98aadd",
  "#9ea2e1",
  "#a49be6",
  "#b685f5",
  "#bc7dfa",
];