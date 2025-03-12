import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ObligatoryReport } from "@/types";
import {
  ClipboardPen,
  ClipboardPenLine,
  EyeIcon,
  Loader2,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useDeleteObligatoryReport } from "@/actions/sms/reporte_obligatorio/actions";
import { useRouter } from "next/navigation";
import { CreateObligatoryReportForm } from "../forms/CreateObligatoryReportForm";

const ObligatoryReportDropdownActions = ({
  obligatoryReport,
}: {
  obligatoryReport: ObligatoryReport;
}) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const { deleteObligatoryReport } = useDeleteObligatoryReport();

  const handleDelete = async (id: number | string) => {
    await deleteObligatoryReport.mutateAsync(id);
    setOpenDelete(false);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
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
            <DropdownMenuItem onClick={() => setOpenEdit(true)}>
              <ClipboardPen className="size-5" />
            </DropdownMenuItem>

            <DialogTrigger asChild>
              <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                <Trash2 className="size-5 text-red-500" />
              </DropdownMenuItem>
            </DialogTrigger>

            <DropdownMenuItem
              onClick={() => {
                router.push(
                  `/transmandu/sms/reportes_obligatorios/${obligatoryReport.id}`
                );
              }}
            >
              <EyeIcon className="size-5" />
            </DropdownMenuItem>

            {!obligatoryReport.id && (
              <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                <ClipboardPenLine className="size-5" />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">
                ¿Seguro que desea eliminar el reporte?
              </DialogTitle>
              <DialogDescription className="text-center p-2 mb-0 pb-0">
                Esta acción es irreversible y estaría eliminando por completo el
                reporte seleccionado.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex flex-col-reverse gap-2 md:gap-0">
              <Button
                className="bg-rose-400 hover:bg-white hover:text-black hover:border hover:border-black"
                onClick={() => setOpenDelete(false)}
                type="submit"
              >
                Cancelar
              </Button>

              <Button
                disabled={deleteObligatoryReport.isPending}
                className="hover:bg-white hover:text-black hover:border hover:border-black transition-all"
                onClick={() => handleDelete(obligatoryReport.id)}
              >
                {deleteObligatoryReport.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <p>Confirmar</p>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogContent className="flex flex-col max-w-2xl m-2">
            <DialogHeader>
              <DialogTitle className="text-center"></DialogTitle>
              <CreateObligatoryReportForm
                initialData={obligatoryReport}
                isEditing={true}
                onClose={() => setOpenEdit(false)}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Dialog>
    </>
  );
};

export default ObligatoryReportDropdownActions;
