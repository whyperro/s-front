"use client"

import { Aircraft } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

const fetchAircrafts = async (): Promise<Aircraft[]> => {
  const  {data}  = await axiosInstance.get('/transmandu/aircrafts/transmandu');
  return data;
};

export const useGetAircrafts = () => {
  return useQuery<Aircraft[]>({
    queryKey: ['Aircrafts'],
    queryFn: fetchAircrafts,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};