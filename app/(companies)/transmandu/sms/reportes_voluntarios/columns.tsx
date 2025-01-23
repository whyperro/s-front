"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";

import QuoteDropdownActions from "@/components/misc/QuoteDropdownActions";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { VoluntaryReport } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";

export const columns: ColumnDef<VoluntaryReport>[] = [
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
    accessorKey: "report_number",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Nro. de Reporte" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Link
            href={`/hangar74/compras/cotizaciones/${row.original.report_number}`}
            className="font-bold text-center hover:italic hover:scale-110 transition-all"
          >
            {row.original.report_number}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "incident_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha del Incidente" />
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
    accessorKey: "affected_area",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Aeronave" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">{row.original.affected_area}</p>
      );
    },
  },
  {
    accessorKey: "hazard_location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Localización del peligro" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {row.original.hazard_location}
        </p>
      );
    },
  },

  {
    accessorKey: "hazard_description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripcion del peligro" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.hazard_description}
      </div>
    ),
  },
];
