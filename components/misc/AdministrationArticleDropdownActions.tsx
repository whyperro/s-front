import { useDeleteAdministrationArticle } from "@/actions/administracion/articulos/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetAdministrationArticleById } from "@/hooks/administracion/useGetAdministrationArticleById";
import {
  EyeIcon,
  Loader2,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

const AdministrationArticleDropdownActions = ({ id }: { id: string }) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openAdminArticle, setOpenAdminArticle] = useState<boolean>(false);
  const router = useRouter();
  const { deleteAdministrationArticle } = useDeleteAdministrationArticle();
  const { data: articleDetails, isLoading } = useGetAdministrationArticleById(id);

  const handleDelete = async (id: number | string) => {
    await deleteAdministrationArticle.mutateAsync(id);
    setOpenDelete(false);
  };

  const handleViewDetails = () => {
    setOpenAdminArticle(true);
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
              router.push(`/administracion/articulos/${id}`);
            }}
          ></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/*Dialog para eliminar un articulo*/}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent onInteractOutside={(e) => {
          e.preventDefault(); // Evita que el diálogo se cierre al hacer clic fuera
        }}>
          <DialogHeader>
            <DialogTitle className="text-center">
              ¿Seguro que desea eliminar el articulo?
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
              disabled={deleteAdministrationArticle.isPending}
              className="hover:bg-white hover:text-black hover:border hover:border-black transition-all"
              onClick={() => handleDelete(id)}
            >
              {deleteAdministrationArticle.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <p>Confirmar</p>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/*Dialog para ver el resumen del articulo*/}
      <Dialog open={openAdminArticle} onOpenChange={setOpenAdminArticle}>
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => {
          e.preventDefault(); // Evita que el diálogo se cierre al hacer clic fuera
        }}>
          <DialogHeader className="text-center font-bold">
            Resumen del Articulo 
          </DialogHeader>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : articleDetails ? (
            <div className="space-y-4">
                <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Serial
                </h3>
                <p className="text-lg font-semibold">{articleDetails.serial}</p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Nombre
                </h3>
                <p className="text-lg font-semibold">{articleDetails.name}</p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Estado
                </h3>
                <p className="text-lg font-semibold">{articleDetails.status}</p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Precio
                </h3>
                <p className="text-lg font-semibold">{articleDetails.price}</p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Marca
                </h3>
                <p className="text-lg font-semibold">{articleDetails.brand}</p>
                <Separator />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Tipo
                </h3>
                <p className="text-lg font-semibold">{articleDetails.type}</p>
                <Separator />
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No se pudo cargar la información del articulo.
            </p>
          )}

          <DialogFooter className="sm:justify-center">
          {/*  <Button
              variant="outline"
              onClick={() =>
                router.push(`/administracion/articulos/${id}`)
              }
            >
              Ver detalles completos
            </Button> */}
            <Button onClick={() => setOpenAdminArticle(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default AdministrationArticleDropdownActions;
