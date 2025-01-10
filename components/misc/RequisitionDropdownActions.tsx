import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"


import { useDeleteRequisition, useUpdateRequisitionStatus } from "@/actions/compras/requisiciones/actions"
import { useAuth } from "@/contexts/AuthContext"
import { useCompanyStore } from "@/stores/CompanyStore"
import { Requisition } from "@/types"
import { ClipboardCheck, ClipboardX, Loader2, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import { CreateGeneralRequisitionForm } from "../forms/CreateGeneralRequisitionForm"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import LoadingPage from "./LoadingPage"
import { CreatePurchaseOrderForm } from "../forms/CreatePurchaseOrderForm"

function transformApiData(apiData: any) {
  return {
    order_number: apiData.order_number,
    justification: apiData.justification,
    company: "", // Add appropriate value
    created_by: apiData.created_by.id.toString(),
    requested_by: apiData.requested_by,
    articles: apiData.batch.map((batch: any) => ({
      batch: batch.id.toString(),
      batch_name: batch.name,
      batch_articles: batch.batch_articles.map((article: any) => ({
        part_number: article.article_part_number,
        quantity: parseFloat(article.quantity),
      })),
    })),
  };
}

const RequisitionsDropdownActions = ({ req }: { req: Requisition }) => {

  const { user } = useAuth()

  const [open, setOpen] = useState<boolean>(false)

  const [openDelete, setOpenDelete] = useState<boolean>(false)

  const [openConfirm, setOpenConfirm] = useState<boolean>(false)

  const [openReject, setOpenReject] = useState<boolean>(false)

  const [openEdit, setOpenEdit] = useState<boolean>(false)

  const { deleteRequisition } = useDeleteRequisition()

  const { updateStatusRequisition } = useUpdateRequisitionStatus()

  const { selectedCompany } = useCompanyStore()

  const userRoles = user?.roles?.map(role => role.name) || [];

  const initialData = transformApiData(req);

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

  const handleConfirm = async (id: number, updated_by: string, status: string, company: string) => {
    const data = {
      status,
      updated_by,
      company,
    };
    await updateStatusRequisition.mutateAsync({
      id,
      data
    });
    setOpenConfirm(false)
  }

  const handleReject = async (id: number, updated_by: string, status: string, company: string) => {
    const data = {
      status,
      updated_by,
      company,
    };
    await updateStatusRequisition.mutateAsync({
      id,
      data
    });
    setOpenReject(false)
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
          {
            ((user!.roles!.map(role => role.name).includes("ANALISTA_COMPRAS")) || (user!.roles!.map(role => role.name).includes("SUPERUSER"))) && (
              <>
                <DropdownMenuItem disabled={req.status === 'aprobado'} className="cursor-pointer">
                  <ClipboardCheck onClick={() => setOpenConfirm(true)} className='size-5' />
                </DropdownMenuItem>
                <DropdownMenuItem disabled={req.status === 'rechazado'} onClick={() => setOpenReject(true)} className="cursor-pointer">
                  <ClipboardX className="size-5" />
                </DropdownMenuItem>
              </>
            )
          }
          <DropdownMenuItem disabled={!(userRoles.includes("JEFE_ALMACEN") || userRoles.includes("ADMIN_INGENIERIA")) || (user!.roles!.map(role => role.name).includes("SUPERUSER"))} onClick={() => setOpenDelete(true)} className="cursor-pointer">
            <Trash2 className="size-5 text-red-500" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenEdit(true)} className="cursor-pointer">
            <Pencil className="size-5" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">¿Eliminar Requisición?</DialogTitle>
            <DialogDescription className="text-center">
              Esta acción no se puede deshacer. ¿Estás seguro de eliminar esta requisición?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant={"destructive"} onClick={() => setOpenDelete(false)}>Cancelar</Button>
            <Button onClick={() => handleDelete(req.id, selectedCompany.split(" ").join(""))} disabled={deleteRequisition.isPending} className="bg-primary text-white">{deleteRequisition.isPending ? <Loader2 className="animate-spin size-4" /> : "Confirmar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent className="max-w-xl">  
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">Confirmar Requisición</DialogTitle>
            <DialogDescription className="text-center">
              ¿Estás seguro de confirmar esta requisición?
            </DialogDescription>
          </DialogHeader>
          <CreatePurchaseOrderForm initialData={initialData} onClose={() => setOpenConfirm(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={openReject} onOpenChange={setOpenReject}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">Rechazar Requisición</DialogTitle>
            <DialogDescription className="text-center">
              ¿Estás seguro de rechazar esta requisición?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => handleReject(req.id, `${user?.first_name} ${user?.last_name}`, "rechazado", selectedCompany.split(" ").join(""))} disabled={updateStatusRequisition.isPending} className="bg-primary text-white">{updateStatusRequisition.isPending ? <Loader2 className="animate-spin size-4" /> : "Confirmar"}</Button>
            <Button type="button" variant={"destructive"} onClick={() => setOpenReject(false)}>Cancelar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Requisición</DialogTitle>
            <DialogDescription>Edite los articulos ingresados en la requisición.</DialogDescription>
          </DialogHeader>
          <CreateGeneralRequisitionForm id={req.id} isEditing initialData={initialData} onClose={() => setOpenEdit(false)} />
        </DialogContent>
      </Dialog>

    </>
  )
}

export default RequisitionsDropdownActions
