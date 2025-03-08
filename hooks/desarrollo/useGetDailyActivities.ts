import axiosInstance from "@/lib/axios";
import { ActivityReport } from "@/types";
import { useQuery } from "@tanstack/react-query";


const fetchDailyActivity = async ({date, user_id}: {date: string, user_id: string | null}): Promise<ActivityReport> => {
  const {data} = await axiosInstance.get("/transmandu/daily-activities", {params: {date, user_id}});
  return data[0];
};


export const useGetDailyActivityReport = ({date, user_id}: {date: string, user_id: string | null}) => {
  return useQuery<ActivityReport>({
    queryKey: ["daily-activity", ],
    queryFn: () => fetchDailyActivity({date, user_id}),
    enabled: !!user_id,
    retry: 2,
  });
};
