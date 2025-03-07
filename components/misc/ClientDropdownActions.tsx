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
import { useGetClientById } from "@/hooks/administracion/useGetClientsById";
import { useDeleteClient } from "@/actions/administracion/clientes/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const ClientDropdownActions = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openClient, setOpenClient] = useState<boolean>(false);
  const router = useRouter();
  const { deleteClient } = useDeleteClient();
  const { data: clientDetails, isLoading } = useGetClientById(id);

  const handleDelete = async (id: number | string) => {
    await deleteClient.mutateAsync(id);
    setOpen(false);
  };

  const handleViewDetails = () => {
    setOpenClient(true);
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
              router.push(`/administracion/gestion_vuelos/clientes/${id}`); //segun la query deberia ser aircrafts
            }}
          ></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              ¿Seguro que desea eliminar al cliente?
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
              disabled={deleteClient.isPending}
              className="hover:bg-white hover:text-black hover:border hover:border-black transition-all"
              onClick={() => handleDelete(id)}
            >
              {deleteClient.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <p>Confirmar</p>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={openClient} onOpenChange={setOpenClient}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center font-bold">
            Resumen del Cliente
          </DialogHeader>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : clientDetails ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Nombre
                </h3>
                <p className="text-lg font-semibold">{clientDetails.name}</p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Cedula / RIF
                </h3>
                <p className="text-lg font-semibold">{clientDetails.dni}</p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Número de Teléfono
                </h3>
                <p className="text-lg font-semibold">{clientDetails.phone}</p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Ubicación
                </h3>
                <p className="text-lg font-semibold">{clientDetails.address}</p>
                <Separator />
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No se pudo cargar la información del cliente.
            </p>
          )}

          <DialogFooter className="sm:justify-center">
            <Button
              variant="outline"
              onClick={() =>
                router.push(`/administracion/gestion_vuelos/clientes/${id}`)
              }
            >
              Ver detalles completos
            </Button>
            <Button onClick={() => setOpenClient(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClientDropdownActions;
