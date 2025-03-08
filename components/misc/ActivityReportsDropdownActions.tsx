import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useGetUserActivity } from "@/hooks/desarrollo/useGetUserActivities";
import { ActivityReport } from "@/types"; // Importa correctamente los tipos
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Eye, MessageSquare, MoreHorizontal, Printer } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ActivitiesReportPdf from "../pdf/ActivityReport";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Input } from "../ui/input";

const ActivityReportsDropdownActions = ({ id }: { id: string }) => {
  const { data: report, isLoading: isReportLoading } = useGetUserActivity(id);
  const { user } = useAuth();
  const [observation, setObservation] = useState<string>("");
  const [isObservationOpen, setIsObservationOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleView = () => {
    router.push(`/transmandu/desarrollo/actividades_diarias/${id}/`);
  };
  const userRoles = user?.roles?.map((role) => role.name) || [];
  console.log(report)
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
        <DropdownMenuTrigger disabled={(report?.user.id !== user?.id) || isReportLoading} asChild>
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
          <DropdownMenuItem disabled={isReportLoading} className="cursor-pointer" asChild>
            <PDFDownloadLink
              fileName="reporte_actividades.pdf"
              document={<ActivitiesReportPdf report={report!} />}
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
