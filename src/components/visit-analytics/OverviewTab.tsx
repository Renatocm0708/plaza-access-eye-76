
import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { generateDailyData } from "@/utils/visitAnalyticsData";
import { useIsMobile } from "@/hooks/use-mobile";

const OverviewTab = () => {
  const dailyData = useMemo(() => generateDailyData(), []);
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Daily Traffic Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tráfico Diario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.2)" />
                  <XAxis dataKey="day" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      borderColor: 'var(--border)',
                      color: 'var(--foreground)'
                    }} 
                    labelStyle={{ color: 'var(--foreground)' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="entrada" 
                    name="Entradas" 
                    stroke="#b5cb22" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="salida" 
                    name="Salidas" 
                    stroke="#3b3f48" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Vehicle Type Comparison */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tipos de Vehículos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Vehículos particulares", value: 650 },
                      { name: "Vehículos de servicio", value: 250 },
                      { name: "Vehículos visitantes", value: 350 }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={!isMobile}
                    outerRadius={isMobile ? 80 : 100}
                    fill="#8884d8"
                    dataKey="value"
                    label={isMobile ? undefined : ({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    <Cell fill="#b5cb22" />
                    <Cell fill="#8ba313" />
                    <Cell fill="#626e0e" />
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      borderColor: 'var(--border)',
                      color: 'var(--foreground)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold">{dailyData.reduce((acc, day) => acc + day.entrada, 0)}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Total Entradas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold">{dailyData.reduce((acc, day) => acc + day.salida, 0)}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Total Salidas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold">08:00</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Hora Pico</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold">45%</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Visitas Recurrentes</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
