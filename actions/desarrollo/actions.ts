import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateFormSchema {
    userId: number;
    date: string;
}

export const useCreateDailyReport = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async (data: CreateFormSchema) => {
            await axiosInstance.post("/api/daily-report", data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["daily-report"] });
            toast.success("¡Reporte agregado!", {
                description: "El reporte ha sido creado correctamente."
            });
        },
        onError: () => {
            toast.error("Oops!", {
                description: "Hubo un error al agregar el reporte."
            });
        }
    });

    return {
        createDailyReport: createMutation,
    };
};
