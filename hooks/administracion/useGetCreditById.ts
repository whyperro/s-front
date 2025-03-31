"use client"

import type { Credit} from "@/types"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios"

const fetchCreditById = async (id: string): Promise<Credit> => {
  const { data } = await axiosInstance.get(`/transmandu/credits/${id}`)
  return data
}

export const useGetFlightById = (id: string) => {
  return useQuery<Credit>({
    queryKey: ["credits", id],
    queryFn: () => fetchCreditById(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!id, // Solo ejecuta la consulta si hay un ID
  })
}