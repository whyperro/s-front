"use client";

import { useGetCashMovementById } from "@/hooks/contabilidad/useGetMovementById";
import LoadingPage from "@/components/misc/LoadingPage";
import { Button } from "@/components/ui/button";
import { CashMovementDialog } from "@/components/dialogs/CreateCashMovementDialog";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { CashMovement } from "@/types";
import { format } from "date-fns";

const MovimientosPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: cashmovement, isLoading, isError } = useGetCashMovementById(id);
  //haces el get que estabas haciendo en el dialogo. Obtienes tu movimiento de caja y muestras ahora si toda la informacion completa aqui.
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <ContentLayout title="Detalles del Movimiento de Caja">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div className="flex gap-2">
          <CashMovementDialog />
        </div>
      </div>

      <h1 className="text-5xl font-bold text-center mt-2">
        Detalle del Movimiento de Caja
      </h1>
      <p className="text-sm text-muted-foreground text-center italic mt-2 mb-6">
        Información detallada del movimiento de la caja seleccionada.
      </p>
      
  
    </ContentLayout>
  );
};

export default MovimientosPage;
