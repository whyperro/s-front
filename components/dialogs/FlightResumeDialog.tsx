import { useGetFlightById } from "@/hooks/administracion/useGetFlightsById";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { useState } from "react";
import LoadingPage from "../misc/LoadingPage";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Loader2 } from "lucide-react";

const FlightResumeDialog = ({ id }: { id: string }) => {
  const { data: flight, isLoading } = useGetFlightById(id);
  const [openFlight, setOpenFlight] = useState(false);
  if (isLoading) {
    return <Loader2 className="animate-spin" />;
  }
  return (
    <Dialog open={openFlight} onOpenChange={setOpenFlight}>
      <DialogTrigger>{flight?.details}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center font-bold">
          Resumen de Vuelo
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Fecha</h3>
            <p className="text-lg font-semibold">
              {format(flight!.date, "PPP", { locale: es })}
            </p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Cliente
            </h3>
            <p className="text-lg font-semibold">
              {flight?.client ? flight?.client.name : "N/A"}
            </p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Ruta</h3>
            <p className="text-lg font-semibold">
              {flight?.route ? (
                <div>
                  {flight?.route.from}-{flight?.route.to}
                </div>
              ) : (
                "NA"
              )}
            </p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Avión</h3>
            <p className="text-lg font-semibold">{flight?.aircraft.acronym}</p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Tipo</h3>
            <p className="text-lg font-semibold">{flight?.type}</p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Tasa</h3>
            <p className="text-lg font-semibold">{flight?.fee}</p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Costo</h3>
            <p className="text-lg font-semibold">{flight?.total_amount}</p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Total Pagado
            </h3>
            <p className="text-lg font-semibold">{flight?.payed_amount}</p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Estado Actual
            </h3>
            <p className="text-lg font-semibold">{flight?.debt_status}</p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Detalles
            </h3>
            <p className="text-lg font-semibold">{flight?.details}</p>
            <Separator />
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button onClick={() => setOpenFlight(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FlightResumeDialog;
