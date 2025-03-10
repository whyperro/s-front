import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface MitigationMeasureData {
  description: string;
  implementation_supervisor: string;
  implementation_responsible: string;
  estimated_date: Date;
  execution_date: Date;
  mitigation_plan_id: number;
}

export const useCreateMitigationMeasure = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationKey: ["mitigation-measures"],
    mutationFn: async (data: MitigationMeasureData) => {
      await axiosInstance.post("/transmandu/mitigation-measures", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mitigation-measures"] });
      queryClient.invalidateQueries({ queryKey: ["analysis"] });
      toast.success("¡Creado!", {
        description: ` La medida de mitigacion se ha creado correctamente.`,
      });
    },
    onError: (error) => {
      toast.error("Oops!", {
        description: "No se pudo crear la medida de mitigacion...",
      });
      console.log(error);
    },
  });
  return {
    createMitigationMeasure: createMutation,
  };
};
