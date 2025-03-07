import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Printer, MoreHorizontal, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import ActivitiesReportPdf from "../pdf/ActivityReport";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useGetUserActivity } from "@/hooks/desarrollo/useGetUserActivities";
import { ActivityReport, Activity } from "@/types"; // Importa correctamente los tipos
import { useAuth } from "@/contexts/AuthContext";

const ActivityReportsDropdownActions = ({ id }: { id: string }) => {
  const { data: report, isLoading } = useGetUserActivity(id);
  const {user} = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [observation, setObservation] = useState<string>(""); 
  const [isObservationOpen, setIsObservationOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleView = () => {
    router.push(`/transmandu/desarrollo/actividades_diarias/${id}/`);
  };

  // Aseguramos que report sea un arreglo de tipo ActivityReport[]
  const activities: ActivityReport[] = report ? (Array.isArray(report) ? report : [report]) : [];
  const userRoles = user?.roles?.map((role) => role.name) || [] ;
  // Extraemos todas las actividades dentro de los reportes

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
            <Button onClick={() => setIsObservationOpen(false)}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger disabled={(report?.user.id !== user?.id) && !userRoles.includes("SUPERUSER")}  asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          className="flex gap-2 justify-center"
        >
          <DropdownMenuItem onClick={handleView} className="cursor-pointer">
            <Eye className="size-5" />
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isLoading} className="cursor-pointer">
            <PDFDownloadLink
              fileName={`reporte_actividades_${activities[0]?.date}.pdf`}
              document={
                <ActivitiesReportPdf activities={activities} />
              }
              className="flex items-center gap-2"
            >
              <Printer className="size-5" />
            </PDFDownloadLink>
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
