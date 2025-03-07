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
import { useGetAircraftById } from "@/hooks/administracion/useGetAircraftById";
import { useDeleteAircraft } from "@/actions/administracion/aviones/actions";
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
import { es } from "date-fns/locale";

const AircraftDropdownActions = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openAircraft, setOpenAircraft] = useState<boolean>(false);
  const router = useRouter();
  const { deleteAircraft } = useDeleteAircraft();
  const { data: aircraftDetails, isLoading } = useGetAircraftById(id);

  const handleDelete = async (id: number | string) => {
    await deleteAircraft.mutateAsync(id);
    setOpen(false);
  };

  const handleViewDetails = () => {
    setOpenAircraft(true);
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
              router.push(`/administracion/gestion_vuelos/aviones/${id}`);
            }}
          ></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              ¿Seguro que desea eliminar el avión?
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
              disabled={deleteAircraft.isPending}
              className="hover:bg-white hover:text-black hover:border hover:border-black transition-all"
              onClick={() => handleDelete(id)}
            >
              {deleteAircraft.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <p>Confirmar</p>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openAircraft} onOpenChange={setOpenAircraft}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center font-bold">
            Resumen de Avión
          </DialogHeader>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : aircraftDetails ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Serial
                </h3>
                <p className="text-lg font-semibold">
                  {aircraftDetails.serial}
                </p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Matricula
                </h3>
                <p className="text-lg font-semibold">
                  {aircraftDetails.acronym}
                </p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Marca
                </h3>
                <p className="text-lg font-semibold">{aircraftDetails.brand}</p>
                <Separator />
              </div>

              <div className="space-y-2">
               <h3 className="text-sm font-medium text-muted-foreground">
                 Ubicación
               </h3>
               <p className="text-lg font-semibold">
                 {aircraftDetails.location.address}
               </p>
               <Separator />
             </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Dueño
                </h3>
                <p className="text-lg font-semibold">{aircraftDetails.owner}</p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Fabricante
                </h3>
                <p className="text-lg font-semibold">
                  {aircraftDetails.fabricant}
                </p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Fecha de Fabricación
                </h3>
                <p className="text-lg font-semibold">
                  {format(aircraftDetails.fabricant_date, "PPP", {
                    locale: es,
                  })}
                </p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Comentarios
                </h3>
                <p className="text-lg font-semibold">
                  {aircraftDetails.comments}
                </p>
                <Separator />
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No se pudo cargar la información del avión.
            </p>
          )}

          <DialogFooter className="sm:justify-center">
            <Button
              variant="outline"
              onClick={() =>
                router.push(`/administracion/gestion_vuelos/aviones/${id}`)
              }
            >
              Ver detalles completos
            </Button>
            <Button onClick={() => setOpenAircraft(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AircraftDropdownActions;
