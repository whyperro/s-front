import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"


import { useDeleteRequisition } from "@/actions/compras/requisiciones/actions"
import { useCompanyStore } from "@/stores/CompanyStore"
import { ClipboardCheck, Eye, Loader2, MoreHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import LoadingPage from "./LoadingPage"

const RequisitionsDropdownActions = ({ id }: { id: number }) => {

  const [open, setOpen] = useState<boolean>(false)

  const [openDelete, setOpenDelete] = useState<boolean>(false)

  const { deleteRequisition } = useDeleteRequisition()

  const { selectedCompany } = useCompanyStore()

  if (!selectedCompany) {
    return <LoadingPage />
  }

  const handleDelete = async (id: number, company: string) => {
    await deleteRequisition.mutateAsync({
      id,
      company
    });
    setOpenDelete(false)
  }
  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="flex gap-2 justify-center">
          <DropdownMenuItem className="cursor-pointer">
            <ClipboardCheck className='size-5' />
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Eye className='size-5' />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)} className="cursor-pointer">
            <Trash2 className="size-5 text-red-500" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">¿Cancelar Boleto?</DialogTitle>
            <DialogDescription className="text-center">
              Selecciona el motivo de la cancelación
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant={"destructive"} onClick={() => setOpenDelete(false)}>Cancelar</Button>
            <Button onClick={() => handleDelete(id, selectedCompany.split(" ").join(""))} disabled={deleteRequisition.isPending} className="bg-primary text-white">{deleteRequisition.isPending ? <Loader2 className="animate-spin size-4" /> : "Confirmar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  )
}

export default RequisitionsDropdownActions
