import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

const FormSchema = z.object({
  activity_number: z.string().min(1, "Requerido"),
  description: z.string().min(1, "Requerido"),
  start_time: z.string().optional(),
  manual_start_time: z.boolean().optional(),
  manual_date: z.boolean().optional(),
  date: z.string().optional(),
});

export function DailyReportForm() {
  const { user } = useAuth();
  const form = useForm({ resolver: zodResolver(FormSchema) });

  const [manualTime, setManualTime] = useState(false);
  const [manualDate, setManualDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [activity, setActivity] = useState({
    activity_number: "",
    description: "",
    manual_start_time: false,
    manual_date: false,
    date: new Date().toISOString().split("T")[0],
    start_time: "",
  });

  useEffect(() => {
    const fetchActivityNumber = async () => {
      try {
        const response = await fetch(`/api/activities/count?date=${activity.date}`);
        const data = await response.json();
        setActivity(prev => ({ ...prev, activity_number: String(data.nextActivityNumber).padStart(3, "0") }));
      } catch (error) {
        console.error("Error obteniendo el número de actividad:", error);
      }
    };

    fetchActivityNumber();
  }, [activity.date]);

  useEffect(() => {
    if (!manualTime) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setActivity(prev => ({ ...prev, start_time: `${hours}:${minutes}` }));
    }
  }, [manualTime]);

  const handleManualTimeChange = (checked: boolean) => {
    setManualTime(checked);
    if (!checked) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setActivity(prev => ({ ...prev, start_time: `${hours}:${minutes}` }));
    }
  };

  const handleManualDateChange = (checked: boolean) => {
    setManualDate(checked);
  };

  const handleSubmit = (data: any) => {
    console.log("Enviando actividad:", data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        {/* Línea superior */}
        <div className="flex justify-between items-end w-full">
          <FormItem className="w-1/3">
            <FormLabel>Analista</FormLabel>
            <FormControl>
              <Input value={`${user?.first_name || ""} ${user?.last_name || ""}`} disabled />
            </FormControl>
          </FormItem>
          <FormItem className="w-1/4">
            <FormLabel>Fecha</FormLabel>
            <FormControl>
              {manualDate ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full text-left pl-2">
                      {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="center" className="w-auto p-0">
                    <DatePicker
                      mode="single"
                      selected={selectedDate ?? undefined}
                      onSelect={(date) => {
                        if (date) {
                          setSelectedDate(date);
                          setActivity({ ...activity, date: date.toISOString().split("T")[0] });
                        }
                      }}
                      disabled={(date) => date > new Date()} // Deshabilita fechas futuras
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <Input 
                  type="date" 
                  value={activity.date} 
                  disabled={!manualDate} 
                  onChange={(e) => setActivity({ ...activity, date: e.target.value })}
                  className="text-left pl-2 appearance-none"
                />
              )}
            </FormControl>
          </FormItem>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox checked={manualDate} onCheckedChange={(checked) => handleManualDateChange(Boolean(checked))} />
          <FormLabel>Ingresar fecha manualmente</FormLabel>
        </div>

        {/* Sección de información */}
        <div className="border p-4 rounded-md space-y-4">
          <FormItem className="w-1/6">
            <FormLabel>Número de Actividad</FormLabel>
            <FormControl>
              <Input 
                placeholder="Ej: 001" 
                value={activity.activity_number} 
                disabled
                className="w-16 text-center"
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>Descripción</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Ej: Revisión de código..." 
                value={activity.description} 
                onChange={(e) => setActivity({ ...activity, description: e.target.value })}
                className="h-24"
              />
            </FormControl>
          </FormItem>
          <FormItem className="flex items-center space-x-2">
            <Checkbox checked={manualTime} onCheckedChange={(checked) => handleManualTimeChange(Boolean(checked))} />
            <FormLabel>Ingresar hora manualmente</FormLabel>
          </FormItem>
          <FormItem className="w-1/6">
            <FormLabel>Hora de Inicio</FormLabel>
            <FormControl>
              <Input
                type="time"
                value={activity.start_time}
                disabled={!manualTime}
                onChange={(e) => setActivity({ ...activity, start_time: e.target.value })}
              />
            </FormControl>
          </FormItem>
        </div>
        <Button type="submit">
          Enviar actividad
        </Button>
      </form>
    </Form>
  );
}
