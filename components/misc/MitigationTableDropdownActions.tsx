import { useDeletePilot } from "@/actions/sms/piloto/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InformationSource,
  MitigationTable,
  Pilot,
  VoluntaryReport,
} from "@/types";
import {
  EyeIcon,
  Loader2,
  MoreHorizontal,
  Trash2,
  ClipboardPenLine,
  ClipboardList,
  ClipboardPaste,
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
import CreateMitigationPlanForm from "../forms/CreateMitigationPlanForm";
import CreateAnalysisForm from "../forms/CreateAnalysisForm";

const MitigationTableDropdownActions = ({
  mitigationTable,
}: {
  mitigationTable: MitigationTable;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const { deleteVoluntaryReport } = useDeleteVoluntaryReport();

  const [openCreateDangerIdentification, setOpenCreateDangerIdentification] =
    useState<boolean>(false);

  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openCreatePlan, setOpenCreatePlan] = useState<boolean>(false);
  const [OpenCreateMeasure, setOpenCreateMeasure] = useState<boolean>(false);

  const [openCreateAnalysis, setOpenCreateAnalysis] = useState<boolean>(false);

  const router = useRouter();

  const handleDelete = async (id: number | string) => {
    await deleteVoluntaryReport.mutateAsync(id);
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
            {!mitigationTable.mitigation_plan && (
              <DropdownMenuItem onClick={() => setOpenCreatePlan(true)}>
                <ClipboardList className="size-5" />
              </DropdownMenuItem>
            )}
            {mitigationTable.mitigation_plan?.id &&
              mitigationTable.mitigation_plan.analysis == null && (
                <DropdownMenuItem onClick={() => setOpenCreateAnalysis(true)}>
                  <ClipboardPenLine className="size-5" />
                </DropdownMenuItem>
              )}

            {mitigationTable.mitigation_plan?.id &&
              mitigationTable.analysis && (
                <DropdownMenuItem onClick={() => setOpenCreateMeasure(true)}>
                  <ClipboardPaste className="size-5" />
                </DropdownMenuItem>
              )}

            {!mitigationTable.id && (
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
                onClick={() => handleDelete(mitigationTable.id)}
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

        <Dialog open={openCreatePlan} onOpenChange={setOpenCreatePlan}>
          <DialogContent className="flex flex-col max-w-2xl m-2">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <CreateMitigationPlanForm
              onClose={() => setOpenCreatePlan(false)}
              id={mitigationTable.id}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={openCreateAnalysis} onOpenChange={setOpenCreateAnalysis}>
          <DialogContent className="flex flex-col max-w-2xl m-2">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            {mitigationTable.mitigation_plan?.id !== undefined ? (
              <CreateAnalysisForm
                onClose={() => setOpenCreateAnalysis(false)}
                id={mitigationTable.mitigation_plan?.id}
                name="mitigacion"
              />
            ) : null}
          </DialogContent>
        </Dialog>

        <Dialog open={OpenCreateMeasure} onOpenChange={setOpenCreateMeasure}>
          <DialogContent className="flex flex-col max-w-2xl m-2">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <CreateMitigationPlanForm
              onClose={() => setOpenCreateMeasure(false)}
              id={mitigationTable.id}
            />
          </DialogContent>
        </Dialog>
      </Dialog>
    </>
  );
};

export default MitigationTableDropdownActions;
