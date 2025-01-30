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

import { CalendarIcon } from "lucide-react";
import { es } from "date-fns/locale";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Separator } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  severity: z.enum([
    "Catastrófico",
    "Peligroso",
    "Grave",
    "Leve",
    "Insignificante",
  ]),
  probability: z.enum([
    "Frecuente",
    "Ocasional",
    "Improbable",
    "Sumamente improbable",
    "Remoto",
  ]),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface FormProps {
  onClose: () => void;
}
// { onClose }: FormProps
// lo de arriba va en prop
export default function AnalysisForm() {
  const SEVERITY = [
    "Catastrófico",
    "Peligroso",
    "Grave",
    "Leve",
    "Insignificante",
  ];

  const PROBABILITY = [
    "Frecuente",
    "Ocasional",
    "Improbable",
    "Sumamente improbable",
    "Remoto",
  ];
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
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
          Análisis del peligro
        </FormLabel>

        <FormField
          control={form.control}
          name="severity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Severidad del riesgo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar severidad del peligro" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SEVERITY.map((area, index) => (
                    <SelectItem key={index} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Elegir la severidad del riesgo</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="probability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Probabilidad del riesgo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar probabilidad de riesgo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PROBABILITY.map((area, index) => (
                    <SelectItem key={index} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Elegir la probabilidad del riesgo
              </FormDescription>
              <FormMessage />
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
