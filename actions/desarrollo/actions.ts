import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateActivitySchema {
    description: string;
    manual_start_time?: boolean;
}

export const useCreateActivity = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async (data: CreateActivitySchema) => {
            await axiosInstance.post("/api/transmandu/activities", data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["activities"] });
            toast.success("¡Actividad creada!", {
                description: "La actividad se ha registrado correctamente."
            });
        },
        onError: () => {
            toast.error("Oops!", {
                description: "Hubo un error al crear la actividad."
            });
        }
    });

    return {
        createActivity: createMutation,
    };
};
