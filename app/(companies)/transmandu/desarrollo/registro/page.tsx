'use client';

import { ContentLayout } from '@/components/layout/ContentLayout';

import { useCompanyStore } from '@/stores/CompanyStore';
import { Loader2 } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"



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
              <BreadcrumbPage>Registro de Actividades</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-4xl font-bold text-center'>Registro de Actividades</h1>
        <p className='text-sm text-muted-foreground text-center  italic'>
          Aquí puede registrar las actividades realizadas por la Jefatura de Desarrollo. <br />
        </p>
        
        {/* <DataTable columns={columns} data={mockData.activityReports} /> */}


      </div>
    </ContentLayout>
  )
}

export default DailyActivitiesPage
