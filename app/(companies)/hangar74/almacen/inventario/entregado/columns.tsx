"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ClipboardCheck, IterationCw, MoreHorizontal, SquarePen, Trash2 } from "lucide-react"

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
import { DispachedArticles } from "@/hooks/almacen/useGetDispatchedArticles"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { ReturnWarehouseDialog } from "@/components/dialogs/ReturnWarehouseDialog"


export const columns: ColumnDef<DispachedArticles>[] = [
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
    accessorKey: "work_order",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Ord. de Trabajo" />
    ),
    cell: ({ row }) => {
      return (
        <>
          {row.original.work_order ? <Link href={`/hangar74/planificacion/ordenes_trabajo/${row.original.work_order.order_number}`} className="font-medium flex justify-center hover:scale-105 hover:text-blue-600 transition-all ease-in cursor-pointer duration-150">{row.original.work_order.order_number}</Link> : <p className="font-bold text-center">N/A</p>}
        </>
      )
    }
  },
  {
    accessorKey: "part_number",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Nro. de Parte" />
    ),
    cell: ({ row }) => {
      return (
        <Link href={`/hangar74/almacen/inventario/gestion/${row.original.part_number}`} className="font-medium flex justify-center hover:scale-105 hover:text-blue-600 transition-all ease-in cursor-pointer duration-150">{row.original.part_number}</Link>
      )
    }
  },
  {
    accessorKey: "serial",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Serial" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center text-muted-foreground italic">{row.original.articles[0].serial}</p>
    )
  },
  {
    accessorKey: "justification",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Justificación" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center">{row.original.justification}</p>
    )
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoría" />
    ),
    cell: ({ row }) => (
      <p className="text-center font-medium italic">{row.original.category.toUpperCase()}</p>
    )
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de Salida" />
    ),
    cell: ({ row }) => (
      <p>{format(row.original.date, "PPP", {
        locale: es
      })}</p>
    )
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Devolver" />
    ),
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex justify-center items-center">
              <ReturnWarehouseDialog serial={row.original.articles[0].serial} id={row.original.articles[0].id} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Devolver a Almacén</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
]