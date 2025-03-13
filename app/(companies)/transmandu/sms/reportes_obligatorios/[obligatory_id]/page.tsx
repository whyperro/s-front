"use client";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { useGetObligatoryReportById } from "@/hooks/sms/useGetObligatoryReportById";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { Content } from "next/font/google";
import { useParams } from "next/navigation";
import React from "react";

function hourFormat(date: Date) {
  const timeString = date.toString();
  const parsedTime = parse(timeString, "HH:mm:ss", new Date());
  const incident_time = format(parsedTime, "HH:mm");
  return incident_time;
}

const ShowObligatoryReport = () => {
  const { obligatory_id } = useParams<{ obligatory_id: string }>();

  const {
    data: obligatoryReport,
    isLoading,
    isError,
  } = useGetObligatoryReportById(obligatory_id);

  return (
    <ContentLayout title="Reportes Voluntarios">
      <div className="flex flex-col justify-center items-center border border-gray-300 rounded-lg p-6 gap-y-4 shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Detalles del Reporte Obligatorio
        </h1>
        {isLoading && (
          <div className="flex w-full h-64 justify-center items-center">
            <Loader2 className="size-24 animate-spin text-blue-500" />
          </div>
        )}
        {obligatoryReport && (
          <div className="w-full max-w-2xl space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Codigo: </span>{" "}
                {obligatoryReport.report_code}
              </p>
            </div>
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-medium text-gray-700">
                <span className="font-semibold">Fecha del Reporte: </span>
                {format(obligatoryReport.report_date, "PPP", {
                  locale: es,
                })}
              </p>
            </div>

            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-medium text-gray-700">
                <span className="font-semibold">Fecha del Incidente: </span>
                {format(obligatoryReport.incident_date, "PPP", {
                  locale: es,
                })}
              </p>
            </div>
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-medium text-gray-700">
                <span className="font-semibold">Hora del Suceso : </span>
                {hourFormat(obligatoryReport.incident_time)}
              </p>
            </div>

            {obligatoryReport.other_incidents && (
              <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-medium text-gray-700">
                  <span className="font-semibold">Otros Incidentes : </span>
                  {obligatoryReport.other_incidents}
                </p>
              </div>
            )}

            {obligatoryReport.incidents && (
              <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-medium text-gray-700 mb-2">
                  <span className="font-semibold">Lista de Incidentes:</span>
                </p>
                {(() => {
                  try {
                    const incidentsArray = JSON.parse(
                      obligatoryReport.incidents
                    ) as string[];
                    return incidentsArray.map(
                      (incident: string, index: number) => (
                        <p key={index} className="text-gray-600 mb-1">
                          - {incident}
                        </p>
                      )
                    );
                  } catch (error) {
                    console.error("Error parsing incidents:", error);
                    return <p>Error al mostrar incidentes</p>;
                  }
                })()}
              </div>
            )}

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-xl font-semibold text-center text-gray-800 mb-2">
                Datos de Aereonave
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Matricula de Aereonave: </span>
                {obligatoryReport.aircraft_acronym}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <span className="font-semibold">Modelo de la Aereonave: </span>
                {obligatoryReport.aircraft_model}
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-xl font-semibold text-center text-gray-800 mb-2">
                Datos de Vuelo
              </p>
              <p className="text-lg font-medium text-gray-700">
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Numero de Vuelo: </span>{" "}
                  {obligatoryReport.flight_number}
                </p>
                <span className="font-semibold">Hora de Vuelo : </span>
                {hourFormat(obligatoryReport.flight_time)}
              </p>

              <p className="text-lg text-gray-700">
                <span className="font-semibold">Origen del Vuelo: </span>{" "}
                {obligatoryReport.flight_origin}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Destino del Vuelo:</span>{" "}
                {obligatoryReport.flight_destiny}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Destino Alterno:</span>{" "}
                {obligatoryReport.flight_alt_destiny}
              </p>
            </div>

            {obligatoryReport.pilot && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-xl font-semibold text-center text-gray-800 mb-2">
                  Datos del Piloto
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">DNI: </span>{" "}
                  {obligatoryReport.pilot.dni}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Número de Licencia: </span>{" "}
                  {obligatoryReport.pilot.license_number}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Nombre:</span>{" "}
                  {obligatoryReport.pilot.first_name}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Apellido:</span>{" "}
                  {obligatoryReport.pilot.last_name}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Correo Electronico:</span>{" "}
                  {obligatoryReport.pilot.email}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Telefono:</span>{" "}
                  {obligatoryReport.pilot.phone}
                </p>
              </div>
            )}

            {obligatoryReport.copilot && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-xl font-semibold text-center text-gray-800 mb-2">
                  Datos del copiloto
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">DNI: </span>{" "}
                  {obligatoryReport.copilot.dni}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Número de Licencia: </span>{" "}
                  {obligatoryReport.copilot.license_number}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Nombre:</span>{" "}
                  {obligatoryReport.copilot.first_name}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Apellido:</span>{" "}
                  {obligatoryReport.copilot.last_name}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Correo Electronico:</span>{" "}
                  {obligatoryReport.copilot.email}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Telefono:</span>{" "}
                  {obligatoryReport.copilot.phone}
                </p>
              </div>
            )}
          </div>
        )}
        {isError && (
          <p className="text-sm text-red-500 mt-4">
            Ha ocurrido un error al cargar el reporte obligatorio...
          </p>
        )}
      </div>
    </ContentLayout>
  );
};

export default ShowObligatoryReport;
