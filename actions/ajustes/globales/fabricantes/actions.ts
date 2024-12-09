import axiosInstance from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface ManufacturerSchema {
    name: string,
    description: string,
}

export const useCreateManufacturer = () => {

    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: async (data: ManufacturerSchema) => {
            await axiosInstance.post('/hangar74/manufacturer', data)
          },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['manufacturers']})
            toast("¡Creado!", {
                description: `¡El fabricante se ha creado correctamente!`
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
      createManufacturer: createMutation,
    }
}
