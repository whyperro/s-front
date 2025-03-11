'use client';
import { useCreateBank } from "@/actions/ajustes/banco_cuentas/bancos/actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateSlug } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";


const formSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 carácters.",
  }),
  email: z.string().min(3, {
    message: "El nombre debe tener al menos 3 carácters.",
  }),
  phone_number: z.string(),
  address: z.string(),
})


interface FormProps {
  onClose: () => void,
}

export default function CreateHClientForm({ onClose }: FormProps) {
  const { createBank } = useCreateBank();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      address: "",
    },
  })
  const { control } = form;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    onClose()
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
                Nombre de su cliente.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input placeholder="example@example.com" {...field} />
              <FormDescription>
                Correo de contacto de su cliente.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input placeholder="+58424XXXXXX" {...field} />
              <FormDescription>
                Número de contacto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación</FormLabel>
              <Input placeholder="..." {...field} />
              <FormDescription>
                Ubicación fiscal de su cliente.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-primary mt-2 text-white hover:bg-blue-900 disabled:bg-primary/70" disabled={createBank?.isPending} type="submit">
          {createBank?.isPending ? <Loader2 className="size-4 animate-spin" /> : <p>Crear</p>}
        </Button>
      </form>
    </Form>
  )
}
