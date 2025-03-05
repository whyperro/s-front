"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";

import { Loader2 } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGetRegisterWithActivities } from "@/hooks/desarrollo/useGetRegisterWithActivities";

const DailyActivitiesPage = () => {
  const {
    data: activityreport,
    isError,
  } = useGetRegisterWithActivities();

  return (
    <ContentLayout title="Gestión de Actividades">
      <div className="flex flex-col gap-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/transmandu/dashboard">
                Inicio
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Actividades Diarias</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-4xl font-bold text-center">Actividades Diarias</h1>
        <p className="text-sm text-muted-foreground text-center italic">
          Aquí puede observar todos las actividades realizadas por la Jefatura
          de Desarrollo. <br />
          Filtre y/o busque sí desea un dia en específico.
        </p>
        {activityreport && <DataTable columns={columns} data={activityreport} />}
      </div>
    </ContentLayout>
  );
};

export default DailyActivitiesPage;
