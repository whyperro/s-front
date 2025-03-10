import axiosInstance from "@/lib/axios";
import { Aircraft } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ObligatoryReportData {
  report_code: string;
  report_date: Date;
  incident_time: Date;
  flight_time: Date;

  pilot_id: string;
  copilot_id: string;

  aircraft_acronym: string;
  aircraft_model: string;
  flight_number: string;
  flight_origin: string;
  flight_destiny: string;
  flight_alt_destiny: string;
  incidents: string[];
  other_incidents: string;
}

export const useCreateObligatoryReport = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationKey: ["obligatory-reports"],
    mutationFn: async (data: ObligatoryReportData) => {
      await axiosInstance.post("/transmandu/obligatory-reports", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["obligatory-reports"] });
      toast.success("¡Creado!", {
        description: ` El reporte obligatorio ha sido creado correctamente.`,
      });
    },
    onError: (error) => {
      toast.error("Oops!", {
        description: "No se pudo crear el reporte obligatorio...",
      });
      console.log(error);
    },
  });
  return {
    createObligatoryReport: createMutation,
  };
};
