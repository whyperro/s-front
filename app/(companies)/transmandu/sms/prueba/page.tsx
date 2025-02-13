"use client";

import CreateAnalysisForm from "@/components/forms/CreateAnalysisForm";
import CreateDangerIdentificationForm from "@/components/forms/CreateIdentificationForm";
import React, { useState } from "react";

const page = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col w-1/3">
      <CreateAnalysisForm onClose={() => setOpen(false)} />
    </div>
  );
};

export default page;
