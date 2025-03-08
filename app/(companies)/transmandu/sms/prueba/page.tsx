import { DangerIdentificationsByType } from "@/types";
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
} from "recharts";
// Definición de la interfaz para las props del componente
interface DynamicBarChartProps {
  data: DangerIdentificationsByType[];
}

// Array de colores para las barras
const colors: string[] = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#ED1C1C",
  "#CE33FF",
  "#32a89d",
  "#d88488",
  "#ca829d",
  "#c6ff58",
  "#328aa8",
  "#9da832",
];

// Formateador de la leyenda para darle estilo a "AAA"
const renderLegendText = (value: string) => {
  return <span style={{ fontWeight: "bold" }}></span>;
};

const DynamicBarChart = ({ data }: DynamicBarChartProps) => {
  console.log("DYNAMICBARCHART",data);
  return (
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={[0, 'dataMax']} allowDecimals={false}/>
      <Tooltip />
      <Legend formatter={renderLegendText} iconSize={0} />
      <Bar dataKey="identifications_number" fill="#8884d8" name="Numero de Reportes Segun su Tipo">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default DynamicBarChart;