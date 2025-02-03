"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";

import { Checkbox } from "@/components/ui/checkbox";
import { MitigationPlan } from "@/types";
import Link from "next/link";

export const columns: ColumnDef<MitigationPlan>[] = [
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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Nro. de Reporte" />
    ),
    meta: { title: "Nro. de Plan de mitigacion" },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Link
            href={`/hangar74/compras/cotizaciones/${row.original.id}`}
            className="font-bold text-center hover:italic hover:scale-110 transition-all"
          >
            {row.original.id}
          </Link>
        </div>
      );
    },
  },

  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lugar del suceso" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">{row.original.description}</p>
      );
    },
  },
  {
    accessorKey: "measures",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Datos del piloto" />
    ),
    cell: ({ row }) => {
      const measure = row.original.measures;
      return <></>;
    },
  },
];
