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
import { useGetClients } from "@/hooks/administracion/useGetClients";
import { useGetAircrafts } from "@/hooks/administracion/useGetAircrafts";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";

const formSchema = z.object({
  client_id: z.string(),
  route_id: z.string(),
  aircraft_id: z.string(),
  date: z.date({
    required_error: "La fecha de vuelo es requerida",
  }),
  details: z.string(),
  fee: z.string(),
  type: z.enum(["CARGA", "PAX", "CHART"]),
  debt_status: z.enum(["PENDIENTE", "PAGADO"]),
  total_amount: z
    .string()
    .min(1, "El monto total es requerido")
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) >= 0, {
      message: "El monto total no puede ser negativo",
    }),
  payed_amount: z
    .string()
    .min(1, "El monto pagado es requerido")
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) >= 0, {
      message: "El monto pagado no puede ser negativo",
    }),
});

interface FormProps {
  onClose: () => void;
}

export function FlightForm({ onClose }: FormProps) {
  const { createFlight } = useCreateFlight();
  const { data: routes, isLoading: isRouteLoading, isError } = useGetRoute();
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
    let newAmount = 0;
    const fee = parseFloat(form.watch("fee"));
    if (Number(kg) >= 0) {
      newAmount = (parseFloat(kg) ?? 0) * fee;
    } else {
      newAmount = 0 * fee;
    }
    form.setValue("total_amount", newAmount.toString());
  }, [kg, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues = {
      ...values,
      fee: Number(values.fee),
      total_amount: Number(values.total_amount),
      payed_amount: Number(values.payed_amount),
    };
    await createFlight.mutateAsync(formattedValues);
    onClose();
  }

  const debtStatus = form.watch("debt_status");

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
                <FormLabel>Avión</FormLabel>
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
        </div>
        <div className="flex gap-2 items-center justify-center">
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
          <FormField
            control={form.control}
            name="total_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio a Cobrar</FormLabel>
                <FormControl>
                  <AmountInput
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
            rules={{
              validate: (value) => {
                const amount = parseFloat(value);
                return amount >= 0 || "El monto total no puede ser negativo";
              },
            }}
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
              rules={{
                validate: (value) => {
                  const totalAmount = parseFloat(
                    form.getValues("total_amount")
                  );
                  const payedAmount = parseFloat(value);
                  return (
                    payedAmount <= totalAmount ||
                    "El monto pagado no puede ser mayor que el monto total"
                  );
                },
              }}
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
