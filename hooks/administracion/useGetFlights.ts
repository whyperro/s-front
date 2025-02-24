"use client"

import { Flights } from '@/types';
import { useQuery } from '@tanstack/react-query';
import  axiosInstance from "@/lib/axios"

const fetchFlights = async (): Promise<Flights[]> => {
  const  {data}  = await axiosInstance.get('/transmandu/flights');
  return data;
};

export const useGetFlights = () => {
  return useQuery<Flights[]>({
    queryKey: ['Flights'],
    queryFn: fetchFlights,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};