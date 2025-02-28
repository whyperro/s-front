import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Calendar as DatePicker } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useFetchActivityNumber } from "@/hooks/desarrollo/useGetActivityNumber";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { es } from "date-fns/locale";

const FormSchema = z.object({
  description: z.string().min(1, "Requerido"),
  start_time: z.string().optional(),
  manual_start_time: z.boolean().optional(),
  manual_date: z.boolean().optional(),
  date: z.date().optional(), // Solo acepta objetos Date
});

export function DailyReportForm({ activities_length }: { activities_length: number }) {
  const { user } = useAuth();
  const [manualTime, setManualTime] = useState(false);
  const [manualDate, setManualDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { mutate: getActivityNumber, data: activityNumber } = useFetchActivityNumber();
  const [activity, setActivity] = useState(() => ({
    activity_number: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    start_time: getCurrentTime(),
  }));

  const form = useForm({
    resolver: zodResolver(FormSchema), defaultValues: {
      description: "",
      start_time: getCurrentTime(),
      date: new Date(),
    }
  });

  useEffect(() => {
    getActivityNumber(activity.date, {
      onSuccess: (number) => {
        setActivity(prev => ({
          ...prev,
          activity_number: number,
        }));
      },
      onError: (error) => {
        console.error("Error obteniendo el número de actividad:", error);
      },
    });
  }, [activity.date, getActivityNumber]);

  useEffect(() => {
    if (!manualTime) {
      setActivity(prev => ({ ...prev, start_time: getCurrentTime() }));
    }
  }, [manualTime]);

  function getCurrentTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  }

  function handleManualTimeChange(checked: boolean) {
    setManualTime(checked);
    if (!checked) setActivity(prev => ({ ...prev, start_time: getCurrentTime() }));
  }

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <div className="flex items-center w-full gap-6">
          <div className="flex flex-col space-y-3">
            <Label>Analista</Label>
            <Input value={`${user?.first_name || ""} ${user?.last_name || ""}`} disabled />
          </div>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-1">
                <FormLabel>Fecha</FormLabel>
                <Popover>
                  <PopoverTrigger asChild disabled={!manualDate}>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: es })
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox checked={manualDate} onCheckedChange={(checked) => setManualDate(checked === true)} />
          <FormLabel>Ingresar fecha manualmente</FormLabel>
        </div>

        <div className="border p-4 rounded-md space-y-4">
          <FormItem className="w-1/6">
            <FormLabel>Número de Actividad</FormLabel>
            <FormControl>
              <Input value={activities_length + 1} disabled className="w-16 text-center" />
            </FormControl>
          </FormItem>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción de Actividad</FormLabel>
                <FormControl>
                  <Textarea placeholder="Revision de codigo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem className="flex items-center space-x-2">
            <Checkbox checked={manualTime} onCheckedChange={handleManualTimeChange} />
            <FormLabel>Ingresar hora manualmente</FormLabel>
          </FormItem>
          <FormItem className="w-[110px]">
            <FormLabel>Hora de Inicio</FormLabel>
            <FormControl>
              <Input type="time" value={activity.start_time} disabled={!manualTime} onChange={(e) => setActivity(prev => ({ ...prev, start_time: e.target.value }))} />
            </FormControl>
          </FormItem>
        </div>
        <Button type="submit">Enviar actividad</Button>
      </form>
    </Form>
  );
}
