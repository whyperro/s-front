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
import DateFilter from "@/components/forms/CreateFilterDates";
import { SellForm } from "../forms/CreateSellForm";

export function CreateSellDialog() {
  const [openSellDialog, setOpenSellDialog] = useState(false);
  return (
    <>
      <Dialog open={openSellDialog} onOpenChange={setOpenSellDialog}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpenSellDialog(true)}
            variant={"outline"}
            className="flex items-center justify-center gap-2 h-8 border-dashed"
          >
            Registrar Venta
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[480px]"
          onInteractOutside={(e) => {
            e.preventDefault(); // Evita que el diálogo se cierre al hacer clic fuera
          }}
        >
          <DialogHeader>
            <DialogTitle>Crear Venta</DialogTitle>
            <DialogDescription>Cree una nueva venta.</DialogDescription>
          </DialogHeader>
          <SellForm onClose={() => setOpenSellDialog(false)} />
        </DialogContent>
      </Dialog>
      <DateFilter />
    </>
  );
}
