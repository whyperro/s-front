"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";
import LoadingPage from "@/components/misc/LoadingPage";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGetUserActivity } from "@/hooks/desarrollo/useGetUserActivities";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import { columns } from "./columns";
import { non_user_columns } from "./noncolumns";
import { DataTable } from "./data-table";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import ActivitiesReportPdf from "@/components/pdf/ActivityReport";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Printer } from "lucide-react";

const ActivityReportsByIdPage = ({ params }: { params: { id: string } }) => {
  const { data: report, isLoading } = useGetUserActivity(params.id);
  const { user, loading } = useAuth();
  const userRoles = user?.roles?.map((role) => role.name) || [];

  if (isLoading || loading) {
    return <LoadingPage />;
  }

  return (
    <ContentLayout title="Actividades Diarias">
      <div className="flex flex-col gap-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Actividades Diarias</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-4xl font-bold text-center">
          Actividades Diarias <br /> {report?.user.first_name}{" "}
          {report?.user.last_name}
        </h1>
        <p className="text-sm text-muted-foreground text-center italic">
          Aquí puede observar todas las actividades realizadas el día de hoy por
          el empleado seleccionado.
        </p>
        {report && (
          <div className="flex justify-left mt-2 mb-4">
            <PDFDownloadLink
              fileName="reporte_actividades.pdf"
              document={<ActivitiesReportPdf report={report} />}
              className="flex items-center gap-2"
            >
              <Button disabled={isLoading} className="flex items-center gap-2">
                <Printer className="size-5" />
                {isLoading ? "Generando PDF..." : "Descargar PDF"}
              </Button>
            </PDFDownloadLink>
          </div>
        )}
        {report?.user.id === user?.id || userRoles.includes("SUPERUSER") ? (
          <DataTable columns={columns} data={report?.activities || []} />
        ) : (
          <DataTable
            columns={non_user_columns}
            data={report?.activities || []}
          />
        )}
      </div>
    </ContentLayout>
  );
};

export default ActivityReportsByIdPage;
