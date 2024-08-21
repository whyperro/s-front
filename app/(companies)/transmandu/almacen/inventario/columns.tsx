"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ClipboardCheck, MoreHorizontal, SquarePen, Trash2 } from "lucide-react"
 
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


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Item = {
  name: string
  description: string
  serial: string
  quantity: number
}

export const columns: ColumnDef<Item>[] = [
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
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripcion" />
    ),
  },
  {
    accessorKey: "serial",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Serial" />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cantidad" />
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ubicacion" />
    ),
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
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(item.name)}
              >
                <Tooltip>
                  <TooltipTrigger>
                    <ClipboardCheck className="size-5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copiar</p>
                  </TooltipContent>
                </Tooltip>
              </DropdownMenuItem>
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
