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
import { CreateRouteForm } from "../forms/CreateRouteForm";

export function RouteDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant={"outline"}
          className="flex items-center justify-center gap-2 h-8 border-dashed">
          Registrar Ruta 
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Crear una Ruta</DialogTitle>
          <DialogDescription>Cree una nueva ruta.</DialogDescription>
        </DialogHeader>
        <CreateRouteForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
