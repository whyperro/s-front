import { useUpdateQuoteStatus } from "@/actions/compras/cotizaciones/actions"
import { useUpdateRequisitionStatus } from "@/actions/compras/requisiciones/actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { useCompanyStore } from "@/stores/CompanyStore"
import { Quote } from "@/types"
import { ClipboardCheck, ClipboardX, EyeIcon, Loader2, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"

const QuoteDropdownActions = ({ quote }: { quote: Quote }) => {

  const { user } = useAuth()

  const { selectedCompany } = useCompanyStore()

  const [openReject, setOpenReject] = useState<boolean>(false)

  const [openApprove, setOpenApprove] = useState<boolean>(false)

  const { updateStatusQuote } = useUpdateQuoteStatus()

  const { updateStatusRequisition } = useUpdateRequisitionStatus()

  const handleReject = async (id: number) => {
    const data = {
      status: "rechazada",
      updated_by: `${user?.first_name} ${user?.last_name}`,
      company: selectedCompany!.split(" ").join("").toLowerCase(),
    };

    await updateStatusQuote.mutateAsync({ id, data });
    await updateStatusRequisition.mutateAsync({
      id: quote.requisition_order.id, data: {
        status: "proceso",
        updated_by: `${user?.first_name} ${user?.last_name}`,
        company: selectedCompany!.split(" ").join("").toLowerCase(),
      }
    })
    setOpenReject(false);
  }
  const handleApprove = async (id: number) => {

    const data = {
      status: "aprobada",
      updated_by: `${user?.first_name} ${user?.last_name}`,
      company: selectedCompany!.split(" ").join("").toLowerCase(),
    };

    await updateStatusQuote.mutateAsync({ id, data });

    await updateStatusRequisition.mutateAsync({
      id: quote.requisition_order.id, data: {
        status: "aprobada",
        updated_by: `${user?.first_name} ${user?.last_name}`,
        company: selectedCompany!.split(" ").join("").toLowerCase(),
      }
    })

    setOpenApprove(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="flex gap-2 justify-center"> 
          {
            quote.status !== 'aprobada' && quote.status !== 'rechazada' && (
              <>
                <DropdownMenuItem onClick={() => setOpenApprove(true)}>
                  <ClipboardCheck className='size-5 text-green-500' />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenReject(true)}>
                  <ClipboardX className='size-5 text-red-500' />
                </DropdownMenuItem>
              </>
            )
          }
          <DropdownMenuItem >
            <EyeIcon className="size-5" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


      <Dialog open={openReject} onOpenChange={setOpenReject}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">¿Seguro que desea rechazar la cotizacion?</DialogTitle>
            <DialogDescription className="text-center p-2 mb-0 pb-0">
              Esta acción es irreversible y rechazando la cotizacion seleccionada.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button className="bg-rose-400 hover:bg-white hover:text-black hover:border hover:border-black" onClick={() => setOpenReject(false)} type="submit">Cancelar</Button>
            <Button disabled={updateStatusQuote.isPending} className="hover:bg-white hover:text-black hover:border hover:border-black transition-all" onClick={() => handleReject(Number(quote.id))}>{updateStatusQuote.isPending ? <Loader2 className="size-4 animate-spin" /> : <p>Confirmar</p>}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openApprove} onOpenChange={setOpenApprove}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">¿Seguro que desea aprobar la cotizacion?</DialogTitle>
            <DialogDescription className="text-center p-2 mb-0 pb-0">
              Será aprobada tanto la cotizacion como la requisicion adjunta.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button className="bg-rose-400 hover:bg-white hover:text-black hover:border hover:border-black" onClick={() => setOpenReject(false)} type="submit">Cancelar</Button>
            <Button disabled={updateStatusQuote.isPending} className="hover:bg-white hover:text-black hover:border hover:border-black transition-all" onClick={() => handleApprove(Number(quote.id))}>{updateStatusQuote.isPending ? <Loader2 className="size-4 animate-spin" /> : <p>Confirmar</p>}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default QuoteDropdownActions
