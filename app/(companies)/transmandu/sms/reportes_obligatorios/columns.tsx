"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";

import { Checkbox } from "@/components/ui/checkbox";
import { ObligatoryReport } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";

export const columns: ColumnDef<ObligatoryReport>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "report_code",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Nro. de Reporte" />
    ),
    meta: { title: "Nro. de Reporte" },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">{row.original.report_code}</div>
      );
    },
  },
  {
    accessorKey: "report_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha del reporte" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {format(row.original.report_date, "PPP", {
            locale: es,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "incident_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha del suceso" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {format(row.original.incident_date, "PPP", {
            locale: es,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "incident_time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hora del suceso" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {format(row.original.incident_date, "HH:mm", {
            locale: es,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "pilot",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Datos del piloto" />
    ),
    cell: ({ row }) => {
      return <p className="font-medium text-center"></p>;
    },
  },
  {
    accessorKey: "copilot",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Datos del copiloto" />
    ),
    cell: ({ row }) => {
      return <p className="font-medium text-center"></p>;
    },
  },
  {
    accessorKey: "flight_time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hora de vuelo" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {format(row.original.flight_time, "HH:mm", {
            locale: es,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "aircraft_acronym",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Matricula de la aereonave"
      />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {row.original.aircraft_acronym}
        </p>
      );
    },
  },
  {
    accessorKey: "flight_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Numero de vuelo" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center text-muted-foreground italic">
        {row.original.flight_number}
      </p>
    ),
  },

  {
    accessorKey: "aircaft_model",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modelo de aereonave" />
    ),
    cell: ({ row }) => {
      return (
        <p className="flex justify-center text-muted-foreground italic">
          {row.original.aircraft_model}
        </p>
      );
    },
  },
  {
    accessorKey: "flight_origin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Origen del vuelo" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">{row.original.flight_origin}</div>
    ),
  },
  {
    accessorKey: "flight_destination",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Destino del vuelo" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.flight_destiny}
      </div>
    ),
  },
  {
    accessorKey: "alternate_destination",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Destino alterno del vuelo"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.flight_alt_destiny}
      </div>
    ),
  },
];
