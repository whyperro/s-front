import axiosInstance from "@/lib/axios"
import { ComponentArticle, ConsumableArticle } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"


export const useCreateArticle = () => {

    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationKey: ["articles"],
        mutationFn: async (data: ConsumableArticle | ComponentArticle) => {
            await axiosInstance.post('/hangar74/article', data,
              {
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            })
          },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['articles']})
            toast.success("¡Creado!", {
                description: `El articulo ha sido creado correctamente.`
            })
          },
        onError: (error) => {
            toast.error('Oops!', {
              description: 'No se pudo crear el articulo...'
            })
            console.log(error)
          },
        }
    )
    return {
      createArticle: createMutation,
    }
}

export const useDeleteArticle = () => {

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
      mutationFn: async (id: number | string) => {
          await axiosInstance.delete(`/hangar74/article/${id}`)
        },
      onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['articles']})
          toast.success("¡Eliminado!", {
              description: `¡El articulo ha sido eliminado correctamente!`
          })
        },
      onError: (e) => {
          toast.error("Oops!", {
            description: "¡Hubo un error al eliminar el articulo!"
        })
        },
      }
  )

  return {
    deleteArticle: deleteMutation,
  }
}

export const useUpdateArticleStatus = () => {

  const queryClient = useQueryClient()

  const updateArticleStatusMutation = useMutation({
      mutationKey: ["articles"],
      mutationFn: async ({id, status}: {
        id: number, status: string
      }) => {
          await axiosInstance.put(`/hangar74/update-article-status/${id}`, {
            status: status
          })
        },
      onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['in-transit-articles']})
          queryClient.invalidateQueries({queryKey: ['in-reception-articles']})
          toast.success("¡Actualizado!", {
              description: `El articulo ha sido actualizado correctamente.`
          })
        },
      onError: (error) => {
          toast.error('Oops!', {
            description: 'No se pudo actualizar el articulo...'
          })
          console.log(error)
        },
      }
  )
  return {
    updateArticleStatus: updateArticleStatusMutation,
  }
}

export const useConfirmIncomingArticle = () => {

  const queryClient = useQueryClient()

  const confirmIncomingArticleMutation = useMutation({
      mutationKey: ["articles"],
      mutationFn: async (values: {
        id?: number
        serial?: string,
        part_number: string,
        alternative_part_number?: string,
        description: string,
        zone: string,
        brand: string,
        condition: string,
        batches_id: string,
        is_special?: boolean,
        status: string,
        certificate_8130?: File | string,
        certificate_fabricant?: File | string,
        certificate_vendor?: File | string,
        image?: File | string,
      }) => {
          await axiosInstance.post(`/hangar74/update-article-warehouse/${values.id}`, {
            ...values
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
        },
      onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['in-transit-articles']})
          queryClient.invalidateQueries({queryKey: ['in-reception-articles']})
          queryClient.invalidateQueries({queryKey: ['articles']})
          queryClient.invalidateQueries({queryKey: ['batches']})
          toast.success("¡Actualizado!", {
              description: `El articulo ha sido actualizado correctamente.`
          })
        },
      onError: (error) => {
          toast.error('Oops!', {
            description: 'No se pudo actualizar el articulo...'
          })
          console.log(error)
        },
      }
  )
  return {
  confirmIncoming: confirmIncomingArticleMutation,
  }
}
