import axios from '@/lib/axios';
import { Article } from '@/types';
import { useQuery } from '@tanstack/react-query';

interface IArticleInTransit extends Article{
  name: string,
}

const fetchInTransitArticles = async (location_id: string | null): Promise<IArticleInTransit[]> => {
  const {data} = await axios.get(`/hangar74/articles-in-transit/${location_id}`);
  return data;
};

export const useGetInTransitArticles = (location_id: string | null) => {
  return useQuery<IArticleInTransit[], Error>({
    queryKey: ["in-transit-articles"],
    queryFn: () => fetchInTransitArticles(location_id),
    enabled: !!location_id
  });
};
