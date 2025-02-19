'use client';

import { ContentLayout } from '@/components/layout/ContentLayout';

import { useCompanyStore } from '@/stores/CompanyStore';
import { Loader2 } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from './data-table';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import mockData from './mock'; // Importando los datos de prueba




const DailyActivitiesPage = () => {


  return (
    <ContentLayout title='Actividades Diarias'>
      <div className='flex flex-col gap-y-2'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/transmandu/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Actividades Diarias</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-4xl font-bold text-center'>Actividades Diarias</h1>
        <p className='text-sm text-muted-foreground text-center  italic'>
          Aquí puede observar todos las actividades realizadas por la Jefatura de Desarrollo. <br />Filtre y/o busque sí desea un dia en específico.
        </p>
        
        <DataTable columns={columns} data={mockData.activityReports} />


      </div>
    </ContentLayout>
  )
}

export default DailyActivitiesPage
