import axios from '@/lib/axios';
import { Aircraft } from '@/types';
import { useQuery } from '@tanstack/react-query';

const fetchAircrafts = async (): Promise<Aircraft[]> => {
  const {data} = await axios.get('/hangar74/aircrafts');
  return data;
};

export const useGetAircrafts = () => {
  return useQuery<Aircraft[], Error>({
    queryKey: ["aircrafts"],
    queryFn: fetchAircrafts,
  });
};
