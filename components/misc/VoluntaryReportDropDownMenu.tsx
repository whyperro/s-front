import { useDeleteVoluntaryReport } from "@/actions/sms/reporte_voluntario/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VoluntaryReport } from "@/types";
import {
  ClipboardPen,
  ClipboardPenLine,
  EyeIcon,
  Loader2,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateDangerIdentificationForm from "../forms/CreateIdentificationForm";
import { CreateVoluntaryReportForm } from "../forms/CreateVoluntaryReportForm";
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

const VoluntaryReportDropdownActions = ({
  voluntaryReport,
}: {
  voluntaryReport: VoluntaryReport;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const { deleteVoluntaryReport } = useDeleteVoluntaryReport();

  const [openCreateDangerIdentification, setOpenCreateDangerIdentification] =
    useState<boolean>(false);

  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async (id: number | string) => {
    await deleteVoluntaryReport.mutateAsync(id);
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
                  `/transmandu/sms/reportes_voluntarios/${voluntaryReport.id}`
                );
              }}
            >
              <EyeIcon className="size-5" />
            </DropdownMenuItem>

            {!voluntaryReport.danger_identification_id && (
              <DropdownMenuItem
                onClick={() => setOpenCreateDangerIdentification(true)}
              >
                <ClipboardPenLine className="size-5" />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">
                ¿Seguro que desea eliminar el reporte??
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
                disabled={deleteVoluntaryReport.isPending}
                className="hover:bg-white hover:text-black hover:border hover:border-black transition-all"
                onClick={() => handleDelete(voluntaryReport.id)}
              >
                {deleteVoluntaryReport.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <p>Confirmar</p>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog
          open={openCreateDangerIdentification}
          onOpenChange={setOpenCreateDangerIdentification}
        >
          <DialogContent className="flex flex-col max-w-2xl m-2">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <CreateDangerIdentificationForm
              onClose={() => setOpenCreateDangerIdentification(false)}
              id={voluntaryReport.id}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogContent className="flex flex-col max-w-2xl m-2">
            <DialogHeader>
              <DialogTitle className="text-center"></DialogTitle>
              <CreateVoluntaryReportForm
                initialData={voluntaryReport}
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

export default VoluntaryReportDropdownActions;
