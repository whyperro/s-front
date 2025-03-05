import axiosInstance from "@/lib/axios";
import { ActivityReport } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchUserActivity = async (date: string): Promise<ActivityReport> => {
  const { data } = await axiosInstance.get("/transmandu/user-activity", { params: { date } });
  return data.data.activities;
};

export const useGetUserActivity = (date: string) => {
  return useQuery<ActivityReport>({
    queryKey: ["daily-activity", date], 
    queryFn: async () => {
      const data = await fetchUserActivity(date);
      return data;
    },
  });
};
