"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";

import { Checkbox } from "@/components/ui/checkbox";
import { VoluntaryReport } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import VoluntaryReportDropdownActions from "@/components/misc/VoluntaryReportDropDownMenu";

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
            {row.original.report_number ?? "N/A"}
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
    accessorKey: "danger_area",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Area de identificacion" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">{row.original.danger_area}</p>
      );
    },
  },
  {
    accessorKey: "danger_location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Localización del peligro" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {row.original.danger_location}
        </p>
      );
    },
  },

  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripcion del peligro" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">{row.original.description}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const voluntaryReport = row.original;
      return <VoluntaryReportDropdownActions voluntaryReport={voluntaryReport} />;
    },
  },
];
