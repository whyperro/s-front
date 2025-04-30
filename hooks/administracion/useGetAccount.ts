import axios from '@/lib/axios';
import { Accountant } from '@/types';
import { useQuery } from '@tanstack/react-query';

const fetchAccount = async (): Promise<Accountant[]> => {
  const {data} = await axios.get(`/transmandu/accountants`);
  return data;
};

export const useGetAccount = () => {
  return useQuery<Accountant[]>({
    queryKey: ["account"],
    queryFn: fetchAccount,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
