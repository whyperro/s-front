import axiosInstance from '@/lib/axios';
import { Company, Location } from '@/types';
import { useQuery } from '@tanstack/react-query';

interface LocationByCompany {
  id: number,
  name: string,
  locations: {
    id: number,
    address: string,
    type: string,
  }[],

}

const fetchLocations = async (): Promise<LocationByCompany[]> => {
  const  {data}  = await axiosInstance.get('/companies-by-location');
  const locations = data.companies_location;
  return locations;
};

export const useGetLocations = () => {
  return useQuery<LocationByCompany[]>({
    queryKey: ['location'],
    queryFn: fetchLocations,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
