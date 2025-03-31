import axiosInstance from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateCreditPayment = () => {
  
  const queryCreditPayment = useQueryClient()
  const createMutation = useMutation({
    mutationFn: async (data: any) => {
          await axiosInstance.post(`/transmandu/credit-payment/${data.id}`, data)
        },
        onSuccess: () => {
          queryCreditPayment.invalidateQueries({queryKey: ['credit-payment']})
          toast("¡Creado!", {
              description: `¡El registro del pago del crédito se ha creado correctamente!`
          })
        },
        onError: (error) => {
            toast('Hey', {
              description: `No se creo correctamente: ${error}`
            })
          },
        }
    )

    return {
      createCreditPayment: createMutation,
    }
}
