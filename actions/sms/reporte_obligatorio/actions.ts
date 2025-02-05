import axiosInstance from "@/lib/axios";
import {
  Aircraft
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ObligatoryReportData {
  report_code: number;
  //information_source: InformationSource;
  report_number: string;
  report_date: Date;
  incident_date: Date;
  incident_time: Date;
  incident_location: string;
  pilot: string;
  copilot: string;
  flight_time: Date;
  aircraft: Aircraft;
  flight_number: string;
  flight_origin: string;
  flight_destination: string;
  alternate_destination: string;
  incidents: string;
  other_incidents: string;
}

export const useCreateObligatoryReport = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationKey: ["obligatory_reports"],
    mutationFn: async (data: ObligatoryReportData) => {
      await axiosInstance.post("/transmandu/obligatory-reports", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["obligatory_reports"] });
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
