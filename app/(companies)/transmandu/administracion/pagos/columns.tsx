"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";
import { FlightPayments } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import FlightDropdownActions from "@/components/misc/FlightDropdownActions";

export const columns: ColumnDef<FlightPayments>[] = [
  {
    accessorKey: "bank_acount",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Cuenta de Banco" />
    ),
    meta: { title: "Cuenta de Banco" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.bank_acount}
        </span>
      </div>
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
          {row.original.flights.aircraft.serial}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Cliente" />
    ),
    meta: { title: "Cliente" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.client.name}
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
    accessorKey: "payment_date",
    header: "Fecha",
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
    accessorKey: "pay_description",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Descripción de Pago" />
    ),
    meta: { title: "Descrición de Pago" },
    cell: ({ row }) => (
      <div className="flex justify-center font-bold">
        {row.original.pay_description}
      </div>
    ),
  },
];
