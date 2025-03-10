"use client";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { useGetVoluntaryReportById } from "@/hooks/sms/useGetVoluntaryReportById";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { Content } from "next/font/google";
import { useParams } from "next/navigation";
import React from "react";

const ShowVoluntaryReport = () => {
  const { report_id } = useParams<{ report_id: string }>();

  const {
    data: voluntaryReport,
    isLoading,
    isError,
  } = useGetVoluntaryReportById(report_id);

  return (
    <ContentLayout title="Reportes Voluntarios">
      <div className="flex flex-col justify-center items-center border border-gray-300 rounded-lg p-6 gap-y-4 shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Detalles del Reporte
        </h1>
        {isLoading && (
          <div className="flex w-full h-64 justify-center items-center">
            <Loader2 className="size-24 animate-spin text-blue-500" />
          </div>
        )}
        {voluntaryReport && (
          <div className="w-full max-w-2xl space-y-4">
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-medium text-gray-700">
                <span className="font-semibold">Número del Reporte:</span>{" "}
                {voluntaryReport.report_number}
              </p>
            </div>
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-medium text-gray-700">
                <span className="font-semibold">Fecha del Reporte: </span>
                {format(voluntaryReport.report_date, "PPP", {
                  locale: es,
                })}
              </p>
            </div>

            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-medium text-gray-700">
                <span className="font-semibold">Fecha de Identificacion: </span>
                {format(voluntaryReport.identification_date, "PPP", {
                  locale: es,
                })}
              </p>
            </div>
            <div className="flex bg-gray-100 justify-between items-center p-4 rounded-lg">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Área de Peligro:</span>{" "}
                {voluntaryReport.danger_area}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <span className="font-semibold">Localización del Peligro:</span>{" "}
                {voluntaryReport.danger_location}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Descripción del Reporte:</span>{" "}
                {voluntaryReport.description}
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Posibles Consecuencias:</span>{" "}
                {voluntaryReport.possible_consequences}
              </p>
            </div>
            {!voluntaryReport.reporter_phone &&
            !voluntaryReport.reporter_email &&
            !voluntaryReport.reporter_name &&
            !voluntaryReport.reporter_last_name ? (
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-lg text-gray-700">
                  Reportado por: <span className="font-semibold">Anónimo</span>
                </p>
              </div>
            ) : (
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-xl font-semibold text-center text-gray-800 mb-2">
                  Reportado Por:
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Nombre:</span>{" "}
                  {voluntaryReport.reporter_name}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Apellido:</span>{" "}
                  {voluntaryReport.reporter_last_name}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Teléfono:</span>{" "}
                  {voluntaryReport.reporter_phone}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Email:</span>{" "}
                  {voluntaryReport.reporter_email}
                </p>
              </div>
            )}
          </div>
        )}
        {isError && (
          <p className="text-sm text-red-500 mt-4">
            Ha ocurrido un error al cargar el reporte voluntario...
          </p>
        )}
      </div>
    </ContentLayout>
  );
};

export default ShowVoluntaryReport;

/*
<div className="flex flex-col juistify-center items-center border border-muted-foreground p-4 gap-y-2">
      <h1 className="flex justify-center font-black text-2xl">Reporte voluntario</h1>
      {isLoading && (
        <div className="flex w-full h-full justify-center items-center">
          <Loader2 className="size-24 animate-spin mt-48" />
        </div>
      )}
      {voluntaryReport && (
        <div className="flex flex-col justify-center items-center gap-y-2">
          <h1>Numero del Reporte: {voluntaryReport.report_number}</h1>
          <p>Descripcion del Reporte: {voluntaryReport.description}</p>
          <p>Localizacion del Peligro: {voluntaryReport.danger_location}</p>
          <p>Area de Peligro: {voluntaryReport.danger_area}</p>
          <p>Posibles Consecuencias: {voluntaryReport.possible_consequences}</p>

        </div>
      )}
      {isError && (
        <p className="text-sm text-muted-foreground">
          Ha ocurrido un error al cargar el reporte voluntario...
        </p>
      )}
    </div>
*/
