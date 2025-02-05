"use client"

import WarehouseDropdownActions from "@/components/misc/WarehouseDropdownActions"
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader"
import { Checkbox } from "@/components/ui/checkbox"
import { Bank } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Bank>[] = [
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
      <DataTableColumnHeader filter column={column} title="Nombre" />
    ),
    meta: { title: 'Nombre' },
    cell: ({ row }) =>
      <>
        <span className='font-bold flex justify-center'>{row.original.name ?? "N/A"}</span>
      </>
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo de Banco" />
    ),
    meta: { title: 'Tipo de Banco' },
    cell: ({ row }) =>
      <>
        <span className='text-muted-foreground flex justify-center italic'>{row.original.type}</span>
      </>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <WarehouseDropdownActions id={id.toString()} />
      )
    },
  },
]
