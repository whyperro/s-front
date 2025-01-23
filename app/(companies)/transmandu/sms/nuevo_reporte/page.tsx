"use client";

import { VoluntaryReportForm } from "@/components/forms/VoluntaryReportForm";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { useGetQuotes } from "@/hooks/compras/useGetQuotes";
import { useCompanyStore } from "@/stores/CompanyStore";
import { Loader2 } from "lucide-react";

const newReportPage = () => {
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
    <ContentLayout title="Reportes Voluntarios">
      <div className="flex flex-col justify-center items-center gap-y-2 w-1/2">
        <VoluntaryReportForm></VoluntaryReportForm>
      </div>
    </ContentLayout>
  );
};

export default newReportPage;
