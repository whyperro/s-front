import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import axiosInstance from "../../../lib/axios"

export const useCreateAdministrationCompany = () => {

    const queryAdministrationCompany = useQueryClient()
    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            await axiosInstance.post('/transmandu/administration-company', data)
          },
        onSuccess: () => {
            queryAdministrationCompany.invalidateQueries({queryKey: ['admin-company']})
            toast("¡Creado!", {
                description: `¡El registro de la empresa se ha creado correctamente!`
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
      createAdministrationCompany: createMutation,
    }
}

export const useDeleteAdministrationCompany = () => {

  const queryAdministrationCompany = useQueryClient()

  const deleteMutation = useMutation({
      mutationFn: async (id: number | string) => {
          await axiosInstance.delete(`/transmandu/administration-company/${id}`)
        },
      onSuccess: () => {

          queryAdministrationCompany.invalidateQueries({queryKey: ['admin-company']})
          toast.success("¡Eliminado!", {
              description: `¡El registro de la empresa ha sido eliminado correctamente!`
          })
        },
      onError: (e) => {
          toast.error("Oops!", {
            description: "¡Hubo un error al eliminar la empresa!"
        })
        },
      }
  )

  return {
    DeleteAdministrationCompany: deleteMutation,
  }
}