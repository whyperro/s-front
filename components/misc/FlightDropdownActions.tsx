import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HandCoins, Loader2, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteFlight } from "@/actions/administracion/vuelos/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FlightPaymentsModifiedForm } from "../forms/CreateFlightPaymentsModifiedForm";
import { Flight } from "@/types";

const FlightDropdownActions = ({ flight }: { flight: Flight }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openPayment, setOpenPayment] = useState<boolean>(false);
  const router = useRouter(); //mouseket herramienta misteriosa
  const { deleteFlight } = useDeleteFlight();

  const handleDelete = async (id: number | string) => {
    await deleteFlight.mutateAsync(id);
    setOpen(false);
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
        <DropdownMenuContent align="center" className="flex gap-2 justify-center">
          {flight.debt_status === "PAGADO" ? (
            <DropdownMenuItem disabled>
              <span className="text-green-500">Pagado</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => setOpenPayment(true)}>
              <HandCoins className="size-5 text-green-500" />
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash2 className="size-5 text-red-500" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              ¿Seguro que desea eliminar el registro del vuelo?
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
              disabled={deleteFlight.isPending}
              className="hover:bg-white hover:text-black hover:border hover:border-black transition-all"
              onClick={() => handleDelete(flight.id)}
            >
              {deleteFlight.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <p>Confirmar</p>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openPayment} onOpenChange={setOpenPayment}>
        <DialogContent>
          <DialogHeader className="text-center font-bold">
            Registrar Pago
          </DialogHeader>
          <FlightPaymentsModifiedForm flight={flight} onClose={() => setOpenPayment(false)} />
        </DialogContent>
      </Dialog>
    </>
  );

};

export default FlightDropdownActions;
