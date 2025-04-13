import axiosInstance from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

interface CreateServiceData {
  service: {
    name: string,
    description: string,
    manufacturer_id: string,
  },
  tasks: {
    description: string,
    batch_id: string[],
  }[]
}

export const useCreateMaintenanceService = () => {

  const queryClient = useQueryClient()

  const createMutation = useMutation({
      mutationFn: async (data: CreateServiceData) => {
          await axiosInstance.post('/hangar74/service-task', data)
        },
      onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['maintenance-services']})
          toast.success("¡Creado!", {
              description: `El servicio ha sido registrado correctamente.`
          })
        },
      onError: (error) => {
          toast.error('Oops!', {
            description: 'No se pudo registrar el servicio...'
          })
          console.log(error)
        },
      }
  )
  return {
    createService: createMutation,
  }
}
