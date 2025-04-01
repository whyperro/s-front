import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Flight } from "@/types";

const fetchFlightsByAircraft = async (aircraftId: string): Promise<Flight[]> => {
  const { data } = await axiosInstance.get(`/transmandu/flights-by-aircraft/${aircraftId}`);
  return data;
};

export const useGetFlightsByAircraft = (aircraftId: string) => {
  return useQuery<Flight[]>({
    queryKey: ["flights", aircraftId],
    queryFn: () => fetchFlightsByAircraft(aircraftId),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!aircraftId, // Solo ejecuta la consulta si hay un ID
  });
};