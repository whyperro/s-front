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
import { FlightPaymentsForm } from "../forms/CreateFlightPaymentsForm";

export function FlightPaymentsDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant={"outline"}
          className="flex items-center justify-center gap-2 h-8 border-dashed">
          Registrar Pago 
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Crear Pago</DialogTitle>
          <DialogDescription>Cree un nuevo pago de vuelo.</DialogDescription>
        </DialogHeader>
        <FlightPaymentsForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}