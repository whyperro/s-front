"use client";

import { useCreateCashMovement } from "@/actions/administracion/movimientos/actions";
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
import { useGetCash } from "@/hooks/administracion/useGetCash";
import { useGetEmployeesByCompany } from "@/hooks/administracion/useGetEmployees";
import { useGetAdministrationCompany } from "@/hooks/administracion/useGetAdministrationCompany";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGetBankAccounts } from "@/hooks/ajustes/cuentas/useGetBankAccounts";
import { Loader2 } from "lucide-react";
import { AdministrationCompany } from "@/types";
import { useGetVendors } from "@/hooks/ajustes/globales/proveedores/useGetVendors";
import { useGetClients } from "@/hooks/administracion/clientes/useGetClients";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

const formSchema = z.object({
  responsible_id: z.string({
    message: "Debe elegir un responsable.",
  }),
  cash_id: z.string({
    message: "Debe elegir una caja.",
  }),
  vendor_id: z
    .string({
      message: "Debe elegir un beneficiario.",
    })
    .optional(),
  client_id: z
    .string({
      message: "Debe elegir un cliente.",
    })
    .optional(),
  date: z.date({
    required_error: "La fecha es requerida",
  }),
  type: z.enum(["INCOME", "OUTPUT"]),
  account: z
    .string()
    .min(2, {
      message: "La cuenta debe tener al menos 2 caracteres.",
    })
    .max(100, {
      message: "La cuenta tiene un máximo 100 caracteres.",
    }),
  category: z
    .string()
    .min(2, {
      message: "La categoría debe tener al menos 2 caracteres.",
    })
    .max(100, {
      message: "La categoría tiene un máximo 100 caracteres.",
    }),
  sub_category: z
    .string()
    .min(2, {
      message: "La sub categoría debe tener al menos 2 caracteres.",
    })
    .max(100, {
      message: "La sub categoría tiene un máximo 100 caracteres.",
    }),
  sub_category_details: z
    .string()
    .min(2, {
      message:
        "El detalle de la sub categoría debe tener al menos 2 caracteres.",
    })
    .max(100, {
      message: "El detalle de la sub categoría tiene un máximo 100 caracteres.",
    }),
  amount: z.string().refine(
    (val) => {
      // Convertir el valor a número y verificar que sea positivo
      const number = parseFloat(val);
      return !isNaN(number) && number > 0;
    },
    {
      message: "El monto debe ser mayor a cero.",
    }
  ),
  bank_account_id: z
    .union([
      z.string().min(1, { message: "Debe seleccionar una cuenta válida" }),
      z.null()
    ])
    .refine(
      (val) => val !== undefined, 
      { message: "Debe seleccionar una opción" }
    )
    .transform(val => val === "" ? null : val) // Transforma "" a null
});

interface FormProps {
  onClose: () => void;
}

export function CreateCashMovementForm({ onClose }: FormProps) {
  const { createCashMovement } = useCreateCashMovement();
  const {
    data: employees,
    mutate,
    isPending: isEmployeesLoading,
  } = useGetEmployeesByCompany();
  const { data: companies, isLoading: isCompaniesLoading } =
    useGetAdministrationCompany();
  const { data: cashes, isLoading: isCashesLoading } = useGetCash();
  const { data: accounts, isLoading: isAccLoading } = useGetBankAccounts();
  const { data: vendors, isLoading: isVendorLoading } = useGetVendors();
  const { data: clients, isLoading: isClientLoading } = useGetClients();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  useEffect(() => {
    mutate("transmandu");
  }, [mutate]);

  console.log(form.getValues());

  async function onSubmit(values: z.infer<typeof formSchema>) {
    createCashMovement.mutate(values, {
      onSuccess: () => {
        onClose(); // Cierra el modal solo si la creación fue exitosa
      },
    });
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
                      selected={field.value ? new Date(field.value) : undefined}
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
            name="cash_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caja</FormLabel>
                <Select
                  disabled={isCashesLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione la caja" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cashes &&
                      cashes.map((cash) => (
                        <SelectItem key={cash.id} value={cash.id.toString()}>
                          {cash.name}
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Transacción</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Ingreso/Egreso" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="INCOME">Ingreso</SelectItem>
                    <SelectItem value="OUTPUT">Egreso</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {form.watch("type") === "OUTPUT" && (
            <FormField
              control={form.control}
              name="vendor_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beneficiario</FormLabel>
                  <Select
                    disabled={isVendorLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vendors &&
                        vendors.map((vendor) => (
                          <SelectItem
                            key={vendor.id}
                            value={vendor.id.toString()}
                          >
                            {vendor.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {form.watch("type") === "INCOME" && (
            <FormField
              control={form.control}
              name="client_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <Select
                    disabled={isClientLoading}
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
          )}
        </div>
        <div className="flex gap-2 items-center justify-center">
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuenta</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese la cuenta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese la categoría" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <FormField
            control={form.control}
            name="sub_category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategoría</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese la subcategoría" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sub_category_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detalles</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese los detalles" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4 items-center ">
          <div className="flex-1 min-w-[200px]">
            <FormField
              control={form.control}
              name="responsible_id"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col space-y-3 mt-1.5">
                  <FormLabel>Responsable</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={isEmployeesLoading}
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {isEmployeesLoading && (
                            <Loader2 className="size-4 animate-spin mr-2" />
                          )}
                          {field.value ? (
                            <p>
                              {
                                employees?.find(
                                  (employee) =>
                                    employee.id.toString() === field.value
                                )?.first_name
                              }{" "}
                              {
                                employees?.find(
                                  (employee) =>
                                    employee.id.toString() === field.value
                                )?.last_name
                              }
                            </p>
                          ) : (
                            "Elige al responsable..."
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Busque un responsable..." />
                        <CommandList>
                          <CommandEmpty className="text-sm p-2 text-center">
                            No se ha encontrado ningún empleado.
                          </CommandEmpty>
                          <CommandGroup>
                            {employees?.map((employee) => (
                              <CommandItem
                                value={`${employee.first_name} ${employee.last_name}`}
                                key={employee.id}
                                onSelect={() => {
                                  form.setValue(
                                    "responsible_id",
                                    employee.id.toString()
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    `${employee.first_name} ${employee.last_name}` ===
                                      field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {
                                  <p>
                                    {employee.first_name} {employee.last_name}
                                  </p>
                                }
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto Final</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el monto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bank_account_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuenta de Banco</FormLabel>
              <Select
                disabled={isAccLoading}
                onValueChange={field.onChange}
                defaultValue={field.value === null ? "" : field.value }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        isAccLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Seleccione una cuenta..."
                        )
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* Opción de Efectivo */}
                  <SelectItem value="null">Efectivo</SelectItem>

                  {/* Cuentas bancarias */}
                  {accounts &&
                    accounts.map((acc) => (
                      <SelectItem value={acc.id.toString()} key={acc.id}>
                        {acc.name} - {acc.bank.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createCashMovement.isPending}>
          {createCashMovement.isPending ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Form>
  );
}
