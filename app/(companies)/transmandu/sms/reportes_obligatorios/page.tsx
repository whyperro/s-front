"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";
import { useGetQuotes } from "@/hooks/compras/useGetQuotes";
import { useCompanyStore } from "@/stores/CompanyStore";
import { Loader2 } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const ObligatoryReportsPage = () => {
  const { selectedStation, selectedCompany } = useCompanyStore();
  const {
    data: reportes,
    isLoading,
    isError,
  } = useGetQuotes(
    (selectedCompany && selectedCompany.split(" ").join("")) || null,
    selectedStation || null
  );
  return (
    <ContentLayout title="Reportes Obligatorios">
      <div className="flex flex-col gap-y-2">
        {isLoading && (
          <div className="flex w-full h-full justify-center items-center">
            <Loader2 className="size-24 animate-spin mt-48" />
          </div>
        )}
        {reportes && <DataTable columns={columns} data={[]} />}
        {isError && (
          <p className="text-sm text-muted-foreground">
            Ha ocurrido un error al cargar los reportes...
          </p>
        )}
      </div>
    </ContentLayout>
  );
};

export default ObligatoryReportsPage;
