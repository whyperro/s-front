"use client";

import {
  useCreateRoute,
  useGetRoute,
  useUpdateRoute,
} from "@/actions/administracion/rutas/actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Route } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MinusCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const formSchema = z.object({
  from: z.string({
    message: "Debe seleccionar un origen.",
  }).min(3, {
    message: "El origen debe tener al menos 3 caracteres.",
  }).max(30, {
    message: "El origen tiene un máximo 30 caracteres.",
  }),
  to: z.string({
    message: "Debe seleccionar un destino.",
  }).min(3, {
    message: "El destino debe tener al menos 3 caracteres.",
  }).max(30, {
    message: "El destino tiene un máximo 30 caracteres.",
  }),
  layovers: z.string()
    .refine(value => {      
      if (!value) return true; // Si no hay escalas (valor undefined o vacío), es válido
          
      const isOnlyNumbers = /^\d+$/.test(value.replace(/,/g, '').trim()); // Verifica que no sean solo números
      return !isOnlyNumbers;
    }, {
      message: "Las escalas no pueden contener solo números.",
    })
    .refine(value => {
      if (!value) return true;
      
      // Verifica que cada escala tenga al menos 3 caracteres
      const layovers = value.split(',').map(l => l.trim());
      return layovers.every(l => l.length >= 3);
    }, {
      message: "Cada escala debe tener al menos 3 caracteres.",
    })
    .optional(),
});

interface FormProps {
  onClose: () => void;
  isEditing?: boolean;
  id?: string;
}

type layoversField = {
  id: number;
  value: string;
};

const RouteForm = ({ id, onClose, isEditing = false }: FormProps) => {
  const [initialValues, setInitialValues] = useState<Route | null>(null);
  const [checked, setChecked] = useState(false);
  const { updateRoute } = useUpdateRoute();
  const { createRoute } = useCreateRoute();
  const { data } = useGetRoute(id ?? null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: initialValues?.from ?? "",
      to: initialValues?.to ?? "",
      layovers: initialValues?.layovers ?? undefined,
    },
  });
  const { control } = useForm();

  // Estado para almacenar los campos de escala
  const [layoversFields, setScaleFields] = useState<layoversField[]>([
    {
      id: Date.now(),
      value: "",
    },
  ]);

  useEffect(() => {
    if (data) {
      setInitialValues(data);
      form.setValue("from", data.from);
      form.setValue("to", data.to);
      form.setValue("layovers", data.layovers ?? undefined);
    }
  }, [data, form]);

  const onAddInput = () => {
    setScaleFields([...layoversFields, { id: Date.now(), value: "" }]);
  };

  const onRemoveInput = (index: number) => {
    if (layoversFields.length > 1) {
      // Prevent removing the last field
      setScaleFields((prevFields) => prevFields.filter((_, i) => i !== index));
    }
  };

  const handleInputChange = (id: number, value: string) => {
    setScaleFields((prevFields) => {
      const updatedFields = prevFields.map((field) =>
        field.id === id ? { ...field, value } : field
      );
      const layoversValues = updatedFields
        .map((field) => field.value)
        .filter(Boolean);
      form.setValue("layovers", layoversValues.join(", "));

      return updatedFields; // Return updated fields
    });
  };

  const onSubmitRoute = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      if (isEditing && initialValues) {
        await updateRoute.mutateAsync({
          id: initialValues.id.toString(),
          from: values.from,
          to: values.to,
          layovers: values.layovers ?? undefined,
        });
      } else {
        await createRoute.mutateAsync(values);
      }
      form.reset(); // Reset form after successful submission
      onClose();
    } catch (error) {
      console.error(error); // Log the error for debugging
      toast.error("Error al guardar el vuelo", {
        description: "Ocurrió un error, por favor intenta nuevamente.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitRoute)}
        className="mx-auto grid gap-6"
      >
        <div className="grid gap-4">
          <div className="flex flex-col gap-4 w-full justify-center">
            <div className="flex items-center space-x-2">
              <Checkbox
                onCheckedChange={() => setChecked(!checked)}
                id="layovers"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="layovers"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  ¿Tiene escalas?
                </label>
              </div>
            </div>
          </div>

          <div
            className={cn("flex gap-2 items-center", checked ? "flex-col" : "")}
          >
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="w-auto">
                    <FormLabel>Origen</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese la salida" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem className="w-auto">
                    <FormLabel>Destino</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese la llegada" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {checked && (
              <>
                <div className="flex gap-2 items-center p-2">
                  <MinusCircle
                    className="size-4 cursor-pointer hover:layovers-125 transition-all ease-in duration-100"
                    onClick={() => onRemoveInput(layoversFields.length - 1)} // Get the last field's index
                  />
                  <Label>Escala(s)</Label>
                  <PlusCircle
                    className="size-4 cursor-pointer hover:layovers-125 transition-all ease-in duration-100"
                    onClick={() => onAddInput()}
                  />
                </div>
                <div
                  className={cn(
                    "grid grid-cols-1 gap-2",
                    layoversFields.length > 1 ? "grid-cols-2" : ""
                  )}
                >
                  {layoversFields.map((field) => (
                    <FormField
                      key={field.id}
                      control={control}
                      name={`layovers-${field.id}`} // Nombre único para cada campo
                      render={({ field: inputField }) => (
                        <FormItem className="w-auto">
                          <FormControl>
                            <Input
                              placeholder="Ingrese la escala"
                              {...inputField}
                              onChange={(e) => {
                                inputField.onChange(e); // Mantiene la funcionalidad de react-hook-form
                                handleInputChange(field.id, e.target.value); // Maneja el cambio del input
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <Button
            disabled={createRoute.isPending || updateRoute.isPending}
            type="submit"
            className="w-full"
          >
            {createRoute.isPending || updateRoute.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <p>{isEditing ? "Actualizar" : "Registrar"}</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RouteForm;
