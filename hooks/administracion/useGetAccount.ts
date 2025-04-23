import axios from '@/lib/axios';
import { Account } from '@/types';
import { useQuery } from '@tanstack/react-query';

const fetchAccount = async (): Promise<Account[]> => {
  const {data} = await axios.get(`/transmandu/accountants`);
  return data;
};

export const useGetAccount = () => {
  return useQuery<Account[]>({
    queryKey: ["account"],
    queryFn: fetchAccount,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
