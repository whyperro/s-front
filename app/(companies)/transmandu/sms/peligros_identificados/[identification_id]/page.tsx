"use client";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { useGetDangerIdentificationById } from "@/hooks/sms/useGetDangerIdentificationById";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

const ShowDangerIdentification = () => {
  const { identification_id } = useParams<{ identification_id: string }>();

  const {
    data: dangerIdentification,
    isLoading,
    isError,
  } = useGetDangerIdentificationById(identification_id);

  return (
    <ContentLayout title="Identificacion de Peligro">
      <div className="flex flex-col justify-center items-center border border-gray-300 rounded-lg p-6 gap-y-4 shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Detalles del la Identificacion de Peligro
        </h1>
        {isLoading && (
          <div className="flex w-full h-64 justify-center items-center">
            <Loader2 className="size-24 animate-spin text-blue-500" />
          </div>
        )}
        {dangerIdentification && (
          <div className="w-full max-w-2xl space-y-4">
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-medium text-gray-700">
                <span className="font-semibold">Peligro</span>
                {dangerIdentification.danger}
              </p>
            </div>
            <div className="flex bg-gray-100 justify-between items-center p-4 rounded-lg">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Área de Peligro:</span>
                {dangerIdentification.danger_area}
              </p>
            </div>
            <div className="flex bg-gray-100 justify-between items-center p-4 rounded-lg">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Nombre de la Fuente:</span>
                {dangerIdentification.information_source.name}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <span className="font-semibold">Tipo de Fuente:</span>
                {dangerIdentification.information_source.type}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Descripción del Reporte:</span>
                {dangerIdentification.description}
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-medium text-gray-700">
                <span className="font-semibold">
                  Lista de Posibles Consecuencias:
                </span>
                <br />
                {dangerIdentification.possible_consequences
                  .split(",")
                  .map((consequence, index) => (
                    <span key={index} className=" justify-center items-center block">
                      {index+1}) {consequence.trim()}
                    </span>
                  ))}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Analisis Causa Raiz:</span>
                {dangerIdentification.root_cause_analysis}
              </p>
            </div>
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

export default ShowDangerIdentification;
