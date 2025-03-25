"use client";

import { useCreateCash } from "@/actions/administracion/cuentas/actions";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
  name: z.string().regex(/^[a-zA-Z0-9\s]+$/, "No se permiten caracteres especiales, solo letras").min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }).max(30, {
    message: "El nombre tiene un máximo 30 caracteres.",
  }),
  total_amount: z.string().refine((val) => {
    // Convertir el valor a número y verificar que sea positivo
    const number = parseFloat(val);
    return !isNaN(number) && number >= 0;
  }, {
    message: "El monto total debe ser un número positivo.",
  }),
  coin: z.enum(["BOLIVARES", "DOLARES", "EUROS"]),
});

interface FormProps {
  onClose: () => void;
}

export function CreateCashForm({ onClose }: FormProps) {
  const { createCash } = useCreateCash();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createCash.mutateAsync(values);
    onClose();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="total_amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa el total" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Moneda</FormLabel>
              <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Ingrese el tipo de moneda" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BOLIVARES">Bolívares</SelectItem>
                    <SelectItem value="DOLARES">Dolares</SelectItem>
                    <SelectItem value="EUROS">Euros</SelectItem>
                  </SelectContent>
                </Select>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createCash.isPending}>
          {createCash.isPending ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Form>
  );
}
