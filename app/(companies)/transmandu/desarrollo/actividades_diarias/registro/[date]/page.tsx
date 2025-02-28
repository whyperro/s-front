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
import { useCreateDailyReport } from '@/actions/desarrollo/actions';
import { useGetDailyActivities } from '@/hooks/desarrollo/useGetDailyActivities';
import { useParams } from 'next/navigation';
import ConfirmCreateActivityReportDialog from '@/components/dialogs/CreateActivityReportDialog';


const DailyActivitiesPage = () => {
  const params: { date: string } = useParams();
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const { createDailyReport } = useCreateDailyReport();
  const userId = '1'; // Debe obtenerse dinámicamente
  const { data: report, isLoading } = useGetDailyActivities( params.date);

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
      if (!report) {
        setShowDialog(true);
      }
    }
  }, [report, isLoading]);

  const handleAddReport = () => {
    const date = new Date().toISOString().split('T')[0];

    createDailyReport.mutate({ date }, {
      onSuccess: () => {
        setShowDialog(false);
      }
    });
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
        
        {report ? <DailyReportForm activities_length={report.activities.length || 0} /> : (
          <ConfirmCreateActivityReportDialog 
            open={showDialog} 
            onClose={() => setShowDialog(false)} 
            onConfirm={handleAddReport} 
          />
        )}
      </div>
    </ContentLayout>
  );
};

export default DailyActivitiesPage;
