import { type ClassValue, clsx } from "clsx"
import { format, subDays } from "date-fns";
import { twMerge } from "tailwind-merge"
import {es} from "date-fns/locale"

interface Period {
  from: string | Date | undefined
  to: string | Date | undefined
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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


