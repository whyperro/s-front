import axios from '@/lib/axios';
import { Article } from '@/types';
import { useMutation } from '@tanstack/react-query';

export interface IArticleByBatch {
  id:number,
  article_type: string,
  status: string,
  serial: string,
  description: string,
  zone: string,
  brand: string,
  condition: string,
  weight: number,
  cost: number,
  batches_id: number,
  vendor_id: string,
  part_number: string,
  certificates?: string[],
  image: string,
}

const fetchArticlesByBatch = async (location_id: number, batch: string): Promise<IArticleByBatch[]> => {
  const {data} = await axios.post(`/hangar74/batches/${batch}`, {location_id});
  return data;
};

export const useGetArticlesByBatch = (location_id: number, batch: string) => {
  return useMutation<IArticleByBatch[], Error, number>({
    mutationKey: ["articles"],
    mutationFn: () => fetchArticlesByBatch(location_id, batch),
  });
};
