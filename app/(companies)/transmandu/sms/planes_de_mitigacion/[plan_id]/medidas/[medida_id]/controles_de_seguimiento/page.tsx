"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";

import { Loader2 } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useParams } from "next/navigation";
import { useGetMeasureFollowUpControl } from "@/hooks/sms/useGetMeasureFollowUpControl";

type Params = {
  plan_id: string;
  medida_id: string;
};

const FollowUpControlPage = () => {
  const { plan_id, medida_id } = useParams<Params>();

  console.log(plan_id, medida_id);
  const {
    data: mitigationControl,
    isLoading,
    isError,
  } = useGetMeasureFollowUpControl(plan_id, medida_id);  
  return (
    <ContentLayout title="Medidas de Mitigacion">
      <div className="flex flex-col gap-y-2">
        {isLoading && (
          <div className="flex w-full h-full justify-center items-center">
            <Loader2 className="size-24 animate-spin mt-48" />
          </div>
        )}
        {mitigationControl && (
          <DataTable columns={columns} data={mitigationControl} />
        )}
        {isError && (
          <p className="text-sm text-muted-foreground">
            Ha ocurrido un error al cargar las medidas de mitigacion...
          </p>
        )}
      </div>
    </ContentLayout>
  );
};

export default FollowUpControlPage;
