import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Client } from "@/types";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";

const ClientResumeDialog = ({ client }: { client: Client }) => {
  const [openClient, setOpenClient] = useState(false);
  const router = useRouter();
  return (
    <Dialog open={openClient} onOpenChange={setOpenClient}>
      <DialogTrigger>{client.name}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center font-bold">
          Resumen del Cliente
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Nombre
            </h3>
            <p className="text-lg font-semibold">{client.name}</p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Cedula / RIF
            </h3>
            <p className="text-lg font-semibold">{client.dni}</p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Número de Teléfono
            </h3>
            <p className="text-lg font-semibold">{client.phone}</p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Ubicación
            </h3>
            <p className="text-lg font-semibold">{client.address}</p>
            <Separator />
          </div>

          <div className="bg-muted p-4 rounded-lg mt-6">
            <h3 className="font-medium mb-2">Deuda</h3>
            <div className="flex justify-between items-center">
              <span>Cuenta por Cobrar:</span>
              <span className="font-bold text-xl">${client.debt}</span>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-center">         
          <Button onClick={() => setOpenClient(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientResumeDialog;
