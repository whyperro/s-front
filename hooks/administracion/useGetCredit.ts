"use client"

import { Credit } from '@/types';
import { useQuery } from '@tanstack/react-query';
import  axiosInstance from "@/lib/axios"

const fetchCredit = async (): Promise<Credit[]> => {
  const  {data}  = await axiosInstance.get('/transmandu/credits');
  return data;
};

export const useGetCredit = () => {
  return useQuery<Credit[]>({
    queryKey: ['credit'],
    queryFn: fetchCredit,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};