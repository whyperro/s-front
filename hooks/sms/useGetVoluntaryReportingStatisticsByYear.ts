import axiosInstance from "@/lib/axios";
import { ReportingStats } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetcVoluntaryReportStatsByYear = async (year: string) => {
  const { data } = await axiosInstance.get(
    `transmandu/voluntary-reports/stats-by-year/${year}`
  );
  return data;
};

export const useGetVoluntaryReportingStatsById = (year: string) => {
  return useQuery<ReportingStats>({
    queryKey: ["voluntary-reports/stats-by-year/", year], // Incluye el ID en la clave de la query
    queryFn: () => fetcVoluntaryReportStatsByYear(year), // Pasa el ID a la función fetchUser
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
