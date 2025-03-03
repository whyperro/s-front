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
import { CreateCashForm } from "../forms/CreateCashForm";

export function CashDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant={"outline"}
          className="flex items-center justify-center gap-2 h-8 border-dashed">
          Registrar Caja 
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Crear una Caja</DialogTitle>
          <DialogDescription>Cree una nueva caja.</DialogDescription>
        </DialogHeader>
        <CreateCashForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}