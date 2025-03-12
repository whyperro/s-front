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
import { useGetCompanies } from "@/hooks/useGetCompanies";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGetBankAccounts } from "@/hooks/ajustes/cuentas/useGetBankAccounts";
import { Loader2 } from "lucide-react";
import { Company } from "@/types";
import { useGetVendors } from "@/hooks/ajustes/globales/proveedores/useGetVendors";

const formSchema = z.object({
  responsible_id: z.string({
    message: "Debe elegir un responsable.",
  }),
  cash_id: z.string({
    message: "Debe elegir una caja.",
  }),
  company_id: z.string({
    message: "Debe elegir una compañía.",
  }),
  vendor_id: z.string({
    message: "Debe elegir un beneficiario.",
  }),
  date: z.date({
    required_error: "La fecha es requerida",
  }),
  income_or_output: z.enum(["INCOME", "OUTPUT"]),
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
  bank_account_id: z.string({
    message: "Debe elegir una cuenta de banco.",
  }),
});

interface FormProps {
  onClose: () => void;
}

export function CreateCashMovementForm({ onClose }: FormProps) {
  const { createCashMovement } = useCreateCashMovement();
  const {
    data: emp,
    mutate,
    isPending: isEmployeesPending,
  } = useGetEmployeesByCompany();
  const { data: companies, isLoading: isCompaniesLoading } = useGetCompanies();
  const { data: cashes, isLoading: isCashesLoading } = useGetCash();
  const { data: accounts, isLoading: isAccLoading } = useGetBankAccounts();
  const { data: vendors, isLoading: isVendorLoading } = useGetVendors();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const company = form.watch("company_id");
  useEffect(() => {
    if (company) {
      const company_name = companies!
        .find((c) => c.id.toString() === company)!
        .name.split(" ")
        .join("")
        .toLowerCase();
      mutate(company_name);
    }
  }, [form, mutate, company]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createCashMovement.mutateAsync(values);
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
            name="company_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa</FormLabel>
                <Select
                  disabled={isCompaniesLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companies &&
                      companies.map((company) => (
                        <SelectItem
                          key={company.id}
                          value={company.id.toString()}
                        >
                          {company.name}
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
            name="income_or_output"
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
        <div className="flex gap-2 items-center justify-center">         
            <FormField
              control={form.control}
              name="responsible_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsable</FormLabel>
                  <Select
                    disabled={isEmployeesPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {emp &&
                        emp.map((e) => (
                          <SelectItem key={e.id} value={e.id.toString()}>
                            {e.first_name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          {form.watch("income_or_output") === "OUTPUT" && (
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
                defaultValue={field.value}
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
