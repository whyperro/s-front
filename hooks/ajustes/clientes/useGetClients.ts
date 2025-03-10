import axios from '@/lib/axios';
import { Client } from '@/types';
import { useQuery } from '@tanstack/react-query';


const fetchClients = async (): Promise<Client[]> => {
  //const {data} = await axios.get(`/clients`);
  return [];
};

export const useGetClients = () => {
  return useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });
};
