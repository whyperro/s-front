"use client"

import type { Aircraft } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios"

const fetchAircraftById = async (id: string): Promise<Aircraft> => {
  const { data } = await axiosInstance.get(`/transmandu/aircrafts/${id}`)
  return data
}

export const useGetAircraftById = (id: string) => {
  return useQuery<Aircraft>({
    queryKey: ["aircrafts", id],
    queryFn: () => fetchAircraftById(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!id, // Solo ejecuta la consulta si hay un ID
  })
}
