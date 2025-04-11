import axiosInstance from "@/lib/axios";
import { User, VoluntaryReport } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetcVoluntaryReportById = async (id: string | number) => {
  const { data } = await axiosInstance.get(
    `transmandu/sms/voluntary-reports/${id}`
  );
  return data;
};

export const useGetVoluntaryReportById = (id: string | number) => {
  return useQuery<VoluntaryReport>({
    queryKey: ["voluntary-report", id], // Incluye el ID en la clave de la query
    queryFn: () => fetcVoluntaryReportById(id), // Pasa el ID a la función fetchUser
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
