"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";
import { CashMovement } from "@/types";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale/es";
import CashMovementDropdownActions from "@/components/misc/CashMovementDropdownActions";
import CompanyResumeDialog from "@/components/dialogs/AdministrationCompanyResumeDialog";
import ResponsibleResumeDialog from "@/components/dialogs/ResponsibleResumeDialog";
import BankAccountResumeDialog from "@/components/dialogs/BankAccountResumeDialog";
import CashResumeDialog from "@/components/dialogs/CashResumeDialog";

// Función auxiliar para obtener el símbolo de la moneda
const getCurrencySymbol = (coinType: string) => {
  switch(coinType) {
    case "DOLARES": return "$";
    case "EUROS": return "€";
    case "BOLIVARES": return "Bs.";
    default: return "";
  }
};

// Función para determinar si solo hay ingresos o solo egresos
const getColumnVisibility = (data: CashMovement[]) => {
  const hasIngreso = data.some((movement) => movement.type === "INCOME");
  const hasEgreso = data.some((movement) => movement.type === "OUTPUT");

  return {
    showCliente: hasIngreso, // Mostrar columna "Cliente" si hay al menos un ingreso
    showBeneficiario: hasEgreso, // Mostrar columna "Beneficiario" si hay al menos un egreso
  };
};

// Definir las columnas dinámicamente
export const getColumns = (data: CashMovement[]): ColumnDef<CashMovement>[] => {
  const { showCliente, showBeneficiario } = getColumnVisibility(data);

  const baseColumns: ColumnDef<CashMovement>[] = [
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
      accessorKey: "company.name",
      header: ({ column }) => (
        <DataTableColumnHeader filter column={column} title="Empresa" />
      ),
      meta: { title: "Cliente" },
      cell: ({ row }) => <CompanyResumeDialog company={row.original.company} />,
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader filter column={column} title="Ingreso/Egreso" />
      ),
      meta: { title: "Ingreso/Egreso" },
      cell: ({ row }) => (
        <div className="flex justify-center">
          <span className="text-muted-foreground italic">
            {row.original.type}
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
        <DataTableColumnHeader filter column={column} title="Monto" />
      ),
      meta: { title: "Monto" },
      cell: ({ row }) => (
        <div className="flex justify-center">
          <span className="text-muted-foreground italic">
            {row.original.amount } {getCurrencySymbol(row.original.cash.coin)}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "responsible.first_name",
      header: ({ column }) => (
        <DataTableColumnHeader filter column={column} title="Responsable" />
      ),
      meta: { title: "Responsable" },
      cell: ({ row }) => (
        <ResponsibleResumeDialog id={row.original.responsible.id.toString()} />
      ),
    },
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
            <p className="text-center italic font-medium cursor-pointer">Efectivo</p>
          );
        }
      },
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

  // Añadir columna "Cliente" si es necesario
  if (showCliente) {
    baseColumns.splice(3, 0, {
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
    });
  }

  // Añadir columna "Beneficiario" si es necesario
  if (showBeneficiario) {
    baseColumns.splice(4, 0, {
      accessorKey: "vendor.name",
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
    });
  }

  return baseColumns;
};
