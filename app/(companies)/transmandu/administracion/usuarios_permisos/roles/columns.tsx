"use client"

import { ColumnDef } from "@tanstack/react-table"

import DropdownActions from "@/components/misc/DropdownActions"
import PermissionsDialog from "@/components/dialogs/PermissionsDialog"
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Role } from "@/types"
import Image from "next/image"



export const columns: ColumnDef<Role>[] = [
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
    cell: ({row}) =>
      <>
          <Badge>{row.original.name}</Badge>
      </>
  },
  {
    accessorKey: "permissions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Permisos" />
    ),
    cell: ({row}) =>
      <>
        <PermissionsDialog roleName={row.original.name} permissions={row.original.permissions} />
      </>
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Compañia" />
    ),
    cell: ({row}) =>
      <p>{row.original.company.map((c) => <div className="flex gap-2 items-center"><p className="text-muted-foreground">{c.description}</p> <Image src={c.name === 'TMD' ? "/LOGO_TRD.png" : "/logo.png"} width={100} height={100} alt="logo" className="w-[40px] h-[40px]" /></div>)}</p>
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
