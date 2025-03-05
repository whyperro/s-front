"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";
import { useGetVoluntaryReportsCountedByArea } from "@/hooks/sms/useGetVoluntaryReportsCountedByArea";
import { ReportsByArea } from "@/types";
import { Tooltip } from "@radix-ui/react-tooltip";
import React, { PureComponent, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const COLORS: string[] = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#ED1C1C",
  "#CE33FF",
];

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  payload: ReportsByArea;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  payload,
}: CustomizedLabelProps) => {
  const radius = outerRadius * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="bottom"
      fontSize="20px" // Ajusta el tamaño de la fuente
      fontFamily="Arial" // Ajusta la fuente
    >
      <tspan x={x} dy="-1em">{`${(percent * 100).toFixed(0)}%`}</tspan>
      <tspan x={x} dy="1em">{`${payload.name}`}</tspan>
    </text>
  );
};

const Stats = () => {
  const {
    data: statsData,
    isLoading: isLoadingStats,
    isError: isErrorStats,
  } = useGetVoluntaryReportsCountedByArea("2023");

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const onPieEnter = (_: void, index: number) => {
    setActiveIndex(index);
    console.log(activeIndex);
  };
  return (
    <ContentLayout title="Reportes: Identificados vs Gestionados">
      <ResponsiveContainer width="100%" height="100%" aspect={2}>
        <PieChart width={400} height={400}>
          {statsData ? (
            <Pie
              data={statsData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={renderCustomizedLabel}
              outerRadius={140}
              fill="#8884d8"
              dataKey="reports_number"
              activeIndex={activeIndex}
              onMouseEnter={onPieEnter}
            >
              {statsData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Tooltip/>
            </Pie>
          ) : (
            <p>No hay datos para mostrar..</p>
          )}
        </PieChart>
      </ResponsiveContainer>
    </ContentLayout>
  );
};
export default Stats;
