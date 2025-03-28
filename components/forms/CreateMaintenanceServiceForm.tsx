'use client';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useGetManufacturers } from "@/hooks/ajustes/globales/condiciones/useGetConditions";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { useGetBatchesByLocationId } from "@/hooks/useGetBatchesByLocationId";
import { useCompanyStore } from "@/stores/CompanyStore";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useCreateMaintenanceService } from "@/actions/planificacion/servicios/actions";

// Esquema de validación para el servicio
const serviceSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 carácteres.",
  }),
  description: z.string().min(1, {
    message: "La descripción debe tener al menos 1 carácter.",
  }),
  manufacturer_id: z.string(),
});

// Esquema de validación para una tarea
const taskSchema = z.object({
  description: z.string().min(1, {
    message: "La descripción de la tarea es obligatoria.",
  }),
  batch_id: z.array(z.string().min(1, {
    message: "El lote es obligatorio.",
  })),
});

// Esquema de validación para el formulario de tareas
const tasksFormSchema = z.object({
  tasks: z.array(taskSchema).min(1, {
    message: "Debe agregar al menos una tarea.",
  }),
});

// Tipo para el servicio
type ServiceFormType = z.infer<typeof serviceSchema>;

// Tipo para las tareas
type TasksFormType = z.infer<typeof tasksFormSchema>;

// Tipo para el objeto final que se enviará al backend
type MaintenanceServicePayload = {
  service: ServiceFormType;
  tasks: TasksFormType["tasks"];
};

interface CreateMaintenanceServiceDialogProps {
  onClose: () => void;
}

export function CreateMaintenanceServiceForm({ onClose }: CreateMaintenanceServiceDialogProps) {
  const { mutate, data: batches, isPending: isBatchesLoading, isError: isBatchesError } = useGetBatchesByLocationId();
  const { data: manufacturers, isLoading: isManufacturersLoading, isError: isManufacturersError } = useGetManufacturers()
  const { selectedCompany, selectedStation } = useCompanyStore()
  const { createService } = useCreateMaintenanceService()
  const [currentStep, setCurrentStep] = useState(1); // Paso actual
  const [serviceData, setServiceData] = useState<ServiceFormType | null>(null); // Datos del servicio
  const [tasksData, setTasksData] = useState<TasksFormType>({ tasks: [] }); // Datos de las tareas

  // Formulario para el servicio
  const serviceForm = useForm<ServiceFormType>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      manufacturer_id: "",
    },
  });

  // Formulario para las tareas
  const tasksForm = useForm<TasksFormType>({
    resolver: zodResolver(tasksFormSchema),
    defaultValues: {
      tasks: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: tasksForm.control,
    name: "tasks",
  });

  // Función para manejar la selección de lotes
  const handleBatchSelect = (taskIndex: number, batchId: string) => {
    const currentBatches = tasksForm.getValues(`tasks.${taskIndex}.batch_id`) || [];
    const updatedBatches = currentBatches.includes(batchId)
      ? currentBatches.filter((id) => id !== batchId) // Deseleccionar
      : [...currentBatches, batchId]; // Seleccionar
    tasksForm.setValue(`tasks.${taskIndex}.batch_id`, updatedBatches);
  };

  // Función para verificar si un lote está seleccionado
  const isBatchSelected = (taskIndex: number, batchId: string) => {
    const currentBatches = tasksForm.getValues(`tasks.${taskIndex}.batch_id`) || [];
    return currentBatches.includes(batchId);
  };

  useEffect(() => {
    if (selectedStation) {
      mutate(Number(selectedStation))
    }
  }, [selectedStation, mutate])

  // Función para avanzar al siguiente paso
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // Función para retroceder al paso anterior
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Función para manejar el envío final del formulario
  const handleSubmit = async () => {
    const payload: MaintenanceServicePayload = {
      service: serviceData!, // Datos del servicio
      tasks: tasksData.tasks, // Datos de las tareas
    };
    await createService.mutateAsync(payload);
    onClose()
  };

  return (
    <div className="space-y-4">
      {/* Paso 1: Información del servicio */}
      {currentStep === 1 && (
        <Form {...serviceForm}>
          <form
            onSubmit={serviceForm.handleSubmit((data) => {
              setServiceData(data); // Guardar datos del servicio
              handleNext(); // Avanzar al siguiente paso
            })}
            className="space-y-4"
          >
            <div className="flex gap-2 items-center justify-center">
              <FormField
                control={serviceForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Mantenimiento de motor" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">Nombre del servicio.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={serviceForm.control}
                name="manufacturer_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Fabricante</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isManufacturersLoading || isManufacturersError}
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {
                              isManufacturersLoading && <Loader2 className="size-4 animate-spin mr-2" />
                            }
                            {field.value
                              ? <p>{manufacturers?.find(
                                (manufacturer) => `${manufacturer.id.toString()}` === field.value
                              )?.name}</p>
                              : "Elige al fabricante..."
                            }
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Busque un fabricante..." />
                          <CommandList>
                            <CommandEmpty className="text-sm p-2 text-center">No se ha encontrado ningún fabricante.</CommandEmpty>
                            <CommandGroup>
                              {manufacturers?.map((manufacturer) => (
                                <CommandItem
                                  value={`${manufacturer.id}`}
                                  key={manufacturer.id}
                                  onSelect={() => {
                                    serviceForm.setValue("manufacturer_id", manufacturer.id.toString())
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      `${manufacturer.id.toString()}` === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {
                                    <p>{manufacturer.name}</p>
                                  }
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription className="text-xs">
                      Fabricante del servicio.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={serviceForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Revisión completa del motor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Siguiente</Button>
          </form>
        </Form>
      )}

      {/* Paso 2: Agregar tareas */}
      {currentStep === 2 && (
        <Form {...tasksForm}>
          <form
            onSubmit={tasksForm.handleSubmit((data) => {
              setTasksData(data); // Guardar datos de las tareas
              handleNext(); // Avanzar al siguiente paso
            })}
            className="space-y-4"
          >
            <ScrollArea className={fields.length > 1 ? "h-[300px]" : ""}>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="space-y-2 border p-4 rounded-lg">
                    <FormField
                      control={tasksForm.control}
                      name={`tasks.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción de la Tarea</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej: Revisar sistema de combustible" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={tasksForm.control}
                      name={`tasks.${index}.batch_id`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Lotes</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                disabled={isBatchesLoading}
                                variant="outline"
                                className="w-[200px] justify-between"
                              >
                                {field.value?.length > 0 && (
                                  <>
                                    <Separator orientation="vertical" className="mx-2 h-4" />
                                    <Badge
                                      variant="secondary"
                                      className="rounded-sm px-1 font-normal lg:hidden"
                                    >
                                      {field.value.length}
                                    </Badge>
                                    <div className="hidden space-x-1 lg:flex">
                                      {field.value.length > 2 ? (
                                        <Badge
                                          variant="secondary"
                                          className="rounded-sm px-1 font-normal"
                                        >
                                          {field.value.length} seleccionados
                                        </Badge>
                                      ) : (
                                        batches?.filter((batch) => field.value.includes(batch.id.toString()))
                                          .map((batch) => (
                                            <Badge
                                              variant="secondary"
                                              key={batch.name}
                                              className="rounded-sm px-1 font-medium"
                                            >
                                              {batch.name}
                                            </Badge>
                                          ))
                                      )}
                                    </div>
                                  </>
                                )}
                                {
                                  field.value?.length <= 0 && "Seleccione..."
                                }
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Buscar lote..." />
                                <CommandList>
                                  <CommandEmpty>No se encontraron lotes.</CommandEmpty>
                                  <CommandGroup>
                                    {
                                      isBatchesLoading && <Loader2 className="animate-spin size-4" />
                                    }
                                    {batches?.map((batch) => (
                                      <CommandItem
                                        key={batch.id}
                                        value={batch.id.toString()}
                                        onSelect={() => handleBatchSelect(index, batch.id.toString())}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            isBatchSelected(index, batch.id.toString()) ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        {batch.name}
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
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      Eliminar Tarea
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Button
              type="button"
              variant="secondary"
              onClick={() => append({ description: "", batch_id: [] })}
            >
              Agregar Tarea
            </Button>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleBack}>
                Anterior
              </Button>
              <Button type="submit">Siguiente</Button>
            </div>
          </form>
        </Form>
      )}

      {/* Paso 3: Resumen y confirmación */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Resumen</h3>
          <div>
            <h4 className="font-medium">Información del Servicio</h4>
            <p><strong>Nombre:</strong> {serviceData?.name}</p>
            <p><strong>Descripción:</strong> {serviceData?.description}</p>
            <p><strong>Fabricante:</strong> {serviceData?.manufacturer_id}</p>
          </div>
          <div>
            <h4 className="font-medium">Tareas</h4>
            {tasksData.tasks.map((task, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <p><strong>Descripción:</strong> {task.description}</p>
                <p><strong>Lotes:</strong> {task.batch_id.join(", ")}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleBack}>
              Anterior
            </Button>
            <Button type="button" onClick={handleSubmit}>
              Confirmar y Enviar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
