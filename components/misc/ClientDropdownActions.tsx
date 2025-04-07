import { useDeleteClient } from "@/actions/administracion/clientes/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetClientById } from "@/hooks/administracion/clientes/useGetClientsById";
import {
  EditIcon,
  EyeIcon,
  Loader2,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EditClientForm } from "../forms/EditClientForm";
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
import AddClientBalanceForm from "../forms/AddClientBalanceForm";

const ClientDropdownActions = ({ id }: { id: string }) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openClient, setOpenClient] = useState<boolean>(false);
  const router = useRouter();
  const { deleteClient } = useDeleteClient();
  const { data: clientDetails, isLoading } = useGetClientById(id);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openAddBalance, setOpenAddBalance] = useState<boolean>(false);

  const handleViewStats = () => {
    router.push(`/transmandu/administracion/gestion_general/clientes/${id}`);
  };

  const handleDelete = (id: number | string) => {
    deleteClient.mutate(id, {
      onSuccess: () => setOpenDelete(false), // Cierra el modal solo si la eliminación fue exitosa
    });
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
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            <Trash2 className="size-5 text-red-500" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewDetails}>
            <EyeIcon className="size-5" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            <EditIcon className="size-5 text-blue-500" />
          </DropdownMenuItem>
          {!isLoading && clientDetails ? (
            clientDetails.balance < 0 ? (
              <DropdownMenuItem disabled>
                <span className="text-red-500">Con Deuda</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => setOpenAddBalance(true)}>
                <Plus className="size-5 text-green-500" />
              </DropdownMenuItem>
            )
          ) : null}
          <DropdownMenuItem
            onClick={() => {
              router.push(`/administracion/gestion_general/clientes/${id}`);
            }}
          ></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/*Dialog para eliminar un cliente*/}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault(); // Evita que el diálogo se cierre al hacer clic fuera
          }}
        >
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
              onClick={() => setOpenDelete(false)}
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

      {/*Dialog para ver el resumen de un cliente*/}
      <Dialog open={openClient} onOpenChange={setOpenClient}>
        <DialogContent
          className="sm:max-w-md"
          onInteractOutside={(e) => {
            e.preventDefault(); // Evita que el diálogo se cierre al hacer clic fuera
          }}
        >
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

              <div className="bg-muted p-4 rounded-lg mt-6">
                <h3 className="font-medium mb-2">Saldo</h3>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xl">
                    ${clientDetails.balance}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No se pudo cargar la información del cliente.
            </p>
          )}

          <DialogFooter className="sm:justify-center">
            <Button onClick={() => setOpenClient(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/*Dialog para editar un cliente*/}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault(); // Evita que el diálogo se cierre al hacer clic fuera
          }}
        >
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
          </DialogHeader>
          <EditClientForm id={id} onClose={() => setOpenEdit(false)} />
        </DialogContent>
      </Dialog>

      {/*Dialog para Registrar un saldo a favor para un cliente*/}
      <Dialog open={openAddBalance} onOpenChange={setOpenAddBalance}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault(); // Evita que el diálogo se cierre al hacer clic fuera
          }}
        >
          <DialogHeader>
            <DialogTitle>Registrar Saldo a Favor</DialogTitle>
          </DialogHeader>
          <AddClientBalanceForm
            id={id}
            onClose={() => setOpenAddBalance(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClientDropdownActions;
