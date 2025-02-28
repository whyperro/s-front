import axiosInstance from "@/lib/axios";
import { ActivityReport } from "@/types";
import { useQuery } from "@tanstack/react-query";


const fetchDailyActivity = async (date: string): Promise<ActivityReport> => {
  const {data} = await axiosInstance.get("/transmandu/daily-activities", {params: {date}});
  return data;
};


export const useGetDailyActivityReport = ( date: string) => {
  return useQuery<ActivityReport>({
    queryKey: ["daily-activity", ],
    queryFn: () => fetchDailyActivity( date),
  });
};
