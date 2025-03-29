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
import { Cash } from "@/types";
import { Separator } from "../ui/separator";

const CashResumeDialog = ({ cash }: { cash: Cash }) => {
  const [openCash, setOpenCash] = useState(false);

  return (
    <Dialog open={openCash} onOpenChange={setOpenCash}>
      <DialogTrigger className="flex justify-center">
        {cash.name}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center font-bold">
          Resumen de la Empresa
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Caja
            </h3>
            <p className="text-lg font-semibold">{cash.name}</p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total</h3>
            <p className="text-lg font-semibold">{cash.total_amount}</p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Moneda
            </h3>
            <p className="text-lg font-semibold">{cash.coin}</p>
            <Separator />
          </div>

        </div>
        <DialogFooter className="sm:justify-center">
          <Button onClick={() => setOpenCash(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CashResumeDialog;
