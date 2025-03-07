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
import { Separator } from "../ui/separator";
import { useGetFlightPaymentById } from "@/hooks/administracion/useGetFlightPaymentsById";
import { useDeleteFlightPayments } from "@/actions/administracion/pagos/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";

const FlightPaymentsDropdownActions = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openPayments, setOpenPayments] = useState<boolean>(false);
  const router = useRouter();
  const { deleteFlightPayments } = useDeleteFlightPayments();
  const { data: paymentsDetails, isLoading } = useGetFlightPaymentById(id);

  const handleDelete = async (id: number | string) => {
    await deleteFlightPayments.mutateAsync(id);
    setOpen(false);
  };

  const handleViewDetails = () => {
    setOpenPayments(true);
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
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash2 className="size-5 text-red-500" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewDetails}>
            <EyeIcon className="size-5" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/administracion/pagos/${id}`);
            }}
          ></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              ¿Seguro que desea eliminar el registro de pago del vuelo?
            </DialogTitle>
            <DialogDescription className="text-center p-2 mb-0 pb-0">
              Esta acción es irreversible y estaría eliminando por completo el
              permiso seleccionado.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              className="bg-rose-400 hover:bg-white hover:text-black hover:border hover:border-black"
              onClick={() => setOpen(false)}
              type="submit"
            >
              Cancelar
            </Button>
            <Button
              disabled={deleteFlightPayments.isPending}
              className="hover:bg-white hover:text-black hover:border hover:border-black transition-all"
              onClick={() => handleDelete(id)}
            >
              {deleteFlightPayments.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <p>Confirmar</p>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openPayments} onOpenChange={setOpenPayments}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center font-bold">
            Resumen de Pago
          </DialogHeader>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : paymentsDetails ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Cliente
                </h3>
                <p className="text-lg font-semibold">
                  {paymentsDetails.client.name}
                </p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Vuelo
                </h3>
                <p className="text-lg font-semibold">
                  {paymentsDetails.flight.id}
                </p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Método de Pago
                </h3>
                <p className="text-lg font-semibold">
                  {paymentsDetails.pay_method}
                </p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Cuenta de Banco
                </h3>
                <p className="text-lg font-semibold">
                  {paymentsDetails.bank_account
                    ? paymentsDetails.bank_account.name
                    : "N/A"}
                </p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Cantidad Pagada
                </h3>
                <p className="text-lg font-semibold">
                  {paymentsDetails.pay_amount}
                </p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Fecha de pago
                </h3>
                <p className="text-lg font-semibold">
                  {format(paymentsDetails.payment_date, "PPP", {
                    locale: es,
                  })}
                </p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Descripción
                </h3>
                <p className="text-lg font-semibold">
                  {paymentsDetails.pay_description}
                </p>
                <Separator />
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No se pudo cargar la información del pago del vuelo.
            </p>
          )}

          <DialogFooter className="sm:justify-center">
            <Button
              variant="outline"
              onClick={() => router.push(`/administracion/pagos/${id}`)}
            >
              Ver detalles completos
            </Button>
            <Button onClick={() => setOpenPayments(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FlightPaymentsDropdownActions;
