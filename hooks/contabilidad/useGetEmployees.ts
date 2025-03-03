import axios from '@/lib/axios';
import { Employee } from '@/types';
import { useMutation } from '@tanstack/react-query';

const fetchEmployeesByCompany = async (company_id: string): Promise<Employee[]> => {
  const {data} = await axios.post('/employees', { company_id });
  return data;
};

export const useGetEmployeesByCompany = () => {
  return useMutation<Employee[], Error, string>({
    mutationFn: fetchEmployeesByCompany,
  });
};
