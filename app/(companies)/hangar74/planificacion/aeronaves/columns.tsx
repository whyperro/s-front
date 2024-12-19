"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react"

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"
import { Aircraft } from "@/types"

export const columns: ColumnDef<Aircraft>[] = [
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
    accessorKey: "serial",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="SERIAL" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-bold flex justify-center hover:scale-105 hover:text-blue-600 transition-all ease-in cursor-pointer duration-150">{row.original.serial}</p>
      )
    }
  },
  {
    accessorKey: "brand",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="FABRICANTE" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center font-medium">{row.original.brand}</p>
    )
  },
  {
    accessorKey: "acronym",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="ACRONYM" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center text-muted-foreground italic">{row.original.acronym}</p>
    )
  },
  {
    accessorKey: "aircraft_operator",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="OPERADOR" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center font-bold">{row.original.aircraft_operator}</p>
    )
  },
  {
    accessorKey: "owner",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="DUEÑO" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center font-bold">{row.original.owner}</p>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original
      return (
        <TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="flex gap-2 justify-center">
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Tooltip>
                  <TooltipTrigger>
                    <Trash2 className='size-5 text-red-500' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Eliminar</p>
                  </TooltipContent>
                </Tooltip>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Tooltip>
                  <TooltipTrigger>
                    <SquarePen className="size-5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Editar
                  </TooltipContent>
                </Tooltip>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipProvider>
      )
    },
  },
]
