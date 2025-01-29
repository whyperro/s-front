import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { EyeIcon, Loader2, MoreHorizontal, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useDeleteRole } from "@/actions/administracion/roles/actions"

const RolesDropdownActions = ({ id }: { id: string | number }) => {

  const [open, setOpen] = useState<boolean>(false)

  const router = useRouter()

  const { deleteRole } = useDeleteRole()

  const handleDelete = async (id: number | string) => {
    await deleteRole.mutateAsync(id);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="flex gap-2 justify-center">
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Trash2 className='size-5 text-red-500' />
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={() => {
            router.push(`/administracion/usuarios_permisos/usuarios/${id}`)
          }}>
            <EyeIcon className="size-5" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


      
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">¿Seguro que desea eliminar el rol?</DialogTitle>
          <DialogDescription className="text-center p-2 mb-0 pb-0">
            Esta acción es irreversible y estaría eliminado por completo el rol seleccionado.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="bg-rose-400 hover:bg-white hover:text-black hover:border hover:border-black" onClick={() => setOpen(false)} type="submit">Cancelar</Button>
          <Button disabled={deleteRole.isPending} className="hover:bg-white hover:text-black hover:border hover:border-black transition-all" onClick={() => handleDelete(id)}>{deleteRole.isPending ? <Loader2 className="size-4 animate-spin" /> : <p>Confirmar</p>}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>


  )
}

export default RolesDropdownActions
