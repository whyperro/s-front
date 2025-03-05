import axios from "@/lib/axios";
import { ActivityReport } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchRegisterWithActivities = async (): Promise<ActivityReport[]> => {
  const { data } = await axios.get(`/transmandu/activity-report`);
  return data;
};

export const useGetRegisterWithActivities = () => {
  return useQuery<ActivityReport[], Error>({
    queryKey: ["activityReports"],
    queryFn: fetchRegisterWithActivities,
    staleTime: 1000 * 60 * 5, // Caché de 5 minutos
  });
};
