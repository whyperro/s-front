"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";
import { Renting } from "@/types";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale/es";
import RentingDropdownActions from "@/components/misc/RentingDropdownActions";
import ClientResumeDialog from "@/components/dialogs/ClientResumeDialog";
import { Badge } from "@/components/ui/badge";

// Función para determinar qué columnas mostrar basado en el dato type
const getColumnVisibility = (data: Renting[]) => {
  const hasAeronave = data.some((item) => item.type === "AERONAVE");
  const hasArticulo = data.some((item) => item.type === "ARTICULO");

  return {
    showAeronave: hasAeronave,
    showArticulo: hasArticulo,
  };
};

// Función principal para obtener las columnas
export const getRentingColumns = (data: Renting[]): ColumnDef<Renting>[] => {
  const { showAeronave, showArticulo } = getColumnVisibility(data);

  // Columnas base (siempre visibles)
  const baseColumns: ColumnDef<Renting>[] = [
    {
      accessorKey: "start_date",
      header: ({ column }) => (
        <DataTableColumnHeader filter column={column} title="Fecha inicio" />
      ),
      meta: { title: "Fecha inicio" },
      cell: ({ row }) => (
        <p>
          {format(addDays(row.original.start_date, 1), "PPP", { locale: es })}
        </p>
      ),
    },
    {
      accessorKey: "end_date",
      header: ({ column }) => (
        <DataTableColumnHeader filter column={column} title="Fecha fin" />
      ),
      meta: { title: "Fecha fin" },
      cell: ({ row }) => {
        if (!row.original.end_date) return <p>No especificado</p>;
        return (
          <p>
            {format(addDays(row.original.end_date, 1), "PPP", { locale: es })}
          </p>
        );
      },
    },
    {
      accessorKey: "deadline",
      header: ({ column }) => (
        <DataTableColumnHeader filter column={column} title="Fecha Límite" />
      ),
      meta: { title: "Fecha Límite" },
      cell: ({ row }) => (
        <p>
          {format(addDays(row.original.deadline, 1), "PPP", { locale: es })}
        </p>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader filter column={column} title="Estado" />
      ),
      meta: { title: "Estado" },
      cell: ({ row }) => {
        const status = row.original.status;
        const backgroundColor =
          status === "EN PROCESO" ? "bg-yellow-500" : "bg-green-500";
  
        return (
          <div>
            <div className="flex justify-center">
              <Badge className={backgroundColor}>
                {row.original.status}
              </Badge>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "client.name",
      header: ({ column }) => (
        <DataTableColumnHeader filter column={column} title="Cliente" />
      ),
      meta: { title: "Cliente" },
      cell: ({ row }) => <ClientResumeDialog client={row.original.client} />,
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader filter column={column} title="Tipo" />
      ),
      meta: { title: "Tipo" },
      cell: ({ row }) => (
        <div className="flex justify-center">
          <span className="text-muted-foreground italic">
            {row.original.type}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader filter column={column} title="Precio" />
      ),
      meta: { title: "Precio" },
      cell: ({ row }) => (
        <div className="flex justify-center">
          <span className="text-muted-foreground italic">
            {row.original.price} $
          </span>
        </div>
      ),
    },
    {
      accessorKey: "payed_amount",
      header: ({ column }) => (
        <DataTableColumnHeader filter column={column} title="Monto Pagado" />
      ),
      meta: { title: "Monto Pagado" },
      cell: ({ row }) => (
        <div className="flex justify-center">
          <span className="text-muted-foreground italic">
            {row.original.payed_amount}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader filter column={column} title="Descripción" />
      ),
      meta: { title: "Descripción" },
      cell: ({ row }) => (
        <div className="flex justify-center">
          <span className="text-muted-foreground italic">
            {row.original.description}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => <RentingDropdownActions rent={row.original} />,
    },
  ];

  // Columnas condicionales
  const conditionalColumns: ColumnDef<Renting>[] = [];

  // Columna de artículo (si hay artículos)
  if (showArticulo) {
    conditionalColumns.push({
      accessorKey: "article.name",
      header: ({ column }) => (
        <DataTableColumnHeader filter column={column} title="Artículo" />
      ),
      meta: { title: "Artículo" },
      cell: ({ row }) => (
        <div className="flex justify-center">
          <span className="text-muted-foreground italic">
            {row.original.article
              ? `${row.original.article.name}-${row.original.article.serial}`
              : "N/A"}
          </span>
        </div>
      ),
    });
  }

  // Columna de aeronave (si hay aeronaves)
  if (showAeronave) {
    conditionalColumns.push({
      accessorKey: "aircraft.acronym",
      header: ({ column }) => (
        <DataTableColumnHeader filter column={column} title="Aeronave" />
      ),
      meta: { title: "Aeronave" },
      cell: ({ row }) => (
        <div className="flex justify-center">
          <span className="text-muted-foreground italic">
            {row.original.aircraft ? row.original.aircraft.acronym : "N/A"}
          </span>
        </div>
      ),
    });
  }

  // Insertar las columnas condicionales en la posición deseada
  return [
    ...baseColumns.slice(0, 8),
    ...conditionalColumns,
    ...baseColumns.slice(8),
  ];
};

// Exportar las columnas base para otros usos si es necesario
export const baseRentingColumns = [
  // ... columnas base sin las condicionales
];