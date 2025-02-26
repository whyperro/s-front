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
import { useState } from "react";
import CreateFollowUpControlForm from "../forms/CreateFollowUpControlForm";

export default function CreateFollowUpControlDialog() {
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
              Nuevo Control
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col max-w-2xl m-2">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <CreateFollowUpControlForm onClose={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
}
