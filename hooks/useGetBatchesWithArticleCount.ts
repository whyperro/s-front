import axios from '@/lib/axios';
import { Batch } from '@/types';
import { useMutation } from '@tanstack/react-query';

interface BatchesWithCountProp extends Batch {
  article_count: number,
}
const fetchBatchesWithArticlesCount = async (location_id: number): Promise<BatchesWithCountProp[]> => {
  const {data} = await axios.post('/hangar74/batchesWithArticles', { location_id });
  return data;
};

export const useGetBatchesWithArticlesCount = () => {
  return useMutation<BatchesWithCountProp[], Error, number>({
    mutationKey: ["batches"],
    mutationFn: fetchBatchesWithArticlesCount,
  });
};
