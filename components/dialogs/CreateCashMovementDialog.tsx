"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { CreateCashMovementForm } from "../forms/CreateCashMovementForm";
import DateFilter from "@/components/forms/CreateFilterDates";
import { useRouter } from "next/navigation";

export function CashMovementDialog({ id }: { id?: string }) {
  const [openMovementDialog, setOpenMovementDialog] = useState(false);
  const [openActions, setOpenActions] = useState(false);
  const router = useRouter();

  const handleViewStats = () => {
  router.push(`/transmandu/administracion/gestion_cajas/movimientos/${id}`);
};

  return (
    <>
      {/*Dialogo para registrar un movimiento de caja*/}
      <Dialog open={openMovementDialog} onOpenChange={setOpenMovementDialog}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpenMovementDialog(true)}
            variant={"outline"}
            className="flex items-center justify-center gap-2 h-8 border-dashed"
          >
            Registrar Movimiento de Caja
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[480px]"
          onInteractOutside={(e) => {
            e.preventDefault(); // Evita que el diálogo se cierre al hacer clic fuera
          }}
        >
          <DialogHeader>
            <DialogTitle>Crear un Movimiento</DialogTitle>
            <DialogDescription>Cree un nuevo movimiento.</DialogDescription>
          </DialogHeader>
          <CreateCashMovementForm
            onClose={() => setOpenMovementDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/*Dialogo para ver el resumen de ingresos*/}
      <Dialog open={openActions} onOpenChange={setOpenActions}>
        <DialogTrigger asChild>
          <Button
            onClick={handleViewStats}
            variant={"outline"}
            className="flex items-center justify-center gap-2 h-8 border-dashed"
          >
            Resumen de Ingresos
          </Button>
        </DialogTrigger>
      </Dialog>
      <DateFilter />
    </>
  );
}
