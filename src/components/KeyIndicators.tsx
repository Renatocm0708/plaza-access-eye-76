
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CartesianGrid, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  BarChart, 
  Bar, 
  Legend 
} from "recharts";

interface KeyIndicatorsProps {
  timeRange: string;
}

// Mock data for graphs - includes pedestrian data
const generateTimeData = (timeRange: string) => {
  if (timeRange === "day") {
    return Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      vehicular: Math.floor(Math.random() * 50) + 5,
      pedestrian: Math.floor(Math.random() * 40) + 5,
      entries: Math.floor(Math.random() * 30) + 5,
      exits: Math.floor(Math.random() * 25) + 5,
    }));
  } else if (timeRange === "week") {
    const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    return days.map(day => ({
      time: day,
      vehicular: Math.floor(Math.random() * 350) + 150,
      pedestrian: Math.floor(Math.random() * 250) + 120,
      entries: Math.floor(Math.random() * 200) + 100,
      exits: Math.floor(Math.random() * 180) + 80,
    }));
  } else {
    return Array.from({ length: 30 }, (_, i) => ({
      time: `${i+1}`,
      vehicular: Math.floor(Math.random() * 800) + 300,
      pedestrian: Math.floor(Math.random() * 600) + 250,
      entries: Math.floor(Math.random() * 450) + 200,
      exits: Math.floor(Math.random() * 420) + 180,
    }));
  }
};

const KeyIndicators = ({ timeRange }: KeyIndicatorsProps) => {
  const [activeTab, setActiveTab] = useState("traffic");
  const data = generateTimeData(timeRange);

  // Find peak hours based on total traffic
  const peakHours = [...data].sort((a, b) => 
    (b.vehicular + b.pedestrian) - (a.vehicular + a.pedestrian)
  ).slice(0, 3);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Indicadores de Acceso</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="traffic">Tráfico</TabsTrigger>
            <TabsTrigger value="comparison">Comparativa</TabsTrigger>
          </TabsList>
          <TabsContent value="traffic" className="space-y-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="entries" stroke="#2563eb" name="Entradas" strokeWidth={2} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="exits" stroke="#f97316" name="Salidas" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-slate-700 mb-3">Horarios pico</h3>
              <div className="grid grid-cols-3 gap-4">
                {peakHours.map((hour, index) => (
                  <div key={index} className="bg-white p-3 rounded-md border border-slate-100 shadow-sm">
                    <p className="text-xs text-slate-500">Horario {index + 1}</p>
                    <p className="text-md font-medium">{hour.time}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {hour.vehicular} vehículos | {hour.pedestrian} peatones
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="vehicular" fill="#3b82f6" name="Vehicular" />
                  <Bar dataKey="pedestrian" fill="#10b981" name="Peatonal" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default KeyIndicators;
