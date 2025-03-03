"use client";

import { useCreateFlightPayments } from "@/actions/administracion/pagos/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale/es";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetClients } from "@/hooks/administracion/useGetClients";
import { useGetAircrafts } from "@/hooks/administracion/useGetAircrafts";

const formSchema = z.object({
  bank_acount_id: z.string().optional(),
  pay_method: z.enum(["EFECTIVO", "TARJETA", "TRANSFERENCIA"]),
  pay_amount: z.string(),
  payment_date: z.date({
    required_error: "La fecha de vuelo es requerida",
  }),
  pay_description: z.string(),
});

interface FormProps {
  onClose: () => void;
}

export function FlightPaymentsModifiedForm({ onClose }: FormProps) {
  const { createFlightPayments } = useCreateFlightPayments();
  const {
      data: clients,
      isLoading: isClientsLoading,
      isError: isClientsError,
    } = useGetClients();
  const {
    data: aircrafts, isLoading: isAircraftLoading, isError: isAircraftError,
  } = useGetAircrafts(); 
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {},
    });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createFlightPayments.mutateAsync(values);
    onClose();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
        <div className="flex gap-2 items-center justify-center">
          <FormField
            control={form.control}
            name="pay_method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Método de Pago</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo de vuelo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EFECTIVO">Efectivo</SelectItem>
                    <SelectItem value="TRANSFERENCIA">Transferencia</SelectItem>
                    <SelectItem value="TARJETA">Tarjeta</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {
            form.watch("pay_method") !== "EFECTIVO" && (
            <FormField
            control={form.control}
            name="bank_acount_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuenta de Banco</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese la cuenta de banco " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />)
          }
        </div>
        <FormField
          control={form.control}
          name="pay_amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad Pagada</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el monto cancelado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payment_date"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-2.5">
              <FormLabel>Fecha de Pago</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", {
                          locale: es,
                        })
                      ) : (
                        <span>Seleccione una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1999-07-21")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pay_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Detalle/Descripción" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createFlightPayments.isPending}>
          {createFlightPayments.isPending ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Form>
  );
}
