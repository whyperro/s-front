"use client"

import { ColumnDef } from "@tanstack/react-table"
 
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import DropdownActions from "@/components/misc/DropdownActions"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { User } from "@/types"


export const columns: ColumnDef<User>[] = [
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
    accessorKey: "first_name",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Nombre" />
    ),
    cell: ({row}) =>
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><span className='number'>{row.original.first_name} {row.original.last_name}</span></TooltipTrigger>
            <TooltipContent>
              <Image src={'/kanye.png'} width={100} height={100} alt="Imagen referencial"/>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </>
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Usuario" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Email" />
    ),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({row}) => {
      const item = row.original

      return (
        <>
          {
            item.isActive.toString() === '1' ? <Badge className="bg-emerald-500">ACTIVO</Badge> : <Badge className="bg-rose-500">INACTIVO</Badge>
          }
        </>
      )
    }
  },
  {
    accessorKey: "roles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Roles" />
    ),
    cell: ({row}) => {
      const item = row.original
      return (
        <>
          {
            item.roles?.map((rol) => (
              <div className="flex gap-2" key={rol.id}>
                <Badge>{rol.name}</Badge>
              </div>
            ))
          }
        </>
      )
    },
  }, 
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <DropdownActions id={id.toString()} />
      )
    },
  },
]
  