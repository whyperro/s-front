"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";

import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { MitigationTable } from "@/types";
import MitigationPlanPage from "./page";

export const columns: ColumnDef<MitigationTable>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "analysis",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Analisis" />
    ),
    meta: { title: "Analisis" },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col justify-center">
          <hr />
          <p>Probabilidad: {row.original.analysis.probability}</p>
          <hr />
          <p>Severidad: {row.original.analysis.severity}</p>
          <hr />
          <p>Resultado: {row.original.analysis.result}</p>
          <hr />
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
      // const measure = row.original.measures;
      return <></>;
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
            <p>Probabilidad: {mitigation_analysis?.probability}</p>
            <hr />
            <p>Severidad: {mitigation_analysis?.severity}</p>
            <hr />
            <p>Resultado: {mitigation_analysis?.result}</p>
            <hr />
          </div>
        </div>
      );
    },
  },
];
