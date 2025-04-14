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
  const [openActionsIncome, setOpenActionsIncome] = useState(false);
  const [openActionsOutput, setOpenActionsOutput] = useState(false);
  const [openActionsAccount, setOpenActionsAccount] = useState(false);

  const router = useRouter();

  const handleViewStatsIncome = () => {
    router.push(
      "/transmandu/administracion/gestion_cajas/movimientos/reporte_ingresos"
    );
  };

  const handleViewStatsOutput = () => {
    router.push(
      "/transmandu/administracion/gestion_cajas/movimientos/reporte_egresos"
    );
  };

  const handleViewStatsAccount = () => {
    router.push(
      "/transmandu/administracion/gestion_cajas/movimientos/movimientos_por_cuenta/"
    );
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
      <Dialog open={openActionsIncome} onOpenChange={setOpenActionsIncome}>
        <DialogTrigger asChild>
          <Button
            onClick={handleViewStatsIncome}
            variant={"outline"}
            className="flex items-center justify-center gap-2 h-8 border-dashed"
          >
            Resumen de Ingresos
          </Button>
        </DialogTrigger>
      </Dialog>

      {/*Dialogo para ver el resumen de egresos*/}
      <Dialog open={openActionsOutput} onOpenChange={setOpenActionsOutput}>
        <DialogTrigger asChild>
          <Button
            onClick={handleViewStatsOutput}
            variant={"outline"}
            className="flex items-center justify-center gap-2 h-8 border-dashed"
          >
            Resumen de Egresos
          </Button>
        </DialogTrigger>
      </Dialog>

      {/*Dialogo para ver el resumen de las cuentas de los movimientos de caja*/}
      <Dialog open={openActionsAccount} onOpenChange={setOpenActionsAccount}>
        <DialogTrigger asChild>
          <Button
            onClick={handleViewStatsAccount}
            variant={"outline"}
            className="flex items-center justify-center gap-2 h-8 border-dashed"
          >
            Resumen de Cuentas
          </Button>
        </DialogTrigger>
      </Dialog>
      <DateFilter />
    </>
  );
}
