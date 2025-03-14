'use client'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { useState } from "react";
import ActivitiesReportPdf from "../pdf/ActivityReport";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetDailyActivityReport } from "@/hooks/desarrollo/useGetDailyActivities";
import { useAuth } from "@/contexts/AuthContext";


export function DailyActivitiesReportDialog() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { user } = useAuth()
  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd");
  const { data: report, isLoading: reportLoading } = useGetDailyActivityReport({ date: formattedDate, user_id: user?.id.toString() ?? null });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} variant={'outline'} className="flex items-center justify-center gap-2 h-8 border-dashed">
          Generar Reporte
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Reporte Diario de Actividades</DialogTitle>
          <DialogDescription>
            Seleccione una fecha para generar el reporte de actividades realizadas en ese día.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 flex flex-col justify-center text-center">
          <div className="space-y-2">
            <h1 className="text-xl font-bold flex gap-2 items-center justify-center">
              Actividades Diarias <Calendar />
            </h1>
            <p className="text-muted-foreground text-sm italic">
              Genere un reporte con todas las actividades realizadas en el día seleccionado.
            </p>
            <div className="flex gap-2 items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-between">
                    {formattedDate ? format(selectedDate!, "dd/MM/yyyy") : "Seleccione una fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="center" className="w-auto p-0">
                  <DatePicker
                    mode="single"
                    selected={selectedDate ?? undefined} // Si selectedDate es null, se pasa undefined
                    onSelect={(date) => setSelectedDate(date ?? null)} // Asegura que `null` se maneje correctamente
                    disabled={(date) => date > new Date()} //Deshabilita Fechas futuras
                  />
                </PopoverContent>
              </Popover>
            </div>
            {
              report && selectedDate && (
                <PDFDownloadLink
                  fileName={`reporte_actividades_${format(selectedDate, "dd-MM-yyyy")}.pdf`}
                  document={<ActivitiesReportPdf report={report} />}
                >
                  <Button disabled={reportLoading} className="mt-2">Descargar Reporte</Button>
                </PDFDownloadLink>
              )
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
