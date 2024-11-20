"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader"

import CertificatesDialog from "@/components/dialogs/CertificatesDialog"
import ArticleDropdownActions from "@/components/misc/ArticleDropdownActions"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { IArticleByBatch } from "@/hooks/almacen/useGetArticlesByBatch"
import Image from "next/image"
import Link from "next/link"

export const columns: ColumnDef<IArticleByBatch>[] = [
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
      const imageUrl = row.original.image; // Asegúrate de tener imageUrl en tu objeto de datos
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={`/hangar74/almacen/inventario/gestion/${row.original.part_number}/${row.original.serial}`}
                className="font-medium flex justify-center hover:scale-105 hover:text-blue-600 transition-all ease-in cursor-pointer duration-150"
              >
                {row.original.serial}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              {imageUrl ? (
                <Image src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${imageUrl}`} alt={`Imagen del artículo ${row.original.serial}`} className="max-w-xs max-h-48" width={75} height={75} />
              ) : (
                <p>No hay imagen disponible</p>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
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
    accessorKey: "certificates",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Certificado(s)" />
    ),
    cell: ({ row }) => (
      <>
        {
          row.original.certificates?.length ? <CertificatesDialog serial={row.original.serial} certificates={row.original.certificates} /> : <p className="font-bold text-center">N/A</p>
        }
      </>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => {

      return (
        <ArticleDropdownActions id={row.original.id} part_number={row.original.part_number} serial={row.original.serial} />
      )
    },
  },
]
