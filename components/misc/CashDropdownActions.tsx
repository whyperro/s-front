import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertCircleIcon,
  EyeIcon,
  Loader2,
  MoreHorizontal,
  Trash2,
  WalletIcon,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useDeleteCash } from "@/actions/administracion/cuentas/actions";
import { Separator } from "../ui/separator";
import { useGetCashById } from "@/hooks/administracion/useGetCashById";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

//función auxiliar para manejar la lógica de los símbolos
const getCurrencySymbol = (coinType: string) => {
  switch (coinType) {
    case "DOLARES":
      return "$";
    case "EUROS":
      return "€";
    case "BOLIVARES":
      return "Bs.";
    default:
      return "";
  }
};

const CashDropdownActions = ({ id }: { id: string }) => {
  const [openCash, setOpenCash] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const router = useRouter();
  const { deleteCash } = useDeleteCash();
  const { data: cashDetails, isLoading } = useGetCashById(id);

  const handleDelete = (id: number | string) => {
    deleteCash.mutate(id, {
      onSuccess: () => setOpenDelete(false), // Cierra el modal solo si la eliminación fue exitosa
    });
  };

  const handleViewDetails = () => {
    setOpenCash(true);
  };

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
              router.push(`/administracion/gestion_cajas/cuentas/${id}`);
            }}
          ></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/*Dialog para eliminar una caja*/}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault(); // Evita que el diálogo se cierre al hacer clic fuera
          }}
        >
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
        <DialogContent
          className="sm:max-w-md rounded-lg"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-sm text-muted-foreground">
                Cargando información...
              </p>
            </div>
          ) : cashDetails ? (
            <>
              <DialogHeader>
                <div className="flex flex-col items-center space-y-2">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <WalletIcon className="h-6 w-6 text-primary" />
                  </div>
                  <DialogTitle className="text-xl font-bold text-white-800">
                    Detalles de la Caja
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-500">
                    Información completa de la cuenta
                  </DialogDescription>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nombre</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {cashDetails.name}
                    </p>
                  </div>
                  <div className="bg-primary/10 px-3 py-1 rounded-full">
                    <p className="text-sm font-medium text-primary">
                      {cashDetails.coin}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-600">
                      Saldo Total
                    </p>
                    <p className="text-xl font-bold text-green-800">
                      {getCurrencySymbol(cashDetails.coin)}{" "}
                      {cashDetails.total_amount}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Resumen Detallado
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estado:</span>
                      <span className="font-medium text-green-600">Activa</span>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="sm:justify-center">
                <Button
                  onClick={() => setOpenCash(false)}
                  className="w-full max-w-xs mx-auto"
                  variant="outline"
                >
                  Cerrar
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <AlertCircleIcon className="h-8 w-8 text-red-500" />
              <p className="mt-4 text-center text-muted-foreground">
                No se pudo cargar la información de la caja.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CashDropdownActions;
