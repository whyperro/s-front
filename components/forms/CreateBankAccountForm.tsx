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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useGetBanks } from "@/hooks/ajustes/globales/bancos/useGetBanks";
import { useCreateBankAccount } from "@/actions/ajustes/banco_cuentas/cuentas/actions";


const formSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 carácters.",
  }),
  account_number: z.string().min(1, {
    message: "El tipo debe ser valido.",
  }),
  account_owner: z.string(),
  account_type: z.string(),
  bank_id: z.string(),
})


interface FormProps {
  onClose: () => void,
}

export default function CreateBankAccountForm({ onClose }: FormProps) {
  const { createBankAccount } = useCreateBankAccount();
  const { data: banks } = useGetBanks()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      account_owner: "",
      account_type: "",
    },
  })
  const { control } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createBankAccount.mutateAsync(values);
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
                <Input placeholder="EJ: Cuenta de TMD, etc..." {...field} />
              </FormControl>
              <FormDescription>
                Este será el nombre de su banco.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="bank_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Banco Perteneciente</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un tipo..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      banks && banks.map((bank) => (
                        <SelectItem value={bank.id.toString()} key={bank.id}>{bank.name}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormDescription>
                  Banco al que pertenecerá la cuenta.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="account_number"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nro. de Cuenta</FormLabel>
                <FormControl>
                  <Input placeholder="EJ: 0713 - XXXX, etc..." {...field} />
                </FormControl>
                <FormDescription>
                  Este será el numero de su cuenta (últimos 4 digítos).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="account_type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tipo de Cuenta</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un tipo..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="AHORRO">Ahorro</SelectItem>
                    <SelectItem value="CORRIENTE">Corriente</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Este sera el tipo de su banco.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="account_owner"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tipo de Owner</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un tipo..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={'NATURAL'}>Natural</SelectItem>
                    <SelectItem value={'JURIDICA'}>Juridica</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Tipo de owner de la cuenta.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="bg-primary mt-2 text-white hover:bg-blue-900 disabled:bg-primary/70" disabled={createBankAccount?.isPending} type="submit">
          {createBankAccount?.isPending ? <Loader2 className="size-4 animate-spin" /> : <p>Crear</p>}
        </Button>
      </form>
    </Form>
  )
}
