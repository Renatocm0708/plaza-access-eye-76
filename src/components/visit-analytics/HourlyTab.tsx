
import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { generateHourlyData } from "@/utils/visitAnalyticsData";

const HourlyTab = () => {
  const hourlyData = useMemo(() => generateHourlyData(), []);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Tráfico por Hora</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.2)" />
              <XAxis dataKey="hour" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)', 
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)'
                }}
              />
              <Legend />
              <Bar dataKey="entrada" name="Entradas" fill="#b5cb22" />
              <Bar dataKey="salida" name="Salidas" fill="#3b3f48" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTab;
