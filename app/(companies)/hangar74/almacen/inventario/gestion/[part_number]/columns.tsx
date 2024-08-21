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
import { Article } from "@/types"
import { redirect, useRouter } from "next/navigation"

export const columns: ColumnDef<Article>[] = [
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
      <DataTableColumnHeader filter column={column} title="Serial" />
    ),
    cell: ({ row }) => {
      return (
        <p onClick={() => redirect(`/hangar74/almacen/inventario/gestion/${row.original.serial}`)} className="font-medium flex justify-center hover:scale-105 hover:text-blue-600 transition-all ease-in cursor-pointer duration-150">{row.original.serial}</p>
      )
    }
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Descripción" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center text-muted-foreground">{row.original.description}</p>
    )
  },
  {
    accessorKey: "condition",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Condición" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center">{row.original.condition}</p>
    )
  },
  {
    accessorKey: "zone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Zona de Ubicación" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center">{row.original.zone}</p>
    )
  },
  {
    accessorKey: "brand",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Marca" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center">{row.original.brand}</p>
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
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(item.serial!)}
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
