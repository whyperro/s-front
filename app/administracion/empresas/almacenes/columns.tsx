"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader"

import DropdownActions from "@/components/misc/DropdownActions"
import { Checkbox } from "@/components/ui/checkbox"
import { Warehouse } from "@/types"

export const columns: ColumnDef<Warehouse>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Identificador" />
    ),
    cell: ({row}) =>
      <>
          <span className='flex justify-center font-bold'>{row.original.name ?? "N/A"}</span>
      </>
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Locación" />
    ),
    cell: ({row}) =>
      <>
          <span className="flex justify-center">{row.original.address} - {row.original.type}</span>
      </>
  },
  {
    accessorKey: "company_name",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Compañia" />
    ),
    cell: ({row}) =>
      <>
          <span  className="flex justify-center font-medium">{row.original.company}</span>
      </>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <DropdownActions id={id} />
      )
    },
  },
]
