"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "../ui/separator";
import { useUpdateAccount } from "@/actions/administracion/cuentas/actions";
import { useGetAccountById } from "@/hooks/administracion/useGetAccountById";

const formSchema = z.object({
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
});

type FormSchemaType = z.infer<typeof formSchema>;

interface EditAccountFormProps {
  id: string;
  onClose: () => void;
}

export function EditAccountantForm({ id, onClose }: EditAccountFormProps) {
  const { data: accountDetails, isLoading } = useGetAccountById(id);
  const { updateAccount } = useUpdateAccount();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: accountDetails?.name,
    },
  });

  const OnSubmit = async (formData: FormSchemaType) => {
    const data = {
      name: formData.name,
    };
    await updateAccount.mutate({ id, data });
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
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese el nuevo nombre de la cuenta" {...field} />
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
        <Button type="submit" disabled={updateAccount.isPending}>
          {updateAccount.isPending ? "Actualizando..." : "Actualizar"}
        </Button>
      </form>
    </Form>
  );
}
