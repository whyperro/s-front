'use client';
import { useCreateBank } from "@/actions/ajustes/banco_cuentas/bancos/actions";
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
import { useGetMaintenanceAircrafts } from "@/hooks/planificacion/useGetMaintenanceAircrafts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";


const formSchema = z.object({
  flight_number: z.string(),
  aircraft_operator: z.string(),
  origin: z.string(),
  destination: z.string(),
  flight_date: z.string(),
  flight_hours: z.coerce.number(),
  flight_cycles: z.coerce.number(),
  aircraft_id: z.string(),
})


interface FormProps {
  onClose: () => void,
}

export default function CreateFlightControlForm({ onClose }: FormProps) {
  const { createBank } = useCreateBank();
  const { data: aircrafts, isLoading: isAircraftsLoading, isError: isAircraftsError } = useGetMaintenanceAircrafts()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flight_cycles: 0,
      flight_hours: 0,
      flight_number: "",
      origin: "",
      destination: "",
      aircraft_operator: "",
    },
  })
  const { control } = form;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    onClose()
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="aircraft_id"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-3 mt-1.5">
                <FormLabel>Aeronave</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={isAircraftsLoading || isAircraftsError}
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {
                          isAircraftsLoading && <Loader2 className="size-4 animate-spin mr-2" />
                        }
                        {field.value
                          ? <p>{aircrafts?.find(
                            (aircraft) => `${aircraft.id.toString()}` === field.value
                          )?.acronym}</p>
                          : "Elige la aeronave..."
                        }
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Busque una aeronave..." />
                      <CommandList>
                        <CommandEmpty className="text-sm p-2 text-center">No se ha encontrado ningún fabricante.</CommandEmpty>
                        <CommandGroup>
                          {aircrafts?.map((aircraft) => (
                            <CommandItem
                              value={`${aircraft.id}`}
                              key={aircraft.id}
                              onSelect={() => {
                                form.setValue("aircraft_id", aircraft.id.toString())
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  `${aircraft.id.toString()}` === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {
                                <p>{aircraft.acronym}</p>
                              }
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-xs">
                  Aeronave que realizó el vuelo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="flight_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nro. de Vuelo</FormLabel>
                <FormControl>
                  <Input placeholder="EJ: PZOCS199" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Número identificador del vuelo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="flight_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Vuelo</FormLabel>
                <FormControl>
                  <Input placeholder="EJ: Banesco, BOFA, etc..." {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Fecha en la que se realizó el vuelo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="origin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salida</FormLabel>
                <FormControl>
                  <Input placeholder="EJ: PZO, CCS, etc..." {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Salida del vuelo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destino</FormLabel>
                <FormControl>
                  <Input placeholder="EJ: POR, CCS, etc..." {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Destino final del vuelo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="aircraft_operator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Piloto</FormLabel>
                <FormControl>
                  <Input placeholder="..." {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Piloto que realizó el vuelo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 items-center justify-center mt-4">
          <FormField
            control={control}
            name="flight_hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horas de Vuelo</FormLabel>
                <FormControl>
                  <Input placeholder="EJ: 5" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Horas voladas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="flight_cycles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ciclos de Vuelo</FormLabel>
                <FormControl>
                  <Input placeholder="EJ: 5" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Ciclos realizados.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="bg-primary mt-2 text-white hover:bg-blue-900 disabled:bg-primary/70 " disabled={createBank?.isPending} type="submit">
          {createBank?.isPending ? <Loader2 className="size-4 animate-spin" /> : <p>Crear Vuelo</p>}
        </Button>
      </form>
    </Form>
  )
}
