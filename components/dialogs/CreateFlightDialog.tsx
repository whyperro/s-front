"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FlightForm } from "../forms/CreateFlightForm";
import { FilterDatesForm } from "../forms/CreateFilterDates";

export function CreateFlightDialog() {
  const [openFlightDialog, setOpenFlightDialog] = useState(false);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  return (
    <>
      <Dialog open={openFlightDialog} onOpenChange={setOpenFlightDialog}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpenFlightDialog(true)}
            variant={"outline"}
            className="flex items-center justify-center gap-2 h-8 border-dashed"
          >
            Registrar Vuelo
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Crear Vuelo</DialogTitle>
            <DialogDescription>Cree un nuevo vuelo.</DialogDescription>
          </DialogHeader>
          <FlightForm onClose={() => setOpenFlightDialog(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={openFilterDialog} onOpenChange={setOpenFilterDialog}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpenFilterDialog(true)}
            variant={"outline"}
            className="flex items-center justify-center gap-2 h-8 border-dashed ml-2"
          >
            Filtrar por Fechas
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Filtrar por Fechas</DialogTitle>
            <DialogDescription>
              Elija las fechas de los vuelos para generar un reporte.
            </DialogDescription>
          </DialogHeader>
          <FilterDatesForm onClose={() => setOpenFilterDialog(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
