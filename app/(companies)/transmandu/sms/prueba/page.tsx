"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

interface DataPoint {
  name: string;
  uv: number;
  reports: number;
  amt: number;
}

const data: DataPoint[] = [
  {
    name: "NATURAL",
    uv: 4000,
    reports: 24,
    amt: 2400,
  },
  {
    name: "TECNICO",
    uv: 3000,
    reports: 13,
    amt: 2210,
  },
  {
    name: "HUMANO",
    uv: 2000,
    reports: 8,
    amt: 2290,
  },
  {
    name: "ORGANIZACIONAL",
    uv: 2780,
    reports: 9,
    amt: 2000,
  },
];

const getIntroOfPage = (label: string): string => {
  if (label === "ORGANIZACIONAL") {
    return "Peligros de tipo organizacional";
  }
  if (label === "TECNICO") {
    return "Peligros de tipo tecnico";
  }
  if (label === "NATURAL") {
    return "Peligros de tipo natural";
  }
  if (label === "HUMANO") {
    return "Peligros de tipo humano";
  }

  return "";
};

interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};

interface ExampleProps {}

export default class Example extends PureComponent<ExampleProps> {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/tooltip-with-customized-content-vgl956";

  render() {
    return (
      <ContentLayout title="Reportes Segun el Tipo">
        <ResponsiveContainer width="60%" height="60% " aspect={2}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="reports" name={"Numero de reporte segun su tipo"} barSize={20} fill="#57ff36" />
        </BarChart>
      </ResponsiveContainer>
      </ContentLayout>
    );
  }
}
