'use client'

import { ContentLayout } from '@/components/layout/ContentLayout'
import LoadingPage from '@/components/misc/LoadingPage'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useGetUserActivity } from '@/hooks/desarrollo/useGetUserActivities';
import { columns } from '../../[id]/[date]/columns';
import { DataTable } from '../../[id]/[date]/data-table';



const ActivityReportsByIdPage = ({ params }: { params: { id: string; date: string } }) => {
  const { data: activitiesReport } = useGetUserActivity(params.date);

  return (
    <ContentLayout title='Actividades Diarias'>
      <div className='flex flex-col gap-y-2'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Actividades Diarias</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-4xl font-bold text-center'>Actividades Diarias</h1>
        <p className='text-sm text-muted-foreground text-center italic'>
          Aquí puede observar todas las actividades realizadas por {activitiesReport?.user.first_name} {activitiesReport?.user.first_name}.
        </p>

        <DataTable columns={columns} data={activitiesReport?.activities || []} />
      </div>
    </ContentLayout>
  );
}

export default ActivityReportsByIdPage;
