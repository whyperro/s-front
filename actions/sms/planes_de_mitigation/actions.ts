import axiosInstance from "@/lib/axios";
import {
  ComponentArticle,
  ConsumableArticle,
  DispatchRequest,
  InformationSource,
  Request,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface MitigationPlanData {
  description: string;
  responsible: string;
  start_date: Date;
  danger_identification_id: number;
}

export const useCreateMitigationPlan = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationKey: ["danger-identifications/${id}"],
    mutationFn: async (data: MitigationPlanData) => {
      await axiosInstance.post("/transmandu/mitigation-plans", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mitigation-plans"] });
      toast.success("¡Creado!", {
        description: ` El plan de mitigacion ha sido creado correctamente.`,
      });
    },
    onError: (error) => {
      toast.error("Oops!", {
        description: "No se pudo crear el plan de mitigation...",
      });
      console.log(error);
    },
  });
  return {
    createMitigationPlan: createMutation,
  };
};

export const useDeleteMitigationPlan = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: number | string) => {
      await axiosInstance.delete(`/transmandu/mitigation-plans/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mitigation-plans"] });
      toast.success("¡Eliminado!", {
        description: `¡El plan de mitigacion ha sido eliminada correctamente!`,
      });
    },
    onError: (e) => {
      toast.error("Oops!", {
        description: "¡Hubo un error al eliminar el plan de mitigacion!",
      });
    },
  });

  return {
    deleteMitigationPlan: deleteMutation,
  };
};
