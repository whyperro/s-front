'use client';

import { ContentLayout } from '@/components/layout/ContentLayout';
import LoadingPage from '@/components/misc/LoadingPage';
import { useAuth } from '@/contexts/AuthContext';
import { useGetRequisition } from '@/hooks/compras/useGetRequisitions';
import { useCompanyStore } from '@/stores/CompanyStore';
import { Requisition } from '@/types';
import { useEffect, useMemo, useState } from 'react';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const InventarioPage = () => {
  const { selectedCompany, selectedStation } = useCompanyStore();
  const { data: requisitions, isLoading, isError } = useGetRequisition(
    selectedCompany && selectedCompany.split(' ').join('') || null,
    selectedStation || null
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <ContentLayout title="Inventario">
      <div className="flex flex-col gap-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/hangar74/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              General
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Requisiciones de Compra</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-4xl font-bold text-center">Requisiciones de Compra</h1>
        <p className="text-sm text-muted-foreground text-center italic">
          Aquí puede observar todas las requisiciones generales. <br />Filtre y/o busque si desea una en específico.
        </p>
        {requisitions && <DataTable columns={columns} data={requisitions} />}
        {isError && <p className="text-muted-foreground italic">Ha ocurrido un error al cargar las requisiciones...</p>}
      </div>
    </ContentLayout>
  );
};

export default InventarioPage;
