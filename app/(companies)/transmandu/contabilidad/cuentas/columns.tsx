"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";
import { Cash } from "@/types";
import CashDropdownActions from "@/components/misc/CashDropdownActions";

export const columns: ColumnDef<Cash>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Nombre" />
    ),
    meta: { title: "Nombre" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Total" />
    ),
    meta: { title: "Total" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.total_amount}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "box_type",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Tipo de Caja" />
    ),
    meta: { title: "Tipo de Caja" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.box_type}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return <CashDropdownActions id={row.original.id.toString()} />;
    },
  },
];