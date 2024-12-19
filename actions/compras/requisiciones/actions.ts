import axiosInstance from "@/lib/axios"
import { ConsumableArticle } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface CreateRequisitionData {
  order_number: string,
  justification: string,
  requested_by: string,
  created_by: string,
  aircraft_id?: number,
  work_order_id?: number,
  company: string,
  articles: {
    batch: string,
    batch_name: string,
    batch_articles: {
      quantity: number,
      part_number: string,
    }[]
  }[]
}

export const useCreateRequisition = () => {

  const queryClient = useQueryClient()

  const createMutation = useMutation({
      mutationFn: async (data: CreateRequisitionData) => {
          await axiosInstance.post('/requisition-order', data)
        },
      onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['requisitions-orders']})
          toast.success("¡Creado!", {
              description: `La requisicion ha sido creada correctamente.`
          })
        },
      onError: (error) => {
          toast.error('Oops!', {
            description: 'No se pudo crear la requisicion...'
          })
          console.log(error)
        },
      }
  )
  return {
    createRequisition: createMutation,
  }
}

export const useDeleteRequisition = () => {

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
      mutationFn: async ({id, company}: {id: number, company: string}) => {
          await axiosInstance.post(`/delete-requisition-order/${id}`, {company})
        },
      onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['requisitions-orders']})
          toast.success("¡Eliminado!", {
              description: `¡La requisición ha sido eliminada correctamente!`
          })
        },
      onError: (e) => {
          toast.error("Oops!", {
            description: "¡Hubo un error al eliminar la requisición!"
        })
        },
      }
  )

  return {
    deleteRequisition: deleteMutation,
  }
}
