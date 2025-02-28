import { ActivityReport } from "@/types";
import { useQuery } from "@tanstack/react-query";


const fetchDailyActivities = async (userId: string | null, date: string): Promise<ActivityReport> => {
  return {
    id: 1,
    date: "2025-02-28",
    user: {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "example@test.com",
      isActive: true,
      username: "johndoe",
      companies: [],
      roles: [],
      permissions: [],
    },
    activities: [{
      id: 1,
      initial_hour: "08:00",
      final_hour: "12:00",
      description: "Actividad de prueba",
      result: "En progreso",
    }]
  };
};

/**
 * Hook para obtener las actividades diarias de un usuario.
 * @param userId ID del usuario.
 * @returns Datos de las actividades y estado de carga.
 */
export const useGetDailyActivities = (userId: string | null, date: string) => {
  return useQuery<ActivityReport>({
    queryKey: ["dailyActivities", userId],
    queryFn: () => fetchDailyActivities(userId, date),
    enabled: !!userId, // Solo se ejecuta cuando hay un usuario seleccionado
  });
};
