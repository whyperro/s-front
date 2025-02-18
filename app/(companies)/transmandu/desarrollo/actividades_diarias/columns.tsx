"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader"

import { Activity, ActivityReports } from "@/types"
import { format } from "date-fns"
import { Checkbox } from "@radix-ui/react-checkbox"
import { es } from "date-fns/locale"


export const columns: ColumnDef<ActivityReports>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Seleccionar todos"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Seleccionar fila"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => (
      <p className="font-medium text-center">{format(row.original.date, "PPP", {
        locale: es
      })}</p>
    )
  },
  {
    accessorKey: "employee",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Empleado Responsable" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">{`${row.original.employee.first_name} ${row.original.employee.last_name}`}</p>
      )
    }
  },
  {
    accessorKey: "total_activities",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total de Actividades" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">{row.original.activities.length}</p>
      )
    }
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Acciones" />
    ),
    cell: ({ row }) => {
      return (
        <></>
      )
    },
  },
]
