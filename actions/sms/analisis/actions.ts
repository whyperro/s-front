import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface AnalysisData {
  probability: string;
  severity: string;
  result: string;
  mitigation_plan_id?: string;
  danger_identification_id?: string;
}

export const useCreateAnalysis = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationKey: ["analysis"],
    mutationFn: async (data: AnalysisData) => {
      await axiosInstance.post('/transmandu/analysis', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analysis"] });
      toast.success("¡Creado!", {
        description: ` El análisis ha sido creado correctamente.`,
      });
    },
    onError: (error) => {
      toast.error("Oops!", {
        description: "No se pudo crear el análisis...",
      });
      console.log(error);
    },
  });
  return {
    createAnalysis: createMutation,
  };
};




export const useDeleteAnalysis = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: number | string) => {
      await axiosInstance.delete(`/transmandu/analysis/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analysis"] });
      toast.success("¡Eliminado!", {
        description: `¡El analisis ha sido eliminado correctamente!`,
      });
    },
    onError: (e) => {
      toast.error("Oops!", {
        description: "¡Hubo un error al eliminar un analisis!",
      });
    },
  });

  return {
    deleteAnalysis: deleteMutation,
  };
};
