"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";
import { useGetQuotes } from "@/hooks/compras/useGetQuotes";
import { useCompanyStore } from "@/stores/CompanyStore";
import { Loader2 } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const ObligatoryReportsPage = () => {
  /*
  const {
    data: reportes,
    isLoading,
    isError,
  } */
  return (
    <ContentLayout title="Reportes Obligatorios">
      <div className="flex flex-col gap-y-2">
        <DataTable columns={columns} data={[]} />
      </div>
    </ContentLayout>
  );
};

export default ObligatoryReportsPage;
