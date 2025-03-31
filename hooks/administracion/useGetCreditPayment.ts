"use client"

import type { CreditPayment } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios"
import { useSearchParams } from 'next/navigation';

export const useGetCreditPaymentById = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  return useQuery<CreditPayment[], Error>({
    queryKey: ["credit-payment", from, to],
    queryFn: async () => {
      const  {data}  = await axiosInstance.get('/transmandu/credit-payment', {
      params: {
        from,
        to,
      },
    });
    return data;
  },
  refetchOnWindowFocus: false,
  });
}