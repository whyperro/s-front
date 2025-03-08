"use client";

import { useCreateRoute } from "@/actions/administracion/rutas/actions";
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

const formSchema = z.object({
  from: z.string().min(3, {
    message: "El nombre del lugar debe tener al menos 3 caracteres.",
  }).max(30, {
    message: "El nombre del lugar tiene un máximo 30 caracteres.",
  }).regex(/^[a-zA-Z0-9\s]+$/, "No se permiten caracteres especiales, solo letras y números"),
  to: z.string().min(3, {
    message: "El nombre del lugar debe tener al menos 3 caracteres.",
  }).max(30, {
    message: "El nombre del lugar tiene un máximo 30 caracteres.",
  }).regex(/^[a-zA-Z0-9\s]+$/, "No se permiten caracteres especiales, solo letras y números"),
});

interface FormProps {
  onClose: () => void;
}

export function CreateRouteForm({ onClose }: FormProps) {
  const { createRoute } = useCreateRoute();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createRoute.mutateAsync(values);
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-3">
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desde</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese la salida" {...field} />
              </FormControl>
              <FormDescription>Lugar de salida</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasta</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa la llegada" {...field} />
              </FormControl>
              <FormDescription>Lugar de llegada</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createRoute.isPending}>
          {createRoute.isPending ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Form>
  );
}
