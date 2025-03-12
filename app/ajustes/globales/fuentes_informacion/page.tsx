"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";
import { useGetVendors } from "@/hooks/ajustes/globales/proveedores/useGetVendors";
import { Loader2 } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetInformationSources } from "@/hooks/sms/useGetInformationSource";
import LoadingPage from "@/components/misc/LoadingPage";

const InformationSourcePage = () => {
  const { data, isLoading, isError } = useGetInformationSources();

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <ContentLayout title="Fuentes de informacion">
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

export default InformationSourcePage;
