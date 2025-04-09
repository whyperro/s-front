import axiosInstance from "@/lib/axios";
import { ActivityReport } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchUserActivity = async (id: string): Promise<ActivityReport> => {
  const { data } = await axiosInstance.get(`/transmandu/activity-report/${id}`);
  return data[0];
};

export const useGetUserActivity = (id: string) => {
  return useQuery<ActivityReport>({
    queryKey: ["user-activity", id], // Clave única por ID
    queryFn: () => fetchUserActivity(id),
    enabled: !!id,
    refetchOnMount: true, // Fuerza recarga al montar el componente
    refetchOnWindowFocus: false, // Opcional: evita recarga al cambiar de pestaña
    staleTime: 0, // Los datos son inmediatamente obsoletos
    retry: 1, // Número de reintentos
    retryDelay: 1000, // 1 segundo entre reintentos
  });
};