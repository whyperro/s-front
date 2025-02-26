'use client'

import UserInfoCard from '@/components/cards/UserInfoCard'
import UserInfoTabs from '@/components/cards/UserInfoTabs'
import { ContentLayout } from '@/components/layout/ContentLayout'
import LoadingPage from '@/components/misc/LoadingPage'
import { columns } from './columns';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useGetUserById } from '@/hooks/user/useGetUserById'
import { DataTable } from '../data-table'
import mockData from '../mock';

const ActivityReportsByIdPage = ({ params }: { params: { id: string } }) => {

  const { data: mockdata, error, isLoading } = useGetUserById(params.id);


  if (isLoading) {
    return <LoadingPage />
  }


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
        <p className='text-sm text-muted-foreground text-center  italic'>
          Aquí puede observar todos las actividades realizadas por el Desarrollador: Joel.
        </p>

        <DataTable columns={columns} data={mockData.activityReports.flatMap(report => report.activities)} />

      </div>
    </ContentLayout>
  )
}

export default ActivityReportsByIdPage
