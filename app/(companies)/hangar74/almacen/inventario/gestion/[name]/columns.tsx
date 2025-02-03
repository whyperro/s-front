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
import { Badge } from "@/components/ui/badge"

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
            <TooltipTrigger className="w-full flex justify-center">
              <p className="font-medium italic text-center">
                {row.original.serial ?? "N/A"}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              {imageUrl ? (
                <Image src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${imageUrl}`} alt={`Imagen del artículo ${row.original.serial}`} className="max-w-xs max-h-48" width={75} height={75} />
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
    accessorKey: "part_number",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Nro. de Parte" />
    ),
    meta: { title: "Nro. Parte" },
    cell: ({ row }) => (
      <p className="flex justify-center text-muted-foreground">
        {row.original.part_number}
      </p>
    ),
    filterFn: (row, columnId, filterValue) => {
      const partNumber = row.original.part_number?.toLowerCase() ?? "";
      const altPartNumber = row.original.alternate_part_number?.toLowerCase() ?? "";
      const filter = filterValue.toLowerCase();
      return partNumber.includes(filter) || altPartNumber.includes(filter);
    },
  },
  {
    accessorKey: "alternate_part_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nro. de Parte Alterno" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center text-muted-foreground">
        {row.original.alternate_part_number ?? "N/A"}
      </p>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripción" />
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
      <p className="flex justify-center font-bold">{row.original.condition}</p>
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
      <DataTableColumnHeader column={column} title="Marca" />
    ),
    cell: ({ row }) => (
      <p className="flex justify-center text-muted-foreground italic">{row.original.manufacturer}</p>

    )
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cantidad" />
    ),
    cell: ({ row }) => {
      const { quantity, consumable } = row.original;

      return (
        <div className="flex justify-center">
          <Badge className={quantity <= 0 ? "bg-yellow-500" : "bg-green-500"}>
            {quantity} {`${consumable?.convertions[0]?.unit?.label ?? "N/A"}`}
          </Badge>
        </div>
      );
    },
    enableHiding: true, // Permite ocultar esta columna si no aplica.
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => (
      <Badge className={row.original.status === 'InUse' ? "bg-yellow-500" : "bg-green-500"}>{row.original.status === 'InUse' ? "En Uso" : "En Almc."}</Badge>
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
        <ArticleDropdownActions id={row.original.id} serial={row.original.serial} part_number={row.original.part_number} />
      )
    },
  },
]
