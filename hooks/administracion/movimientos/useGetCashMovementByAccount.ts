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

// Interfaz para los parámetros de fecha
interface DateParams {
  from?: string
  to?: string
}

const fetchCashMovementByAccount = async (cashId: string, params: DateParams = {}): Promise<AccountMovement[]> => {
  //parámetros de consulta para la URL
  const queryParams = new URLSearchParams()
  if (params.from) queryParams.append("from", params.from)
  if (params.to) queryParams.append("to", params.to)

  // Construir la URL con los parámetros
  const url = `/transmandu/movements-by-accounts/${cashId}`

  const { data } = await axiosInstance.get(url)
  return data
}

export const useGetCashMovementByAccount = (cashId: string, dateParams: DateParams = {}) => {
  return useQuery<AccountMovement[]>({
    // Incluir los parámetros de fecha en la queryKey para que React Query actualice los datos cuando cambien
    queryKey: ["movements-by-accounts", cashId, dateParams.from, dateParams.to],
    queryFn: () => fetchCashMovementByAccount(cashId, dateParams),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!cashId,
  })
}
