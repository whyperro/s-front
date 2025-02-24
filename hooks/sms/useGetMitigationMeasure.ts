import axiosInstance from '@/lib/axios';
import { MitigationMeasure } from '@/types';
import { useQuery } from '@tanstack/react-query';



const fetchMitigationMeasure = async (id: string | number) => {
  const {data} = await axiosInstance.get(`transmandu/plan/${id}/measure`);
  return data;
};

export const useGetMitigationMeasure = (id: string | number) => {
  return useQuery<MitigationMeasure[]>({
    // El id pertenece al plan del cual se van a extraer las medidas de mitigacion 
    queryKey: ['mitigation-measures', id], 
    queryFn: () => fetchMitigationMeasure(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
