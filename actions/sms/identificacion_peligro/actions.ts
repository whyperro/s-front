import axiosInstance from "@/lib/axios";
import {
  ComponentArticle,
  ConsumableArticle,
  DispatchRequest,
  Request,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DangerIdentificationData {
  
}

export const useCreatePilot = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationKey: ["danger-identifications"],
    mutationFn: async (data: DangerIdentificationData) => {
      await axiosInstance.post("/transmandu/danger_identifications", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["danger-identifications"] });
      toast.success("¡Creado!", {
        description: ` La identificacion de peligro ha sido creado correctamente.`,
      });
    },
    onError: (error) => {
      toast.error("Oops!", {
        description: "No se pudo crear la identificacion de peligro...",
      });
      console.log(error);
    },
  });
  return {
    CreateDangerIdentification: createMutation,
  };
};

export const useDeleteDangerIdentification = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: number | string) => {
      await axiosInstance.delete(`/transmandu/danger-identifications/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["danger-identifications"] });
      toast.success("¡Eliminado!", {
        description: `¡La fuente de informacion ha sido eliminada correctamente!`,
      });
    },
    onError: (e) => {
      toast.error("Oops!", {
        description: "¡Hubo un error al eliminar la fuente de informacion!",
      });
    },
  });

  return {
    deleteDangerIdentification: deleteMutation,
  };
};
