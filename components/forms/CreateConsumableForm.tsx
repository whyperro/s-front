'use client'

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, FileUpIcon, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from "../ui/checkbox"
import { Textarea } from "../ui/textarea"
import { addYears, format, subYears } from "date-fns"
import { cn } from "@/lib/utils"
import { es } from 'date-fns/locale'
import { useEffect, useState } from "react"
import { useCreateArticle } from "@/actions/inventario/articulos/actions"
import { useCompanyStore } from "@/stores/CompanyStore"
import { useGetBatchesByLocationId } from "@/hooks/useGetBatchesByLocationId"
import { conditions } from "@/lib/conditions"

const formSchema = z.object({
  article_type: z.string(),
  serial: z.string().min(2, {
    message: "El serial debe contener al menos 2 carácteres.",
  }),
  description: z.string({
    message: "Debe ingresar la descripción del articulo."
  }).min(2, {
    message: "La descripción debe contener al menos 2 carácteres.",
  }),
  zone: z.string({
    message: "Debe ingresar la ubicación del articulo.",
  }),
  caducate_date: z.string({
    message: "Debe ingresar una fecha de caducidad válida.",
  }),
  fabrication_date: z.string({
    message: "Debe ingresar una fecha de fabricación válida.",
  }),
  brand: z.string({
    message: "Debe ingresar una marca.",
  }),
  condition: z.string({
    message: "Debe ingresar la condición del articulo.",
  }),
  unit_meassure: z.string({
    message: "Debe ingresar una unidad de medida.",
  }),
  magnitude: z.coerce.number({
    message: "Debe ingresar la magnitud del articulo.",
  }).nonnegative({
    message: "No puede ingresar valores negativos.",
  }),
  quantity: z.coerce.number({
    message: "Debe ingresar una cantidad de articulos.",
  }).nonnegative({
    message: "No puede ingresar valores negativos.",
  }),
  batches_id: z.string({
    message: "Debe ingresar un lote.",
  }),
  is_managed: z.boolean(),
  certifcate_8130: z
    .instanceof(File).optional()
  ,
  certifcate_vendor: z
    .instanceof(File).optional()
  ,
  certifcate_fabricant: z
    .instanceof(File).optional()
  ,
  image: z
    .instanceof(File).optional()
  ,
})

const CreateConsumableForm = () => {

  const [fabricationDate, setFabricationDate] = useState<Date>()

  const [caducateDate, setCaducateDate] = useState<Date>()

  const { createArticle } = useCreateArticle();

  const { selectedStation } = useCompanyStore();

  const { mutate, data: batches, isPending: isBatchesLoading, isError } = useGetBatchesByLocationId();

  useEffect(() => {
    if (selectedStation) {
      mutate(Number(selectedStation))
      console.log(batches)
    }
  }, [selectedStation])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      is_managed: false,
    }
  })
  form.setValue("article_type", "consumible");


  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formattedValues = {
      ...values,
      caducate_date: caducateDate && format(caducateDate, 'MM-dd-yyyy'),
      fabrication_date: fabricationDate && format(fabricationDate, "MM-dd-yyyy"),
      batches_id: Number(values.batches_id),
    }
    createArticle.mutate(formattedValues);
    // console.log(formattedValues.caducate_date, formattedValues.fabrication_date)
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4 max-w-6xl mx-auto" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-w-7xl flex flex-col lg:flex-row gap-2 justify-center items-center w-full">
          <FormField
            control={form.control}
            name="serial"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Serial</FormLabel>
                <FormControl>
                  <Input placeholder="EJ: 234ABAC" {...field} />
                </FormControl>
                <FormDescription>
                  Identificador único del articulo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Condición</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      conditions.map((condition) => (
                        <SelectItem key={condition.value} value={condition.value}>{condition.label}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormDescription>
                  Estado físico del articulo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fabrication_date"
            render={({ field }) => (
              <FormItem className="flex flex-col p-0 mt-2.5 w-full">
                <FormLabel>Fecha de Fabricacion</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !fabricationDate && "text-muted-foreground"
                        )}
                      >
                        {fabricationDate ? (
                          format(fabricationDate, "PPP", {
                            locale: es
                          })
                        ) : (
                          <span>Seleccione una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Select
                      onValueChange={(value) =>
                        setFabricationDate(subYears(new Date(), parseInt(value)))
                      }
                    >
                      <SelectTrigger className="p-3">
                        <SelectValue placeholder="Seleccione una opcion..." />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="0">Actual</SelectItem>
                        <SelectItem value="5">Ir 5 años atrás</SelectItem>
                        <SelectItem value="10">Ir 10 años atrás</SelectItem>
                        <SelectItem value="15">Ir 15 años atrás</SelectItem>
                      </SelectContent>
                    </Select>
                    <Calendar
                      locale={es}
                      mode="single"
                      selected={fabricationDate} onSelect={setFabricationDate}
                      initialFocus
                      month={fabricationDate}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Fecha de creación del articulo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="caducate_date"
            render={({ field }) => (
              <FormItem className="flex flex-col p-0 mt-2.5 w-full">
                <FormLabel>Fecha de Caducidad</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !caducateDate && "text-muted-foreground"
                        )}
                      >
                        {caducateDate ? (
                          format(caducateDate, "PPP", {
                            locale: es
                          })
                        ) : (
                          <span>Seleccione una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Select
                      onValueChange={(value) =>
                        setCaducateDate(addYears(new Date(), parseInt(value)))
                      }
                    >
                      <SelectTrigger className="p-3">
                        <SelectValue placeholder="Seleccione una opcion..." />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="0">Actual</SelectItem>
                        <SelectItem value="5">5 años</SelectItem>
                        <SelectItem value="10">10 años</SelectItem>
                        <SelectItem value="15">15 años</SelectItem>
                      </SelectContent>
                    </Select>
                    <Calendar
                      locale={es}
                      mode="single"
                      selected={caducateDate} onSelect={setCaducateDate}
                      initialFocus
                      month={caducateDate}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Fecha límite del articulo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-12 justify-center max-w-6xl">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Cantidad de Unidades</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="EJ: 5" {...field} />
                  </FormControl>
                  <FormDescription>
                    Cantidad de unidades a agregar
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Marca del Articulo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecccione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Marca 1">Marca 1</SelectItem>
                      <SelectItem value="Marca 2">Marca 2</SelectItem>
                      <SelectItem value="Marca 3">Marca 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Marca específica del articulo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="magnitude"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Magnitud</FormLabel>
                  <FormControl>
                    <Input type="" placeholder="EJ: 35" {...field} />
                  </FormControl>
                  <FormDescription>
                    Magnitud según unidad de medida.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit_meassure"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Unidad de Medida</FormLabel>
                  <FormControl>
                    <Input placeholder="EJ: kg/ml/L" {...field} />
                  </FormControl>
                  <FormDescription>
                    Unidad de medición del articulo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Ubicación del Articulo</FormLabel>
                  <FormControl>
                    <Input placeholder="EJ: Pasillo 4, repisa 3..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Ubicación exacta del articulo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="batches_id"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Lote del Articulo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isBatchesLoading ? <Loader2 className="size-4 animate-spin" /> : "Seleccione lote..."} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        batches && batches.map((batch) => (
                          <SelectItem key={batch.part_number} value={batch.id.toString()}>{batch.part_number} - {batch.warehouse_name}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Lote a asignar el articulo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_managed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      ¿Es manejable?
                    </FormLabel>
                    <FormDescription>
                      ¿El articulo es manejable (consumible)?
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col max-w-7xl w-1/2 space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Descripción del Articulo</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="EJ: Motor V8 de..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Breve descricion del articulo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imágen del Articulo</FormLabel>
                  <FormControl>
                    <div className="relative h-10 w-full ">
                      <FileUpIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
                      <Input
                        type="file"
                        className="pl-10 pr-3 py-2 text-md w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent cursor-pointer" // Add additional styling as needed


                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Imágen descriptiva del articulo
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col lg:flex-row gap-2 items-center">
              <FormField
                control={form.control}
                name="certifcate_8130"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificado #<span className="text-primary font-bold">8130</span></FormLabel>
                    <FormControl>
                      <div className="relative h-10 w-full ">
                        <FileUpIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
                        <Input
                          type="file"
                          className="pl-8 pr-3 py-2 text-md w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent cursor-pointer" // Add additional styling as needed
                          placeholder="Subir archivo..."
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Documento legal del archivo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="certifcate_fabricant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificado del <span className="text-primary">Fabricante</span></FormLabel>
                    <FormControl>
                      <div className="relative h-10 w-full ">
                        <FileUpIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
                        <Input
                          type="file"
                          className="pl-8 pr-3 py-2 text-md w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent cursor-pointer" // Add additional styling as needed
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Documentos legal del articulo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="certifcate_vendor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificado del <span className="text-primary">Vendedor</span></FormLabel>
                    <FormControl>
                      <div className="relative h-10 w-full ">
                        <FileUpIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
                        <Input
                          type="file"
                          className="pl-8 pr-3 py-2 text-md w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent cursor-pointer" // Add additional styling as needed


                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Documentos legal del articulo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div>
          <Button className="bg-black text-white hover:bg-blue-600" type="submit">Agregar</Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateConsumableForm
