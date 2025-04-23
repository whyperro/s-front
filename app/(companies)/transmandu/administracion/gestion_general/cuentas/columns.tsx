"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";
import { Account } from "@/types";
import AccountDropdownActions from "@/components/misc/AccountDropdownActions";

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Cuenta" />
    ),
    meta: { title: "Cuenta" },
    cell: ({ row }) => (
      <div className="flex justify-center font-bold">{row.original.name}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return <AccountDropdownActions id={row.original.id.toString()} />;
    },
  },
];