import axiosInstance from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface CreateClientSchema {
  name: string,
  phone_number: string,
  email: string,
  address: string,
}

export const useCreateClient = () => {

  const queryClient = useQueryClient()

  const createMutation = useMutation({
      mutationFn: async (data: CreateClientSchema) => {
          await axiosInstance.post('/hangar74/clients', data)
        },
      onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['maintenance-clients']})
          toast("¡Creado!", {
              description: `¡El cliente se ha creado correctamente!`
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
    createClient: createMutation,
  }
}
