"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { MinusCircle } from "lucide-react"
import { ScrollArea } from "../ui/scroll-area"
import { cn } from "@/lib/utils"

// Esquema de validación para una parte
const PartSchema = z.object({
  part_name: z.string().min(1, "El nombre de la parte es obligatorio"),
  part_number: z.string().min(1, "El número de parte es obligatorio"),
  part_hours: z.number().min(0, "Las horas de vuelo deben ser un número positivo"),
  part_cycles: z.number().min(0, "Los ciclos de vuelo deben ser un número positivo"),
});

// Esquema de validación para el formulario de partes
const PartsFormSchema = z.object({
  parts: z.array(PartSchema).min(1, "Debe agregar al menos una parte"),
});

type PartsFormType = z.infer<typeof PartsFormSchema>;

interface PartsFormProps {
  onNext: (data: PartsFormType) => void; // Función para avanzar al siguiente paso
  onBack: () => void; // Función para retroceder al paso anterior
  initialData?: PartsFormType; // Datos iniciales para prellenar el formulario
}

export function AircraftPartsInfoForm({ onNext, onBack, initialData }: PartsFormProps) {
  const form = useForm<PartsFormType>({
    resolver: zodResolver(PartsFormSchema),
    defaultValues: initialData || { parts: [] }, // Usar initialData si está disponible
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "parts", // Nombre del campo array
  });

  const onSubmit = (data: PartsFormType) => {
    onNext(data); // Pasar los datos al siguiente paso
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-3">
        <div className="space-y-4">
          <ScrollArea className={cn("", fields.length > 1 ? "h-[420px]" : "")}>
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col space-y-2 p-4 border rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Parte - {index + 1}</h4>
                  <Button
                    variant="ghost"
                    type="button"
                    size="icon"
                    onClick={() => remove(index)}
                    className="hover:text-red-500"
                  >
                    <MinusCircle className="size-4" />
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name={`parts.${index}.part_name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la Parte</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Motor, Hélice, etc." {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`parts.${index}.part_number`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Parte</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: 12345-XYZ" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`parts.${index}.part_hours`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horas de Vuelo</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ej: 15000"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`parts.${index}.part_cycles`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciclos Realizados</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ej: 15000"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </ScrollArea>
          <Button
            type="button"
            variant="link"
            onClick={() => append({ part_name: "", part_number: "", part_hours: 0, part_cycles: 0 })}
            className="mt-2 text-sm"
          >
            Agregar Parte
          </Button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Anterior
          </Button>
          <Button type="submit">Siguiente</Button>
        </div>
      </form>
    </Form>
  );
}
