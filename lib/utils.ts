import { type ClassValue, clsx } from "clsx"
import { format, subDays, Locale } from "date-fns";
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

// export function formatDateRange(period?: Period) {
//   const defaultTo = new Date();
//   const defaultFrom = subDays(defaultTo, 30);
//   const locale = es;// 

//   if(!period?.from) {
//     return `${format(defaultFrom, "LLL dd", {locale})} - ${format(defaultTo, "LLL dd, y", {locale})}`
//   }// 

//   if(period.to) {
//     return `${format(period.from, "LLL dd")} - ${format(period.to, "LLL dd, y", {locale})}`
//   }// 

//   return format(period.from, "LLL dd, y", {locale});
// }

export const formatDateRange = (
  period: { from?: Date | null; to?: Date | null },
  locale?: Locale
): string => {
  // Verificar si `period.from` es una fecha válida
  if (!period.from || !(period.from instanceof Date) || isNaN(period.from.getTime())) {
    return "Invalid date";
  }

  // Si `period.to` no está definido o no es una fecha válida, solo formatea `period.from`
  if (!period.to || !(period.to instanceof Date) || isNaN(period.to.getTime())) {
    return format(period.from, "LLL dd, y", { locale });
  }

  // Si ambas fechas son válidas, formatea el rango
  return `${format(period.from, "LLL dd", { locale })} - ${format(period.to, "LLL dd, y", { locale })}`;
};//ESTO ES NUEVO lo que esta en comentarios era viejo... las fechas se muestran decrementadas un numero en el dia 