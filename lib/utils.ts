import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-') // Reemplazar espacios con "-"
    .replace(/[^\w-]/g, ''); // Remover caracteres especiales excepto "-"
};
