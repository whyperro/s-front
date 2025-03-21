import axiosInstance from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateClient = () => {

    const queryClient = useQueryClient()
    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            await axiosInstance.post('/transmandu/clients', data)
          },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['clients']})
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

export const useDeleteClient = () => {

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
      mutationFn: async (id: number | string) => {
          await axiosInstance.delete(`/transmandu/clients/${id}`)
        },
      onSuccess: () => {

          queryClient.invalidateQueries({queryKey: ['clients']})
          toast.success("¡Eliminado!", {
              description: `¡El cliente ha sido eliminado correctamente!`
          })
        },
      onError: (e) => {
          toast.error("Oops!", {
            description: "¡Hubo un error al eliminar el cliente!"
        })
        },
      }
  )

  return {
    deleteClient: deleteMutation,
  }
}

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await axiosInstance.put(`/transmandu/clients/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast("¡Actualizado!", {
        description: "¡El cliente se ha actualizado correctamente!",
      });
    },
    onError: (error) => {
      toast.error("Oops!", {
        description: `Hubo un error al actualizar el cliente: ${error}`,
      });
    },
  });

  return {
    updateClient: updateMutation,
  };
};