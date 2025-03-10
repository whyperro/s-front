import { useDeleteFlight } from "@/actions/administracion/vuelos/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flight } from "@/types";
import { format } from "date-fns";
import { es, id } from "date-fns/locale";
import {
  EyeIcon,
  HandCoins,
  Loader2,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FlightPaymentsModifiedForm } from "../forms/CreateFlightPaymentsModifiedForm";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";

const FlightDropdownActions = ({ flight }: { flight: Flight }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openPayment, setOpenPayment] = useState<boolean>(false);
  const [openFlight, setOpenFlight] = useState<boolean>(false);
  const router = useRouter();
  const { deleteFlight } = useDeleteFlight();

  const handleDelete = async (id: number | string) => {
    await deleteFlight.mutateAsync(id);
    setOpen(false);
  };

  const handleViewDetails = () => {
    setOpenFlight(true);
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
          <DropdownMenuItem onClick={handleViewDetails}>
            <EyeIcon className="size-5" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/administracion/vuelos/${flight}`);
            }}
          ></DropdownMenuItem>
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
          <FlightPaymentsModifiedForm
            flight={flight}
            onClose={() => setOpenPayment(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openFlight} onOpenChange={setOpenFlight}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center font-bold">
            Resumen de Vuelo
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Fecha
              </h3>
              <p className="text-lg font-semibold">
                {format(flight.date, "PPP", { locale: es })}
              </p>
              <Separator />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Cliente
              </h3>
              <p className="text-lg font-semibold">{flight.client.name}</p>
              <Separator />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Ruta
              </h3>
              <p className="text-lg font-semibold">{flight.route.from}-{flight.route.to}</p>
              <Separator />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Avión
              </h3>
              <p className="text-lg font-semibold">{flight.aircraft.acronym}</p>
              <Separator />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Tipo
              </h3>
              <p className="text-lg font-semibold">{flight.type}</p>
              <Separator />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Tasa
              </h3>
              <p className="text-lg font-semibold">{flight.fee}</p>
              <Separator />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Costo
              </h3>
              <p className="text-lg font-semibold">{flight.total_amount}</p>
              <Separator />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Total Pagado
              </h3>
              <p className="text-lg font-semibold">{flight.payed_amount}</p>
              <Separator />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Estado Actual
              </h3>
              <p className="text-lg font-semibold">{flight.debt_status}</p>
              <Separator />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Detalles
              </h3>
              <p className="text-lg font-semibold">{flight.details}</p>
              <Separator />
            </div>
          </div>

          <DialogFooter className="sm:justify-center">
            <Button
              variant="outline"
              onClick={() =>
                router.push(`/administracion/gestion_vuelos/vuelos/${id}`)
              }
            >
              Ver detalles completos
            </Button>
            <Button onClick={() => setOpenFlight(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FlightDropdownActions;
