import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import axiosInstance from '@/lib/axios';
import { User } from '@/types/user';



const fetchUser = async (id: string) => {
  const response = await axiosInstance.get(`/users/${id}`);
  const data = response.data.data;
  return data;
};

export const useGetUserById = (id: string) => {
  return useQuery<User>({
    queryKey: ['user', id], // Incluye el ID en la clave de la query
    queryFn: () => fetchUser(id), // Pasa el ID a la función fetchUser
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
