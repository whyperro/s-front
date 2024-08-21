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
import CreatePermisssionForm from "../forms/CreatePermissionForm"

export function CreatePermissionDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} variant={'outline'} className="flex items-center justify-center gap-2 h-8 border-dashed">Nuevo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Creación de Permisos</DialogTitle>
          <DialogDescription>
            Cree un permiso colocando el nombre y asignandole sus respectivas acciones.
          </DialogDescription>
        </DialogHeader>
        <CreatePermisssionForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
