import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";

// Simulación de una función que obtiene actividades de una base de datos (debes reemplazarla con una API real)
const fetchActivitiesByDate = async (date: string) => {
  // Simulación: Lista de actividades registradas en la base de datos
  const activities = [
    { activity_number: 1, date: "2025-02-20" },
    { activity_number: 2, date: "2025-02-20" },
    { activity_number: 3, date: "2025-02-20" }
  ];
  
  return activities.filter(activity => activity.date === date);
};

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
  const [activity, setActivity] = useState({
    activity_number: "",
    description: "",
    manual_start_time: false,
    manual_date: false,
    date: new Date().toISOString().split("T")[0],
    start_time: "",
    end_time: "",
  });

  // Función para actualizar el número de actividad cuando cambia la fecha
  useEffect(() => {
    const updateActivityNumber = async () => {
      const activities = await fetchActivitiesByDate(activity.date);
      const nextNumber = activities.length + 1;
      setActivity(prev => ({ ...prev, activity_number: String(nextNumber) }));
    };

    updateActivityNumber();
  }, [activity.date]);

  const handleManualTimeChange = (checked: boolean) => {
    setManualTime(checked);
  };

  const handleManualDateChange = (checked: boolean) => {
    setManualDate(checked);
  };

  const handleSubmit = (data: any) => {
    console.log("Enviando actividad:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <FormItem>
            <FormLabel>Analista</FormLabel>
            <FormControl>
              <Input value={user?.first_name && user?.last_name || ""} disabled />
            </FormControl>
          </FormItem>
          <div className="flex items-center space-x-2">
            <Checkbox checked={manualDate} onCheckedChange={(checked) => handleManualDateChange(Boolean(checked))} />
            <FormLabel>Ingresar fecha manualmente</FormLabel>
          </div>
          <FormItem>
            <FormLabel>Fecha</FormLabel>
            <FormControl>
              <Input 
                type="date" 
                value={activity.date} 
                disabled={!manualDate} 
                onChange={(e) => setActivity({ ...activity, date: e.target.value })}
              />
            </FormControl>
          </FormItem>
          <div className="border p-4 rounded-md space-y-4">
            <FormItem>
              <FormLabel>Número de Actividad</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ej: 001" 
                  value={activity.activity_number} 
                  disabled 
                />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Revisión de código..." value={activity.description} onChange={(e) => setActivity({ ...activity, description: e.target.value })} />
              </FormControl>
            </FormItem>
            <FormItem className="flex items-center space-x-2">
              <Checkbox checked={manualTime} onCheckedChange={(checked) => handleManualTimeChange(Boolean(checked))} />
              <FormLabel>Ingresar hora manualmente</FormLabel>
            </FormItem>
            <FormItem>
              <FormLabel>Hora de Inicio</FormLabel>
              <FormControl>
                <Input
                  type="time"
                  value={manualTime ? activity.start_time : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  disabled={!manualTime}
                  onChange={(e) => setActivity({ ...activity, start_time: e.target.value })}
                />
              </FormControl>
            </FormItem>
          </div>
          <Button type="submit">
            Enviar actividad
          </Button>
        </div>
      </form>
    </Form>
  );
}
