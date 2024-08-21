import axios from '@/lib/axios';
import { Location } from '@/types';
import { useMutation } from '@tanstack/react-query';

interface locationsByCompanyId {
  id: number,
  address: string,
  type: string,
  cod_iata:  string,
  isMainBase: boolean,
}[]

const fetchLocationsByCompanyId = async (company_id: number): Promise<locationsByCompanyId[]> => {
  const {data} = await axios.post('/locationsByCompanyId', { company_id });
  return data.companies_location;
};

export const useGetLocationsByCompanyId = () => {
  return useMutation<locationsByCompanyId[], Error, number>({
    mutationFn: fetchLocationsByCompanyId,
  });
};
