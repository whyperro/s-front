import axiosInstance from '@/lib/axios';
import { Condition } from '@/types';
import { useQuery } from '@tanstack/react-query';

const fetchConditions = async (): Promise<Condition[]> => {
  const  {data}  = await axiosInstance.get('/hangar74/condition-article');
  return data;
};

export const useGetConditions = () => {
  return useQuery<Condition[]>({
    queryKey: ['conditions'],
    queryFn: fetchConditions,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
