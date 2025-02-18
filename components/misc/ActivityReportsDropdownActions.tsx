'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Eye, Printer, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useRouter } from "next/navigation"

const ActivityReportsDropdownActions = ({ id }: { id: number }) => {

  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleView = () => {
    console.log("Visualizando reporte con ID:", id)
    // Aquí puedes abrir un modal, redirigir a una página o cargar detalles
    router.push(`/reporte/detalle/${id}`) // Ajusta la ruta según tu estructura
  }

  const handlePrint = () => {
    console.log("Imprimiendo reporte con ID:", id)
    // Aquí puedes llamar a una función para generar un PDF o abrir la vista de impresión
    window.print() // O usa una función específica para manejar la impresión
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  )
}

export default ActivityReportsDropdownActions
