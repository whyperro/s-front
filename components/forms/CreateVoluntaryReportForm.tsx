"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { CalendarIcon } from "lucide-react";
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
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const FormSchema = z.object({
  identification_date: z
    .date()
    .refine((val) => !isNaN(val.getTime()), { message: "Invalid Date" }),
  report_date: z
    .date()
    .refine((val) => !isNaN(val.getTime()), { message: "Invalid Date" }),
  identification_area: z.string(),
  danger_place: z.string(),
  description: z.string(),
  consequences: z.string(),
  name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z
    .string()
    .regex(/^\d{11}$/, {
      message: "El número telefónico debe tener exactamente 11 dígitos",
    })
    .optional(),
  email: z.string().email().optional(),
  is_anonymous: z.boolean(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface FormProps {
  onClose?: () => void;
}
// { onClose }: FormProps
// lo de arriba va en prop
export function VoluntaryReportForm({ onClose }: FormProps) {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const areas = [
    "Operacional",
    "Mantenimiento",
    "Administracion y RRHH",
    "Control de calidad",
    "Tecnologia e informacion",
  ];
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      report_date: new Date(),
      identification_date: new Date(),
      identification_area: "",
      consequences: "",
      danger_place: "",
      description: "",
      name: "",
      last_name: "",
      phone: "",
      email: "",
      is_anonymous: false,
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
          Formulario de identificación de peligro
        </FormLabel>

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

        <FormField
          control={form.control}
          name="identification_area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area de identificación</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar area" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {areas.map((area, index) => (
                    <SelectItem key={index} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Elegir el area dónde fue identificado el peligro
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consequences"
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

        <FormField
          control={form.control}
          name="danger_place"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lugar del peligro</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Hangar13B" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
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
          name="is_anonymous"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  {...field}
                  checked={isAnonymous}
                  onCheckedChange={(checked) => {
                    // Asegurarse de que el valor sea un booleano
                    if (typeof checked === "boolean") {
                      field.onChange(checked);
                      setIsAnonymous(checked);
                    }
                  }}
                  value={isAnonymous.toString()} // Convertimos el booleano a string
                />
              </FormControl>
              <FormLabel>Realizar reporte de manera anónima</FormLabel>
            </FormItem>
          )}
        />

        {!isAnonymous && (
          <>
            <FormField
              control={form.control}
              name="name"
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
              name="last_name"
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
              name="email"
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
              name="phone"
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
          </>
        )}

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
