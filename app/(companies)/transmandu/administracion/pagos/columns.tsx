"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";
import { FlightPayment } from "@/types";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale/es";
import Link from "next/link";
import FlightPaymentsDropdownActions from "@/components/misc/FlightPaymentsDropdownActions";
import ClientResumeDialog from "@/components/dialogs/ClientResumeDialog";
import FlightResumeDialog from "@/components/dialogs/FlightResumeDialog";

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
          {format(addDays(row.original.payment_date, 1), "PPP", {
            locale: es,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "client.name",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Cliente" />
    ),
    meta: { title: "Cliente" },
    cell: ({ row }) => <ClientResumeDialog client={row.original.client} />,
  },
  {
    accessorKey: "flights.details",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Vuelo" />
    ),
    meta: { title: "Vuelo" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <FlightResumeDialog id={row.original.flight.id.toString()} />
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
    accessorKey: "bank_account.name",
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
