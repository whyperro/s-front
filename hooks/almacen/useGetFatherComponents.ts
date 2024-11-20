import axios from '@/lib/axios';
import { ComponentArticle } from '@/types';
import { useMutation } from '@tanstack/react-query';

interface FatherComponent {
  id: number,
  serial: string,
}


const fetchFatherComponents = async (location_id: number): Promise<FatherComponent[]> => {
  const {data} = await axios.post('/hangar74/father-components', { location_id });
  return data;
};

export const useGetFatherComponents = () => {
  return useMutation<FatherComponent[], Error, number>({
    mutationKey: ["father_components"],
    mutationFn: fetchFatherComponents,
  });
};
