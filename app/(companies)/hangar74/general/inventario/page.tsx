'use client';

import { ContentLayout } from '@/components/layout/ContentLayout';
import { useGetBatchesWithArticlesCount } from '@/hooks/almacen/useGetBatchesWithArticleCount';
import { useCompanyStore } from '@/stores/CompanyStore';
import { Loader2 } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from './data-table';
const InventarioPage = () => {

  const { selectedStation } = useCompanyStore();

  const { data: batches, isLoading: isBatchesLoading, isError } = useGetBatchesWithArticlesCount(selectedStation ?? undefined);

  return (
    <ContentLayout title='Inventario'>
      <div className='flex flex-col gap-y-2'>
        <h1 className='text-4xl font-bold text-center'>Inventario General</h1>
        <p className='text-sm text-muted-foreground text-center  italic'>
          Aquí puede observar todos los renglones de los diferentes almacenes. <br />Filtre y/o busque sí desea un renglón en específico.
        </p>
        {
          isBatchesLoading && (
            <div className='flex w-full h-full justify-center items-center'>
              <Loader2 className='size-24 animate-spin mt-48' />
            </div>
          )
        }
        {
          batches && (
            <DataTable columns={columns} data={batches} />

          )
        }
        {
          isError && <p className='text-sm text-muted-foreground'>Ha ocurrido un error al cargar los lotes...</p>
        }
      </div>
    </ContentLayout>
  )
}

export default InventarioPage
