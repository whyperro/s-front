'use client'

import { ContentLayout } from '@/components/layout/ContentLayout'
import { useGetVendors } from '@/hooks/ajustes/globales/proveedores/useGetVendors'
import { Loader2 } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from './data-table'

const PilotsPage = () => {
  
  return (
    <ContentLayout title='Permisos'>
      <h1 className='text-5xl font-bold text-center mt-2'>
        Control de Proveedores
      </h1>
      <p className='text-sm text-muted-foreground text-center italic mt-2'>Aquí puede llevar el control de los proveedores registrados para las diferentes compras.</p>
     
    </ContentLayout>
  )
}

export default PilotsPage
