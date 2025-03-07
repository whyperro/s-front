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

// Definición de la interfaz para los datos
interface DataPoint {
  name: string;
  reports: number;
}

// Definición de la interfaz para las props del componente
interface DynamicBarChartProps {
  data: DataPoint[];
}

// Array de colores para las barras
const colors: string[] = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#a8328a",
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

const DynamicBarChart: React.FC<DynamicBarChartProps> = ({ data }) => {
  return (
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend formatter={renderLegendText} iconSize={0} />
      <Bar dataKey="reports" fill="#8884d8" name="Numero de Reportes">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Bar>
    </BarChart>
  );
};

// Ejemplo de uso
const Example = () => {
  const data: DataPoint[] = [
    { name: "ORGANIZACIONAL", reports: 24 },
    { name: "TECNICO", reports: 23 },
    { name: "HUMANO", reports: 98 },
    { name: "AMBIENTAL", reports: 39 },
  ];

  return <DynamicBarChart data={data} />;
};

export default Example;
