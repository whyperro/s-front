'use client'

import { ContentLayout } from '@/components/layout/ContentLayout';
import { useGetConditions } from '@/hooks/administracion/useGetConditions';
import { Loader2 } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from './data-table';

const AlmacenesPage = () => {

  const { data: conditions, isLoading, error } = useGetConditions();
  return (
    <ContentLayout title={'Almacenes'}>
      <h1 className='text-4xl font-bold text-center mb-2'>Control de Condiciones</h1>
      <p className='text-sm text-muted-foreground text-center'>
        Lleve un control de las diferentes condiciones que un articulo pueda tener.
      </p>
      {
        isLoading && (
          <div className='grid mt-72 place-content-center'>
            <Loader2 className='w-12 h-12 animate-spin' />
          </div>
        )
      }
      {
        error && (
          <div className='grid mt-72 place-content-center'>
            <p className='text-sm text-muted-foreground'>Ha ocurrido un error al cargar los almacenes...</p>
          </div>
        )
      }
      {
        conditions && (
          <DataTable columns={columns} data={conditions} />
        )
      }
    </ContentLayout>
  )
}

export default AlmacenesPage
