'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { useUpdateFinalHour } from "@/actions/desarrollo/reportes_diarios/actions"

const ActivityDropdownActions = ({ id, finished }: { id: number, finished: boolean }) => {
  const { updateFinalHour } = useUpdateFinalHour()
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [endTime, setEndTime] = useState("")

  const [result, setResult] = useState("")
  const [manualEndTime, setManualEndTime] = useState(false)

  useEffect(() => {
    if (!manualEndTime) {
      const now = new Date()
      const formattedTime = now.toTimeString().slice(0, 5)
      setEndTime(formattedTime)
    }
  }, [dialogOpen, manualEndTime])

  const handleConfirm = async () => {
    const data = {
      final_hour: endTime,
      result: result,
      id: id.toString(),
    }

    await updateFinalHour.mutateAsync(data)

    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value
    if (timeValue >= "07:00" && timeValue <= "17:00") {
      setEndTime(timeValue)
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="flex flex-col gap-2">
          <DropdownMenuItem disabled={finished} onClick={() => setDialogOpen(true)} className="cursor-pointer">
            <Clock className="size-5 mr-2" /> Finalizar Actividad
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Diálogo para ingresar hora de finalización y resultado */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Finalizar Actividad</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox checked={manualEndTime} onCheckedChange={(checked) => setManualEndTime(Boolean(checked))} />
            <Label>Ingresar hora manualmente</Label>
          </div>
          <div>
            <Label>Hora de Finalización</Label>
            <Input
              type="time"
              value={endTime}
              min="07:00"
              max="17:00"
              disabled={!manualEndTime}
              onChange={handleTimeChange}
            />
          </div>
          <div>
            <Label>Resultado Obtenido</Label>
            <Input
              type="text"
              placeholder="Describe el resultado..."
              value={result}
              onChange={(e) => setResult(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button disabled={updateFinalHour.isPending} onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ActivityDropdownActions
