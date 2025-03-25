import { pieChartData } from "@/types";
import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";

// Definición de la interfaz para las props del componente
interface DynamicBarChartProps {
  data: pieChartData[];
  title?: string;
  height: string;
  width: string;
  activeDecimal?: boolean;
}

// Array de colores para las barras
const colors: string[] = [
  "#89f4c7",
  "#8ae3d0",
  "#8bd2d9",
  "#8cc1e3",
  "#8dafec",
  "#8e9ef5",
  "#8f8dfe",
  "#ca829d",
  "#c6ff58",
  "#328aa8",
  "#9da832",
];


const DynamicBarChart = ({
  data,
  title,
  height,
  width,
  activeDecimal
}: DynamicBarChartProps) => {
  const { theme } = useTheme();
  const [clickedBarName, setClickedBarName] = useState<string | null>(null);

  const handleBarClick = (entry: pieChartData) => {
    const name = entry.name;
    setClickedBarName(name);
    console.log(name); // Imprimir en consola
  };

  return (
    <>
      <h1 className="text-xl font-semibold">{title}</h1>
      {/* {clickedBarName && (
        <p className="mt-2">Barra seleccionada: {clickedBarName}</p>
      )} */}
      <ResponsiveContainer aspect={4}>
        <BarChart
          width={730}
          height={250}
          data={data}
          onClick={({ activePayload }) => {
            if (activePayload && activePayload[0] && activePayload[0].payload) {
              handleBarClick(activePayload[0].payload as pieChartData);
            }
          }}
        >
          <CartesianGrid strokeDasharray="4" />
          <XAxis
            dataKey="name"
            stroke={theme === "light" ? "black" : "white"}
          />
          <YAxis
            domain={[0, "dataMax"]}
            allowDecimals={activeDecimal ? true : false}
            stroke={theme === "light" ? "black" : "white"}
          />
          <Tooltip />
          <Legend  iconSize={0} />
          <Bar dataKey="value" fill="#8884d8" barSize={200} name={title}>
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
