"use client";

import { useCreateClient } from "@/actions/administracion/clientes/actions";
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
import { Separator } from "../ui/separator"
import { Textarea } from "../ui/textarea"

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  dni: z.string().min(7, {
    message: "Debes tener al menos 7 numeros .",
  }),
  name: z.string().max(40).min(2, {
    message: "El nombre debe tener al menos 2 caracteres y maximo 40.",
  }),
  phone: z.string().min(10, "El número de tlf debe tener al menos 10 digitos")
  .max(15, "El número de telefono debe tener hasta maximo 15 digitos").regex(phoneRegex, "Invalid Phone Number"),
  email: z.string().email({
    message: "Debe ser un email válido.",
  }),
  address: z.string().min(2).max(100),
});

interface FormProps {
  onClose: () => void;
}

export function CreateClientForm({ onClose }: FormProps) {
  const { createClient } = useCreateClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createClient.mutateAsync(values);
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-3">
      <div className='flex gap-2 items-center justify-center'>
        <FormField
          control={form.control}
          name="dni"
          render={({ field }) => (
            <FormItem>
              <FormLabel>DNI</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa Cedula o Rif" {...field} />
              </FormControl>
              <FormMessage className="text-xs"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa el nombre" {...field} />
              </FormControl>
              <FormMessage className="text-xs"/>
            </FormItem>
          )}
        />
      </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ej: +58 424-7000001"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa la dirección" {...field} />
              </FormControl>
              <FormMessage className="text-xs"/>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createClient.isPending}>
          {createClient.isPending ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Form>
  );
}
