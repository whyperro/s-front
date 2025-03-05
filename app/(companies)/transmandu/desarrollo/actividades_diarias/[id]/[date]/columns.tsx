"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader"

import { Activity } from "@/types"
import { format } from "date-fns"
import { Checkbox } from "@radix-ui/react-checkbox"
import { es } from "date-fns/locale"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "react-day-picker"
import { MoreVertical } from "lucide-react"
import ActivityDropdownActions from "@/components/misc/ActivityDropdownActions"

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actividad" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">{`${row.original.description}`}</p>
      )
    }
  },
  {
    accessorKey: "start_hour",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hora de Inicio" />
    ),
    cell: ({ row }) => (
      <p className="font-medium text-center ml-[2px]">{`${row.original.initial_hour}`}</p> // Ajuste de margen
    )
  },
  {
    accessorKey: "final_hour",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hora de Finalizacion" />
    ),
    cell: ({ row }) => (
      <p className="font-medium text-center">{`${row.original.final_hour}`}</p> // Ajuste de margen
    )
  },
  {
    accessorKey: "result",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Resultados" />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center ml-[2px]">{row.original.result}</p> // Ajuste de margen
      )
    }
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Acciones" />
    ),
    cell: ({ row }) => {
      return (
        <ActivityDropdownActions id={row.original.id!} />
      );
    },
  },
]
