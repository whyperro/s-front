import axios from '@/lib/axios';
import { Vendor } from '@/types';
import { useQuery } from '@tanstack/react-query';


const fetchVendors = async (): Promise<Vendor[]> => {
  const {data} = await axios.get(`/hangar74/vendors`);
  return data;
};

export const useGetVendors = () => {
  return useQuery<Vendor[]>({
    queryKey: ["vendors"],
    queryFn: fetchVendors,
  });
};
