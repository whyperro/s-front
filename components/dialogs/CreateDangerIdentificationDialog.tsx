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
import { useState } from "react";
import IdentificationForm from "../forms/CreateIdentificationForm";
import CreateDangerIdentificationForm from "../forms/CreateIdentificationForm";
import { DangerIdentification } from "@/types";

interface FormProps {
  id: number | string;
  initialData?: DangerIdentification;
  isEditing?: boolean;
  reportType: string;
}

export default function CreateDangerIdentificationDialog({
  id,
  isEditing,
  initialData,
  reportType,
}: FormProps) {
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
              Crear Identificacion
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col max-w-2xl m-2">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <CreateDangerIdentificationForm
              id={id}
              reportType={reportType}
              onClose={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
}
