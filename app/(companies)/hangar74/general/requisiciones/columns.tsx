"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { Batch, Requisition } from "@/types"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import InTransitArticleDropdownActions from "@/components/misc/InTransitArticleDropdownActions"
import RequisitionsDropdownActions from "@/components/misc/RequisitionDropdownActions"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
interface BatchesWithCountProp extends Batch {
  article_count: number,
}

export const columns: ColumnDef<Requisition>[] = [
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
    accessorKey: "order_number",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Nro. Orden" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Link href={`/hangar74/general/requisiciones/${row.original.order_number}`} className="text-center font-bold">{row.original.order_number}</Link>
        </div>
      )
    }
  },
  {
    accessorKey: "justification",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Justificación" />
    ),
    cell: ({ row }) => (
      <p className="text-center flex justify-center text-muted-foreground italic">{row.original.justification}</p>
    )
  },
  {
    accessorKey: "requested_by",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Solicitado por" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center font-bold">{row.original.requested_by}</p>
    )
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const process = row.original.status === 'proceso'
      const aproved = row.original.status === 'aprobado'
      return (
        <Badge className={cn("flex justify-center", process ? "bg-yellow-500" : aproved ? "bg-green-500" : "bg-red-500")} > {row.original.status.toUpperCase()}</Badge >
      )
    }
  },
  {
    accessorKey: "submission_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de Creación" />
    ),
    cell: ({ row }) => (
      <p className="text-center">{format(row.original.submission_date, "PPP", { locale: es })}</p>
    )
  },
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Acciones" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <RequisitionsDropdownActions req={row.original} />
      </div>
    )
  },
]
