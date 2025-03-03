"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";
import { Flights } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import FlightDropdownActions from "@/components/misc/FlightDropdownActions";

export const columns: ColumnDef<Flights>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Fecha" />
    ),
    meta: { title: "Fecha" },
    cell: ({ row }) => {
      return (
        <p>
          {format(row.original.date, "PPP", {
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
    accessorKey: "route",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Ruta" />
    ),
    meta: { title: "Ruta" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.route.from} - {row.original.route.to}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "aircraft",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Avion" />
    ),
    meta: { title: "Avion" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.aircraft ? row.original.aircraft.acronym : "N/A"}
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
    accessorKey: "fee",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Tasa" />
    ),
    meta: { title: "Tasa" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">{row.original.fee}</span>
      </div>
    ),
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Precio a Cobrar" />
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
    accessorKey: "payed_amount",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Total Pagado" />
    ),
    meta: { title: "Total Pagado" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.payed_amount}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "debt_status",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Estado Actual" />
    ),
    meta: { title: "Estado actual" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.debt_status}
        </span>
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
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return <FlightDropdownActions id={row.original.id.toString()} />;
    },
  },
];
