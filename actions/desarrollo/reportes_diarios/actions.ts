import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateActivitySchema {
    description: string;
    manual_start_time?: boolean;
}

export const useCreateActivityReport = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async ({date}: {date: string} ) => {
            await axiosInstance.post("/transmandu/activity-report", {
                date,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["activities"] });
            toast.success("¡Reporte creado!", {
                description: "El reporte se ha creado correctamente."
            });
        },
        onError: () => {
            toast.error("Oops!", {
                description: "Hubo un error al crear el reporte."
            });
        }
    });

    return {
        createActivityReport: createMutation,
    };
};

export const useRegisterActivity = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async (data: CreateActivitySchema) => {
            await axiosInstance.post("/transmandu/activity", data);
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
        registerActivity: createMutation,
    };
};

export const useUpdateFinalHour = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async (data: {
            final_hour: string;
            id: string;
            result: string,
        }) => {
            await axiosInstance.put(`/transmandu/update-activity/${data.id}` , data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["daily-activity"] });
            queryClient.invalidateQueries({ queryKey: ["activities"] });
            toast.success("¡Actividad actualizada!", {
                description: "La actividad se ha actualizado correctamente."
            });
        },
        onError: () => {
            toast.error("Oops!", {
                description: "Hubo un error al actualizar la actividad."
            });
        }
    });

    return {
        updateFinalHour: createMutation,
    };
};
