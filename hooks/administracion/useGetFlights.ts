"use client"

import { Flight } from '@/types';
import { useQuery } from '@tanstack/react-query';
import  axiosInstance from "@/lib/axios"

const fetchFlights = async (): Promise<Flight[]> => {
  const  {data}  = await axiosInstance.get('/transmandu/flights');
  return data;
};

export const useGetFlights = () => {
  return useQuery<Flight[]>({
    queryKey: ['flights'],
    queryFn: fetchFlights,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};