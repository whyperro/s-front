'use client';

import { ContentLayout } from '@/components/layout/ContentLayout';
import { useGetBatches } from '@/hooks/almacen/useGetBatches';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useParams } from 'next/navigation';
import { useGetArticlesByBatch } from '@/hooks/almacen/useGetArticlesByBatch';
import { useEffect } from 'react';
import { useCompanyStore } from '@/stores/CompanyStore';
import { Loader2 } from 'lucide-react';

const parseSlug = (slug: string) => {
  return slug.replace(/-/g, ' ').toUpperCase(); // Convertir guiones a espacios y mayúsculas
};

const BatchDetailPage = () => {

  const { slug } = useParams<{ slug: string }>()

  const { selectedStation } = useCompanyStore();

  const { mutate, data: articles, isPending: isBatchesLoading, isError } = useGetArticlesByBatch(Number(selectedStation), slug);

  useEffect(() => {
    if (selectedStation) {
      mutate(Number(selectedStation))
    }
  }, [selectedStation, mutate])

  return (
    <ContentLayout title='Inventario'>
      <div className='flex flex-col gap-y-2'>
        <h1 className='text-4xl font-bold text-center'>Detalles del Renglón</h1>
        <h3 className='text-3xl font-bold italic text-center'>{slug}</h3>
        <p className='text-sm text-muted-foreground text-center italic mt-2'>
          Aquí puede observar todos los renglones de los diferentes almacenes. Filtre y/o busque sí desea un renglón en específico.
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
            <>
              <DataTable columns={columns} data={articles} />
            </>
          )
        }
        {
          articles && articles.length === 0 && (
            <DataTable columns={columns} data={[]} />
          )
        }
        {
          isError && <p className='text-sm text-muted-foreground text-center'>Ha ocurrido un error al cargar los articulos...</p>
        }
      </div>
    </ContentLayout>
  )
}

export default BatchDetailPage
