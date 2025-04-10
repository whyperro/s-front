"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";

import FollowUpControlDropdownActions from "@/components/misc/FollowUpControlDropdownActions";
import { FollowUpControl } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const columns: ColumnDef<FollowUpControl>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Numero de Control" />
    ),
    meta: { title: "Control" },
    cell: ({ row }) => {

      return <div className="flex justify-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Observacion" />
    ),
    meta: { title: "Control de Segumiento" },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">{row.original.description}</div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Fecha del Control" />
    ),
    meta: { title: "Fecha de Control" },
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {format(row.original.date, "PPP", {
            locale: es,
          })}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const FollowUpControl = row.original;
      return (
        <FollowUpControlDropdownActions followUpControl={FollowUpControl} />
      );
    },
  },
];