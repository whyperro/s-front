'use client'

import { useDeleteActivity, useEditActivity, useUpdateFinalHour } from '@/actions/desarrollo/reportes_diarios/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useGetUserActivity } from "@/hooks/desarrollo/useGetUserActivities";
import { Activity } from '@/types';
import { Clock, Edit, Loader2, MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ActivityDropdownActions = ({ initialData, finished }: { initialData: Activity, finished: boolean }) => {
  const router = useRouter()
  const { updateFinalHour } = useUpdateFinalHour()
  const { deleteActivity } = useDeleteActivity()
  const { editActivity } = useEditActivity()
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [description, setDescription] = useState("")
  const [result, setResult] = useState("")
  const [manualEndTime, setManualEndTime] = useState(false)
  useEffect(() => {
    if (!manualEndTime) {
      const now = new Date()
      const formattedTime = now.toTimeString().slice(0, 5)
      setEndTime(formattedTime)
    }
  }, [dialogOpen, manualEndTime])

  useEffect(() => {
    if (initialData) {
      setStartTime(initialData.start_hour || "")
      setEndTime(initialData.final_hour || "")
      setDescription(initialData.description || "")
    }
  }, [initialData])

  const handleConfirm = async () => {
    const data = {
      final_hour: endTime,
      id: initialData.id.toString(),
      result: result,
    }
    await updateFinalHour.mutateAsync(data)
    router.refresh();
    setDialogOpen(false)
  }

  const handleDelete = async () => {
    await deleteActivity.mutateAsync({ id: initialData.id.toString() })
    setDialogOpen(false)
    router.back()
    router.refresh()
  }

  const handleEditConfirm = async () => {
    const data = {
      id: initialData.id.toString(),
      start_hour: startTime,
      final_hour: endTime,
      description: description,
      result: result,
    };

    await editActivity.mutateAsync(data);
    setEditDialogOpen(false);
    router.refresh();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" className="flex flex-col gap-2">
          <DropdownMenuItem
            disabled={finished}
            onClick={() => setDialogOpen(true)}
            className="cursor-pointer"
          >
            <Clock className="size-5 mr-2" /> Finalizar Actividad
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setEditDialogOpen(true)} className="cursor-pointer">
            <Edit className="size-5 mr-2" /> Editar Actividad
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-red-600">
            <Trash2 className="size-5 mr-2" /> Eliminar Actividad
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finalizar Actividad</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Hora de Finalización</Label>
            <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} /> <br></br>
            <Label>Resultado de la actividad</Label>
            <Input type="text" value={result} onChange={(e) => setResult(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button disabled={editActivity.isPending} onClick={handleConfirm}>{editActivity.isPending ? <Loader2 className='animate-spin' /> : "Confirmar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Actividad</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label className="mb-2">Descripción</Label>
            <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Label className="mb-2">Hora de Inicio</Label>
            <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <Label className="mb-2">Hora de Finalización</Label>
            <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            <Label className="mb-2">Resultado</Label>
            <Input type="text" value={result} onChange={(e) => setResult(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
            <Button disabled={editActivity.isPending} onClick={handleEditConfirm}>{editActivity.isPending ? <Loader2 className='animate-spin' /> : "Guardar Cambios"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ActivityDropdownActions
