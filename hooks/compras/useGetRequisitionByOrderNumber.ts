import axios from '@/lib/axios';
import { Convertion, User } from '@/types';
import { useQuery } from '@tanstack/react-query';

interface Requisition {
  id: number,
  status: string,
  created_by: User,
  requested_by: User,
  received_by: string,
  justification: string,
  arrival_date: Date,
  submitted_date: Date,
  batch: {
    id: number,
    name: string,
    batch_articles: {
      article_part_number: string,
      unit?: Convertion,
      quantity: number,
    }[]
  }[]
}[]


const fetchRequisitionByOrderNumber = async (company: string | null, order_number: string): Promise<Requisition> => {
  const {data} = await axios.get(`/show-requisition-order/${company}/${order_number}`);
  return data[0];
};

export const useGetRequisitionByOrderNumber = (company: string | null, order_number: string) => {
  return useQuery<Requisition, Error>({
    queryKey: ["batches"],
    queryFn: () => fetchRequisitionByOrderNumber(company, order_number),
    enabled: !!company && !!order_number,
  });
};
