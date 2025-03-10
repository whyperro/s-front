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
  const ACCEPTABLE: string[] = ["3E", "2D", "2E", "1A", "1B", "1C", "1D", "1E"];

  if (INTOLERABLE.includes(index)) {
    return "INTOLERABLE";
  } else if (TOLERABLE.includes(index)) {
    return "TOLERABLE";
  } else if (ACCEPTABLE.includes(index)) {
    return "ACEPTABLE";
  }
}

export const columns: ColumnDef<MitigationTable>[] = [
  {
    accessorKey: "analysis",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Analisis" />
    ),
    meta: { title: "Analisis" },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col justify-center text-center">
          {row.original.analysis ? (
            <>
              <hr />
              <p>Probabilidad: {row.original.analysis.probability}</p>
              <hr />
              <p>Severidad: {row.original.analysis.severity}</p>
              <hr />
              <p>Resultado: {row.original.analysis.result}</p>
              {(() => {
                const riskIndex = getResult(row.original.analysis.result);
                if (riskIndex === "TOLERABLE") {
                  return (
                    <div className="bg-yellow-400 p-4 rounded-lg">
                      <p className="text-white">TOLERABLE</p>
                    </div>
                  );
                } else if (riskIndex === "INTOLERABLE") {
                  return (
                    <div className="bg-red-600 p-4 rounded-lg">
                      <p className="text-white">INTOLERABLE</p>
                    </div>
                  );
                } else if (riskIndex === "ACEPTABLE") {
                  return (
                    <div className="bg-green-500 p-4 rounded-lg">
                      <p className="text-white">ACEPTABLE</p>
                    </div>
                  );
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
          {row.original.mitigation_plan?.id ?? "N/A"}
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
          {row.original.mitigation_plan?.description ?? "N/A"}
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
                <DialogTrigger className="flex justify-center items-center rounded-full h-10 text-center bg-blue-400 font-semibold">
                  Medidas
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogDescription className="font-semibold text-black">
                      Medidas de Mitigacion
                    </DialogDescription>
                  </DialogHeader>

                  <div className="border rounded-lg p-4 shadow-md">
                    {measures.length > 0 ? (
                      <ul>
                        {measures.map((measure, index) => (
                          <li key={measure.id} className="mb-2">
                            <span className="font-semibold"> {++index} ) </span>
                            <span>{measure.description}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-left">
                        No hay medidas asociadas a este plan de mitigacion
                      </p>
                    )}
                  </div>

                  {measures.length > 0 ? (
                    <Link
                      href={`/transmandu/sms/planes_de_mitigacion/${planId}/medidas`}
                    >
                      <div className="flex justify-end mt-4">
                        <Button className="w-1/3">Ver mas</Button>
                      </div>
                    </Link>
                  ) : null}
                </DialogContent>
              </Dialog>
            ) : (
              <p className="text-center">N/A</p>
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
      <DataTableColumnHeader column={column} title="Post-Mitigacion" />
    ),
    cell: ({ row }) => {
      const mitigation_analyses = row.original.mitigation_plan?.analysis;
      return (
        <div className="flex flex-col justify-center text-center">
          {mitigation_analyses ? (
            <>
              <hr />
              <p>Probabilidad: {mitigation_analyses.probability}</p>
              <hr />
              <p>Severidad: {mitigation_analyses.severity}</p>
              <hr />
              <p>Resultado: {mitigation_analyses.result}</p>
              {(() => {
                const riskIndex = getResult(mitigation_analyses?.result);
                if (riskIndex === "TOLERABLE") {
                  return (
                    <div className="bg-yellow-400 p-4 rounded-lg">
                      <p className="text-white">TOLERABLE</p>
                    </div>
                  );
                } else if (riskIndex === "INTOLERABLE") {
                  return (
                    <div className="bg-red-600 p-4 rounded-lg">
                      <p className="text-white">INTOLERABLE</p>
                    </div>
                  );
                } else if (riskIndex === "ACEPTABLE") {
                  return (
                    <div className="bg-green-500 p-4 rounded-lg">
                      <p className="text-white">ACEPTABLE</p>
                    </div>
                  );
                } else {
                  return null; // O un componente por defecto si lo deseas
                }
              })()}
            </>
          ) :  <p className="text-center">N/A</p>}
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
