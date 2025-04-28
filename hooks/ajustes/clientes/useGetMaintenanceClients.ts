import axios from '@/lib/axios';
import { MaintenanceClient } from '@/types';
import { useQuery } from '@tanstack/react-query';


const fetchMaintenanceClient = async (): Promise<MaintenanceClient[]> => {
  const {data} = await axios.get(`/hangar74/clients`);
  return data;
};

export const useGetMaintenanceClients = () => {
  return useQuery<MaintenanceClient[]>({
    queryKey: ["maintenance-clients"],
    queryFn: fetchMaintenanceClient,
  });
};
