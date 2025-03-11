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

export function CashMovementDialog() {
  const [openMovementDialog, setOpenMovementDialog] = useState(false);
  return (
    <>
      <Dialog open={openMovementDialog} onOpenChange={setOpenMovementDialog}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpenMovementDialog(true)}
            variant={"outline"}
            className="flex items-center justify-center gap-2 h-8 border-dashed"
          >
            Registrar Movimiento
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
      <DateFilter />
    </>
  );
}
