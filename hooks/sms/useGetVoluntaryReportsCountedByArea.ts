import axiosInstance from "@/lib/axios";
import { ReportsByArea } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetcVoluntaryReportsCountedByArea = async (year: string) => {
  const { data } = await axiosInstance.get(
    `transmandu/voluntary-reports/counted-by-area/${year}`
  );
  return data;
};

export const useGetVoluntaryReportsCountedByArea= (year: string) => {
  return useQuery<ReportsByArea[]>({
    queryKey: ["voluntary-reports/counted-by-area/", year], // Incluye el ID en la clave de la query
    queryFn: () => fetcVoluntaryReportsCountedByArea(year), // Pasa el ID a la función fetchUser
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
