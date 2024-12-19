'use client';

import { ContentLayout } from '@/components/layout/ContentLayout';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useCompanyStore } from '@/stores/CompanyStore';
import { useGetRequisition } from '@/hooks/compras/useGetRequisitions';
import LoadingPage from '@/components/misc/LoadingPage';
const InventarioPage = () => {

  const { selectedCompany, selectedStation } = useCompanyStore()

  const { data: requisitions, isLoading, isError } = useGetRequisition(selectedCompany && selectedCompany.split(" ").join("") || null, selectedStation || null);

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <ContentLayout title='Inventario'>
      <div className='flex flex-col gap-y-2'>
        <h1 className='text-4xl font-bold text-center'>Requisiciones de Compra</h1>
        <p className='text-sm text-muted-foreground text-center  italic'>
          Aquí puede observar todos las requisiciones generales. <br />Filtre y/o busque sí desea una en específico.
        </p>
        {
          requisitions && <DataTable columns={columns} data={requisitions} />
        }
        {
          isError && <p className='text-muted-foreground italic'>Ha ocurrido un error al cargar las requisiciones...</p>
        }
      </div>
    </ContentLayout>
  )
}

export default InventarioPage
