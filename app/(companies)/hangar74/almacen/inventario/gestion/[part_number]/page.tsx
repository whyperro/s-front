'use client';

import { ContentLayout } from '@/components/layout/ContentLayout';
import { useGetBatches } from '@/hooks/useGetBatches';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useParams } from 'next/navigation';
import { useGetArticlesByBatch } from '@/hooks/useGetArticlesByBatch';
import { useEffect } from 'react';
import { useCompanyStore } from '@/stores/CompanyStore';
import { Loader2 } from 'lucide-react';
const BatchDetailPage = () => {

  const { part_number } = useParams()

  const { selectedStation } = useCompanyStore();

  const { mutate, data: articles, isPending: isBatchesLoading, isError } = useGetArticlesByBatch(Number(selectedStation), String(part_number));

  useEffect(() => {
    if (selectedStation) {
      mutate(Number(selectedStation))
      console.log(articles)
    }
  }, [selectedStation])


  return (
    <ContentLayout title='Inventario'>
      <div className='flex flex-col gap-y-2'>
        <h1 className='text-4xl font-bold'>Detalles del lote</h1>
        <h3 className='text-2xl font-medium'>N° de Parte: {part_number}</h3>
        <p className='text-sm text-muted-foreground'>
          Aquí puede observar todos los lotes de los diferentes almacenes. Filtre y/o busque sí desea un lote en específico.
        </p>
        {
          isBatchesLoading && (
            <div className='flex w-full h-full justify-center items-center'>
              <Loader2 className='size-24 animate-spin mt-48' />
            </div>
          )
        }
        {
          articles && articles.length > 0 && (
            <DataTable columns={columns} data={articles[0].serial === null ? [] : articles} />
          )
        }
        {
          articles && articles.length === 0 && (
            <DataTable columns={columns} data={[]} />
          )
        }
      </div>
    </ContentLayout>
  )
}

export default BatchDetailPage
