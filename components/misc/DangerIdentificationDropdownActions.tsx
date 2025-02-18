import { useDeletePilot } from "@/actions/sms/piloto/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DangerIdentification, InformationSource, Pilot, VoluntaryReport } from "@/types";
import {
  EyeIcon,
  Loader2,
  MoreHorizontal,
  Trash2,
  ClipboardPenLine,
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
import { useRouter } from "next/navigation";
import { useDeleteInformationSource } from "@/actions/sms/tipos_fuente/actions";
import { useDeleteVoluntaryReport } from "@/actions/sms/reporte_voluntario/actions";
import CreateDangerIdentificationForm from "../forms/CreateIdentificationForm";
import CreateDangerIdentificationDialog from "../dialogs/CreateDangerIdentificationDialog";
import CreateAnalysisForm from "../forms/CreateAnalysisForm";
import { useDeleteDangerIdentification } from "@/actions/sms/peligros_identificados/actions";

const DangerIdentificationDropdownActions = ({
  dangerIdentification,
}: {
  dangerIdentification: DangerIdentification;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const { deleteDangerIdentification } = useDeleteDangerIdentification();

  const [openCreateAnalysis, setOpenCreateAnalysis] =
    useState<boolean>(false);

  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async (id: number | string) => {
    await deleteDangerIdentification.mutateAsync(dangerIdentification.id);
    setOpen(false);
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
            <DialogTrigger asChild>
              <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                <Trash2 className="size-5 text-red-500" />
              </DropdownMenuItem>
            </DialogTrigger>


            <DropdownMenuItem
              onClick={() => setOpenCreateAnalysis(true)}
            >
              <ClipboardPenLine className="size-5" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">
                ¿Seguro que desea eliminar el reporte??
              </DialogTitle>
              <DialogDescription className="text-center p-2 mb-0 pb-0">
                Esta acción es irreversible y estaría eliminando por completo la identificacion seleccionado.
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
                disabled={deleteDangerIdentification.isPending}
                className="hover:bg-white hover:text-black hover:border hover:border-black transition-all"
                onClick={() => handleDelete(dangerIdentification.id)}
              >
                {deleteDangerIdentification.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <p>Confirmar</p>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog
          open={openCreateAnalysis}
          onOpenChange={setOpenCreateAnalysis}
        >
          <DialogContent className="flex flex-col max-w-2xl m-2">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <CreateAnalysisForm
              onClose={() => setOpenCreateAnalysis(false)}
              id={dangerIdentification.id} name={"identification"}
            />
          </DialogContent>
        </Dialog>
      </Dialog>
    </>
  );
};

export default DangerIdentificationDropdownActions;
