"use client"

import { CashMovement } from '@/types';
import { useQuery } from '@tanstack/react-query';
import  axiosInstance from "@/lib/axios"

// Definir la estructura de datos que devuelve el endpoint
export interface IncomeStatistics {
    statistics: {
      total_annual: number
      monthly: {
        [yearNumber: string]: {
          [month: string]: number
        }
      }
    }
    cash_movements: {
      [year: string]: {
        [month: string]: CashMovement[]
      }
    }
}

const fetchIncomeStatistics = async (): Promise<IncomeStatistics> => {
    const { data } = await axiosInstance.get("/transmandu/income-statistics")
    return data
}
  
export const useGetIncomeStatistics = () => {
    return useQuery<IncomeStatistics>({
      queryKey: ["income-statistics"],
      queryFn: fetchIncomeStatistics,
      staleTime: 1000 * 60 * 5, // 5 minutos
    })
}
  

/*esto trae una matriz de estadisticas, que contiene statistics
que me trae total_annual: number, (las sumas totales de las ganancias por año)
y montly que me trae un yearnumber que a su vez me trae un mont: number (que son las sumas de ganancias por mes), 

y cash_movement (movimientos de caja) que trae los year (year) y month (meses) que trae toda la informacion de los cashmovements  
*/