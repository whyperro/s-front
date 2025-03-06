'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Eye, Printer, MoreHorizontal, MessageSquare } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "../ui/dialog"
import { Input } from "../ui/input"
import { useRouter } from "next/navigation"

const ActivityReportsDropdownActions = ({ id, date }: { id: number, date: string }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [observation, setObservation] = useState<string>("")
  const [isObservationOpen, setIsObservationOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleView = () => {
    router.push(`/transmandu/desarrollo/actividades_diarias/${id}/`)
  }

  const handlePrint = () => {
    console.log("Imprimiendo reporte con ID:", id)
    window.print()
  }

  const handleSaveObservation = () => {
    console.log("Observación guardada:", observation)
    setIsObservationOpen(false)
  }

  return (
    <>
      <Dialog open={isObservationOpen} onOpenChange={setIsObservationOpen}>
        <DialogContent>
          <DialogHeader>Agregar Observación</DialogHeader>
          <Input
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Escribe tu observación aquí..."
          />
          <DialogFooter>
            <Button onClick={handleSaveObservation}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="flex gap-2 justify-center">
          <DropdownMenuItem onClick={handleView} className="cursor-pointer">
            <Eye className="size-5" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handlePrint} className="cursor-pointer">
            <Printer className="size-5" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsObservationOpen(true)} className="cursor-pointer">
            <MessageSquare className="size-5" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default ActivityReportsDropdownActions
