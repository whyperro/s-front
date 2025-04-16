"use client"

import { ContentLayout } from '@/components/layout/ContentLayout';
import LoadingPage from '@/components/misc/LoadingPage';
import { useGetWorkOrderByOrderNumber } from '@/hooks/planificacion/useGetWorkOrderByOrderNumber';
import { useParams } from 'next/navigation';
import WorkOrderAircraftDetailsCards from './_components/WorkOrderAircraftDetailsCards';
import WorkOrderTasksDetails from './_components/WorkOrderTasksDetails';

const WorkOrderPage = () => {
  const { order_number } = useParams<{ order_number: string }>();
  const { data: work_order, isLoading: isWorkOrderLoading } = useGetWorkOrderByOrderNumber(order_number);

  if (isWorkOrderLoading || (work_order && work_order.order_number !== order_number)) {
    return <LoadingPage />;
  }

  return (
    <ContentLayout title='Orden de Trabajo'>
      <div className='space-y-6'>
        <h1 className='text-center text-5xl font-bold'>Detalles de WO - <span className='text-blue-600 italic'>{order_number}</span></h1>
        {
          work_order && (
            <>
              <WorkOrderAircraftDetailsCards work_order={work_order} />
              <WorkOrderTasksDetails work_order={work_order} />
            </>
          )
        }
      </div>
    </ContentLayout>
  )
}

export default WorkOrderPage
