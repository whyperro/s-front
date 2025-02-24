"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";
import { Route } from "@/types";

export const columns: ColumnDef<Route>[] = [
  {
    accessorKey: "from",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Desde" />
    ),
    meta: { title: "Desde" },
    cell: ({ row }) => (
      <div className="flex justify-center font-bold">{row.original.from}</div>
    ),
  },
  {
    accessorKey: "to",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Hasta" />
    ),
    meta: { title: "Hasta" },
    cell: ({ row }) => (
      <div className="flex justify-center font-bold">{row.original.to}</div>
    ),
  },
];
