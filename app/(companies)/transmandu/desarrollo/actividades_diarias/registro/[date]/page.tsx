'use client';
import { useState, useEffect } from 'react';
import { ContentLayout } from '@/components/layout/ContentLayout';
import { DailyReportForm } from '@/components/forms/DailyReportForm';
import { Loader2, PlusCircle } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGetDailyActivityReport } from '@/hooks/desarrollo/useGetDailyActivities';
import { useParams } from 'next/navigation';
import ConfirmCreateActivityReportDialog from '@/components/dialogs/CreateActivityReportDialog';
import { useCreateActivityReport, useRegisterActivity } from '@/actions/desarrollo/reportes_diarios/actions';


const DailyActivitiesPage = () => {
  const params: { date: string } = useParams();
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const { data: report, isLoading } = useGetDailyActivityReport(params.date);
  const {createActivityReport}  = useCreateActivityReport()

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
      if (!report) {
        setShowDialog(true);
      }
    }
  }, [report, isLoading]);

  const handleCreateActivityReport = () => {
    createActivityReport.mutate({date: params.date});
  };

  return (
    <ContentLayout title='Registro de Actividades'>
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
        <p className='text-sm text-muted-foreground text-center italic'>
          Aquí puede registrar las actividades realizadas por la Jefatura de Desarrollo.<br />
        </p>
        
        {report ? <DailyReportForm activities_length={report.activities ? report.activities.length : 0} /> : (
          <ConfirmCreateActivityReportDialog 
            open={showDialog} 
            onClose={() => setShowDialog(false)} 
            onConfirm={handleCreateActivityReport} 
          />
        )}
      </div>
    </ContentLayout>
  );
};

export default DailyActivitiesPage;
