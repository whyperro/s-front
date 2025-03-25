import React from "react";
import { Separator } from "../ui/separator";
import { format } from "date-fns";
import { CashMovement } from "@/types";
import { es } from "date-fns/locale";

const CashMovementResume = ({ movement }: { movement: CashMovement }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Fecha</h3>
        <p className="text-lg font-semibold">
          {format(movement.date, "PPP", { locale: es })}
        </p>
        <Separator />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Empresa</h3>
        <p className="text-lg font-semibold">{movement.company.name}</p>
        <Separator />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Inreso/Egreso
        </h3>
        <p className="text-lg font-semibold">{movement.type}</p>
        <Separator />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Caja</h3>
        <p className="text-lg font-semibold">{movement.cash.name}</p>
        <Separator />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Cuenta</h3>
        <p className="text-lg font-semibold">{movement.account}</p>
        <Separator />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Categoría</h3>
        <p className="text-lg font-semibold">{movement.category}</p>
        <Separator />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Sub Categoría
        </h3>
        <p className="text-lg font-semibold">{movement.sub_category}</p>
        <Separator />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Detalles de Sub Categoría
        </h3>
        <p className="text-lg font-semibold">{movement.sub_category_details}</p>
        <Separator />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Responsable
        </h3>
        <p className="text-lg font-semibold">
          {movement.responsible.first_name}
        </p>
        <Separator />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Cuenta de Banco
        </h3>
        <p className="text-lg font-semibold">{movement.bank_account ? movement.bank_account.name : 'Efectivo'}</p>
        <Separator />
      </div>

      <div className="bg-muted p-4 rounded-lg mt-6">
        <h3 className="font-medium mb-2">Resumen</h3>
        <div className="flex justify-between items-center">
          <span>Monto Total:</span>
          <span className="font-bold text-xl">${movement.amount}</span>
        </div>
      </div>
    </div>
  );
};

export default CashMovementResume;
