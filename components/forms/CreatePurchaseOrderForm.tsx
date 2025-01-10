import { useEffect, useState } from "react"
import { useForm, useFieldArray, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

const FormSchema = z.object({
  order_number: z.string().min(3, {
    message: "Debe ingresar un nro. de orden.",
  }),
  justification: z.string(),
  articles: z.array(
    z.object({
      part_number: z.string(),
      quantity: z.number().min(1, { message: "Debe ingresar al menos 1." }),
      unit_price: z.number().min(0, { message: "El precio no puede ser negativo." }),
    })
  ),
})

type FormSchemaType = z.infer<typeof FormSchema>

export function CreatePurchaseOrderForm({ initialData, onClose }: { initialData?: FormSchemaType, onClose: () => void }) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      order_number: "",
      justification: "",
      articles: [],
    },
  })

  const { control, handleSubmit, watch } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "articles",
  })

  const articles = useWatch({
    control,
    name: "articles",
  })

  const calculateTotal = (articles: FormSchemaType["articles"]) => {
    return articles.reduce((sum, article) => sum + (article.quantity * article.unit_price || 0), 0)
  }

  const total = calculateTotal(articles)

  const onSubmit = (data: FormSchemaType) => {
    console.log("Form Data:", data)
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        {/* Número de orden */}
        <FormField
          control={control}
          name="order_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nro. de Orden</FormLabel>
              <FormControl>
                <Input placeholder="Ej: 001OCA, etc..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Justificación */}
        <FormField
          control={control}
          name="justification"
          render={({ field }) => (
            <FormItem>
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
              <FormField
                control={control}
                name={`articles.${index}.part_number`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel># Parte</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: ABC123" {...field} />
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
                      <Input
                        type="number"
                        step="0.01"
                        min={0}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Total del Artículo */}
              <div className="flex flex-col">
                <Label>Total</Label>
                <p className="text-sm font-bold">
                  ${articles[index]?.quantity * articles[index]?.unit_price || 0}
                </p>
              </div>

              {/* Botón para eliminar */}
              <Button
                variant="destructive"
                type="button"
                onClick={() => remove(index)}
              >
                Eliminar
              </Button>
            </div>
          ))}

          {/* Botón para agregar artículo */}
          <Button
            variant="outline"
            type="button"
            onClick={() => append({ part_number: "", quantity: 1, unit_price: 0 })}
          >
            Agregar Artículo
          </Button>
        </div>

        {/* Total general */}
        <div className="text-right font-bold text-lg">
          Total General: ${total}
        </div>

        <Separator />

        {/* Botón para enviar */}
        <Button type="submit">Guardar Orden de Compra</Button>
      </form>
    </Form>
  )
}
