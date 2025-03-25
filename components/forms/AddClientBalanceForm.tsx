"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AmountInput } from "../misc/AmountInput";
import { Button } from "../ui/button";
import { useUpdateBalance } from "@/actions/administracion/clientes/actions";
import { AxiosError } from "axios";

const formSchema = z.object({
  balance: z.string().min(1, {
    message: "Debe ingresar un monto.",
  }),
});

interface FormProps {
  onClose: () => void;
  id: string;
}

export default function AddClientBalanceForm({ onClose, id }: FormProps) {
  const { updateBalance } = useUpdateBalance();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      balance: "0",
    },
  });
  const { control } = form;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updateBalance.mutateAsync({
        id,
        data,
      });
    } catch (e) {
      console.log(e);
    }
    onClose();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <AmountInput placeholder="EJ: 100$ - 200$, etc..." {...field} />
              </FormControl>
              <FormDescription>
                Este será el saldo a favor que se añadira al cliente.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-primary mt-2 text-white hover:bg-blue-900 disabled:bg-primary/70"
          disabled={updateBalance?.isPending}
          type="submit"
        >
          {updateBalance?.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <p>Registrar</p>
          )}
        </Button>
      </form>
    </Form>
  );
}
