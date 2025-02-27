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
      function getResult(index: string) {
        const INTOLERABLE: string[] = ["5A", "5B", "5C", "4A", "4B", "3A"];
        const TOLERABLE: string[] = [
          "5D",
          "5E",
          "4C",
          "4D",
          "4E",
          "3B",
          "3C",
          "3D",
          "2A",
          "2B",
          "2C",
        ];
        const ACCEPTABLE: string[] = [
          "3E",
          "2D",
          "2E",
          "1A",
          "1B",
          "1C",
          "1D",
          "1E",
        ];

        if (INTOLERABLE.includes(index)) {
          return "INTOLERABLE";
        } else if (TOLERABLE.includes(index)) {
          return "TOLERABLE";
        } else if (ACCEPTABLE.includes(index)) {
          return "ACEPTABLE";
        }
      }

      return (
        <div className="flex flex-col justify-center text-center">
          {row.original.analysis ? (
            <>
              <p>Probabilidad: {row.original.analysis.probability}</p>
              <hr />
              <p>Severidad: {row.original.analysis.severity}</p>
              <hr />
              <p>Resultado: {row.original.analysis.result}</p>
              <hr />
              <hr />
              {(() => {
                const riskIndex = getResult(row.original.analysis.result);
                if (riskIndex === "TOLERABLE") {
                  return <div className="bg-yellow-400 p-4 rounded-lg">
                    <p className="text-white">TOLERABLE</p>
                  </div>;
                } else if (riskIndex === "INTOLERABLE") {
                  return (
                    <div className="bg-red-600 p-4 rounded-lg">
                      <p className="text-white">INTOLERABLE</p>
                    </div>
                  );
                } else if (riskIndex === "ACEPTABLE") {
                  return <div className="bg-green-500 p-4 rounded-lg">
                    <p className="text-white">ACEPTABLE</p>
                  </div>;
                } else {
                  return null; // O un componente por defecto si lo deseas
                }
              })()}
            </>
          ) : null}
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
            ) : null}
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
