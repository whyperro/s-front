import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const fetchActivityNumber = async (date: string): Promise<string> => {
  const response = await axios.get(`/api/activities/count?date=${date}`);
  return String(response.data.nextActivityNumber).padStart(3, "0");
};

export const useFetchActivityNumber = () => {
  return useMutation<string, Error, string>({
    mutationFn: fetchActivityNumber,
  });
};
