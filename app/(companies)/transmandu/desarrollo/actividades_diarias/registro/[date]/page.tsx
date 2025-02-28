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

const DailyActivitiesPage = () => {

import { DailyReportForm } from '@/components/forms/DailyReportForm';
import { useCreateDailyReport} from '@/actions/desarrollo/actions';
import { useGetDailyActivities } from '@/hooks/desarrollo/useGetDailyActivities';

const DailyActivitiesPage = () => {
  const [loading, setLoading] = useState(true);
  const [hasReport, setHasReport] = useState(false);

  const { createDailyReport } = useCreateDailyReport();
  const userId = '1'; // Debe obtenerse dinámicamente
  const { data: report, isLoading } = useGetDailyActivities(userId); // Obtiene el reporte si existe

  useEffect(() => {
    if (!isLoading) {
      setHasReport(!!report); // Si hay datos, establece que existe un reporte
      setLoading(false);
    }
  }, [report, isLoading]);

  const handleAddReport = () => {
    const userId = 1; // Debe obtenerse dinámicamente
    const date = new Date().toISOString().split('T')[0];

    createDailyReport.mutate({ userId, date }, {
      onSuccess: () => {
        setHasReport(true); // Actualiza el estado tras crear el reporte
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
          Aquí puede registrar las actividades realizadas por la Jefatura de Desarrollo. <br />
        </p>

        {loading ? (
          <div className='flex justify-center'><Loader2 className='animate-spin' /></div>
        ) : hasReport ? (
          <DailyReportForm />
        ) : (
          <div className='flex justify-center'>
            <button onClick={handleAddReport} className='flex flex-col items-center gap-2 text-blue-500 hover:text-blue-700'>
              <PlusCircle size={48} />
              <span>Agregar Registro</span>
            </button>
          </div>
        )}
      </div>
    </ContentLayout>
  );
};

export default DailyActivitiesPage;
