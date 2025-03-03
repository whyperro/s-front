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

export function CashMovementDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant={"outline"}
          className="flex items-center justify-center gap-2 h-8 border-dashed">
          Registrar Movimiento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Crear un Movimiento</DialogTitle>
          <DialogDescription>Cree un nuevo movimiento.</DialogDescription>
        </DialogHeader>
        <CreateCashMovementForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}