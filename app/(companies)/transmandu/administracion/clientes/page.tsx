"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useGetClients } from "@/hooks/administracion/useGetClients";
import LoadingPage from "@/components/misc/LoadingPage";

const ClientsPage = () => {
  const { data, isLoading, isError } = useGetClients();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <ContentLayout title="Clientes">
      {" "}
      <h1 className="text-5xl font-bold text-center mt-2">
        Control de Clientes
      </h1>
      <p className="text-sm text-muted-foreground text-center italic mt-2">
        Aquí puede llevar el control de los proveedores registrados para las
        diferentes compras.
      </p>
      {/*<ClientDialog />*/}
      {data && <DataTable columns={columns} data={data} />}
      {isError && (
        <p className="text-muted-foreground text-sm italic text-center">
          Ha ocurrido un error al cargar los clientes...
        </p>
      )}
    </ContentLayout>
  );
};

export default ClientsPage;
