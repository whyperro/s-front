import { useUpdateWorkOrderTask, useUpdateWorkOrderTaskStatus } from "@/actions/planificacion/ordenes_trabajo/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetWorkOrderEmployees } from "@/hooks/planificacion/useGetWorkOrderEmployees";
import { cn } from "@/lib/utils";
import { WorkOrder } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book, Check, Filter, Grid, List, Loader2, Pencil, Search, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  technician_responsable: z.string({
    message: "Debe seleccionar un técnico."
  }),
  inspector_responsable: z.string({
    message: "Debe seleccionar un inspector."
  }).optional(),
  id: z.string(),
})

const WorkOrderTasksDetails = ({ work_order }: { work_order: WorkOrder }) => {
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [editTech, setEditTech] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<WorkOrder["work_order_tasks"][0] | null>(null);
  const [openTaskDetails, setOpenTaskDetails] = useState(false);
  const { updateTaskStatus } = useUpdateWorkOrderTaskStatus();
  const { updateWorkOrderTask } = useUpdateWorkOrderTask()

  const { data: technicians, isLoading: isTechniciansLoading, isError: isTechniciansError } = useGetWorkOrderEmployees()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  })

  useEffect(() => {
    if (work_order) {
      const completedTasks = work_order?.work_order_tasks.filter(
        (task) => task.status === "CERRADO"
      ).length;
      const totalTasks = work_order?.work_order_tasks.length;
      const progress = (completedTasks / totalTasks) * 100;
      setCompletedTasks(completedTasks);
      setTotalTasks(totalTasks);
      setProgress(progress);
    }
  }, [work_order]);

  // Filtrar tareas
  const filteredTasks = work_order?.work_order_tasks
    .filter((task) => {
      const matchesSearch =
        task.task?.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.ata.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.technician_responsable && task.technician_responsable.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (task.inspector_responsable && task.inspector_responsable.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (task.task && task.task.service.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter.toUpperCase();

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => (a.status === "ABIERTO" ? -1 : 1));

  // Manejar cierre de tarea
  const handleComplete = async () => {
    if (!selectedTask) return;

    await updateTaskStatus.mutateAsync({
      task_id: selectedTask.id.toString(),
      status: "CERRADO"
    });
    setOpenTaskDetails(false);
  };

  // Abrir diálogo de detalles
  const openDetailsDialog = (task: WorkOrder["work_order_tasks"][0]) => {
    setSelectedTask(task);
    setOpenTaskDetails(true);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateWorkOrderTask.mutateAsync(values)
    } catch (error) {
      console.log(error)
    } finally {
      setOpenTaskDetails(false)
      setSelectedTask(null)
      setEditTech(false)
      form.reset()
    }
    // console.log(values)
  }

  return (
    <div className="space-y-3">
      {/* Barra de progreso */}
      <div className="text-center flex flex-col justify-center space-y-3">
        <p className="text-xl italic font-medium">
          Progreso de la orden de trabajo:{" "}
          <br />
          <span className="text-sm text-muted-foreground">
            {completedTasks} tarea(s) completada(s) de {work_order.work_order_tasks.length}
          </span>
        </p>
        <Progress
          className={cn("", progress === 100 ? "bg-green-500" : "")}
          value={progress}
        />
      </div>

      {/* Tarjeta principal */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Tareas de la Orden de Trabajo</CardTitle>
              <CardDescription>
                Detalles de las tareas de la orden de trabajo.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar tareas..."
                  className="pl-8 w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter("all")} className="flex items-center gap-2">
                    <Check className={cn("size-3 hidden", statusFilter === "all" ? "flex" : "")} /> Todas las tareas
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("abierto")} className="flex items-center gap-2">
                    <Check className={cn("size-3 hidden", statusFilter === "abierto" ? "flex" : "")} /> Solo abiertas
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("cerrado")} className="flex items-center gap-2">
                    <Check className={cn("size-3 hidden", statusFilter === "cerrado" ? "flex" : "")} /> Solo cerradas
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(viewMode === "cards" ? "table" : "cards")}
              >
                {viewMode === "cards" ? (
                  <List className="h-4 w-4" />
                ) : (
                  <Grid className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Vista de tarjetas */}
          {viewMode === "cards" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks?.map((task, index) => (
                <Card
                  key={task.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    form.setValue("id", task.id.toString()),
                      openDetailsDialog(task)
                  }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          Tarea #{index + 1}
                        </CardTitle>
                        <CardDescription className="truncate">
                          ATA: {task.ata}
                        </CardDescription>
                      </div>
                      <Badge
                        className={cn(
                          task.status === "ABIERTO"
                            ? "bg-green-500"
                            : "bg-red-500"
                        )}
                      >
                        {task.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium mb-2 line-clamp-2">
                      {task.task
                        ? `${task.task.service.name} - ${task.task.description}`
                        : task.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Técnico:</p>
                        <p>{task.technician_responsable || "No asignado"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Inspector:</p>
                        <p>{task.inspector_responsable || "No asignado"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Vista de tabla */
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>ATA</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Técnico</TableHead>
                    <TableHead>Inspector</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks?.map((task, index) => (
                    <TableRow
                      key={task.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => openDetailsDialog(task)}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{task.ata}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {task.task
                          ? `${task.task.service.name} - ${task.task.description}`
                          : task.description}
                      </TableCell>
                      <TableCell>{task.technician_responsable || "No asignado"}</TableCell>
                      <TableCell>{task.inspector_responsable || "No asignado"}</TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            task.status === "ABIERTO"
                              ? "bg-green-500"
                              : "bg-red-500"
                          )}
                        >
                          {task.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Sin resultados */}
          {filteredTasks?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8">
              <Search className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No se encontraron tareas</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Diálogo de detalles de la tarea */}
      <Dialog open={openTaskDetails} onOpenChange={setOpenTaskDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              Detalles de la Tarea
            </DialogTitle>
            <DialogDescription className="text-center">
              Información completa de la tarea seleccionada
            </DialogDescription>
          </DialogHeader>

          {selectedTask && (
            <div className="space-y-4">
              {/* Información básica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Descripción</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedTask.task?.description || selectedTask.description}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Servicio</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedTask.task?.service.name || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Código ATA</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedTask.ata}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Estado</h3>
                  <Badge
                    className={cn(
                      selectedTask.status === "ABIERTO"
                        ? "bg-green-500"
                        : "bg-red-500"
                    )}
                  >
                    {selectedTask.status}
                  </Badge>
                </div>
              </div>

              {/* Responsables */}
              {
                (!selectedTask.technician_responsable && !selectedTask.inspector_responsable) || editTech ?
                  (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="technician_responsable"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex gap-2 items-center">Técnico Responsable <Pencil onClick={() => setEditTech(!editTech)} className={cn("cursor-pointer size-4", selectedTask.status === 'ABIERTO' ? "flex" : "hidden")} /> </FormLabel>
                              <Select disabled={isTechniciansLoading || isTechniciansError} onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccione el responsable..." />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {
                                    isTechniciansLoading && <Loader2 className="size-4 animate-spin" />
                                  }
                                  {
                                    technicians && technicians.map((technician) => (
                                      <SelectItem key={technician.id} value={technician.dni}>{technician.first_name} {technician.last_name}</SelectItem>
                                    ))
                                  }
                                </SelectContent>
                              </Select>
                              <FormDescription>Técnico que realizará la tarea.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="inspector_responsable"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Inspector Responsable</FormLabel>
                              <FormControl>
                                <Input disabled={!!selectedTask.inspector_responsable} defaultValue={selectedTask.inspector_responsable} placeholder="..." {...field} />
                              </FormControl>
                              <FormDescription>
                                Inspector que verificará la tarea.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button disabled={updateWorkOrderTask.isPending} type="submit">{updateWorkOrderTask.isPending ? <Loader2 className="animate-spin size-4
                        " /> : "Confirmar Responsables"}</Button>
                      </form>
                    </Form>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="font-medium flex items-center gap-2">Técnico Responsable  <Pencil onClick={() => setEditTech(!editTech)} className={cn("cursor-pointer hover:scale-105 transition-all", selectedTask.status === 'ABIERTO' ? "flex" : "hidden")} /> </h3>
                        <Popover>
                          <PopoverTrigger asChild>
                            <p className="flex gap-2 items-center"><User2 /> <span className="cursor-pointer hover:scale-110 transition-all">{selectedTask.technician_responsable}</span></p>
                          </PopoverTrigger>
                          <PopoverContent className="space-y-2">
                            <h3 className="text-center font-medium">Técnicos Anteriores</h3>
                            <div className="flex flex-col gap-2">
                              <ul className="list-disc">
                                {
                                  selectedTask.old_technician ? selectedTask.old_technician.map((tech) => (
                                    <li className="text-sm ml-4">{tech}</li>
                                  )) : <p>No hay técnicos anteriores</p>
                                }
                              </ul>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Inspector Responsable</h3>
                        {
                          <p className="underline font-medium flex items-center gap-2"><User2 />{selectedTask.inspector_responsable}</p>
                        }
                      </div>
                    </div>
                  )
              }

              {/* Materiales/Herramientas */}
              {selectedTask.task?.task_items && selectedTask.task.task_items.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Materiales/Herramientas requeridas</h3>
                  <div className="border rounded-lg">
                    <ScrollArea className={cn("", selectedTask.task.task_items.length > 3 ? "h-[200px]" : "")}>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>N° Parte</TableHead>
                            <TableHead>Alterno</TableHead>
                            <TableHead>Serial</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedTask.task.task_items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.article_part_number}</TableCell>
                              <TableCell>{item.article_alt_part_number || '-'}</TableCell>
                              <TableCell>{item.article_serial}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Acciones */}
          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setOpenTaskDetails(false)}
            >
              Cerrar
            </Button>
            {selectedTask?.status === "ABIERTO" && selectedTask.inspector_responsable && selectedTask.technician_responsable && !editTech && (
              <Button
                disabled={updateTaskStatus.isPending}
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700"
              >
                {updateTaskStatus.isPending ? (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                ) : null}
                Confirmar Cierre
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkOrderTasksDetails;
