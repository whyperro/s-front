import axiosInstance from "@/lib/axios";
import { InformationSource, VoluntaryReport } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchInformationSource = async (): Promise<InformationSource[]> => {
  const { data } = await axiosInstance.get("/transmandu/voluntary-reports");
  return data;
};

export const useGetVoluntaryReports = () => {
  return useQuery<InformationSource[]>({
    queryKey: ["iformation-source"],
    queryFn: fetchInformationSource,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
