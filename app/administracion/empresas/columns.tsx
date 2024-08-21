"use client"

import { ColumnDef } from "@tanstack/react-table"
 
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader"

import DropdownActions from "@/components/misc/DropdownActions"
import { Checkbox } from "@/components/ui/checkbox"
import { Company } from "@/types"

export const columns: ColumnDef<Company>[] = [
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
    cell: ({row}) =>
      <>
          <span className='font-bold'>{row.original.name ?? "N/A"}</span>
      </>
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Nombre" />
    ),
    cell: ({row}) =>
      <>
          <span className='text-muted-foreground'>{row.original.description.toUpperCase()}</span>
      </>
  },
  {
    accessorKey: "rif",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="RIF" />
    ),
    cell: ({row}) =>
      <>
          <span>{row.original.rif}</span>
      </>
  },
  {
    accessorKey: "cod_inac",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Cod. INAC" />
    ),
    cell: ({row}) =>
      <>
        <span>{row.original.cod_inac}</span>
      </>
  },
  {
    accessorKey: "fiscal_address",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Ubicación" />
    ),
    cell: ({row}) =>
      <>
        <span>{row.original.fiscal_address}</span>
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
