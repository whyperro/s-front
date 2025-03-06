import axiosInstance from "@/lib/axios";
import { VoluntaryReport } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchVoluntaryReportsByDateRange = async (): Promise<VoluntaryReport[]> => {
  const { data } = await axiosInstance.get("/transmandu/voluntary-reports");
  return data;
};

export const useGetVoluntaryReportsByDateRange = () => {
  return useQuery<VoluntaryReport[]>({
    queryKey: ["voluntary-reports/date-range/from=${from}&to=${to}"],
    queryFn: fetchVoluntaryReportsByDateRange,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
