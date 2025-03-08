import axiosInstance from "@/lib/axios";
import { DangerIdentificationsByType } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetcDangerIdentificationsCountedByType = async (
  from: string,
  to: string
) => {
  const { data } = await axiosInstance.get(
    `transmandu/danger-identifications/counted-by-type?from=${from}&to=${to}`
  );
  return data;
};

export const useGetDangerIdentificationsCountedByType = (
  from: string,
  to: string
) => {
  return useQuery<DangerIdentificationsByType[]>({
    queryKey: ["danger-identifications/counted-by-type/from=${from}&to=${to}"], // Incluye el ID en la clave de la query
    queryFn: () => fetcDangerIdentificationsCountedByType(from, to), // Pasa el ID a la función fetchUser
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
