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
  bank_account_id: z.string({
    message: "Debe elegir una cuenta de banco.",
  }).optional(),
  flight_id: z.string({
    message: "Debe elegir un vuelo.",
  }),
  client_id: z.string({
    message: "Debe elegir un cliente.",
  }),
  pay_method: z.enum(["EFECTIVO", "TRANSFERENCIA"], {
    message: "Debe elegir un método de pago.",
  }),
  pay_amount: z.string(),
  payment_date: z.date({
    required_error: "La fecha de vuelo es requerida",
  }),
  pay_description: z.string().min(3, {
    message: "Los detalles del pago deben tener al menos 3 caracteres.",
  }).max(30, {
    message: "Los detalles del pago tiene un máximo 30 caracteres.",
  }),
});

interface FormProps {
  onClose: () => void;
}

export function FlightPaymentsForm({ onClose }: FormProps) {
  const { createFlightPayments } = useCreateFlightPayments();
  const {
    data: clients,
    isLoading: isClientsLoading,
    isError: isClientsError,
  } = useGetClients();
  const {
    data: aircrafts,
    isLoading: isAircraftLoading,
    isError: isAircraftError,
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
            name="client_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente</FormLabel>
                <Select
                  disabled={isClientsLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un Cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients &&
                      clients.map((client) => (
                        <SelectItem
                          key={client.id}
                          value={client.id.toString()}
                        >
                          {client.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="flight_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vuelo</FormLabel>
                <Select
                  disabled={isAircraftLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un Vuelo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {aircrafts &&
                      aircrafts.map((aircraft) => (
                        <SelectItem
                          key={aircraft.id}
                          value={aircraft.id.toString()}
                        >
                          {aircraft.acronym}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {form.watch("pay_method") !== "EFECTIVO" && (
            <FormField
              control={form.control}
              name="bank_account_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuenta de Banco</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese la cuenta de banco "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
