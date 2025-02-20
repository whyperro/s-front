"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";

import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { MitigationTable } from "@/types";
import MitigationPlanPage from "./page";
import MitigationTableDropdownActions from "@/components/misc/MitigationTableDropdownActions";
import { useState } from "react";
import MitigationMeasureList from "@/components/misc/MitigationMeasureList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const columns: ColumnDef<MitigationTable>[] = [
  {
    accessorKey: "analysis",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Analisis" />
    ),
    meta: { title: "Analisis" },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col justify-center">
          {row.original.analysis ? (
            <>
              <p>Probabilidad: {row.original.analysis.probability}</p>
              <hr />
              <p>Severidad: {row.original.analysis.severity}</p>
              <hr />
              <p>Resultado: {row.original.analysis.result}</p>
              <hr />
            </>
          ) : (
            <p>Sin análisis disponible</p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "mitigation_plan",
    header: ({ column }) => (
      <DataTableColumnHeader
        filter
        column={column}
        title="Nro. Plan de Mitigacion"
      />
    ),
    meta: { title: "Nro. de Plan de Mitigacion" },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          {row.original.mitigation_plan?.id}
        </div>
      );
    },
  },

  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripcion del Plan" />
    ),
    meta: { title: "Descripcion" },
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {row.original.mitigation_plan?.description}
        </p>
      );
    },
  },
  {
    accessorKey: "measures",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Agregar Medidas" />
    ),
    cell: ({ row }) => {
      const measures = row.original.mitigation_plan?.measures;
      const [openMeasures, setOpenMeasures] = useState(false);

      return (
        <>
          <div className="flex flex-col justify-center">
            {measures ? (
              <Dialog>
                <DialogTrigger>Medidas</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogDescription>
                      Medidas de mitigacion asociadas al plan de mitigacion.
                    </DialogDescription>
                  </DialogHeader>

                  <ul>
                    {measures.map((measure) => (
                      
                      <li key={measure.id}>{measure.id}{") "} {measure.description}</li>
                    ))}
                  </ul>
                </DialogContent>
              </Dialog>
            ) : (
              <p>Sin medidas disponible</p>
            )}
          </div>
        </>
      );
    },
  },
  {
    // Debo agregar N/A no aplica, en caso de que esten vacios los campos .
    accessorKey: "mitigation_plan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Analisis-Post Mitigacion" />
    ),
    cell: ({ row }) => {
      const mitigation_analysis = row.original.mitigation_plan?.analysis;
      return (
        <div className="font-medium text-center">
          <div className="flex flex-col justify-center">
            <hr />
            <p>Probabilidad: {mitigation_analysis?.probability ?? "N/A"}</p>
            <hr />
            <p>Severidad: {mitigation_analysis?.severity ?? "N/A"}</p>
            <hr />
            <p>Resultado: {mitigation_analysis?.result ?? "N/A"}</p>
            <hr />
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const MitigationTable = row.original;
      return (
        <MitigationTableDropdownActions mitigationTable={MitigationTable} />
      );
    },
  },
];
