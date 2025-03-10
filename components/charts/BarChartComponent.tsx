"use client";

import { ReportingStats } from "@/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface StatsDataByYear {
  name: string;
  total_reports: number;
  open_reports: number;
  closed_reports: number;
}

interface BarChartProps {
  data: ReportingStats;
  title: string;
}

const BarChartComponent = ({ data, title }: BarChartProps) => {
  console.log("BarChartComponent", data);
  if (data.closed_reports == 0 && data.open_reports == 0) {
    return <p className="text-lg text-muted-foreground">No hay datos para mostrar acerca de "{title}"</p>
  }
  const values: StatsDataByYear[] = data
    ? [
        {
          name: `${title}`,
          total_reports: data.total_reports,
          open_reports: data.open_reports,
          closed_reports: data.closed_reports,
        },
      ]
    : [];
  console.log("this is the valueeee", values);
  return (
    <>
      <div className="flex-col justify-center items-center">
        <h1 className="font-semibold">{title}</h1>
        <ResponsiveContainer width="50%" height="50%" aspect={2}>
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
              barSize={160}
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
                dataKey="open_reports"
                name={"En Proceso"}
                stackId="a"
                fill="#8884d8"
              />

              <Bar
                dataKey="closed_reports"
                name={"Gestionados"}
                stackId="a"
                fill="#82ca9d"
              />
            </BarChart>
          ) : (
            <p>No hay datos disponibles para mostrar el gráfico.</p>
          )}
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default BarChartComponent;
