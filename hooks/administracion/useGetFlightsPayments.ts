"use client"

import { FlightPayment } from '@/types';
import { useQuery } from '@tanstack/react-query';
import  axiosInstance from "@/lib/axios"
import { useSearchParams } from 'next/navigation';

export const useGetFlightsPayments = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  return useQuery<FlightPayment[], Error>({
    queryKey: ["flights-payments", from, to],
    queryFn: async () => {
      const  {data}  = await axiosInstance.get('/transmandu/flights-payments', {
      params: {
        from,
        to,
      },
    });
    return data;
  },
  refetchOnWindowFocus: false,
  });
};