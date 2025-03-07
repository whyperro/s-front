"use client"

import { FlightPayment } from '@/types';
import { useQuery } from '@tanstack/react-query';
import  axiosInstance from "@/lib/axios"

const fetchFlightsPayments = async (): Promise<FlightPayment[]> => {
  const  {data}  = await axiosInstance.get('/transmandu/flights-payments');
  return data;
};

export const useGetFlightsPayments = () => {
  return useQuery<FlightPayment[]>({
    queryKey: ['flights-payments'],
    queryFn: fetchFlightsPayments,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};