'use client'

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useCreateArticle } from "@/actions/inventario/articulos/actions"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useGetBatchesByLocationId } from "@/hooks/useGetBatchesByLocationId"
import { conditions } from "@/lib/conditions"
import loadingGif from '@/public/loading2.gif'
import { useCompanyStore } from "@/stores/CompanyStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileUpIcon, Loader2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from "../ui/checkbox"
import { Textarea } from "../ui/textarea"


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
  brand: z.string({
    message: "Debe ingresar una marca.",
  }),
  condition: z.string({
    message: "Debe ingresar la condición del articulo.",
  }),
  batches_id: z.string({
    message: "Debe ingresar un lote.",
  }),
  is_special: z.boolean(),
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

const CreateToolForm = () => {

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
      is_special: false,
    }
  })
  form.setValue("article_type", "herramienta");


  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formattedValues = {
      ...values,
      batches_id: Number(values.batches_id),
    }
    // console.log(formattedValues)
    createArticle.mutate(formattedValues);
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
                <Select onValueChange={field.onChange}>
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
        </div>
        <div className="flex flex-row gap-12 justify-center max-w-6xl">
          <div className="grid grid-cols-1 gap-4">
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
              name="is_special"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      ¿Es especial?
                    </FormLabel>
                    <FormDescription>
                      El articulo tiene un uso especial o único.
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
                      Documento legal del articulo.
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
                      Documento legal del articulo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div>
          <Button className="bg-primary text-white hover:bg-blue-900 disabled:bg-slate-50 disabled:border-dashed disabled:border-black" disabled={createArticle?.isPending} type="submit">
            {createArticle?.isPending ? <Image className="text-black" src={loadingGif} width={170} height={170} alt="Loading..." /> : <p>Crear Herramienta</p>}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateToolForm
