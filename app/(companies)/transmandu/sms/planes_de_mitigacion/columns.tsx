"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";

import MitigationTableDropdownActions from "@/components/misc/MitigationTableDropdownActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MitigationTable } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Link from "next/link";

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
      const planId = row.original.mitigation_plan?.id;

      return (
        <>
          <div className="flex flex-col justify-center">
            {measures ? (
              <Dialog>
                <DialogTrigger className="font-semibold">Medidas</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogDescription className="font-semibold text-black">
                      Medidas de Mitigacion Asociadas al Plan
                    </DialogDescription>
                  </DialogHeader>

                  <div className="border rounded-lg p-4 shadow-md">
                    <ul>
                      {measures.map((measure, index) => (
                        <li key={measure.id} className="mb-2">
                          <span className="font-semibold"> {++index} ) </span>
                          <span>{measure.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/transmandu/sms/planes_de_mitigacion/${planId}/medidas`}
                  >
                    <div className="flex justify-end mt-4">
                      <Button className="w-1/3">Ver mas</Button>
                    </div>
                  </Link>
                </DialogContent>
              </Dialog>
            ) : (
              <div>Sin medidas disponible</div>
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
