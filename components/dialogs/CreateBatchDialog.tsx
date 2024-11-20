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
import { CreateBatchForm } from "../forms/CreateBatchForm"

export function CreateBatchDialog() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} variant={'outline'} className="flex items-center justify-center gap-2 h-8 border-dashed">Crear Renglón</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Creación de Renglón</DialogTitle>
          <DialogDescription>
            Cree un renglón de articulos.
          </DialogDescription>
        </DialogHeader>
        <CreateBatchForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
