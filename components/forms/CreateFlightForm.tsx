"use client";

import { useCreateFlight } from "@/actions/administracion/vuelos/actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AmountInput } from "../misc/AmountInput";
import { useGetRoute } from "@/hooks/administracion/useGetRoutes";
import { useGetClients } from "@/hooks/administracion/clientes/useGetClients";
import { useGetAircrafts } from "@/hooks/administracion/useGetAircrafts";
import { useGetBankAccounts } from "@/hooks/ajustes/cuentas/useGetBankAccounts";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const formSchema = z
  .object({
    client_id: z.string({
      message: "Debe elegir un cliente.",
    }),
    route_id: z.string({
      message: "Debe elegir una ruta.",
    }),
    aircraft_id: z.string({
      message: "Debe elegir un avión.",
    }),
    date: z.date({
      required_error: "La fecha de vuelo es requerida",
    }),
    details: z
      .string()
      .min(3, {
        message: "Los detalles deben tener al menos 3 caracteres.",
      })
      .max(100, {
        message: "Los detalles tiene un máximo 100 caracteres.",
      }),
    fee: z
      .string()
      .min(1, "La tasa es requerida")
      .refine(
        (val) => {
          const number = parseFloat(val);
          return !isNaN(number) && number >= 0;
        },
        {
          message: "La tasa debe ser mayor a cero.",
        }
      )
      .optional(), // Hacer que la tasa sea opcional
    type: z.enum(["CARGA", "PAX", "CHART"], {
      message: "Debe elegir un tipo de vuelo.",
    }),
    bank_account_id: z.string().optional(),
    debt_status: z.enum(["PENDIENTE", "PAGADO"], {
      message: "Debe elegir un estado de vuelo.",
    }),
    pay_method: z.enum(["EFECTIVO", "TRANSFERENCIA"], {
      message: "Debe elegir un método de pago.",
    }),
    total_amount: z
      .string()
      .min(1, "El monto total es requerido")
      .refine((value) => parseFloat(value) >= 0, {
        message: "El monto total debe ser mayor que cero",
      }),
    payed_amount: z
      .string()
      .min(1, "El monto pagado es requerido")
      .refine((value) => parseFloat(value) >= 0, {
        message: "El monto pagado no puede ser negativo",
      }),
  })
  .refine(
    (data) => {
      const totalAmount = parseFloat(data.total_amount);
      const payedAmount = parseFloat(data.payed_amount);
      return payedAmount <= totalAmount;
    },
    {
      message: "El monto pagado no puede ser mayor que el precio a cobrar",
      path: ["payed_amount"], // Esto indica que el error se mostrará en el campo payed_amount
    }
  );
interface FormProps {
  onClose: () => void;
}

export function FlightForm({ onClose }: FormProps) {
  const { createFlight } = useCreateFlight();
  const { data: routes, isLoading: isRouteLoading, isError } = useGetRoute();
  const { data: accounts, isLoading: isAccLoading } = useGetBankAccounts();
  const [kg, setKg] = useState("0");
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
    defaultValues: {
      total_amount: "0",
      payed_amount: "0",
      fee: "0",
    },
  });

  useEffect(() => {
    const total = Number(form.watch("total_amount"));
    const payed = Number(form.watch("payed_amount"));
    if (payed > total) {
      form.setValue("payed_amount", total.toString());
    }
    console.log(total, payed);
  }, [form]);

  useEffect(() => {
    if (form.watch("type") !== "CHART") {
      let newAmount = 0;
      const feeString = form.watch("fee") || "0"; // Proporciona un valor predeterminado si es undefined
      const fee = parseFloat(feeString);

      if (parseFloat(kg) >= 0) {
        newAmount = (parseFloat(kg) ?? 0) * fee;
      } else {
        newAmount = 0 * fee;
      }
      form.setValue("total_amount", newAmount.toString());
    }
  }, [kg, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("clkick");
    const formattedValues = {
      ...values,
      fee: values.type === "CHART" ? 0 : Number(values.fee),
      total_amount: Number(values.total_amount),
      payed_amount: Number(values.payed_amount),
    };
    await createFlight.mutateAsync(formattedValues);
    onClose();
  }

  const debtStatus = form.watch("debt_status");
  console.log(form.getValues());
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
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2.5">
                <FormLabel>Fecha</FormLabel>
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
                      disabled={
                        (date) => date < new Date("1999-07-21") // Solo deshabilita fechas muy antiguas
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <FormField
            control={form.control}
            name="route_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ruta</FormLabel>
                <Select
                  disabled={isRouteLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una ruta" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {routes &&
                      routes.map((route) => (
                        <SelectItem key={route.id} value={route.id.toString()}>
                          {route.from} - {route.to}
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
            name="aircraft_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aeronave</FormLabel>
                <Select
                  disabled={isAircraftLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un Avión" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {aircrafts &&
                      aircrafts.map((aircraft) => (
                        <SelectItem
                          key={aircraft.id}
                          value={aircraft.id.toString()}
                        >
                          {aircraft.brand} - {aircraft.acronym}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tipo de vuelo</FormLabel>
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
                    <SelectItem value="CARGA">Carga</SelectItem>
                    <SelectItem value="PAX">Pasajeros</SelectItem>
                    <SelectItem value="CHART">Reserva Privada</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {form.watch("type") !== "CHART" && (
            <FormField
              control={form.control}
              name="fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tasa</FormLabel>
                  <FormControl>
                    <AmountInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="flex gap-2 items-center justify-center">
          {(form.watch("type") === "CARGA" || form.watch("type") === "PAX") && (
            <div className="space-y-2">
              <Label>
                {form.watch("type") === "CARGA" ? "KG" : " # Pasajeros"}
              </Label>
              <Input
                defaultValue={"0"}
                onChange={(e) => setKg(e.target.value)}
                type="number"
              />
            </div>
          )}
          <FormField
            control={form.control}
            name="total_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio a Cobrar</FormLabel>
                <FormControl>
                  <AmountInput
                    disabled={
                      form.watch("type") === "CARGA" ||
                      form.watch("type") === "PAX"
                    } // Deshabilitar si es CARGA o PAX
                    defaultValue="0"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      form.trigger("payed_amount");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <FormField
            control={form.control}
            name="debt_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo de uso" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                    <SelectItem value="PAGADO">Pagado</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {debtStatus !== "PAGADO" && (
            <FormField
              control={form.control}
              name="payed_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto Pagado</FormLabel>
                  <FormControl>
                    <AmountInput
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        form.trigger("payed_amount");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
                  <Select
                    disabled={isAccLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isAccLoading ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              "Seleccione el tipo..."
                            )
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accounts &&
                        accounts.map((acc) => (
                          <SelectItem value={acc.id.toString()} key={acc.id}>
                            {acc.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detalle</FormLabel>
              <FormControl>
                <Input placeholder="Cantidad de personas o Kg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createFlight.isPending}>
          {createFlight.isPending ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Form>
  );
}
