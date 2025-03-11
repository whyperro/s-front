import { useDeletePilot } from "@/actions/sms/piloto/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InformationSource,
  MitigationMeasure,
  Pilot,
  VoluntaryReport,
} from "@/types";
import {
  EyeIcon,
  Loader2,
  MoreHorizontal,
  Trash2,
  ClipboardPenLine,
  ClipboardPen,
  Plus,
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
import CreateVoluntaryReportDialog from "../dialogs/CreateVoluntaryReportDialog";
import { CreateVoluntaryReportForm } from "../forms/CreateVoluntaryReportForm";
import CreateFollowUpControlForm from "../forms/CreateFollowUpControlForm";
import { useDeleteMitigationMeasure } from "@/actions/sms/medida_de_mitigacion/actions";
import CreateMitigationMeasureDialog from "../dialogs/CreateMitigationMeasureDialog";
import CreateMitigationMeasureForm from "../forms/CreateMitigationMeasureForm";

const MitigationMeasureDropdownActions = ({
  mitigationMeasure,
}: {
  mitigationMeasure: MitigationMeasure;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const { deleteMitigationMeasure } = useDeleteMitigationMeasure();

  const [openCreateDangerIdentification, setOpenCreateDangerIdentification] =
    useState<boolean>(false);

  const [openCreateFollowUpControl, setOpenCreateFollowUpControl] =
    useState<boolean>(false);

  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const handleDelete = async (id: number | string) => {
    await deleteMitigationMeasure.mutateAsync(id);
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
            <DialogTrigger asChild>
              <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                <Trash2 className="size-5 text-red-500" />
              </DropdownMenuItem>
            </DialogTrigger>

            <DialogTrigger asChild>
              <DropdownMenuItem
                onClick={() => setOpenCreateFollowUpControl(true)}
              >
                <Plus className="size-5 text-black" />
              </DropdownMenuItem>
            </DialogTrigger>

            {!mitigationMeasure.follow_up_control && (
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
                ¿Seguro que desea eliminar el control de seguimiento??
              </DialogTitle>
              <DialogDescription className="text-center p-2 mb-0 pb-0">
                Esta acción es irreversible y estaría eliminando por completo el
                control de seguimiento seleccionado.
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
                disabled={deleteMitigationMeasure.isPending}
                className="hover:bg-white hover:text-black hover:border hover:border-black transition-all"
                onClick={() => handleDelete(mitigationMeasure.id)}
              >
                {deleteMitigationMeasure.isPending ? (
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
              <CreateMitigationMeasureForm
                onClose={() => setOpenEdit(false)}
                id={mitigationMeasure.mitigation_plan_id}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog
          open={openCreateFollowUpControl}
          onOpenChange={setOpenCreateFollowUpControl}
        >
          <DialogContent className="flex flex-col max-w-2xl m-2">
            <DialogHeader>
              <DialogTitle className="text-center"></DialogTitle>
              <CreateFollowUpControlForm
                onClose={() => setOpenCreateFollowUpControl(false)}
                id={mitigationMeasure.id}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Dialog>
    </>
  );
};

export default MitigationMeasureDropdownActions;
