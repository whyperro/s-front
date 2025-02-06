import axiosInstance from "@/lib/axios";
import {
  ComponentArticle,
  ConsumableArticle,
  DispatchRequest,
  Request,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface PilotData {
  dni: string;
  license_number: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export const useCreatePilot = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationKey: ["pilots"],
    mutationFn: async (data: PilotData) => {
      await axiosInstance.post("/transmandu/pilots", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pilots"] });
      toast.success("¡Creado!", {
        description: ` El piloto ha sido creado correctamente.`,
      });
    },
    onError: (error) => {
      toast.error("Oops!", {
        description: "No se pudo crear el piloto...",
      });
      console.log(error);
    },
  });
  return {
    createPilot: createMutation,
  };
};

export const useDeletePilot = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: number | string) => {
      await axiosInstance.delete(`/transmandu/pilots/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pilots"] });
      toast.success("¡Eliminado!", {
        description: `¡El piloto ha sido eliminado correctamente!`,
      });
    },
    onError: (e) => {
      toast.error("Oops!", {
        description: "¡Hubo un error al eliminar un piloto!",
      });
    },
  });

  return {
    deletePilot: deleteMutation,
  };
};
