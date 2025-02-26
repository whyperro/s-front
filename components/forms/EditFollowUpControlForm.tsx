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

import {
  useCreateToolBox,
  useUpdateToolBox,
} from "@/actions/almacen/inventario/caja_herramientas/actions";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useGetEmployeesForBox } from "@/hooks/almacen/useGetEmployeeForBox";
import { useGetEditToolBoxTools } from "@/hooks/almacen/useGetToolBoxTools";
import { cn } from "@/lib/utils";
import { useCompanyStore } from "@/stores/CompanyStore";
import {
  Article,
  Batch,
  FollowUpControl,
  InformationSource,
  ToolBox,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "../ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { useUpdateInformationSource } from "@/actions/sms/tipos_fuente/actions";
import { useUpdateFollowUpControl } from "@/actions/sms/controles_de_seguimiento/actions";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { es } from "date-fns/locale";

const FormSchema = z.object({
  description: z.string(),
  date: z
    .date()
    .refine((val) => !isNaN(val.getTime()), { message: "Invalid Date" }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface FormProps {
  onClose: () => void;
  initialData: FollowUpControl;
}

export function EditFollowUpControlForm({ onClose, initialData }: FormProps) {
  const { updateFollowUpControl } = useUpdateFollowUpControl();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: initialData.description || "",
      date: initialData.date || new Date(),
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    const formattedData = {
      ...data,
      id: initialData.id.toString(),
    };
    await updateFollowUpControl.mutateAsync(formattedData);
    onClose();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >

<FormLabel className="text-lg text-center">
          Formulario de Control de Seguimiento
        </FormLabel>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion del Control</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-2.5">
              <FormLabel>Fecha del Control</FormLabel>
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
                        <span>Seleccione una fecha...</span>
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
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center gap-x-4">
          <Separator className="flex-1" />
          <p className="text-muted-foreground">SIGEAC</p>
          <Separator className="flex-1" />
        </div>
        <Button disabled={updateFollowUpControl.isPending}>
          {updateFollowUpControl.isPending ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            "Actualizar Control de Seguimiento"
          )}
        </Button>
      </form>
    </Form>
  );
}
