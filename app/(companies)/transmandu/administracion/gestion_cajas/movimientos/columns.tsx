"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";
import { CashMovement } from "@/types";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale/es";
import CashMovementDropdownActions from "@/components/misc/CashMovementDropdownActions";

export const columns: ColumnDef<CashMovement>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Fecha" />
    ),
    meta: { title: "Fecha" },
    cell: ({ row }) => {
      return (
        <p>
          {format(addDays(row.original.date, 1), "PPP", {
            locale: es,
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Empresa" />
    ),
    meta: { title: "Empresa" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.company.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "income_or_outcome",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Ingreso/Egreso" />
    ),
    meta: { title: "Ingreso/Egreso" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.income_or_output}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "cash",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Caja" />
    ),
    meta: { title: "Caja" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.cash.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "account",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Cuenta" />
    ),
    meta: { title: "Cuenta" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.account}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Categoría" />
    ),
    meta: { title: "Categoría" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.category}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "sub_category",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Sub Categoría" />
    ),
    meta: { title: "Sub Categoría" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.sub_category}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "sub_category_details",
    header: ({ column }) => (
      <DataTableColumnHeader
        filter
        column={column}
        title="Detalles de Sub Categorías"
      />
    ),
    meta: { title: "Detalles de Sub Categorías" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.sub_category_details}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Monto Total" />
    ),
    meta: { title: "Monto Total" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.amount}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "responsible",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Responsable" />
    ),
    meta: { title: "Responsable" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.responsible.first_name}{" "}
          {row.original.responsible.first_name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "vendor",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Beneficiario" />
    ),
    meta: { title: "Beneficiario" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.vendor ? row.original.vendor.name : "N/A"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "bank_account",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Cuenta de Banco" />
    ),
    meta: { title: "Cuenta de Banco" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground flex justify-center italic">
          {row.original.bank_account.name}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <CashMovementDropdownActions
          movement={row.original}
          id={row.original.id.toString()}
        />
      );
    },
  },
];
