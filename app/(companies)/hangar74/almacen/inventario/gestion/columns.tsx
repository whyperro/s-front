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
import { Batch } from "@/types"
import { redirect, useRouter } from "next/navigation"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
interface BatchesWithCountProp extends Batch {
  article_count: number,
}

export const columns: ColumnDef<BatchesWithCountProp>[] = [
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
    accessorKey: "part_number",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="N° de Parte" />
    ),
    cell: ({ row }) => {
      return (
        <p onClick={() => redirect(`/hangar74/almacen/inventario/gestion/${row.original.part_number}`)} className="font-medium flex justify-center hover:scale-105 hover:text-blue-600 transition-all ease-in cursor-pointer duration-150">{row.original.part_number}</p>
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
    accessorKey: "ata_code",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Código ATA" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center">{row.original.ata_code}</p>
    )
  },
  {
    accessorKey: "min_quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cantidad Mínima" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center">{row.original.min_quantity}<span className="font-bold">{row.original.medition_unit}</span></p>
    )
  },
  {
    accessorKey: "article_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cantidad de Stock" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center">{row.original.article_count}</p>
    )
  },
  {
    accessorKey: "warehouse_name",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Ubicacion" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center font-medium">{row.original.warehouse_name}</p>
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
                onClick={() => navigator.clipboard.writeText(item.alternative_part_number)}
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
