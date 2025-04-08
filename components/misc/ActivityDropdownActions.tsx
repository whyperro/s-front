'use client'
import { useUpdateFinalHour, useDeleteActivity, useEditActivity } from '@/actions/desarrollo/reportes_diarios/actions';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Clock, MoreHorizontal, Trash2, Edit, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useGetUserActivity } from "@/hooks/desarrollo/useGetUserActivities";
import { useRouter } from "next/navigation";

interface ActivityDropdownActionsProps {
  id: number;
  finished: boolean;
}

export const ActivityDropdownActions = ({ id, finished }: ActivityDropdownActionsProps) => {
  const router = useRouter();
  
  // Uso correcto de los hooks de mutación
  const { updateFinalHour } = useUpdateFinalHour();
  const { deleteActivity } = useDeleteActivity();
  const { editActivity } = useEditActivity();
  
  const { data: report } = useGetUserActivity(id.toString());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [manualEndTime, setManualEndTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [originalData, setOriginalData] = useState({
    startTime: "",
    endTime: "",
    description: "",
    result: ""
  });

  // Set default end time when dialog opens
  useEffect(() => {
    if (!manualEndTime && dialogOpen) {
      const now = new Date();
      setEndTime(now.toTimeString().slice(0, 5));
    }
  }, [dialogOpen, manualEndTime]);

  // Load correct activity data when edit dialog opens
  useEffect(() => {
    if (editDialogOpen && report) {
      const activity = report.activities.find(act => act.id === id);
      if (activity) {
        setStartTime(activity.start_hour || "");
        setEndTime(activity.final_hour || "");
        setDescription(activity.description || "");
        setResult(activity.result || "");
        setOriginalData({
          startTime: activity.start_hour || "",
          endTime: activity.final_hour || "",
          description: activity.description || "",
          result: activity.result || ""
        });
      }
    }
  }, [editDialogOpen, report, id]);

  const hasChanges = () => {
    return (
      startTime !== originalData.startTime ||
      endTime !== originalData.endTime ||
      description !== originalData.description ||
      result !== originalData.result
    );
  };

  const isFinishValid = endTime.trim() !== "";

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await updateFinalHour.mutateAsync({
        final_hour: endTime,
        id: id.toString(),
        result: result,
      });
      router.refresh();
      setDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const activities = report?.activities || [];
      const isOnlyOneActivity = activities.length === 1 && activities[0]?.id === id;
      await deleteActivity.mutateAsync({ id: id.toString() });
      
      if (isOnlyOneActivity) {
        router.back();
      }
      router.refresh();
      setDeleteDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditConfirm = async () => {
    setIsLoading(true);
    try {
      await editActivity.mutateAsync({
        id: id.toString(),
        start_hour: startTime,
        final_hour: endTime,
        description: description,
        result: result,
      });
      setEditDialogOpen(false);
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" className="flex flex-col gap-2">
          <DropdownMenuItem
            disabled={finished || isLoading}
            onClick={() => setDialogOpen(true)}
            className="cursor-pointer"
          >
            <Clock className="size-5 mr-2" /> Finalizar Actividad
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={() => setEditDialogOpen(true)} 
            className="cursor-pointer"
            disabled={isLoading}
          >
            <Edit className="size-5 mr-2" /> Editar Actividad
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={() => setDeleteDialogOpen(true)} 
            className="cursor-pointer text-red-600"
            disabled={isLoading}
          >
            <Trash2 className="size-5 mr-2" />
            Eliminar Actividad
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Diálogo para finalizar actividad */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finalizar Actividad</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Hora de Finalización</Label>
              <Input 
                type="time" 
                value={endTime} 
                onChange={(e) => {
                  setManualEndTime(true);
                  setEndTime(e.target.value);
                }} 
              />
            </div>
            <div>
              <Label>Resultado de la actividad</Label>
              <Input 
                type="text" 
                value={result} 
                onChange={(e) => setResult(e.target.value)} 
                placeholder="Describe el resultado obtenido"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="secondary" 
              onClick={() => setDialogOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={!isFinishValid || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : 'Confirmar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar actividad */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Actividad</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Descripción</Label>
              <Input 
                type="text" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
              />
            </div>
            <div>
              <Label>Hora de Inicio</Label>
              <Input 
                type="time" 
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)} 
              />
            </div>
            <div>
              <Label>Hora de Finalización</Label>
              <Input 
                type="time" 
                value={endTime} 
                onChange={(e) => {
                  setManualEndTime(true);
                  setEndTime(e.target.value);
                }} 
              />
            </div>
            <div>
              <Label>Resultado</Label>
              <Input 
                type="text" 
                value={result} 
                onChange={(e) => setResult(e.target.value)} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="secondary" 
              onClick={() => setEditDialogOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleEditConfirm}
              disabled={!hasChanges() || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar actividad */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>¿Estás seguro que deseas eliminar esta actividad? Esta acción no se puede deshacer.</p>
          </div>
          <DialogFooter>
            <Button 
              variant="secondary" 
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminando...
                </>
              ) : 'Eliminar Actividad'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActivityDropdownActions;