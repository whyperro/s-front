"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Sell } from "@/types";
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale/es";
import SellDropdownActions from "@/components/misc/SellDropdownActions";

export const columns: ColumnDef<Sell>[] = [
  {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader filter column={column} title="Fecha" />
      ),
      meta: { title: "Fecha" },
      cell: ({ row }) => {
        return (
          <p>
            {format(addDays(row.original.date, 1), "PPP", {
              locale: es,
            })}
          </p>
        );
      },
    },
    {
    accessorKey: "client.name",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Nombre" />
    ),
    meta: { title: "Nombre" },
    cell: ({ row }) => (
      <div className="flex justify-center font-bold">{row.original.client.name}</div>
    ),
  },
  {
    accessorKey: "concept",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Concepto" />
    ),
    meta: { title: "Concepto" },
    cell: ({ row }) => (
      <div className="flex justify-center font-bold">{row.original.concept}</div>
    ),
  },
  {
    accessorKey: "total_price",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Precio" />
    ),
    meta: { title: "Precio" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.total_price}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "payed_amount",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Monto Pagado" />
    ),
    meta: { title: "Monto Pagado" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.payed_amount}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "reference_pick",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Referencia" />
    ),
    meta: { title: "Referencia" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.reference_pick}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return <SellDropdownActions id={row.original.id.toString()} />;
    },
  },
];
