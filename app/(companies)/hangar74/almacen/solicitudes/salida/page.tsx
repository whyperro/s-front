'use client'

import { ContentLayout } from '@/components/layout/ContentLayout'
import React, { useEffect } from 'react'
import { DataTable } from './data-table'
import { columns } from '@/app/(companies)/hangar74/almacen/solicitudes/salida/columns'
import { useGetDispatchesByLocation } from '@/hooks/almacen/useGetDispatchesRequests'
import { useCompanyStore } from '@/stores/CompanyStore'
import { Loader2 } from 'lucide-react'

const DispatchRequestPage = () => {
  const { selectedStation } = useCompanyStore();
  const { mutate, data: dispatches, isPending: isDispatchesLoading, isError } = useGetDispatchesByLocation()
  useEffect(() => {
    if (selectedStation) {
      mutate(Number(selectedStation))
    }
  }, [selectedStation, mutate])

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
