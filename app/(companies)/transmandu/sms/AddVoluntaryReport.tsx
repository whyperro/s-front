"use client";

import { VoluntaryReportForm } from "@/components/forms/CreateVoluntaryReportForm";
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

export default function AddVoluntaryReport() {
  return (
    <>
      <Card className="flex">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className=" hidden h-8 lg:flex">
              Nuevo reporte
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col h-screen w-1/3 overflow-auto m-2">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <VoluntaryReportForm />
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
}
