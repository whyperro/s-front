'use client';

import { ContentLayout } from '@/components/layout/ContentLayout';
import { useGetWorkOrders } from '@/hooks/planificacion/useGetWorkOrders';
import { useCompanyStore } from '@/stores/CompanyStore';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { columns } from './columns';
import { DataTable } from './data-table';

const OrdenesTrabajoPage = () => {

  const { selectedStation } = useCompanyStore();

  const { mutate, data: work_orders, isPending, isError } = useGetWorkOrders();

  useEffect(() => {
    if (selectedStation) {

      mutate(Number(selectedStation))
    }
  },
    [selectedStation, mutate])

  return (
    <ContentLayout title='Ordenes de Trabajo'>
      <div className='flex flex-col gap-y-2'>
        <h1 className='text-5xl font-bold text-center'>Gestión de Ord. de Trabajo</h1>
        <p className='text-sm text-muted-foreground text-center'>
          Aquí puede observar todos las ordenes de trabajo realizadas. <br />Filtre y/o busque sí desea una orden en específico.
        </p>
        {
          isPending && (
            <div className='flex w-full h-full justify-center items-center'>
              <Loader2 className='size-24 animate-spin mt-48' />
            </div>
          )
        }
        {
          work_orders && (
            <DataTable columns={columns} data={work_orders} />

          )
        }
        {
          isError && <p className='text-sm text-muted-foreground'>Ha ocurrido un error al cargar los lotes...</p>
        }
      </div>
    </ContentLayout>
  )
}

export default OrdenesTrabajoPage
