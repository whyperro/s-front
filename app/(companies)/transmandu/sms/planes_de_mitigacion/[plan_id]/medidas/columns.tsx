"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/DataTableHeader";

import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { MitigationMeasure, MitigationTable } from "@/types";
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
import useCurrentPath from "@/hooks/sms/currentPath";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import MitigationMeasureDropdownActions from "@/components/misc/MitigationMeasuresDropDownActions";

export const columns: ColumnDef<MitigationMeasure>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader
        filter
        column={column}
        title="Descripcion de la Medida"
      />
    ),
    meta: { title: "Descripcion de la Medida" },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col justify-center text-center">
          {row.original.description}
        </div>
      );
    },
  },
  {
    accessorKey: "implementation_responsible",
    header: ({ column }) => (
      <DataTableColumnHeader
        filter
        column={column}
        title="Encargado de Implementacion"
      />
    ),
    meta: { title: "Encargado de Implementacion" },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          {row.original.implementation_responsible}
        </div>
      );
    },
  },

  {
    accessorKey: "implementation_supervisor",
    header: ({ column }) => (
      <DataTableColumnHeader
        filter
        column={column}
        title="Supervisor de Implemetacion"
      />
    ),
    meta: { title: "Supervisor de Implementacion" },
    cell: ({ row }) => {
      return (
        <p className="font-medium text-center">
          {row.original.implementation_supervisor}
        </p>
      );
    },
  },
  {
    accessorKey: "followUpControl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Controles de Seguimiento" />
    ),
    cell: ({ row }) => {
      const followUpControls = row.original.follow_up_control;
      const measureId = row.original.id;
      const currentPath = useCurrentPath();
      const [openControls, setOpenControls] = useState(false);
      return (
        <>
          <div className="flex flex-col justify-center h-10 bg-blue-300 rounded-full">
            {followUpControls.length ? (
              <Dialog>
                <DialogTrigger className="font-semibold">
                  Controles de Seguimiento
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogDescription className="font-semibold text-blac">
                      Controles de Seguimiento de las Medidas
                    </DialogDescription>
                  </DialogHeader>

                  <div className="border rounded-lg p-4 shadow-md">
                    <ul>
                      {followUpControls.map((control, index) => (
                        <li key={control.id} className="mb-2">
                          <ul className="font-semibold">
                            {++index} ) {control.description}
                          </ul>
                          <ul className="text-sm text-gray-600">
                            <p className="font-medium text-left">
                              {format(control.date, "PPP", {
                                locale: es,
                              })}
                            </p>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`${currentPath}/${measureId}/controles_de_seguimiento`}
                  >
                    <div className="flex justify-end mt-4">
                      <Button className="w-1/3">Ver mas</Button>
                    </div>
                  </Link>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="flex flex-col justify-center text-center">
                Sin Controles Disponibles
              </div>
            )}
          </div>
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const MitigationMeasure = row.original;
      return (
        <MitigationMeasureDropdownActions
          mitigationMeasure={MitigationMeasure}
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
