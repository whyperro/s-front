'use client'

import { ContentLayout } from '@/components/layout/ContentLayout';
import { useGetConditions } from '@/hooks/administracion/useGetConditions';
import { Loader2 } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useGetBanks } from '@/hooks/ajustes/globales/bancos/useGetBanks';
import { useGetClients } from '@/hooks/ajustes/clientes/useGetClients';

const BanksPage = () => {

  const { data: clients, isLoading, error } = useGetClients();
  return (
    <ContentLayout title={'Almacenes'}>
      <h1 className='text-4xl font-bold text-center mb-2'>Control de Clientes</h1>
      <p className='text-sm text-muted-foreground text-center'>
        Lleve un control de los diferentes clientes que se han registrado.
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
            <p className='text-sm text-muted-foreground'>Ha ocurrido un error al cargar los clientes...</p>
          </div>
        )
      }
      {
        clients && (
          <DataTable columns={columns} data={clients} />
        )
      }
    </ContentLayout>
  )
}

export default BanksPage
