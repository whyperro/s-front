import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EyeIcon, Loader2, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useDeleteCash } from "@/actions/administracion/cuentas/actions";
import { Separator } from "../ui/separator"
import { useGetCashById } from "@/hooks/administracion/useGetCashById";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const CashDropdownActions = ({ id }: { id: string }) => {
  const [openCash, setOpenCash] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const router = useRouter();
  const { deleteCash } = useDeleteCash();
  const { data: cashDetails, isLoading } = useGetCashById(id)

  const handleDelete = async (id: number | string) => {
    await deleteCash.mutateAsync(id);
    setOpenDelete(false);
  };

  const handleViewDetails = () => {
    setOpenCash(true)
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
        <DropdownMenuContent
          align="center"
          className="flex gap-2 justify-center"
        >
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            <Trash2 className="size-5 text-red-500" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewDetails}>
            <EyeIcon className="size-5" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/administracion/cuentas/${id}`)
            }}
          >
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/*Dialog para eliminar una caja*/}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent onInteractOutside={(e) => {
          e.preventDefault(); // Evita que el diálogo se cierre al hacer clic fuera
        }}>
          <DialogHeader>
            <DialogTitle className="text-center">
              ¿Seguro que desea eliminar la caja?
            </DialogTitle>
            <DialogDescription className="text-center p-2 mb-0 pb-0">
              Esta acción es irreversible y estaría eliminando por completo el
              permiso seleccionado.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              className="bg-rose-400 hover:bg-white hover:text-black hover:border hover:border-black"
              onClick={() => setOpenDelete(false)}
              type="submit"
            >
              Cancelar
            </Button>
            <Button
              disabled={deleteCash.isPending}
              className="hover:bg-white hover:text-black hover:border hover:border-black transition-all"
              onClick={() => handleDelete(id)}
            >
              {deleteCash.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <p>Confirmar</p>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/*Dialog para mostrar el resumen de una caja*/}
      <Dialog open={openCash} onOpenChange={setOpenCash}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => {
          e.preventDefault(); // Evita que el diálogo se cierre al hacer clic fuera
        }}>
          <DialogHeader className="text-center font-bold">Resumen de Caja</DialogHeader>

          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : cashDetails ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Nombre</h3>
                <p className="text-lg font-semibold">{cashDetails.name}</p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Moneda</h3>
                <p className="text-lg font-semibold">{cashDetails.coin}</p>
                <Separator />
              </div>
              
              <div className="bg-muted p-4 rounded-lg mt-6">
                <h3 className="font-medium mb-2">Resumen</h3>
                <div className="flex justify-between items-center">
                  <span>Monto Total:</span>
                  <span className="font-bold text-xl">${cashDetails.total_amount}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No se pudo cargar la información de la caja.</p>
          )}
          <DialogFooter className="sm:justify-center">
          {/*  <Button variant="outline" onClick={() => router.push(`/administracion/cuentas/${id}`)}>
              Ver detalles completos
            </Button> */}
            <Button onClick={() => setOpenCash(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CashDropdownActions;
