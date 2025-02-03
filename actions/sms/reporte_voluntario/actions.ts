import axiosInstance from "@/lib/axios";
import {
  ComponentArticle,
  ConsumableArticle,
  DispatchRequest,
  Request,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface VoluntaryReportData {
  identification_date: Date;
  report_date: Date;
  danger_location: string;
  danger_area: string;
  description: string;
  possible_consequences: string;
  name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
}

export const useCreateVoluntaryReport = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationKey: ["voluntary-report"],
    mutationFn: async (data: VoluntaryReportData) => {
      await axiosInstance.post("/transmandu/voluntary-reports", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voluntary-reports"] });
      toast.success("¡Creado!", {
        description: `El reporte voluntario ha sido creado correctamente.`,
      });
    },
    onError: (error) => {
      toast.error("Oops!", {
        description: "No se pudo crear el reporte...",
      });
      console.log(error);
    },
  });
  return {
    createVoluntaryReport: createMutation,
  };
};
