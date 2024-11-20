import axios from '@/lib/axios';
import { Article, Batch, DispatchRequest } from '@/types';
import { useMutation } from '@tanstack/react-query';

const fetchDispatchesRequests = async (location_id: number): Promise<DispatchRequest[]> => {
  const {data} = await axios.post('/hangar74/show-dispatch', { location_id });
  return data;
};

export const useGetDispatchesByLocation = () => {
  return useMutation<DispatchRequest[], Error, number>({
    mutationKey: ["dispatches-requests"],
    mutationFn: fetchDispatchesRequests,
  });
};
