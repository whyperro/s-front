"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";
import { Cash } from "@/types";
import CashDropdownActions from "@/components/misc/CashDropdownActions";

//función auxiliar para manejar la lógica de los símbolos
const getCurrencySymbol = (coinType: string) => {
  switch(coinType) {
    case "DOLARES": return "$";
    case "EUROS": return "€";
    case "BOLIVARES": return "Bs.";
    default: return "";
  }
};

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
          {row.original.total_amount } {getCurrencySymbol(row.original.coin)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "coin",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Moneda" />
    ),
    meta: { title: "Moneda" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.coin}
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