"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { useCreateRequisition } from "@/actions/compras/requisiciones/actions"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { useGetDepartamentEmployees } from "@/hooks/administracion/useGetDepartamentEmployees"
import { useGetBatchesByLocationId } from "@/hooks/useGetBatchesByLocationId"
import { cn } from "@/lib/utils"
import { useCompanyStore } from "@/stores/CompanyStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown, Loader2, MinusCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { Textarea } from "../ui/textarea"

const FormSchema = z.object({
  order_number: z.string().min(3, {
    message: "Debe ingresar un nro. de orden.",
  }),
  justification: z.string().min(2, {
    message: "La justificacion debe tener al menos 5 caracteres.",
  }),
  company: z.string(),
  created_by: z.string(),
  requested_by: z.string(),
  articles: z.array(z.object({
    batch: z.string(),
    batch_name: z.string(),
    batch_articles: z.array(z.object({
      part_number: z.string(),
      quantity: z.number(),
    }))
  })),
})

type FormSchemaType = z.infer<typeof FormSchema>

interface FormProps {
  onClose: () => void,
  initialData?: FormSchemaType,
  isEditing?: boolean,
}

// Tipos para batches y artículos
interface Article {
  part_number: string;
  quantity: number;
}

interface Batch {
  batch: string;
  batch_name: string,
  batch_articles: Article[];
}

export function CreateGeneralRequisitionForm({ onClose, initialData, isEditing }: FormProps) {

  const { user } = useAuth()

  const { mutate, data, isPending } = useGetBatchesByLocationId();

  const { mutate: employeesMutation, data: employees, isPending: employeesLoading, isError: employeesError } = useGetDepartamentEmployees();

  const { selectedCompany } = useCompanyStore()

  const { createRequisition } = useCreateRequisition()

  const [selectedBatches, setSelectedBatches] = useState<Batch[]>([])

  const { selectedStation } = useCompanyStore()

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      order_number: "",
      articles: [],
    },
  })

  useEffect(() => {
    if (user && selectedCompany) {
      form.setValue("created_by", user.id.toString())
      form.setValue("company", selectedCompany.split(" ").join(""))
    }
    if (initialData) {
      form.reset(initialData); // Set initial form values
    }
  }, [user, initialData, form, selectedCompany])

  useEffect(() => {
    if (selectedStation) {
      mutate(Number(selectedStation))
      employeesMutation(Number(selectedStation))
    }
  }, [selectedStation, mutate, employeesMutation])

  useEffect(() => {
    form.setValue("articles", selectedBatches)
  }, [selectedBatches])


  // Maneja la selección de un lote.
  const handleBatchSelect = (batchName: string, batch: string) => {
    if (!selectedBatches.some((batch) => batch.batch === batchName)) {
      setSelectedBatches((prev) => [
        ...prev,
        { batch: batch, batch_name: batchName, batch_articles: [{ part_number: "", quantity: 0 }] },
      ]);
    }
  };

  // Maneja el cambio en un artículo.
  const handleArticleChange = (batchName: string, index: number, field: keyof Article, value: string | number) => {
    setSelectedBatches((prev) =>
      prev.map((batch) =>
        batch.batch === batchName
          ? {
            ...batch,
            batch_articles: batch.batch_articles.map((article, i) =>
              i === index ? { ...article, [field]: value } : article
            ),
          }
          : batch
      )
    );
  };

  // Agrega un nuevo artículo a un lote.
  const addArticle = (batchName: string) => {
    setSelectedBatches((prev) =>
      prev.map((batch) =>
        batch.batch === batchName
          ? { ...batch, batch_articles: [...batch.batch_articles, { part_number: "", quantity: 0 }] }
          : batch
      )
    );
  };

  const removeArticleFromBatch = (batchName: string, articleIndex: number) => {
    setSelectedBatches((prevBatches) =>
      prevBatches.map((batch) =>
        batch.batch === batchName
          ? {
            ...batch,
            batch_articles: batch.batch_articles.filter(
              (_, index) => index !== articleIndex
            ),
          }
          : batch
      )
    );
  };

  const removeBatch = (batchName: string) => {
    setSelectedBatches((prevBatches) =>
      prevBatches.filter((batch) => batch.batch !== batchName)
    );
  };

  const onSubmit = async (data: FormSchemaType) => {
    const formattedData = {
      ...data,
    }
    await createRequisition.mutateAsync(formattedData)
    onClose()
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-3">
        <div className='flex gap-2 items-center'>
          <FormField
            control={form.control}
            name="order_number"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nro. de Orden</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 001OCA, etc..." {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="requested_by"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col space-y-3 mt-1.5">
                <FormLabel>Solicitante</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={employeesLoading}
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {
                          employeesLoading && <Loader2 className="size-4 animate-spin mr-2" />
                        }
                        {field.value
                          ? <p>{employees?.find(
                            (employee) => `${employee.first_name} ${employee.last_name}` === field.value
                          )?.first_name} - {employees?.find(
                            (employee) => `${employee.first_name} ${employee.last_name}` === field.value
                          )?.last_name}</p>
                          : "Elige al solicitante..."
                        }
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Busque un empleado..." />
                      <CommandList>
                        <CommandEmpty className="text-sm p-2 text-center">No se ha encontrado ningún empleado.</CommandEmpty>
                        <CommandGroup>
                          {employees?.map((employee) => (
                            <CommandItem
                              value={`${employee.first_name} ${employee.last_name}`}
                              key={employee.id}
                              onSelect={() => {
                                form.setValue("requested_by", `${employee.first_name} ${employee.last_name}`)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  `${employee.first_name} ${employee.last_name}` === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {
                                <p>{employee.first_name} {employee.last_name}</p>
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
        <FormField
          control={form.control}
          name="articles"
          render={({ field }: { field: any }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Artículos</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        selectedBatches.length === 0 && "text-muted-foreground"
                      )}
                    >
                      {selectedBatches.length > 0
                        ? `${selectedBatches.length} reng. seleccionados`
                        : "Selec. un renglón..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Buscar..." />
                    <CommandList>
                      <CommandEmpty>No existen renglones...</CommandEmpty>
                      <CommandGroup>
                        {data &&
                          data.map((batch) => (
                            <CommandItem
                              key={batch.name}
                              value={batch.id.toString()}
                              onSelect={() => handleBatchSelect(batch.name, batch.id.toString())}
                            >
                              <Check
                                className={cn(
                                  "",
                                  selectedBatches.some((b) => b.batch === batch.id.toString())
                                    ? "opacity-100"
                                    : "opacity-0"
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
              <div className="mt-4 space-y-4">
                <ScrollArea className={cn("", selectedBatches.length > 2 ? "h-[300px]" : "")}>
                  {selectedBatches.map((batch) => (
                    <div key={batch.batch}>
                      <div className="flex items-center">
                        <h4 className="font-semibold">{batch.batch_name}</h4>
                        <Button
                          variant="ghost"
                          type="button"
                          size="icon"
                          onClick={() => removeBatch(batch.batch)}
                        >
                          <MinusCircle className="size-4" />
                        </Button>
                      </div>
                      <ScrollArea className={cn("", batch.batch_articles.length > 2 ? "h-[150px]" : "")}>
                        {batch.batch_articles.map((article, index) => (
                          <div key={index} className="flex items-center space-x-4 mt-2">
                            <Input
                              placeholder="Número de parte"
                              onChange={(e) => {
                                handleArticleChange(batch.batch, index, "part_number", e.target.value)
                              }
                              }
                            />
                            <Input
                              type="number"
                              placeholder="Cantidad"
                              onChange={(e) =>
                                handleArticleChange(batch.batch, index, "quantity", Number(e.target.value))
                              }
                            />
                            <Button
                              variant="ghost"
                              type="button"
                              size="icon"
                              onClick={() => removeArticleFromBatch(batch.batch, index)}
                              className="hover:text-red-500"
                            >
                              <MinusCircle className="size-4" />
                            </Button>
                          </div>
                        ))}
                      </ScrollArea>
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => addArticle(batch.batch)}
                        className="mt-2 text-sm"
                      >
                        Agregar artículo
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="justification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Justificación</FormLabel>
              <FormControl>
                <Textarea placeholder="Ej: Necesidad de la pieza X para instalación..." {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center gap-x-4">
          <Separator className="flex-1" />
          <p className="text-muted-foreground">SIGEAC</p>
          <Separator className="flex-1" />
        </div>
        <Button disabled={createRequisition.isPending}>{isEditing ? "Generar Requisición" : "Editar Requisición"}</Button>
      </form>
    </Form>
  )
}