import axiosInstance from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateCredit = () => {

  const queryCredit = useQueryClient()
  const createMutation = useMutation({
    mutationFn: async (data: any) => {
          await axiosInstance.post('/transmandu/credits', data)
        },
        onSuccess: () => {
          queryCredit.invalidateQueries({queryKey: ['credit']})
          toast("¡Creado!", {
              description: `¡El crédito se ha creado correctamente!`
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
      createCredit: createMutation,
    }
}

export const useDeleteCredit = () => {

  const queryCredit = useQueryClient()

  const deleteMutation = useMutation({
      mutationFn: async (id: number | string) => {
          await axiosInstance.delete(`/transmandu/credits/${id}`)
        },
      onSuccess: () => {

          queryCredit.invalidateQueries({queryKey: ['credit']})
          toast.success("¡Eliminado!", {
              description: `¡El crédito ha sido eliminado correctamente!`
          })
        },
      onError: (e) => {
          toast.error("Oops!", {
            description: "¡Hubo un error al eliminar el crédito!"
        })
        },
      }
  )

  return {
    deleteCredit: deleteMutation,
  }
}