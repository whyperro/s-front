import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateUserForm } from "../forms/CreateUserForm"
import { useState } from "react"

export function CreateUserDialog() {
  const [open, setOpen] = useState();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="flex items-center justify-center gap-2 h-8 border-dashed">Crear</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Creación de Usuario</DialogTitle>
          <DialogDescription>
            Cree un usuario rellenando los campos necesarios.
          </DialogDescription>
        </DialogHeader>
        <CreateUserForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
