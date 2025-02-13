"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";

import { Checkbox } from "@/components/ui/checkbox";
import { DangerIdentification, VoluntaryReport } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import VoluntaryReportDropdownActions from "@/components/misc/VoluntaryReportDropDownMenu";

export const columns: ColumnDef<DangerIdentification>[] = [
  {
    accessorKey: "danger",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Peligro" />
    ),
    cell: ({ row }) => {
      return <div className="flex justify-center">{row.original.danger}</div>;
    },
  },
  {
    accessorKey: "danger_location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Localización del peligro" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {row.original.danger_location}
        </p>
      );
    },
  },
  {
    accessorKey: "danger_area",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Area de identificacion" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">{row.original.danger_area}</p>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripcion del peligro" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "possible_consequences",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posibles consecuencias" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {row.original.possible_consequences}
        </p>
      );
    },
  },
  {
    accessorKey: "consequence_to_evaluate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Consecuencia a Evaluar" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {row.original.consequence_to_evaluate}
        </p>
      );
    },
  },
  {
    accessorKey: "information_source",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fuente de Informacion" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {row.original.information_source.name}
        </p>
      );
    },
  },
  {
    accessorKey: "information_source",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo de Fuente" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {row.original.information_source.type}
        </p>
      );
    },
  },
  {
    accessorKey: "root_cause_analysis",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Analisis Causa-Raiz" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {row.original.root_cause_analysis}
        </p>
      );
    },
  },
];
