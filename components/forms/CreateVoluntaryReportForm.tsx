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

import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { es } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";
import {
  useCreateVoluntaryReport,
  useUpdateVoluntaryReport,
} from "@/actions/sms/reporte_voluntario/actions";
import { VoluntaryReport } from "@/types";

const FormSchema = z.object({
  identification_date: z
    .date()
    .refine((val) => !isNaN(val.getTime()), { message: "Invalid Date" }),
  report_date: z
    .date()
    .refine((val) => !isNaN(val.getTime()), { message: "Invalid Date" }),

  report_number: z.string(),
  danger_location: z.string(),
  danger_area: z.string(),
  airport_location: z.string(),
  description: z.string(),
  possible_consequences: z.string(),

  reporter_name: z.string().optional(),
  reporter_last_name: z.string().optional(),
  reporter_phone: z
    .string()
    .regex(/^\d{11}$/, {
      message: "El número telefónico debe tener almenos 11 dígitos",
    })
    .optional(),
  reporter_email: z.string().email().optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface FormProps {
  onClose: () => void;
  initialData?: VoluntaryReport;
  isEditing?: boolean;
}
// { onClose }: FormProps
// lo de arriba va en prop
export function CreateVoluntaryReportForm({
  onClose,
  isEditing,
  initialData,
}: FormProps) {
  const { createVoluntaryReport } = useCreateVoluntaryReport();
  const { updateVoluntaryReport } = useUpdateVoluntaryReport();
  const [isAnonymous, setIsAnonymous] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      report_number: initialData?.report_number || "",
      danger_area: initialData?.danger_area || "",
      danger_location: initialData?.danger_location || "",
      description: initialData?.description || "",
      possible_consequences: initialData?.possible_consequences || "",
      airport_location: initialData?.airport_location || "",
      identification_date: initialData?.identification_date
        ? new Date(initialData.identification_date)
        : new Date(),
      report_date: initialData?.report_date
        ? new Date(initialData.report_date)
        : new Date(),
      reporter_email: initialData?.reporter_email,
      reporter_last_name: initialData?.reporter_last_name,
      reporter_name: initialData?.reporter_name,
      reporter_phone: initialData?.reporter_phone,
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    
    console.log("valor de is anonymous", isAnonymous);
    if (isAnonymous) {
      data.reporter_name = "";
      data.reporter_last_name = "";
      data.reporter_email = "";
      data.reporter_phone = "";
    }

    console.log("Data post is anonymous", data);

    if (initialData && isEditing) {
      const value = {
        ...data,
        status: initialData.status,
        id: initialData.id,
        danger_identification_id: initialData?.danger_identification_id,
      };
      console.log("this is the value", value);
      await updateVoluntaryReport.mutateAsync(value);
    } else {
      const value = {
        ...data,
        status: "ABIERTO",
      };
      console.log("this is the value", value);
      await createVoluntaryReport.mutateAsync(value);
    }

    onClose();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
        <FormLabel className="text-lg text-center">
          Formulario de Reporte Voluntario
        </FormLabel>
        <div className="flex gap-2 items-center justify-center  ">
          <FormField
            control={form.control}
            name="identification_date"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2.5">
                <FormLabel>Fecha de identificacion</FormLabel>
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
            name="report_date"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2.5">
                <FormLabel>Fecha del reporte</FormLabel>
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
          name="report_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Codigo del Reporte Voluntario</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} maxLength={4} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="flex gap-2 items-center justify-center">
          <FormField
            control={form.control}
            name="danger_location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Base de Localizacion</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar localización" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PZO">Puerto Ordaz</SelectItem>
                    <SelectItem value="CBL">Ciudad Bolívar</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="danger_area"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Area de identificación</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar área" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="OPERACIONES">OPERACIONES</SelectItem>
                    <SelectItem value="MANTENIMIENTO">MANTENIMIENTO</SelectItem>
                    <SelectItem value="ADMINISTRACION">
                      ADMINISTRACION
                    </SelectItem>
                    <SelectItem value="RRH">RECURSOS HUMANOS</SelectItem>
                    <SelectItem value="CONTROL_CALIDAD">
                      CONTROL DE CALIDAD
                    </SelectItem>
                    <SelectItem value="IT">TECNOLOGIA E INFORMACION</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="airport_location"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Lugar de Identificacion</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CALLE_RODAJE">CALLE DE RODAJE</SelectItem>
                  <SelectItem value="HANGAR13B">HANGAR13B</SelectItem>
                  <SelectItem value="HANGAR17/18C">HANGAR17/18 C</SelectItem>
                  <SelectItem value="AEROPUERTO_CANAIMA">
                    AEROPUERTO CANAIMA
                  </SelectItem>
                  <SelectItem value="PLATAFORMA">PLATAFORMA</SelectItem>
                  <SelectItem value="PISTA_ATERRIZAJE">PISTA DE ATERRIZAJE</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion de peligro</FormLabel>
              <FormControl>
                <Input placeholder="Breve descripcion del peligro" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="possible_consequences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Consecuencias segun su criterio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Si son varias, separar por una coma (,)"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div>
          <Checkbox
            checked={isAnonymous}
            onCheckedChange={(checked) => {
              // Asegurarse de que el valor sea un booleano
              if (typeof checked === "boolean") {
                setIsAnonymous(checked);
                console.log(checked);
              }
            }}
            value={isAnonymous.toString()} // Convertimos el booleano a string
          />
          <Label className="ml-2 text-sm">Reporte anónimo</Label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="reporter_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de quien reporta" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reporter_last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Apellido de quien reporta" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reporter_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="ejemplo@gmail.com" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reporter_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between items-center gap-x-4">
          <Separator className="flex-1" />
          <p className="text-muted-foreground">SIGEAC</p>
          <Separator className="flex-1" />
        </div>
        <Button disabled={createVoluntaryReport.isPending}>
          {createVoluntaryReport.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Enviar Reporte"
          )}
        </Button>
      </form>
    </Form>
  );
}
