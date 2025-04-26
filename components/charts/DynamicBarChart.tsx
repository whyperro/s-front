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
import { COLORS } from "@/lib/utils";

// Definición de la interfaz para las props del componente
interface DynamicBarChartProps {
  data: pieChartData[];
  title?: string;
  height: string;
  width: string;
  aspect?: number;
  activeDecimal?: boolean;
}

// Array de colores para las barras



const DynamicBarChart = ({
  data,
  title,
  height,
  width,
  activeDecimal,
  aspect
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
      <h1 className="text-sm font-semibold">{title}</h1>
      {/* {clickedBarName && (
        <p className="mt-2">Barra seleccionada: {clickedBarName}</p>
      )} */}
      <ResponsiveContainer aspect={aspect || 1}>
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
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default DynamicBarChart;
