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

import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronsUpDown, ClockIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, isValid, parse } from "date-fns";
import { es } from "date-fns/locale";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

//Falta añadir validaciones
const FormSchema = z
  .object({
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

    aicraft_id: z.string().min(3),
    aircraft_model: z.string().min(3),
    flight_number: z.string().min(3),
    flight_origin: z.string().min(3),
    flight_destination: z.string().min(3),
    alternate_destination: z.string().min(3),
    incidents: z.array(z.string()),
    other_incidents: z.string(),
  })

  .refine(
    (data) => data.incidents.length > 0 || data.other_incidents.length > 0,
    {
      message: "Debes completar al menos uno de los campos.",
      path: ["incidents"], // Puedes especificar el path para mostrar el error en el campo incidents
    }
  );
type FormSchemaType = z.infer<typeof FormSchema>;

interface FormProps {
  onClose: () => void;
}

export function ObligatoryReportForm({ onClose }: FormProps) {
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const OPTIONS_LIST = [
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
    "El avion es evacuado",
    "Fallo en los controles de vuelo",
    "Parametros de vuelo anormales",
  ];

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      incident_date: new Date(),
      report_date: new Date(),
      incidents: [],
    },
  });

  const onSubmit = (data: FormSchemaType) => {
    console.log(data);
    onClose();
  };

  const handleOtherCheckboxChange = (checked: boolean) => {
    setShowOtherInput(checked);
    if (!checked) {
      form.setValue("other_incidents", "");
    }
  };

  const handleOtherInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    form.setValue("other_incidents", event.target.value);
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
        <div className="flex flex-col">
          <FormField
            control={form.control}
            name="report_date"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2.5">
                <FormLabel>Fecha de reporte del incidente</FormLabel>
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
                <FormLabel>Fecha del incidente</FormLabel>
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
        </div>
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
          name="flight_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero de vuelo</FormLabel>
              <FormControl>
                <Input placeholder="Numero del vuelo" {...field} />
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

        <FormField
          control={form.control}
          name="incidents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destino alterno del vuelo</FormLabel>
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[300px] justify-between" // Aumentada la anchura para opciones más largas
                    >
                      {selectedValues.length > 0
                        ? selectedValues.join(", ")
                        : "Seleccionar opciones..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    {" "}
                    {/* Aumentada la anchura para opciones más largas */}
                    <Command>
                      <CommandInput placeholder="Buscar opciones..." />
                      <CommandList>
                        <CommandEmpty>No se encontraron opciones.</CommandEmpty>
                        <CommandGroup>
                          {OPTIONS_LIST.map((option) => (
                            <CommandItem
                              key={option}
                              value={option}
                              onSelect={(currentValue) => {
                                const isSelected =
                                  selectedValues.includes(currentValue);
                                const newValues = isSelected
                                  ? selectedValues.filter(
                                      (v) => v !== currentValue
                                    )
                                  : [...selectedValues, currentValue];

                                setSelectedValues(newValues);
                                field.onChange(newValues); // Actualizar el valor del campo de formulario
                              }}
                            >
                              {option}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  selectedValues.includes(option)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="other_incidents" // Campo separado para "other_incidents"
          render={() => (
            <FormItem className="mt-4">
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={showOtherInput}
                    onCheckedChange={handleOtherCheckboxChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Otros incidentes
                </FormLabel>
              </FormItem>
              {showOtherInput && (
                <FormItem className="mt-2">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Detalles del incidente"
                      {...form.register("other_incidents")}
                      onChange={handleOtherInputChange}
                    />
                  </FormControl>
                </FormItem>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center gap-x-4">
          <Separator className="flex-1" />
          <p className="text-muted-foreground">SIGEAC</p>
          <Separator className="flex-1" />
        </div>
        <Button type="submit">Enviar reporte</Button>
      </form>
    </Form>
  );
}
