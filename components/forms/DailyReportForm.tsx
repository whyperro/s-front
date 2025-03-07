import { useRegisterActivity } from "@/actions/desarrollo/reportes_diarios/actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";

const FormSchema = z.object({
  description: z.string().min(1, "Requerido"),
  start_hour: z.string().optional(),
  manual_start_hour: z.boolean().optional(),
  manual_date: z.boolean().optional(),
  date: z.date().optional(), // Solo acepta objetos Date
});

function getCurrentTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;
}

export function DailyReportForm({
  activities_length,
  report_id,
}: {
  activities_length: number;
  report_id: string | number;
}) {
  const { user } = useAuth();
  const { registerActivity } = useRegisterActivity();
  const [manualTime, setManualTime] = useState(false);
  const [manualDate, setManualDate] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
      start_hour: getCurrentTime(),
      date: new Date(),
    },
  });

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formattedData = {
      ...data,
      activity_report_id: report_id,
    };
    console.log(formattedData);
    await registerActivity.mutateAsync(formattedData);
    // router.refresh()
    window.location.reload();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center w-full gap-6">
          <div className="flex flex-col space-y-3">
            <Label>Analista</Label>
            <Input
              value={`${user?.first_name || ""} ${user?.last_name || ""}`}
              disabled
            />
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
          <Checkbox
            checked={manualDate}
            onCheckedChange={(checked) => setManualDate(checked === true)}
          />
          <FormLabel>Ingresar fecha manualmente</FormLabel>
        </div>

        <div className="border p-4 rounded-md space-y-4">
          <FormItem className="w-1/6">
            <FormLabel>Número de Actividad</FormLabel>
            <FormControl>
              <Input
                value={activities_length + 1}
                disabled
                className="w-16 text-center"
              />
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
            <Checkbox checked={manualTime} />
            <FormLabel>Ingresar hora manualmente</FormLabel>
          </FormItem>
          <FormItem className="w-[110px]">
            <FormLabel>Hora de Inicio</FormLabel>
            <FormControl>
              <Input
                type="time"
                disabled={!manualTime}
                onChange={(e) => form.setValue("start_hour", e.target.value)}
              />
            </FormControl>
          </FormItem>
        </div>
        <Button type="submit" disabled={activities_length + 1 === 10}>
          Enviar actividad
        </Button>
      </form>
    </Form>
  );
}
