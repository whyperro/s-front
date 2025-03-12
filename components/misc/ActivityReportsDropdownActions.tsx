import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useGetUserActivity } from "@/hooks/desarrollo/useGetUserActivities";
import { Eye, MessageSquare, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useUpdateObservation } from "@/actions/desarrollo/reportes_diarios/actions";

const ActivityReportsDropdownActions = ({ id }: { id: string }) => {
  const { data: report, isLoading: isReportLoading } = useGetUserActivity(id);
  const { updateObservation } = useUpdateObservation();
  const { user } = useAuth();
  const [observation, setObservation] = useState<string>("");
  const [isObservationOpen, setIsObservationOpen] = useState<boolean>(false);
  const router = useRouter();


  console.log(report);
  const userRoles = user?.roles?.map((role) => role.name) || [];

  const handleView = () => {
    router.push(`/transmandu/desarrollo/actividades_diarias/${id}/`);
  };

  const handleUpdateObservation = async () => {

    const data ={ 
      id: id.toString(),
      observation: observation,
    }
    await updateObservation.mutateAsync(data)
  };

  return (
    <>
      <Dialog open={isObservationOpen} onOpenChange={setIsObservationOpen}>
        <DialogContent>
          <DialogHeader>Agregar Observación</DialogHeader>
          <Input
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Escribe tu observación aquí..."
          />
          <DialogFooter>
            <Button onClick={handleUpdateObservation}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger disabled={isReportLoading} asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="flex gap-2 justify-center">
          <DropdownMenuItem onClick={handleView} className="cursor-pointer">
            <Eye className="size-5" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsObservationOpen(true)}
            className="cursor-pointer"
          >
            <MessageSquare className="size-5" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActivityReportsDropdownActions;