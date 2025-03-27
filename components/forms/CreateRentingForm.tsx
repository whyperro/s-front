"use client";

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
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateRenting } from "@/actions/administracion/renta/actions";
import { useGetAircrafts } from "@/hooks/administracion/useGetAircrafts";
import { useGetClients } from "@/hooks/administracion/useGetClients";
import { useGetAdministrationArticle } from "@/hooks/administracion/useGetAdministrationArticle";
import { Calendar } from "../ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  description: z
    .string()
    .min(2, {
      message: "La descripción debe tener al menos 2 caracteres.",
    })
    .max(100, {
      message: "La descripción tiene un máximo 100 caracteres.",
    }),
  status: z.enum(["EN PROCESO", "CULMINADO", "RETRASADO"]),
  type: z.enum(["AERONAVE", "ARTICULO"]),
  price: z.string().refine(
    (val) => {
      const number = parseFloat(val);
      return !isNaN(number) && number > 0;
    },
    {
      message: "El monto debe ser mayor a cero.",
    }
  ),
  payed_amount: z.string().refine(
    (val) => {
      const number = parseFloat(val);
      return !isNaN(number) && number >= 0;
    },
    {
      message: "El monto debe ser un número válido.",
    }
  ),
  start_date: z.date({
    required_error: "La fecha de inicio es requerida",
  }),
  end_date: z.date({
    required_error: "La fecha final es requerida",
  }).optional(),
  deadline: z.date({
    required_error: "La fecha límite es requerida",
  }),
  client_id: z.string({
    message: "Debe elegir un cliente.",
  }),
  aircraft_id: z.string({
    message: "Debe elegir una aeronave.",
  }).optional(),
  article_id: z.string({
    message: "Debe elegir un articulo.",
  }).optional(),
}).refine(
  (data) => {
    const price = parseFloat(data.price);
    const payedAmount = parseFloat(data.payed_amount);
    return payedAmount <= price;
  },
  {
    message: "El monto pagado no puede ser mayor que el precio total",
    path: ["payed_amount"],
  }
).refine(
  (data) => !data.start_date || !data.deadline || data.deadline >= data.start_date,
  {
    message: "La fecha límite debe ser posterior a la fecha de inicio",
    path: ["deadline"],
  }
);

interface FormProps {
  onClose: () => void;
}

export function CreateRentingForm({ onClose }: FormProps) {
  const { createRenting } = useCreateRenting();
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
  const {
    data: articles,
    isLoading: isArticlesLoading,
    isError: isArticlesError,
  } = useGetAdministrationArticle();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createRenting.mutateAsync(values);
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
            name="start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2.5">
                <FormLabel>Fecha Inicio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[200px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", {
                            locale: es,
                          })
                        ) : (
                          <span>Seleccione</span>
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
        {/*  <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2.5">
                <FormLabel>Fecha Final</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[130px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", {
                            locale: es,
                          })
                        ) : (
                          <span>Seleccione </span>
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
          /> */}
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2.5">
                <FormLabel>Fecha Límite</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[200px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", {
                            locale: es,
                          })
                        ) : (
                          <span>Seleccione </span>
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
                      disabled={(date) => false}  // Permite TODAS las fechas (pasadas y futuras)
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
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EN PROCESO">En Proceso</SelectItem>
                    <SelectItem value="CULMINADO">Culminado</SelectItem>
                    <SelectItem value="RETRASADO">Retrasado</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="AERONAVE">Aeronave</SelectItem>
                    <SelectItem value="ARTICULO">Artículo</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese el precio" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="payed_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto Pagado</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese el monto" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
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
                      <SelectValue placeholder="Seleccione" />
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
          {form.watch("type") !== "ARTICULO" && (
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
                        <SelectValue placeholder="Seleccione" />
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
          )}
          {form.watch("type") !== "AERONAVE" && (
            <FormField
              control={form.control}
              name="article_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artículo</FormLabel>
                  <Select
                    disabled={isArticlesLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {articles &&
                        articles.map((article) => (
                          <SelectItem
                            key={article.id}
                            value={article.id.toString()}
                          >
                            {article.name}
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese alguna descripción" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createRenting.isPending}>
          {createRenting.isPending ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Form>
  );
}
