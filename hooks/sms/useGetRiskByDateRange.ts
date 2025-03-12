import axiosInstance from "@/lib/axios";
import { pieChartData } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchRiskCountByDateRange = async (
  from: string,
  to: string
): Promise<pieChartData[]> => {
  const { data } = await axiosInstance.get(
    `/transmandu/sms/voluntary-reports/risk-count-by-date-range?from=${from}&to=${to}`
  );
  console.log("DATA FRON USE GET RISK C OUNT BY DATE RANGE ",data);
  return data;
};

export const useGetRiskCountByDateRange = (from: string, to: string) => {
  return useQuery<pieChartData[]>({
    queryKey: [
      "/transmandu/voluntary-reports/risk-count-by-date-range?from=${from}&to=${to}",
    ],
    queryFn: () => fetchRiskCountByDateRange(from, to),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
