"use client"

import type { FlightPayment } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios"

const fetchFlightsPaymentsById = async (id: string): Promise<FlightPayment> => {
  const { data } = await axiosInstance.get(`/transmandu/flights-payments/${id}`)
  return data
}

export const useGetFlightPaymentById = (id: string) => {
  return useQuery<FlightPayment>({
    queryKey: ["flights-payments", id],
    queryFn: () => fetchFlightsPaymentsById(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!id, // Solo ejecuta la consulta si hay un ID
  })
}