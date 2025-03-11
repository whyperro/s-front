"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";
import { FlightPayment } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import Link from "next/link";
import FlightPaymentsDropdownActions from "@/components/misc/FlightPaymentsDropdownActions";

export const columns: ColumnDef<FlightPayment>[] = [
  {
    accessorKey: "payment_date",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Fecha" />
    ),
    meta: { title: "Fecha" },
    cell: ({ row }) => {
      return (
        <p>
          {format(row.original.payment_date, "PPP", {
            locale: es,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Cliente" />
    ),
    meta: { title: "Nombre" },
    cell: ({ row }) => (
      <div className="flex justify-center font-bold">{row.original.client.name}</div>
    ),
  },
  {
    accessorKey: "flights",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Vuelo" />
    ),
    meta: { title: "Vuelo" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.flight.details}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "pay_method",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Metodo de Pago" />
    ),
    meta: { title: "Metodo de Pago" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.pay_method}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "bank_account",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Cuenta de Banco" />
    ),
    meta: { title: "Cuenta de Banco" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.bank_account ? row.original.bank_account.name : "N/A"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "pay_amount",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Monto Pagado" />
    ),
    meta: { title: "Monto Pagado" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.pay_amount}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "pay_description",
    header: ({ column }) => (
      <DataTableColumnHeader
        filter
        column={column}
        title="Descripción de Pago"
      />
    ),
    meta: { title: "Descrición de Pago" },
    cell: ({ row }) => (
      <div className="flex justify-center font-bold">
        {row.original.pay_description}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return <FlightPaymentsDropdownActions id={row.original.id.toString()} />;
    },
  },
];
