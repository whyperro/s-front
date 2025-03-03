"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";
import { useGetFlightsPayments } from "@/hooks/administracion/useGetFlightsPayments";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import LoadingPage from "@/components/misc/LoadingPage";
import { FlightPaymentsDialog } from "@/components/dialogs/CreateFlightPaymentsDialog";

const FlightPaymentsPage = () => {
  const { data, isLoading, isError } = useGetFlightsPayments();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <ContentLayout title="Clientes">
      {" "}
      <h1 className="text-5xl font-bold text-center mt-2">
        Control de Pagos de los Vuelos
      </h1>
      <p className="text-sm text-muted-foreground text-center italic mt-2">
        Aquí puede llevar el control de los pagos de los vuelos que han sido
        registrados.
      </p>
      {data && <DataTable columns={columns} data={data} />}
      {isError && (
        <p className="text-muted-foreground text-sm italic text-center">
          Ha ocurrido un error al cargar los pagos...
        </p>
      )}
    </ContentLayout>
  );
};

export default FlightPaymentsPage;
