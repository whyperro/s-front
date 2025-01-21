import { useCreateQuote } from "@/actions/compras/cotizaciones/actions"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/AuthContext"
import { useGetVendors } from "@/hooks/ajustes/globales/proveedores/useGetVendors"
import { useGetLocationsByCompanyId } from "@/hooks/useGetLocationsByCompanyId"
import { cn } from "@/lib/utils"
import { useCompanyStore } from "@/stores/CompanyStore"
import { Requisition } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { useFieldArray, useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { AmountInput } from "../misc/AmountInput"
import { Calendar } from "../ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useUpdateRequisitionStatus } from "@/actions/compras/requisiciones/actions"

const FormSchema = z.object({
  quote_number: z.string().min(3, {
    message: "Debe ingresar un nro. de orden.",
  }),
  justification: z.string(),
  articles: z.array(
    z.object({
      part_number: z.string(),
      quantity: z.number().min(1, { message: "Debe ingresar al menos 1." }),
      unit_price: z.string().min(0, { message: "El precio no puede ser negativo." }),
      image: z.string().optional(),
    })
  ),
  tax: z.string(),
  vendor_id: z.string(),
  location_id: z.string(),
  quote_date: z.date(),
})

type FormSchemaType = z.infer<typeof FormSchema>

export function CreateQuoteForm({ initialData, onClose, req }: { initialData?: any, onClose: () => void, req: Requisition }) {

  const [openVendor, setOpenVendor] = useState(false)

  const { selectedCompany } = useCompanyStore()

  const { updateStatusRequisition } = useUpdateRequisitionStatus()

  const { createQuote } = useCreateQuote()

  const { user } = useAuth()

  const transformedArticles =
    initialData?.articles?.flatMap((article: any) =>
      article.batch_articles.map((batchArticle: any) => ({
        part_number: batchArticle.part_number,
        quantity: batchArticle.quantity,
        unit_price: 0, // Inicializa unit_price como 0
        image: batchArticle.image,
      }))
    ) || [];

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      quote_number: initialData?.quote_number || "",
      justification: initialData?.justification || "",
      articles: transformedArticles,
    },
  });

  const { control, handleSubmit } = form

  const { fields } = useFieldArray({
    control,
    name: "articles",
  })
  const calculateTotal = (articles: FormSchemaType["articles"], tax: string) => {
    const articlesTotal = articles.reduce((sum, article) => sum + (article.quantity * Number(article.unit_price) || 0), 0);
    const taxValue = parseFloat(tax) || 0;
    return articlesTotal + taxValue;
  };

  const articles = useWatch({
    control,
    name: "articles",
  });

  const tax = useWatch({
    control,
    name: "tax",
  });

  const total = useMemo(() => calculateTotal(articles, tax!), [articles, tax]);

  const { data: vendors, isLoading: isVendorsLoading, isError: isVendorsErros } = useGetVendors()

  const { mutate, data: locations, isPending: isLocationsPending } = useGetLocationsByCompanyId()

  useEffect(() => {
    if (selectedCompany) {
      mutate(Number(2))
    }
  }, [selectedCompany, mutate])


  const onSubmit = async (data: FormSchemaType) => {

    const formattedData = {
      ...data,
      created_by: `${user?.first_name} ${user?.last_name}`,
      sub_total: total,
      total: total,
      location_id: Number(data.location_id),
      company: selectedCompany!.split(" ").join("").toLowerCase(),
      tax: Number(data.tax),
      requisition_order_id: req.id,
      vendor_id: Number(data.vendor_id),
      articles: data.articles.map((article: any) => ({
        ...article,
        amount: Number(article.unit_price) * Number(article.quantity), // Calcula el total
      })),
    }
    await createQuote.mutateAsync(formattedData)

    await updateStatusRequisition.mutateAsync({
      id: req.id,
      data: {
        status: "cotizado",
        updated_by: `${user?.first_name} ${user?.last_name}`,
        company: selectedCompany!.split(" ").join("").toLowerCase(),
      }
    });
    onClose()
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <div className="flex gap-2 items-center">
          {/* Número de orden */}
          <FormField
            control={control}
            name="quote_number"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nro. de Orden</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 001OCA, etc..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Proveedor */}
          <FormField
            control={form.control}
            name="vendor_id"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col mt-1 space-y-3">
                <FormLabel>Proveedor</FormLabel>
                <Popover open={openVendor} onOpenChange={setOpenVendor}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={isVendorsLoading}
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {
                          isVendorsLoading && <Loader2 className="size-4 animate-spin mr-2" />
                        }
                        {field.value
                          ? <p>{vendors?.find(
                            (vendor) => vendor.id.toString() === field.value
                          )?.name}</p>
                          : "Elige al proveedor..."
                        }
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Busque un proveedor..." />
                      <CommandList>
                        <CommandEmpty>No se ha encontrado un cliente.</CommandEmpty>
                        <CommandGroup>
                          {vendors?.map((vendor) => (
                            <CommandItem
                              value={vendor.id.toString()}
                              key={vendor.id.toString()}
                              onSelect={() => {
                                form.setValue("vendor_id", vendor.id.toString())
                                setOpenVendor(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  vendor.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {
                                <p>{vendor.name}</p>
                              }
                            </CommandItem>
                          ))}
                          {
                            isVendorsErros && <p className="text-sm text-muted-foreground">Ha ocurrido un error al cargar los datos...</p>
                          }
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Ubicacion</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={isLocationsPending}>
                      <SelectValue placeholder="Seleccione la ubicacion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      locations?.map((location) => (
                        <SelectItem key={location.id} value={location.id.toString()}>{location.address} - {location.type}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center">
          <FormField
            control={form.control}
            name="quote_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de Compra</FormLabel>
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
                          format(field.value, "PPP", { locale: es })
                        ) : (
                          <span>Seleccione la fecha</span>
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
                      locale={es}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Justificación */}
        <FormField
          control={control}
          name="justification"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Justificación</FormLabel>
              <FormControl>
                <Textarea placeholder="Ej: Necesidad de la pieza X para instalación..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Artículos */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Artículos</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4">
              {/* Número de parte */}
              {
                articles[index]?.image && (
                  <Image src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}articles_requisition/${articles[index].image}`} width={100} height={100} alt="imagen de articulo" />
                )
              }
              <FormField
                control={control}
                name={`articles.${index}.part_number`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel># Parte</FormLabel>
                    <FormControl>
                      <Input disabled className="disabled:opacity-85 font-semibold" placeholder="Ej: ABC123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cantidad */}
              <FormField
                control={control}
                name={`articles.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad</FormLabel>
                    <FormControl>
                      <Input
                        disabled className="disabled:opacity-85 font-semibold"
                        type="number"
                        min={1}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Precio Unitario */}
              <FormField
                control={control}
                name={`articles.${index}.unit_price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio Unitario</FormLabel>
                    <FormControl>
                      <AmountInput
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Total del Artículo */}
              <div className="flex flex-col w-[100px] justify-center items-center">
                <Label>Total</Label>
                <p className="text-base font-bold">
                  ${articles[index]?.quantity * Number(articles[index]?.unit_price) || 0}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Total general */}
        <div className="flex justify-between">
          <div className="font-bold text-lg">
            <FormField
              control={form.control}
              name="tax"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Taxes</FormLabel>
                  <FormControl>
                    <AmountInput placeholder="0.00" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className=" font-bold text-lg">
            Total General: ${total.toFixed(2)}
          </div>
        </div>

        <Separator />

        {/* Botón para enviar */}
        <Button disabled={createQuote.isPending} type="submit">{createQuote.isPending ? <Loader2 className="size-4 animate-spin" /> : "Crear Cotizacion"}</Button>
      </form>
    </Form>
  )
}
