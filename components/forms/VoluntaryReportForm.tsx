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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

const FormSchema = z.object({
  identification_date: z
    .date()
    .refine((val) => !isNaN(val.getTime()), { message: "Invalid Date" }),
  report_date: z
    .date()
    .refine((val) => !isNaN(val.getTime()), { message: "Invalid Date" }),

  identification_area: z.enum([
    "Operacional",
    "Mantenimiento",
    "Administracion y RRHH",
    "Control de calidad",
    "Tecnologia e informacion",
  ]),
  danger_place: z.string(),
  description: z.string(),
  consequences: z.string(),
  name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z
    .string()
    .regex(/^\d{11}$/, {
      message: "El número telefónico debe tener exactamente 11 dígitos",
    })
    .optional(),
  email: z.string().email().optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface FormProps {
  onClose: () => void;
}
// { onClose }: FormProps
// lo de arriba va en prop
export function VoluntaryReportForm() {
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const options = [
    { value: "Operacional" },
    { value: "Mantenimiento" },
    { value: "Administracion y RRHH" },
    { value: "Control de calidad" },
    { value: "Tecnologia e informacion" },
  ];

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {

    },
  });

  const onSubmit = (data: FormSchemaType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
        <FormLabel className="text-lg text-center m-2">
          Identificacion de peligro
        </FormLabel>
       
        <div className="flex justify-between items-center gap-x-4">
          <Separator className="flex-1" />
          <p className="text-muted-foreground">SIGEAC</p>
          <Separator className="flex-1" />
        </div>
        <Button>Enviar reporte</Button>
      </form>
    </Form>
  );
}
