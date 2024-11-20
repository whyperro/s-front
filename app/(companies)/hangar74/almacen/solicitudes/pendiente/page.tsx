'use client'

import { ContentLayout } from '@/components/layout/ContentLayout'
import { useGetPendingDispatches } from '@/hooks/almacen/useGetPendingDispatchRequests'
import { useCompanyStore } from '@/stores/CompanyStore'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'

const DispatchRequestPage = () => {
  const { selectedStation } = useCompanyStore();
  const { data: dispatches, isPending: isDispatchesLoading, isError } = useGetPendingDispatches(selectedStation ?? undefined)
  return (
    <ContentLayout title='Salida'>
      <div className='flex flex-col gap-y-2'>
        {
          isDispatchesLoading && (
            <div className='flex w-full h-full justify-center items-center'>
              <Loader2 className='size-24 animate-spin mt-48' />
            </div>
          )
        }
        {
          dispatches && (
            <DataTable columns={columns} data={dispatches} />

          )
        }
        {
          isError && <p className='text-sm text-muted-foreground'>Ha ocurrido un error al cargar las solicitudes...</p>
        }
      </div>
    </ContentLayout>
  )
}

export default DispatchRequestPage
