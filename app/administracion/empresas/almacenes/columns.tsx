"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader"
import WarehouseDropdownActions from "@/components/misc/WarehouseDropdownActions"
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
      <DataTableColumnHeader filter column={column} title="Abrev." />
    ),
    cell: ({ row }) =>
      <>
        <span className='font-bold flex justify-center'>{row.original.name ?? "N/A"}</span>
      </>
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Nombre" />
    ),
    cell: ({ row }) =>
      <>
        <span className='text-muted-foreground flex justify-center italic'>{row.original.type}</span>
      </>
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="RIF" />
    ),
    cell: ({ row }) =>
      <>
        <span className="flex justify-center">{row.original.address}</span>
      </>
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Cod. INAC" />
    ),
    cell: ({ row }) =>
      <>
        <span className="flex justify-center font-medium">{row.original.company}</span>
      </>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <WarehouseDropdownActions id={id} />
      )
    },
  },
]
