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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";


const formSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 carácters.",
  }),
  type: z.string().min(1, {
    message: "El tipo debe ser valido.",
  }),
})


interface FormProps {
  onClose: () => void,
}

export default function CreateUnitForm({ onClose }: FormProps) {
  const { createBank } = useCreateBank();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
    },
  })
  const { control } = form;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createBank.mutate(values);
    onClose()
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="EJ: Kilogramo, Litro, Mililitro" {...field} />
              </FormControl>
              <FormDescription>
                Este será el nombre de su banco.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input placeholder="EJ: Kg, L, mL" {...field} />
              </FormControl>
              <FormDescription>
                Este será el tipo de su banco.
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
