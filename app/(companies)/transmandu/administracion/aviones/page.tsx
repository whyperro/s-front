"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";
import { useGetAircrafts } from "@/hooks/administracion/useGetAircrafts";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import LoadingPage from "@/components/misc/LoadingPage";

const AircraftPage = () => {
  const { data, isLoading, isError } = useGetAircrafts();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <ContentLayout title="Aviones">
      {" "}
      <h1 className="text-5xl font-bold text-center mt-2">
        Control de Aviones
      </h1>
      <p className="text-sm text-muted-foreground text-center italic mt-2">
        Aqui puede llevar el control de los aviones
      </p>
      {/*<AircraftDialog />*/}
      {data && <DataTable columns={columns} data={data} />}
      {isError && (
        <p className="text-muted-foreground text-sm italic text-center">
          Ha ocurrido un error al cargar los aviones...
        </p>
      )}
    </ContentLayout>
  );
};

export default AircraftPage;
