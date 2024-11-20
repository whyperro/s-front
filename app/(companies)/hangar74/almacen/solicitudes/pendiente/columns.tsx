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
import { DispatchRequest } from "@/types"
import DispatchArticlesDialog from "@/components/dialogs/DispatchArticlesDialog"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import PendingDispatchRequestDropdownActions from "@/components/misc/PendingDispatchRequestDropdownActions"

export const columns: ColumnDef<DispatchRequest>[] = [
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
    accessorKey: "requested_by",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Empleado Responsable" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">{row.original.requested_by}</p>
      )
    }
  },
  {
    accessorKey: "justification",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Justificación" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">{row.original.justification}</p>
      )
    }
  },
  {
    accessorKey: "destination_place",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Justificación" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">{row.original.destination_place}</p>
      )
    }
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center text-muted-foreground italic">{format(row.original.submission_date, "PPP", {
        locale: es
      })}</p>
    )
  },
  {
    accessorKey: "articles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Articulos" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <DispatchArticlesDialog articles={row.original.articles} work_order={row.original.work_order?.order_number!} />
      </div>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original

      return (
        <PendingDispatchRequestDropdownActions id={row.original.id} />
      )
    },
  },
]
