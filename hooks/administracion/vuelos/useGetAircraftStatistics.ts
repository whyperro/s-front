import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Flight } from "@/types";

// Definir la estructura de datos que devuelve el endpoint
export interface AircraftStatistics {
    statistics: {
      total_annual: number
      monthly: {
        [yearNumber: string]: {
          [month: string]: number
        }
      }
    }
    flights: {
      [year: string]: {
        [month: string]: Flight[]
      }
    }
}

const fetchFlightsByAircraft = async (aircraftId: string): Promise<AircraftStatistics> => {
  const { data } = await axiosInstance.get(`/transmandu/flights-by-aircraft/${aircraftId}`);
  return data;
};

export const useGetAircraftStatistics = (aircraftId: string) => {
  return useQuery<AircraftStatistics>({
    queryKey: ["flights", aircraftId],
    queryFn: () => fetchFlightsByAircraft(aircraftId),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!aircraftId,
  });
};