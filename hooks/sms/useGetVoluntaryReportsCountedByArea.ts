import axiosInstance from "@/lib/axios";
import { ReportsByArea } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetcVoluntaryReportsCountedByArea = async (from: string, to: string) => {
  const { data } = await axiosInstance.get(
    `transmandu/voluntary-reports/counted-by-area?from=${from}&to=${to}`
  );
  return data;
};

export const useGetVoluntaryReportsCountedByArea= (from: string, to: string) => {
  return useQuery<ReportsByArea[]>({
    queryKey: ["voluntary-reports/counted-by-area/from=${from}&to=${to}"], // Incluye el ID en la clave de la query
    queryFn: () => fetcVoluntaryReportsCountedByArea(from,to), // Pasa el ID a la función fetchUser
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
