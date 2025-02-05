"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ObligatoryReportForm } from "../forms/CreateObligatoryReportForm";
import { useState } from "react";

export function CreateObligatoryDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card className="flex">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              size="sm"
              className=" hidden h-8 lg:flex"
            >
              Nuevo reporte
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col overflow-auto max-h-screen">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <ObligatoryReportForm onClose={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
}
