"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Credit } from "@/types";
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale/es";
import CreditDropdownActions from "@/components/misc/CreditDropdownActions";

export const columns: ColumnDef<Credit>[] = [
  {
    accessorKey: "opening_date",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Fecha Apertura" />
    ),
    meta: { title: "Fecha Apertura" },
    cell: ({ row }) => {
      return (
        <p>
          {format(addDays(row.original.opening_date, 1), "PPP", {
            locale: es,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "closing_date",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Fecha Cierre" />
    ),
    meta: { title: "Fecha Cierre" },
    cell: ({ row }) => {
        if (!row.original.closing_date) return <p>No especificado</p>;
        return (
          <p>
            {format(addDays(row.original.closing_date, 1), "PPP", { locale: es })}
          </p>
        );
      },
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Fecha Limite" />
    ),
    meta: { title: "Fecha Limite" },
    cell: ({ row }) => {
      return (
        <p>
          {format(addDays(row.original.deadline, 1), "PPP", {
            locale: es,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "renting.description",
    header: ({ column }) => (
      <DataTableColumnHeader
        filter
        column={column}
        title="Descripción de Renta"
      />
    ),
    meta: { title: "Descripción de Renta" },
    cell: ({ row }) => (
      <div className="flex justify-center font-bold">
        {row.original.renting ? row.original.renting.description : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "client.name",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Cliente" />
    ),
    meta: { title: "Cliente" },
    cell: ({ row }) => (
      <div className="flex justify-center font-bold">
        {row.original.client ? row.original.client.name : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "details",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Detalles" />
    ),
    meta: { title: "Detalles" },
    cell: ({ row }) => (
      <div className="flex justify-center font-bold">
        {row.original.details}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Estado" />
    ),
    meta: { title: "Estado" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.status}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "debt",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Deuda" />
    ),
    meta: { title: "Deuda" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.debt}
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
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Tipo" />
    ),
    meta: { title: "Tipo" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.type}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return <CreditDropdownActions credit={row.original} />;
    },
  },
];