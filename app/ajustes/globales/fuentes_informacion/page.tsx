"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";
import { useGetVendors } from "@/hooks/ajustes/globales/proveedores/useGetVendors";
import { Loader2 } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const InformationSourcePage = () => {
  return (
    <ContentLayout title="Permisos">
      <h1 className="text-5xl font-bold text-center mt-2">
        Control de fuentes de información
      </h1>
      <p className="text-sm text-muted-foreground text-center italic mt-2">
        Aquí puede llevar el control de las fuentes de informacion para
        reportes.
      </p>
      <DataTable columns={columns} data={[]} />
    </ContentLayout>
  );
};

export default InformationSourcePage;
