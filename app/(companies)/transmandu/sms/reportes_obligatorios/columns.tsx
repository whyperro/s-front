"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";

import { Checkbox } from "@/components/ui/checkbox";
import { ObligatoryReport } from "@/types";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import ObligatoryReportDropdownActions from "@/components/misc/ObligatoryReportDropdownActions";
import { Badge } from "@/components/ui/badge";

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
    accessorKey: "incident_time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hora del suceso" />
    ),
    cell: ({ row }) => {
      const timeString = row.original.incident_time.toString();
      const parsedTime = parse(timeString, "HH:mm:ss", new Date());
      const incident_time = format(parsedTime, "HH:mm");
      return <p className="font-medium text-center">{incident_time} </p>;
    },
  },
  {
    accessorKey: "flight_time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hora del Vuelo" />
    ),
    cell: ({ row }) => {
      const timeString = row.original.flight_time.toString();
      const parsedTime = parse(timeString, "HH:mm:ss", new Date());
      const flight_time = format(parsedTime, "HH:mm");
      return <p className="font-medium text-center">{flight_time} </p>;
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
    accessorKey: "flight_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Numero de vuelo" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge
          className={`justify-center items-center text-center font-bold font-sans ${
            row.original.status === "CERRADO" ? "bg-green-400" : "bg-red-400"
          }`}
        >
          {row.original.status}
        </Badge>
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const obligatoryReport = row.original;
      return (
        <ObligatoryReportDropdownActions
          obligatoryReport={obligatoryReport}
        ></ObligatoryReportDropdownActions>
      );
    },
  },
];
