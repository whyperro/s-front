import axiosInstance from "@/lib/axios";
import { ActivityReport } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchEditActivity = async (id: string): Promise<ActivityReport> => {
  const { data } = await axiosInstance.patch(`/transmandu/update-allActivity/${id}`);
  return data[0];
};

export const useEditActivityUser = (id: string) => {
  return useQuery<ActivityReport>({
    queryKey: ["update-allActivity"],
    queryFn: () => fetchEditActivity(id),
    enabled: !!id,
    refetchOnMount: true,
  });
};
