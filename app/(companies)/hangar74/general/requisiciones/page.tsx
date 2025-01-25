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

const InventarioPage = () => {
  const { user } = useAuth();
  const { selectedCompany, selectedStation } = useCompanyStore();

  const [filteredRequisitions, setFilteredRequisitions] = useState<Requisition[]>([]);

  const { data: requisitions, isLoading, isError } = useGetRequisition(
    selectedCompany && selectedCompany.split(' ').join('') || null,
    selectedStation || null
  );

  // Memoize userRoles to avoid unnecessary re-renders
  const userRoles = useMemo(() => user?.roles?.map(role => role.name) || [], [user]);

  useEffect(() => {
    if (requisitions && user) {
      const shouldFilterByUser = (userRoles.includes('ANALISTA_COMPRAS'));
      const filtered = shouldFilterByUser
        ? requisitions.filter(
          requisition => requisition.requested_by === `${user.first_name} ${user.last_name}`
        )
        : requisitions;

      setFilteredRequisitions(filtered);
    }
  }, [requisitions, user, userRoles]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <ContentLayout title="Inventario">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl font-bold text-center">Requisiciones de Compra</h1>
        <p className="text-sm text-muted-foreground text-center italic">
          Aquí puede observar todas las requisiciones generales. <br />Filtre y/o busque si desea una en específico.
        </p>
        {requisitions && <DataTable columns={columns} data={filteredRequisitions} />}
        {isError && <p className="text-muted-foreground italic">Ha ocurrido un error al cargar las requisiciones...</p>}
      </div>
    </ContentLayout>
  );
};

export default InventarioPage;
