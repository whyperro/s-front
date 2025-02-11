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
import { useGetInformationSources } from "@/hooks/sms/useGetInformationSource";

// HAY DATOS QUE VIENEN DEL REPORTE
// COMO FECHA DE REPORTE E IDENTIFICACION
// A LADO DEL CODIGO TENDRA EL TIPO DE REPORTE (RVP-RSO) DETECTADO DEL ORIGEN DEL REPORTE

// NOMBRE DE QUIEN REPORTA (PUEDE SER ANONIMO)

const FormSchema = z.object({
  danger: z.string().min(3, "Debe contener al menos 3 dígitos caracteres"),
  danger_location: z
    .string()
    .min(3, "Debe contener al menos 3 dígitos caracteres"),
  danger_area: z.string(),

  description: z.string().min(3, "Debe contener al menos 3 dígitos caracteres"),

  possible_consequences: z
    .string()
    .min(3, "Debe contener al menos 3 dígitos caracteres"),
  consequence_to_evaluate: z
    .string()
    .min(3, "Debe contener al menos 3 dígitos caracteres"),

  danger_type: z.string(),
  root_cause_analysis: z.string(),

  information_source_id: z.string(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface FormProps {
  onClose: () => void;
}
// { onClose }: FormProps
// lo de arriba va en prop
export default function CreateDangerIdentificationForm({ onClose }: FormProps) {

  const { data: informationSources, isLoading } = useGetInformationSources();

  const AREAS = [
    "OPERACIONAL",
    "MANTENIMIENTO",
    "ADMINISTRACION",
    "CONTROL_CALIDAD",
    "IT",
  ];

  const DANGER_TYPES = ["ORGANIZACIONAL", "TECNICO", "HUMANO", "NATURAL"];

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
    defaultValues: {},
  });

  const onSubmit = (data: FormSchemaType) => {
    console.log(data);
    onClose();
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
          name="danger"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peligro Identificado</FormLabel>
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
          name="danger_area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area de identificación</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar Area" />
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
          name="danger_location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lugar de identificación</FormLabel>
              <FormControl>
                <Input placeholder="Donde se identifico" {...field} />
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
          name="information_source_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Método de identificacion</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar Fuente de Informacion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {informationSources &&
                    informationSources.map((source) => (
                      <SelectItem key={source.id} value={source.id.toString()}>
                        {source.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormDescription>Elegir Fuente de Informacion</FormDescription>
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
          name="root_cause_analysis"
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
