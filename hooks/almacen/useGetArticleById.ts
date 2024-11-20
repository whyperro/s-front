import axios from '@/lib/axios';
import { Article, Batch, ComponentArticle, ConsumableArticle } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
interface EditingArticle extends Article {
  batches: Batch,
  tool?: {
    id: number,
    serial: string,
    isSpecial: boolean,
    article_id: number,
  },
  component?: {
    serial: string,
    hard_time: {
      hour_date: string,
      cycle_date: string,
      calendary_date: string,
    },
    shell_time: {
      caducate_date: string,
      fabrication_date: string,
    }
  },
}
const fetchArticleById = async (id: string): Promise<EditingArticle> => {
  const {data} = await axios.get(`/hangar74/article/${id}`);
  return data;
};

export const useGetArticleById = (id: string) => {
  return useQuery<EditingArticle>({
    queryKey: ["article"],
    queryFn: () => fetchArticleById(id),
  });
};
