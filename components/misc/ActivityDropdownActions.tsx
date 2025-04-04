'use client'

import { useUpdateFinalHour, useDeleteActivity, useEditActivity } from '@/actions/desarrollo/reportes_diarios/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Clock, MoreHorizontal, Trash2, Edit } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { useGetUserActivity } from "@/hooks/desarrollo/useGetUserActivities"
import { useRouter } from "next/navigation"

const ActivityDropdownActions = ({ id, finished }: { id: number, finished: boolean }) => {
  const router = useRouter()
  const { updateFinalHour } = useUpdateFinalHour()
  const { deleteActivity } = useDeleteActivity()
  const { editActivity } = useEditActivity()
  const { data: report } = useGetUserActivity(id.toString())
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
    if (report) {
      const activity = report.activities.find(act => act.id === id)
      if (activity) {
        setStartTime(report.activities[0].start_hour || "")
        setEndTime(report.activities[0].final_hour || "")
        setDescription(report.activities[0].description || "")
      }
    }
  }, [editDialogOpen, report, id])

  const handleConfirm = async () => {
    const data = {
      final_hour: endTime,
      id: id.toString(),
      result: result,
    }
    await updateFinalHour.mutateAsync(data)
    router.refresh();
    setDialogOpen(false)
  }

  const handleDelete = async () => {
    const activities = report?.activities || []
    const isOnlyOneActivity = activities.length === 1 && activities[0]?.id === id
    await deleteActivity.mutateAsync({ id: id.toString() })
    if (isOnlyOneActivity) {
      router.back()
      router.refresh()
    } else {
      router.refresh()
      setDialogOpen(false)
    }
  }

const handleEditConfirm = async () => {
    const data = {
        id: id.toString(),
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
            <Button onClick={handleConfirm}>Confirmar</Button>
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
            <Button onClick={handleEditConfirm}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ActivityDropdownActions
