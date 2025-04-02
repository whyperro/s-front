import axiosInstance from "@/lib/axios";
import {
  Analysis,
  ComponentArticle,
  ConsumableArticle,
  DispatchRequest,
  InformationSource,
  Request,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DangerIdentificationData {
  id: string | number; // Este id es el del reporte al cual sera asignado la identificacion (CREO)
  danger: string;
  current_defenses: string;
  risk_management_start_date: Date;
  danger_area: string;
  description: string;
  possible_consequences: string;
  consequence_to_evaluate: string;
  root_cause_analysis: string;
  information_source_id: string;
  reportType: string;
}

interface UpdateDangerIdentification {
  id: number;
  current_defenses: string;
  risk_management_start_date: Date;
  danger: string;
  danger_area: string;
  danger_type: string;
  description: string;
  possible_consequences: string;
  consequence_to_evaluate: string;
  root_cause_analysis: string;
  information_source_id: number | string;
}

export const useCreateDangerIdentification = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationKey: ["danger-identifications/${id}"],
    mutationFn: async (data: DangerIdentificationData) => {
      await axiosInstance.post(
        `/transmandu/sms/danger-identifications/${data.id}/${data.reportType}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["danger-identifications"] });
      queryClient.invalidateQueries({ queryKey: ["voluntary-reports"] });
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
    createDangerIdentification: createMutation,
  };
};

export const useDeleteDangerIdentification = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: number | string) => {
      await axiosInstance.delete(
        `/transmandu/sms/danger-identifications/${id}`
      );
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

export const useDeleteVoluntaryReport = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["voluntary-reports"],
    mutationFn: async (id: number | string) => {
      await axiosInstance.delete(`/transmandu/sms/voluntary-reports/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["danger-identifications"] });
      queryClient.invalidateQueries({ queryKey: ["voluntary-reports"] });
      toast.success("¡Eliminado!", {
        description: `¡El reporte ha sido eliminada correctamente!`,
      });
    },
    onError: (e) => {
      toast.error("Oops!", {
        description: "¡Hubo un error al eliminar el reporte!",
      });
    },
  });

  return {
    deleteVoluntaryReport: deleteMutation,
  };
};

export const useUpdateDangerIdentification = () => {
  const queryClient = useQueryClient();

  const updateDangerIdentificationtMutation = useMutation({
    mutationKey: ["danger-identifications"],
    mutationFn: async (data: UpdateDangerIdentification) => {
      await axiosInstance.patch(
        `/transmandu/sms/danger-identifications/${data.id}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["danger-identifications"] });
      toast.success("¡Actualizado!", {
        description: `La identificacion de peligro ha sido actualizada correctamente.`,
      });
    },
    onError: (error) => {
      toast.error("Oops!", {
        description: "No se pudo actualizar la identificacion de peligro...",
      });
      console.log(error);
    },
  });
  return {
    updateDangerIdentification: updateDangerIdentificationtMutation,
  };
};
