import axiosInstance from "@/lib/axios"
import { Route } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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

export const useGetRoute = (id: string | null) => {
  const routesQuery = useQuery({
    queryKey: ["route"],
    queryFn: async () => {
      const {data} = await axiosInstance.get(`/transmandu/route/${id}`); // Adjust the endpoint as needed
      return data as Route;
    },
    enabled: !!id
  });
  return {
    data: routesQuery.data,
    loading: routesQuery.isLoading,
    error: routesQuery.isError // Function to call the query
  };
};

export const useUpdateRoute = () => {

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (values: {
      id: string
      from:string,
      to: string,
      scale?: string
    }) => {
      await axiosInstance.patch(`/transmandu/route/${values.id}`, {
        from: values.from,
        to: values.to,
        scale: values.scale ?? null,
      });
    },
    onSuccess: () => {
      // Invalidate the 'branches' query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      toast.success("¡Actualizado!", {
        description: "¡La ruta ha sido creada correctamente!",
      });
    },
    onError: (error: Error) => {
      toast.error("Oops!", {
        description: `¡Hubo un error al actualizar la ruta!: ${error}`,
      });
    },
  });

  return {
    updateRoute: updateMutation, // Function to call the mutation
  };
};


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
