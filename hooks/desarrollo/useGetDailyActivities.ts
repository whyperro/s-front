import { Activity, Department, JobTitle, User } from "@/types";
import { useQuery } from "@tanstack/react-query";


// Datos estáticos simulados
const mockActivities: Activity[] = [
  {
    id: 1,
    initial_hour: "08:00",
    final_hour: "10:00",
    employee: {
      id: 1,
      first_name: "Juan",
      last_name: "Pérez",
      company: "Empresa A",
      dni: "12345678",
      job_title: {
        id: 1,
        name: "Supervisor de Almacén",
        description: "Encargado del almacén",
        department: {
          id: 1,
          name: "Logística",
          email: "logistica@empresa.com"
        }
      },
      department: {
        id: 1,
        name: "Logística",
        email: "logistica@empresa.com"
      },
      location: {
        id: 1,
        address: "Av. Principal 123",
        type: "Sucursal",
        isMainBase: false,
        cod_iata: "XYZ",
        companies: []
      }
    },
    description: "Revisión de inventario",
    result: "Todo en orden"
  },
  {
    id: 2,
    initial_hour: "10:30",
    final_hour: "12:00",
    employee: {
      id: 2,
      first_name: "María",
      last_name: "García",
      company: "Empresa B",
      dni: "87654321",
      job_title: {
        id: 2,
        name: "Coordinadora de Proveedores",
        description: "Gestión de proveedores",
        department: {
          id: 2,
          name: "Compras",
          email: "compras@empresa.com"
        }
      },
      department: {
        id: 2,
        name: "Compras",
        email: "compras@empresa.com"
      },
      location: {
        id: 2,
        address: "Calle Secundaria 456",
        type: "Oficina Central",
        isMainBase: true,
        cod_iata: "ABC",
        companies: []
      }
    },
    description: "Atención de proveedores",
    result: "Pedido recibido"
  }
];

/**
 * Función para obtener actividades filtradas por usuario.
 * @param userId ID del usuario (string o null).
 * @returns Lista de actividades filtradas.
 */
const fetchDailyActivities = async (userId: string | null): Promise<Activity[]> => {
  if (!userId) return [];

  return mockActivities.filter(activity => activity.employee.id.toString() === userId);
};

/**
 * Hook para obtener las actividades diarias de un usuario.
 * @param userId ID del usuario.
 * @returns Datos de las actividades y estado de carga.
 */
export const useGetDailyActivities = (userId: string | null) => {
  return useQuery<Activity[]>({
    queryKey: ["dailyActivities", userId],
    queryFn: () => fetchDailyActivities(userId),
    enabled: !!userId, // Solo se ejecuta cuando hay un usuario seleccionado
  });
};
