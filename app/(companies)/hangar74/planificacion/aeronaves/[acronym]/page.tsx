"use client"

import { ContentLayout } from '@/components/layout/ContentLayout'
import { useGetMaintenanceAircraftByAcronym } from '@/hooks/planificacion/useGetMaitenanceAircraftByAcronym';
import { useParams } from 'next/navigation';
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'; // Importar componentes de Card de shadcn/ui
import { MaintenanceAircraftPart } from '@/types';

const MaintenanceAircraftPage = () => {
  const { acronym } = useParams<{ acronym: string }>();
  const { data, isLoading } = useGetMaintenanceAircraftByAcronym(acronym);

  if (isLoading) {
    return <ContentLayout title="Aeronave">Cargando...</ContentLayout>;
  }

  if (!data) {
    return <ContentLayout title="Aeronave">No se encontraron datos.</ContentLayout>;
  }

  return (
    <ContentLayout title={`Aeronave - ${data.acronym}`}>
      <div className="space-y-6">
        {/* Información General */}
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Fabricante</p>
                <p className="font-medium">{data.manufacturer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Número de Serie</p>
                <p className="font-medium">{data.serial}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Horas de Vuelo</p>
                <p className="font-medium">{data.flight_hours}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ciclos de Vuelo</p>
                <p className="font-medium">{data.flight_cycles}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fecha de Fabricación</p>
                <p className="font-medium">{data.fabricant_date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ubicación</p>
                <p className="font-medium">{data.location.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partes de la Aeronave */}
        <Card>
          <CardHeader>
            <CardTitle>Partes de la Aeronave</CardTitle>
            <CardDescription>Detalles de las partes instaladas en esta aeronave.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-6 items-center justify-center">
            {data.aircraft_parts.map((part: MaintenanceAircraftPart) => (
              <Card key={part.part_number}>
                <CardHeader>
                  <CardTitle>{part.part_name}</CardTitle>
                  <CardDescription>Número de Parte: {part.part_number}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Horas de Uso</p>
                      <p className="font-medium">{part.part_hours}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ciclos de Uso</p>
                      <p className="font-medium">{part.part_cycles}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Comentarios */}
        <Card>
          <CardHeader>
            <CardTitle>Comentarios</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{data.comments || "No hay comentarios."}</p>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}

export default MaintenanceAircraftPage;
