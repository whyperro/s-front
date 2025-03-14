"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";

import { Checkbox } from "@/components/ui/checkbox";
import { DangerIdentification, VoluntaryReport } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import VoluntaryReportDropdownActions from "@/components/misc/VoluntaryReportDropDownMenu";
import DangerIdentificationDropdownActions from "@/components/misc/DangerIdentificationDropdownActions";
import { Row } from "react-day-picker";

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
    accessorKey: "danger_area",
    header: ({ column }) => (
      <DataTableColumnHeader
        filter
        column={column}
        title="Area de identificacion"
      />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">{row.original.danger_area}</p>
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
        <div
          className={`flex justify-center items-center rounded-full h-10 text-center font-bold font-sans ${
            row.original.information_source.type === "PROACTIVO"
              ? "bg-green-500"
              : "bg-red-600"
          }`}
        >
          {row.original.information_source.type}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const dangerIdentification = row.original;
      return (
        <DangerIdentificationDropdownActions
          dangerIdentification={dangerIdentification}
        />
      );
    },
  },
];
