import axiosInstance from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateAircraft = () => {

    const queryAircraft = useQueryClient()
    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            await axiosInstance.post('/transmandu/aircrafts', data)
          },
        onSuccess: () => {
            queryAircraft.invalidateQueries({queryKey: ['aircrafts']})
            toast("¡Creado!", {
                description: `¡La aeronave se ha creado correctamente!`
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
      createAircraft: createMutation,
    }
}

export const useDeleteAircraft = () => {

  const queryAircraft = useQueryClient()

  const deleteMutation = useMutation({
      mutationFn: async (id: number | string) => {
          await axiosInstance.delete(`/transmandu/aircrafts/${id}`)
        },
      onSuccess: () => {

          queryAircraft.invalidateQueries({queryKey: ['aircrafts']})
          toast.success("¡Eliminado!", {
              description: `¡La aeronave ha sido eliminado correctamente!`
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
    deleteAircraft: deleteMutation,
  }
}