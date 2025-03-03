import axiosInstance from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateFlightPayments = () => {

    const queryFlightPayments = useQueryClient()
    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            await axiosInstance.post('/transmandu/flights-payments', data)
          },
        onSuccess: () => {
            queryFlightPayments.invalidateQueries({queryKey: ['flights-payments']})
            toast("¡Creado!", {
                description: `¡El registro del pago de vuelo se ha creado correctamente!`
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
      createFlightPayments: createMutation,
    }
}

export const useDeleteFlightPayments = () => {

  const queryFlightPayments = useQueryClient()

  const deleteMutation = useMutation({
      mutationFn: async (id: number | string) => {
          await axiosInstance.delete(`/transmandu/flights-payments/${id}`)
        },
      onSuccess: () => {

          queryFlightPayments.invalidateQueries({queryKey: ['flights-payments']})
          toast.success("¡Eliminado!", {
              description: `¡El registro del pago de vuelo ha sido eliminado correctamente!`
          })
        },
      onError: (e) => {
          toast.error("Oops!", {
            description: "¡Hubo un error al eliminar el avión!"
        })
        },
      }
  )

  return {
    deleteFlightPayments: deleteMutation,
  }
}