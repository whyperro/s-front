"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";
import { Aircraft } from "@/types";

export const columns: ColumnDef<Aircraft>[] = [
  {
    accessorKey: "client_id",
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
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Location" />
    ),
    meta: { title: "Location" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.location.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "fabricant",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Fabricante" />
    ),
    meta: { title: "Fabricante" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.fabricant}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Marca" />
    ),
    meta: { title: "Marca" },
    cell: ({ row }) => (
      <div className="flex justify-center font-bold">{row.original.brand}</div>
    ),
  },
  {
    accessorKey: "serial",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Serial" />
    ),
    meta: { title: "Serial" },
    cell: ({ row }) => (
      <div className="flex justify-center font-bold">{row.original.serial}</div>
    ),
  },
  {
    accessorKey: "acronym",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Placa" />
    ),
    meta: { title: "Placa" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.acronym}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "flight_hours",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Horas de Vuelo" />
    ),
    meta: { title: "Horas de Vuelo" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.flight_hours}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "cycles",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Ciclos" />
    ),
    meta: { title: "Ciclos" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.cycles}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "fabricant_date",
    header: ({ column }) => (
      <DataTableColumnHeader
        filter
        column={column}
        title="Fecha de Fabricación"
      />
    ),
    meta: { title: "Fecha de Fabricación" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.fabricant_date}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "owner",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Dueño" />
    ),
    meta: { title: "Estado actual" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.owner}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "aircraft_operator",
    header: ({ column }) => (
      <DataTableColumnHeader
        filter
        column={column}
        title="Operadora de Aviones"
      />
    ),
    meta: { title: "Operadora de Aviones" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.aircraft_operator}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "type_engine",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Tipo de Motor" />
    ),
    meta: { title: "Tipo de Motor" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.type_engine}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "number_engine",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Número de Motor" />
    ),
    meta: { title: "Número de Motor" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.number_engine}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "coments",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Comentarios" />
    ),
    meta: { title: "Comentarios" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.comments}
        </span>
      </div>
    ),
  },
];
