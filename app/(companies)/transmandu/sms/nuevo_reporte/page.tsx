"use client";

import { ObligatoryReportForm } from "@/components/forms/CreateObligatoryReportForm";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col w-1/3">
      <ObligatoryReportForm></ObligatoryReportForm>
    </div>
  );
};

export default page;
