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

import { Separator } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const areas = [
  "Operacional",
  "Mantenimiento",
  "Administracion y RRHH",
  "Control de calidad",
  "Tecnologia e informacion",
];

// HAY DATOS QUE VIENEN DEL REPORTE
// COMO FECHA DE REPORTE E IDENTIFICACION
// A LADO DEL CODIGO TENDRA EL TIPO DE REPORTE (RVP-RSO) DETECTADO DEL ORIGEN DEL REPORTE

// NOMBRE DE QUIEN REPORTA (PUEDE SER ANONIMO)
const FormSchema = z.object({
  report_code: z
    .string()
    .min(3, "Debe contener al menos 3 dígitos numéricos")
    .max(3, "Debe contener exactamente 3 dígitos numéricos")
    .regex(/^\d{3}$/, "Debe contener exactamente 3 dígitos numéricos"),

  danger: z.string().min(3, "Debe contener al menos 3 dígitos caracteres"),
  description: z.string().min(3, "Debe contener al menos 3 dígitos caracteres"),

  identification_area: z.enum([
    "Operacional",
    "Mantenimiento",
    "Administracion y RRHH",
    "Control de calidad",
    "Tecnologia e informacion",
  ]),

  danger_place: z
    .string()
    .min(3, "Debe contener al menos 3 dígitos caracteres"),
  consequences: z
    .string()
    .min(3, "Debe contener al menos 3 dígitos caracteres"),
  consequence_to_evaluate: z
    .string()
    .min(3, "Debe contener al menos 3 dígitos caracteres"),
  information_source: z
    .string()
    .min(3, "Debe contener al menos 3 dígitos caracteres"),
  identification_method: z.string(),
  danger_type: z.string(),
  root_cause: z.string(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface FormProps {
  onClose?: () => void;
}
// { onClose }: FormProps
// lo de arriba va en prop
export default function IdentificationForm({ onClose }: FormProps) {
  const AREAS = [
    "Operacional",
    "Mantenimiento",
    "Administracion y RRHH",
    "Control de calidad",
    "Tecnologia e informacion",
  ];

  const DANGER_TYPES = ["Organizacional", "Técnico", "Humano", "Natural"];
  const SOURCES = [
    "RVP",
    "RSO",
    "Auditoria",
    "Inspección",
    "Encuesta",
    "Entrevista",
  ];
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      report_code: "",
      danger: "Cual es el peligro (Viene del reporte)",
      description: "",
      identification_area: "Operacional",
      danger_place: "",
      consequences: "Vienen, del, reporte",
      consequence_to_evaluate: "",
      information_source: "",
      identification_method: "",
      danger_type: "Organizacional",
      root_cause: "",
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
          Identificación de peligro
        </FormLabel>

        <FormField
          control={form.control}
          name="report_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código del reporte</FormLabel>
              <FormControl>
                <Input
                  maxLength={3}
                  placeholder="Ingresar el código"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="danger"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peligro identificado</FormLabel>
              <FormControl>
                <Input placeholder="Cual es el peligro" {...field} />
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
              <FormLabel>Descripcion de identificacion de peligro</FormLabel>
              <FormControl>
                <Input placeholder="Breve descripcion " {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
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
                  {AREAS.map((area, index) => (
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
          name="danger_place"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lugar de identificación</FormLabel>
              <FormControl>
                <Input placeholder="Cual es el peligro" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consequences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Consecuencias</FormLabel>
              <FormControl>
                <Input
                  placeholder="Consecuencias separadas por una coma (,)"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consequence_to_evaluate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Consecuencia a evaluar</FormLabel>
              <FormControl>
                <Input
                  placeholder="Consecuencia que sera evaluada"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="information_source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Método de identificacio</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar método" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SOURCES.map((source, index) => (
                    <SelectItem key={index} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Elegir el método de identificacion de peligro
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="danger_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de peligro</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de peligro" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DANGER_TYPES.map((area, index) => (
                    <SelectItem key={index} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Elgir el tipo de peligro identificado
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="root_cause"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Análisis causa raiz</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Responder al ¿Por qué? hasta encontrar  la causa "
                  {...field}
                />
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
