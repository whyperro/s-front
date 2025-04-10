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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { useCreateFollowUpControl } from "@/actions/sms/controles_de_seguimiento/actions";
import { Separator } from "@radix-ui/react-select";
import { useParams } from "next/navigation";
import { Textarea } from "../ui/textarea";

const FormSchema = z.object({
  description: z
    .string()
    .min(3, { message: "La observacion debe tener al menos 3 caracteres" })
    .max(75, { message: "La observacion no puede exceder los 75 caracteres" }),

  date: z
    .date()
    .refine((val) => !isNaN(val.getTime()), { message: "Invalid Date" }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface FormProps {
  id: number | string;
  onClose: () => void;
}

export default function CreateFollowUpControlForm({ onClose, id }: FormProps) {
  const { plan_id, medida_id } = useParams<{
    plan_id: string;
    medida_id: string;
  }>();
  const { createFollowUpControl } = useCreateFollowUpControl();
  //console.log("PLAN ID", plan_id);
  //console.log("MEDIDA ID", medida_id);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: { date: new Date() },
  });

  const onSubmit = async (data: FormSchemaType) => {
    const values = {
      ...data,
      mitigation_measure_id: id,
    };
    console.log(values);
    await createFollowUpControl.mutateAsync(values);

    onClose();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
        <FormLabel className="text-lg text-center m-2">
          Control de Seguimiento
        </FormLabel>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion del Control</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
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
        <Button>Enviar </Button>
      </form>
    </Form>
  );
}
