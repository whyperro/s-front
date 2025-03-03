"use client"

import { CashMovement } from '@/types';
import { useQuery } from '@tanstack/react-query';
import  axiosInstance from "@/lib/axios"

const fetchCashMovement = async (): Promise<CashMovement[]> => {
  const  {data}  = await axiosInstance.get('/transmandu/cash-movements');
  return data;
};

export const useGetCashMovements = () => {
  return useQuery<CashMovement[]>({
    queryKey: ['cash-movements'],
    queryFn: fetchCashMovement,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};