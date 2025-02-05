"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetPilots } from "@/hooks/sms/useGetPilots";
import LoadingPage from "@/components/misc/LoadingPage";

const PilotsPage = () => {
  const { data, isLoading, isError } = useGetPilots();
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <ContentLayout title="Permisos">
      <div className="flex flex-col gap-y-2">
        {data && <DataTable columns={columns} data={data} />}
        {isError && (
          <p className="text-sm text-muted-foreground">
            Ha ocurrido un error al cargar las fuentes...
          </p>
        )}
      </div>
    </ContentLayout>
  );
};

export default PilotsPage;
