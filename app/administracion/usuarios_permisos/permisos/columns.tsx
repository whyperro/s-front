"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader"

import DropdownActions from "@/components/misc/DropdownActions"
import { Checkbox } from "@/components/ui/checkbox"
import { Permission } from "@/types"
import Image from "next/image"

export const columns: ColumnDef<Permission>[] = [
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
        // onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Etiqueta" />
    ),
    cell: ({row}) =>
      <>
          <span className='font-bold'>{row.original.label ?? "N/A"}</span>
      </>
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Nombre" />
    ),
    cell: ({row}) =>
      <>
          <span className='text-muted-foreground'>{row.original.name.toUpperCase()}</span>
      </>
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Compañia" />
    ),
    cell: ({row}) =>
      <>
          {row.original.modules.map((module) => (
            <div key={module.company.id} className="flex gap-2 items-center">
              {module.company.description}
              <Image src={module.company.name === 'TMD' ? "/LOGO_TRD.png" : "/logo.png"} width={100} height={100} alt="logo" className="w-[40px] h-[40px]" />
            </div>
          ))}
      </>
  },
  {
    accessorKey: "module",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Módulo" />
    ),
    cell: ({row}) =>
      <>
          <span>{row.original.modules.map((module) => (
            <div key={module.id}>{module.name}</div>
          ))}</span>
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
