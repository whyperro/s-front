import axiosInstance from "@/lib/axios";
import {
  ComponentArticle,
  ConsumableArticle,
  DispatchRequest,
  FollowUpControl,
  Request,
} from "@/types";
import {
  dataTagSymbol,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface FollowDescriptionData {
  description: string;
  date: Date;
  mitigation_measure_id: number;
  mitigation_plan_id: number;
}

interface updateFolllowUpControlData {
  id:   string;
  description: string;
  date: Date;
}

export const useCreateFollowUpControl = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationKey: ["follow-up-controls"],
    mutationFn: async (data: FollowDescriptionData) => {
      console.log("THIS IS THE DATA : ", data);
      await axiosInstance.post("/transmandu/follow-up-controls", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["follow-up-controls"] });
      toast.success("¡Creado!", {
        description: `El cotrol de seguimiento ha sido creado correctamente.`,
      });
    },
    onError: (error) => {
      toast.error("Oops!", {
        description: "No se pudo crear el control de seguimiento...",
      });
      console.log(error);
    },
  });
  return {
    createFollowUpControl: createMutation,
  };
};

export const useDeleteFollowUpControl = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (id: number | string) => {
      await axiosInstance.delete(`/transmandu/follow-up-controls/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["follow-up-controls"] });

      toast.success("¡Eliminado!", {
        description: `¡El control de seguimiento ha sido eliminada correctamente!`,
      });
    },
    onError: (e) => {
      toast.error("Oops!", {
        description: "¡Hubo un error al eliminar el control de seguimiento!",
      });
    },
  });

  return {
    deleteFollowUpControl: deleteMutation,
  };
};

export const useUpdateFollowUpControl = () => {

  const queryClient = useQueryClient()

  const updateFollowUpControlMutation = useMutation({
      mutationKey: ["follow-up-controls"],
      mutationFn: async (data: updateFolllowUpControlData) => {
          await axiosInstance.put(`/transmandu/follow-up-controls/${data.id}`, data)
        },
      onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['follow-up-controls']})
          toast.success("¡Actualizado!", {
              description: `El control ha sido actualizado correctamente.`
          })
        },
      onError: (error) => {
          toast.error('Oops!', {
            description: 'No se pudo actualizar el control de seguimiento...'
          })
          console.log(error)
        },
      }
  )
  return {
    updateFollowUpControl: updateFollowUpControlMutation,
  }
}