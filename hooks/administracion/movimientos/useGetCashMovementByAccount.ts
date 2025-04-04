import type { CashMovement } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios"

// Definir la estructura de datos que devuelve el endpoint
export interface AccountMovement {
  account_name: string
  INCOME: number
  OUTPUT: number
  movements: CashMovement[]
}

const fetchCashMovementByAccount = async (): Promise<AccountMovement[]> => {
  const { data } = await axiosInstance.get("/transmandu/movements-by-accounts")
  return data
}

export const useGetCashMovementByAccount = () => {
  return useQuery<AccountMovement[]>({
    queryKey: ["movements-by-accounts"],
    queryFn: fetchCashMovementByAccount,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}
