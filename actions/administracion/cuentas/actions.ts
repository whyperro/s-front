import axiosInstance from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateAccount = () => {
    const queryAccount = useQueryClient()
    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            await axiosInstance.post('/transmandu/accountants', data)
          },
        onSuccess: () => {
            queryAccount.invalidateQueries({queryKey: ['account']})
            toast("¡Creado!", {
                description: `¡La cuenta se ha creado correctamente!`
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
      createAccount: createMutation,
    }
}

export const useDeleteAccount = () => {
  const queryAccount = useQueryClient()
  const deleteMutation = useMutation({
      mutationFn: async (id: number | string) => {
          await axiosInstance.delete(`/transmandu/accountants/${id}`)
        },
      onSuccess: () => {

          queryAccount.invalidateQueries({queryKey: ['account']})
          toast.success("¡Eliminado!", {
              description: `¡La cuenta ha sido eliminado correctamente!`
          })
        },
      onError: (e) => {
          toast.error("Oops!", {
            description: "¡Hubo un error al eliminar la cuenta!"
        })
        },
      }
  )
  return {
    deleteAccount: deleteMutation,
  }
}

export const useUpdateAccount = () => {
  const queryAccount = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await axiosInstance.put(`/transmandu/accountants/${id}`, data);
    },
    onSuccess: () => {
      queryAccount.invalidateQueries({ queryKey: ['account'] });
      toast("¡Actualizado!", {
        description: "¡La cuenta se ha actualizado correctamente!",
      });
    },
    onError: (error) => {
      toast.error("Oops!", {
        description: `Hubo un error al actualizar la cuenta: ${error}`,
      });
    },
  });

  return {
    updateAccount: updateMutation,
  };
};