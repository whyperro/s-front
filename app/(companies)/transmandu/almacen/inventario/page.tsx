'use client';

import { ContentLayout } from '@/components/layout/ContentLayout';
import { useInventario } from '@/hooks/use-inventario';
import { columns } from './columns';
import { DataTable } from './data-table';
const InventarioPage = () => {

  const {data, isLoading, isError} = useInventario();

  return (
    <ContentLayout title='Inventario'>
      <div className='flex flex-col gap-y-2'>
        <h1 className='text-4xl font-bold'>Inventario de Almacén</h1>
        <p className='text-sm text-muted-foreground'>
          Aquí puede observar todos los items en el almacén. Filtre y/o busque sí de sea un item en específico.
        </p>
        {
          isLoading && (
            <div>loading..</div>
          )
        }
        {
          data && (
            <DataTable columns={columns} data={data} />

          )
        }
      </div>
    </ContentLayout>
  )
}

export default InventarioPage