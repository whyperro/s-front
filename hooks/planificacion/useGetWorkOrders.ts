import axios from '@/lib/axios';
import { WorkOrder } from '@/types';
import { useMutation } from '@tanstack/react-query';

const fetchWorkOrders = async (location_id: number): Promise<WorkOrder[]> => {
  const {data} = await axios.post('/hangar74/all-work-orders', { location_id });
  return data;
};

export const useGetWorkOrders = () => {
  return useMutation<WorkOrder[], Error, number>({
    mutationKey: ["work-orders"],
    mutationFn: fetchWorkOrders,
  });
};
