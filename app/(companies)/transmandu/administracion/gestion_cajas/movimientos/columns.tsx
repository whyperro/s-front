"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";
import { CashMovement } from "@/types";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale/es";
import CashMovementDropdownActions from "@/components/misc/CashMovementDropdownActions";
import BankAccountResumeDialog from "@/components/dialogs/BankAccountResumeDialog";
import CashResumeDialog from "@/components/dialogs/CashResumeDialog";
import { formatCurrencyJ, getCurrencySymbol } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
  //  {
  //    accessorKey: "company.name",
  //    header: ({ column }) => (
  //      <DataTableColumnHeader filter column={column} title="Empresa" />
  //    ),
  //    meta: { title: "Cliente" },
  //    cell: ({ row }) => <CompanyResumeDialog company={row.original.company} />,
  //  },
  //  {
  //    accessorKey: "type",
  //    header: ({ column }) => (
  //      <DataTableColumnHeader filter column={column} title="Ingreso/Egreso" />
  //    ),
  //    meta: { title: "Ingreso/Egreso" },
  //    cell: ({ row }) => (
  //      <div className="flex justify-center">
  //        <span className="text-muted-foreground italic">
  //          {row.original.type}
  //        </span>
  //      </div>
  //    ),
  //  },
  {
    accessorKey: "client.name",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Cliente" />
    ),
    meta: { title: "Cliente" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.client ? row.original.client.name : "N/A"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "vendor.name",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Proveedor" />
    ),
    meta: { title: "Proveedor" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-muted-foreground italic">
          {row.original.vendor ? row.original.vendor.name : "N/A"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "cash.name",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Caja" />
    ),
    meta: { title: "Caja" },
    cell: ({ row }) => <CashResumeDialog cash={row.original.cash} />,
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
  //  {
  //    accessorKey: "sub_category_details",
  //    header: ({ column }) => (
  //      <DataTableColumnHeader
  //        filter
  //        column={column}
  //        title="Detalles de Sub Categorías"
  //      />
  //    ),
  //    meta: { title: "Detalles de Sub Categorías" },
  //    cell: ({ row }) => (
  //      <div className="flex justify-center">
  //        <span className="text-muted-foreground italic">
  //          {row.original.sub_category_details}
  //        </span>
  //      </div>
  //    ),
  //  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Monto" />
    ),
    meta: { title: "Monto" },
    cell: ({ row }) => {
      const isIncome = row.original.type === "INCOME";
      const badgeVariant = isIncome ? "default" : "destructive";
      const formattedAmount = formatCurrencyJ(
        row.original.amount,
        row.original.cash.coin
      );

      return (
        <div className="flex justify-center">
          <Badge
            className={
              isIncome
                ? "bg-green-700 hover:bg-green-700"
                : "bg-red-700 hover:bg-red-700"
            }
            variant={badgeVariant}
          >
            {formattedAmount}
          </Badge>
        </div>
      );
    },
  },
  //  {
  //    accessorKey: "responsible.first_name",
  //    header: ({ column }) => (
  //      <DataTableColumnHeader filter column={column} title="Responsable" />
  //    ),
  //    meta: { title: "Responsable" },
  //    cell: ({ row }) => (
  //      <ResponsibleResumeDialog id={row.original.responsible.id.toString()} />
  //    ),
  //  },
  {
    accessorKey: "bank_account.name",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Cuenta de Banco" />
    ),
    meta: { title: "Cuenta de Banco" },
    cell: ({ row }) => {
      if (row.original.bank_account) {
        return (
          <BankAccountResumeDialog
            id={row.original.bank_account.id.toString()}
          />
        );
      } else {
        return (
          <p className="text-center italic font-medium cursor-pointer">
            Efectivo
          </p>
        );
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <CashMovementDropdownActions
          movement={row.original}
          id={row.original.id.toString()}
        />
      );
    },
  },
];
