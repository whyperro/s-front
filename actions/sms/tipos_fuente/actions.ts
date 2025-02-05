import axiosInstance from "@/lib/axios";
import {
  ComponentArticle,
  ConsumableArticle,
  DispatchRequest,
  Request,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface InformationSourceData {
  name: string;
  type: string;
}

export const useCreateInformationSource = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationKey: ["information-sources"],
    mutationFn: async (data: InformationSourceData) => {
      await axiosInstance.post("/transmandu/information-sources", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["information-sources"] });
      toast.success("¡Creado!", {
        description: ` La fuente de informacion ha sido creado correctamente.`,
      });
    },
    onError: (error) => {
      toast.error("Oops!", {
        description: "No se pudo crear la fuente...",
      });
      console.log(error);
    },
  });
  return {
    createInformationSource: createMutation,
  };
};
