import { useGetBankAccountById } from "@/hooks/administracion/useGetBankAccountById";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";

const BankAccountResumeDialog = ({ id }: { id: string }) => {
  const { data: bank_acc, isLoading } = useGetBankAccountById(id);
  const [openBankAcc, setOpenBankAcc] = useState(false);
  if (isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  if (!bank_acc) {
    return <p>N/A</p>;
  }

  return (
    <Dialog open={openBankAcc} onOpenChange={setOpenBankAcc}>
      <DialogTrigger className="font-medium flex justify-center w-full hover:scale-110 transition-all ease-in">
        {bank_acc?.name}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center font-bold">
          Resumen de la Cuenta de Banco
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Nombre
            </h3>
            <p className="text-lg font-semibold">{bank_acc?.name}</p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Número de Cuenta
            </h3>
            <p className="text-lg font-semibold">{bank_acc?.account_number}</p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Tipo de Owner
            </h3>
            <p className="text-lg font-semibold">{bank_acc?.account_owner}</p>
            <Separator />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Tipo de Cuenta
            </h3>
            <p className="text-lg font-semibold">{bank_acc?.account_type}</p>
            <Separator />
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button onClick={() => setOpenBankAcc(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BankAccountResumeDialog;
