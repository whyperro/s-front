import axiosInstance from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateRoute = () => {

  const queryRoute = useQueryClient()
  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await axiosInstance.post('/transmandu/route', data)
    },
    onSuccess: () => {
      queryRoute.invalidateQueries({queryKey: ['routes']})
          toast("¡Creado!", {
            description: `¡La ruta se ha creado correctamente!`
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
    createRoute: createMutation,
  }
}
export const useDeleteRoute = () => {

  const queryRoute = useQueryClient()

  const deleteMutation = useMutation({
      mutationFn: async (id: number | string) => {
          await axiosInstance.delete(`/transmandu/route/${id}`)
        },
      onSuccess: () => {

          queryRoute.invalidateQueries({queryKey: ['routes']})
          toast.success("¡Eliminado!", {
              description: `¡La ruta ha sido eliminado correctamente!`
          })
        },
      onError: (e) => {
          toast.error("Oops!", {
            description: "¡Hubo un error al eliminar la ruta!"
        })
        },
      }
  )

  return {
    deleteRoute: deleteMutation,
  }
}
