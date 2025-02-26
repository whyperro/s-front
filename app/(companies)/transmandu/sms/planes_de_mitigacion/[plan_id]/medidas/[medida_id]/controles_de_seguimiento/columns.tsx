"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";

import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { FollowUpControl, MitigationMeasure, MitigationTable } from "@/types";
import MitigationPlanPage from "./page";
import MitigationTableDropdownActions from "@/components/misc/MitigationTableDropdownActions";
import { useState } from "react";
import MitigationMeasureList from "@/components/misc/MitigationMeasureList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import FollowUpControlTableDropdownActions from "@/components/misc/FollowUpControlDropdownActions";
import FollowUpControlDropdownActions from "@/components/misc/FollowUpControlDropdownActions";

export const columns: ColumnDef<FollowUpControl>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Control" />
    ),
    meta: { title: "Numero de Control" },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">{row.original.id}</div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Descripcion" />
    ),
    meta: { title: "Descripcion" },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">{row.original.description}</div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader filter column={column} title="Fecha del Control" />
    ),
    meta: { title: "Fecha de Control" },
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {format(row.original.date, "PPP", {
            locale: es,
          })}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const FollowUpControl = row.original;
      return (
        <FollowUpControlDropdownActions
          followUpControl={FollowUpControl}
        />
      );
    },
  },
];

/*
 {followUpControls ? (
              <Dialog>
                <DialogTrigger>Controles de Seguimineto</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogDescription>
                      Controles de Seguimineto de las Medidas
                    </DialogDescription>
                  </DialogHeader>

                  <ul>
                    {followUpControls.map((control, index) => (
                      <li key={control.id}>
                        {++index} ) {control.description}
                      </li>
                    ))}
                  </ul>

                  <div className=" flex justify-end">
                    <Button className="w-1/3">Ver mas</Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <p>Sin Controles Disponibles</p>
            )}
*/
