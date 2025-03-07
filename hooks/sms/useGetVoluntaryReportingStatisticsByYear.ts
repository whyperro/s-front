import axiosInstance from "@/lib/axios";
import { ReportingStats } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetcVoluntaryReportStatsByYear = async (from: string, to: string) => {
  const { data } = await axiosInstance.get(
    `transmandu/voluntary-reports/stats-by-year?from=${from}&to=${to}`









    
  );
  return data;
};

export const useGetVoluntaryReportingStatsByYear = (from: string, to: string) => {
  return useQuery<ReportingStats>({
    queryKey: ["voluntary-reports/stats-by-year/", from, to], // Incluye el ID en la clave de la query
    queryFn: () => fetcVoluntaryReportStatsByYear(from,to), // Pasa el ID a la función fetchUser
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
