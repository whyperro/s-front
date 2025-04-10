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
import { useGetClientById } from "@/hooks/administracion/clientes/useGetClientsById";
import { useUpdateClient } from "@/actions/administracion/clientes/actions";
import { Separator } from "../ui/separator";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  dni: z
    .string()
    .min(7, {
      message: "El número de identificación debe tener el formato adecuado.",
    })
    .max(11, {
      message: "El número de identificación tiene un máximo 9 caracteres.",
    }),
  name: z
    .string()
    .max(40)
    .regex(
      /^[a-zA-Z0-9\s]+$/,
      "No se permiten caracteres especiales, solo letras"
    )
    .min(2, {
      message: "El nombre debe tener al menos 2 caracteres y maximo 40.",
    }),
  phone: z
    .string()
    .min(10, "El número de tlf debe tener al menos 10 digitos")
    .max(15, "El número de telefono debe tener hasta maximo 15 digitos")
    .regex(phoneRegex, "Número de telefono invalido"),
  email: z.string().email({
    message: "Debe ser un email válido.",
  }),
  address: z
    .string()
    .min(2, {
      message: "La dirección debe tener al menos 2 caracteres.",
    })
    .max(100, {
      message: "La dirección tiene un máximo 100 caracteres.",
    }),
  pay_credit_days: z.coerce
    .number({
      invalid_type_error: "Solo se permiten números", // Mensaje si no es convertible
    })
    .int("Debe ser un número entero")
    .min(1, { message: "Mínimo 1 día" })
    .max(730, { message: "Máximo 730 días" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface EditClientFormProps {
  id: string;
  onClose: () => void;
}

export function EditClientForm({ id, onClose }: EditClientFormProps) {
  const { data: clientDetails, isLoading } = useGetClientById(id);
  const { updateClient } = useUpdateClient();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dni: clientDetails?.dni,
      name: clientDetails?.name,
      phone: clientDetails?.phone,
      email: clientDetails?.email,
      address: clientDetails?.address,
      pay_credit_days: clientDetails?.pay_credit_days,
    },
  });

  const OnSubmit = async (formData: FormSchemaType) => {
    const data = {
      dni: formData.dni,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      pay_credit_days: formData.pay_credit_days,
    };
    await updateClient.mutate({ id, data });
    onClose();
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(OnSubmit)}>
        <div className="flex gap-2 items-center justify-center">
          <FormField
            control={form.control}
            name="dni"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>DNI</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: V-12345678" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa el nombre" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="Ej: +584247000001" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa la dirección" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pay_credit_days"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Días para Pagar</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ingrese un plazo (0-730 días)"
                  min={0}
                  max={730} // Máximo 730 días
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
        <Button type="submit" disabled={updateClient.isPending}>
          {updateClient.isPending ? "Actualizando..." : "Actualizar"}
        </Button>
      </form>
    </Form>
  );
}
