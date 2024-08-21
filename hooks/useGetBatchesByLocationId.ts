import axios from '@/lib/axios';
import { Batch } from '@/types';
import { useMutation } from '@tanstack/react-query';


const fetchBatchesByLocationId = async (location_id: number): Promise<Batch[]> => {
  const {data} = await axios.post('/hangar74/batchesByLocation', { location_id });
  return data;
};

export const useGetBatchesByLocationId = () => {
  return useMutation<Batch[], Error, number>({
    mutationKey: ["batches"],
    mutationFn: fetchBatchesByLocationId,
  });
};
