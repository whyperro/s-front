import axiosInstance from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface CreateFormSchema {
    first_name: string,
    last_name: string,
    username: string;
    email: string;
    isActive: boolean;
  }

export const useCreateUser = () => {

    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: async (data: CreateFormSchema) => {
            await axiosInstance.post('/register', data)
          },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']})
            toast.success("¡Creado!", {
                description: `¡El usuario ha sido creado correctamente!`
            })
          },
        onError: (e) => {
            toast.error("Oops!", {
              description: "¡Hubo un error al crear el usuario!"
          })
          },
        }
    )

    return {
      createUser: createMutation,
    }
}
