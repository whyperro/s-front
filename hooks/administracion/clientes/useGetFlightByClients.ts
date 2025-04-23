import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Flight } from "@/types";

// Definir la estructura de datos que devuelve el endpoint
export interface ClientStatistics {
    statistics: {
        total_payed_annual: {
          [year: number]: number;
        };
        annual_amount: {
          [year: number]: number;
        };
        annual_debt: {
          [year: number]: number;
        };
        monthly_amount: {
          [year: number]: {
            [month: string]: number;
          };
        };
        monthly_payed: {
          [year: number]: {
            [month: string]: number;
          };
        };
        total_flights: {
          [year: number]: number;
        };
      };
    flights: {
      [year: number]: {
        [month: string]: Flight[]
      }
    }
}

const fetchFlightsByClient = async (clientId: string): Promise<ClientStatistics> => {
  const { data } = await axiosInstance.get(`/transmandu/clients/${clientId}/flights`);
  return data;
};

export const useGetFlightsByClient = (clientId: string) => {
  return useQuery<ClientStatistics>({
    queryKey: ["flights", clientId],
    queryFn: () => fetchFlightsByClient(clientId),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!clientId,
  });
};