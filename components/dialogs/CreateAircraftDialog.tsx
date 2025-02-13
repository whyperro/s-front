'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { useState } from "react"
import { CreateAircraftForm } from "../forms/CreateAircraftForm"

export function CreateAircraftDialog() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} variant={'outline'} className="flex items-center justify-center gap-2 h-8 border-dashed">Registrar Aeronave</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Registro de Aeronave</DialogTitle>
          <DialogDescription>
            Registre una aeronave rellenado los datos.
          </DialogDescription>
        </DialogHeader>
        <CreateAircraftForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
