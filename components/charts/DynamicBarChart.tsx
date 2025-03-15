import { DangerIdentificationsByType, pieChartData } from "@/types";
import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LegendProps,
  ResponsiveContainer,
} from "recharts";
// Definición de la interfaz para las props del componente
interface DynamicBarChartProps {
  data: pieChartData[];
  title?: string;
  height: string;
  width: string;
}

// Array de colores para las barras
const colors: string[] = [
  "#00C49F",
  "#FFBB28",
  "#32a89d",
  "#d88488",
  "#0088FE",
  "#ED1C1C",
  "#CE33FF",
  "#ca829d",
  "#c6ff58",
  "#328aa8",
  "#9da832",
];

// Formateador de la leyenda para darle estilo a "AAA"
const renderLegendText = (value: string) => {
  return <span style={{ fontWeight: "bold" }}></span>;
};

const DynamicBarChart = ({
  data,
  title,
  height,
  width,
}: DynamicBarChartProps) => {
  console.log("DYNAMICBARCHART", data);
  return (
    <>
      <h1 className="text-xl font-semibold">{title}</h1>
      <ResponsiveContainer aspect={4}>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, "dataMax"]} allowDecimals={false} />
          <Tooltip />
          <Legend formatter={renderLegendText} iconSize={0} />
          <Bar
            dataKey="value"
            fill="#8884d8"
            barSize={200}
            name={title}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default DynamicBarChart;
