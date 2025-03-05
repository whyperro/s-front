"use client";

import { ContentLayout } from "@/components/layout/ContentLayout";
import { useGetVoluntaryReportingStatsById } from "@/hooks/sms/useGetVoluntaryReportingStatisticsByYear";
import { useGetVoluntaryReports } from "@/hooks/sms/useGetVoluntaryReports";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface StatsDataByYear {
  name: string;
  total_reports: number;
  open_reports: number;
  closed_reports: number;
}

const Stats = () => {
  const { data, isLoading, isError } = useGetVoluntaryReports();
  const {
    data: statsData,
    isLoading: isLoadingStats,
    isError: isErrorStats,
  } = useGetVoluntaryReportingStatsById("2023");

  const values: StatsDataByYear[] = statsData
    ? [
        {
          name: "Peligros identificados",
          total_reports: statsData.totalReports,
          open_reports: statsData.open,
          closed_reports: statsData.closed,
        },
      ]
    : [];

  console.log("THIS IS THE VALUES ", values);
  return (
    <ContentLayout title="Reportes Identificados vs Gestionados">
      <ResponsiveContainer width="60%" height="60%" aspect={2}>
        {values ? (
          <BarChart
            width={300}
            height={600}
            data={values}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={200}
          >
            <CartesianGrid strokeDasharray="3" stroke="#000" opacity={0.5} />
            <XAxis dataKey="name" />
            <YAxis
              allowDecimals={false}
              type="number"
              domain={[0, "dataMax"]}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="open"
              name={"En Proceso"}
              stackId="a"
              fill="#8884d8"
            />

            <Bar
              dataKey="closed"
              name={"Gestionados"}
              stackId="a"
              fill="#82ca9d"
            />
          </BarChart>
        ) : (
          <p>No hay datos disponibles para mostrar el gráfico.</p>
        )}
      </ResponsiveContainer>
    </ContentLayout>
  );
};

export default Stats;
