"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format, isValid, parse } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

const FormSchema = z.object({
  report_date: z
    .date()
    .refine((val) => !isNaN(val.getTime()), { message: "Invalid Date" }),

  incident_date: z
    .date()
    .refine((val) => !isNaN(val.getTime()), { message: "Invalid Date" })
    .optional(),

  incident_time: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Debe ser una fecha válida",
  }),
  incident_place: z.string(),

  id_pilot: z.string(),

  id_copilot: z.string(),

  flight_time: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Debe ser una hora válida",
  }),
  aicraft_id: z.string(),
  aircraft_model: z.string(),
  flight_number: z.string(),
  flight_origin: z.string(),
  flight_destination: z.string(),
  alternate_destination: z.string(),
  incident: z.array(z.string()),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface FormProps {
  onClose: () => void;
}
// { onClose }: FormProps
// lo de arriba va en prop
export function ObligatoryReportForm() {
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const optionsList = [
    "La aereonave aterriza quedándose solo con el combustible de reserva o menos",
    "Incursion en pista o calle de rodaje ( RUNAWAY INCURSION-RI)",
    "Aproximacion no estabilizada por debajo de los 500 pies VRF o 1000 PIES IRF",
    "Desprezurizacion",
    "Salida de pista () RUNAWAY INCURSION-RE",
    "Derrame de combustible",
    "Error  de navegacion con desviacion significativa de la ruta",
    "Casi colision (RESOLUCION ACVSORY-RA)",
    "Despegue abortado(REJETED TAKE OFF-RTO)",
    "Falla de motor",
    "Tail Strike",
    "Impacto con aves",
    "Aterrizaje fuerte (HARD LANDING)",
    "Alerta de fuego o humo",
    "Wind Shear",
    " El avion es evacuado",
    " Fallo en los controles de vuelo",
    "Parametros de vuelo anormales",
  ];

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      incident_place: "",
      id_pilot: "",
      id_copilot: "",
      aicraft_id: "",
      aircraft_model: "",
      flight_number: "",
      flight_origin: "",
      alternate_destination: "",
      incident: [],
    },
  });

  const onSubmit = (data: FormSchemaType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
        <FormLabel className="text-lg text-center m-2">
          Reporte Obligatorio de suceso
        </FormLabel>
        <FormField
          control={form.control}
          name="report_date"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-2.5">
              <FormLabel>Fecha de identificacion de peligro</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", {
                          locale: es,
                        })
                      ) : (
                        <span>Seleccione una fecha...</span>
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
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="incident_date"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-2.5">
              <FormLabel>Fecha de identificacion de peligro</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", {
                          locale: es,
                        })
                      ) : (
                        <span>Seleccione una fecha...</span>
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
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="incident_time"
          render={({ field }) => {
            const handleChange = (event: { target: { value: any } }) => {
              const timeString = event.target.value;
              const time = parse(timeString, "HH:mm", new Date());
              if (isValid(time)) {
                field.onChange(time);
              }
            };

            return (
              <FormItem className="flex flex-col">
                <FormLabel>Indicar hora del incidente</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "HH:mm") // Formato 24 horas
                        ) : (
                          <span>Seleccionar Hora</span>
                        )}
                        <ClockIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <input
                      type="time"
                      value={field.value ? format(field.value, "HH:mm") : ""}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="incident_place"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lugar de identificacion de peligro</FormLabel>
              <FormControl>
                <Input placeholder="ej: Hangar13B" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id_pilot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cedula de identidad del piloto</FormLabel>
              <FormControl>
                <Input placeholder="ejemplo: 12345600" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id_copilot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cedula de identidad del copiloto</FormLabel>
              <FormControl>
                <Input placeholder="ejemplo: 12345600" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flight_time"
          render={({ field }) => {
            const handleChange = (event: { target: { value: any } }) => {
              const timeString = event.target.value;
              const time = parse(timeString, "HH:mm", new Date());
              if (isValid(time)) {
                field.onChange(time);
              }
            };

            return (
              <FormItem className="flex flex-col">
                <FormLabel>Indicar hora de vuelo</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "HH:mm") // Formato 24 horas
                        ) : (
                          <span>Seleccionar Hora</span>
                        )}
                        <ClockIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <input
                      type="time"
                      value={field.value ? format(field.value, "HH:mm") : ""}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="aicraft_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matricula de la aereonave</FormLabel>
              <FormControl>
                <Input placeholder="Matricula de aereonave" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aircraft_model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modelo de la aereonave</FormLabel>
              <FormControl>
                <Input placeholder="Modelo de aereonave" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flight_origin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Origen de vuelo</FormLabel>
              <FormControl>
                <Input placeholder="Salida del vuelo" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flight_destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destino de vuelo</FormLabel>
              <FormControl>
                <Input placeholder="Destino del vuelo" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alternate_destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destino alterno del vuelo</FormLabel>
              <FormControl>
                <Input placeholder="Destino alterno del vuelo" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center gap-x-4">
          <Separator className="flex-1" />
          <p className="text-muted-foreground">SIGEAC</p>
          <Separator className="flex-1" />
        </div>
        <Button>Enviar reporte</Button>
      </form>
    </Form>
  );
}
