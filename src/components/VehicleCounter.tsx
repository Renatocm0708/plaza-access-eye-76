
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const generateVehicleData = () => {
  return [
    { tipo: "Residentes", cantidad: 245, porcentaje: 42 },
    { tipo: "Visitantes", cantidad: 187, porcentaje: 32 },
    { tipo: "Servicios", cantidad: 82, porcentaje: 14 },
    { tipo: "Proveedores", cantidad: 65, porcentaje: 11 },
  ];
};

const generateHourlyVehicleData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hora: `${i}:00`,
    entradas: Math.floor(Math.random() * 15) + 1,
    salidas: Math.floor(Math.random() * 12) + 1,
  }));
};

const VehicleCounter = () => {
  const [viewType, setViewType] = useState("resumen");
  const vehicleData = generateVehicleData();
  const hourlyData = generateHourlyVehicleData();
  
  const totalVehicles = vehicleData.reduce((sum, item) => sum + item.cantidad, 0);
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5 text-primary dark:text-primary" />
          Control de Vehículos
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs value={viewType} onValueChange={setViewType}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="resumen">Resumen</TabsTrigger>
            <TabsTrigger value="flujo">Flujo por Hora</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resumen">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold">{totalVehicles}</h3>
                    <p className="text-sm text-muted-foreground">Vehículos Totales</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <h3 className="text-3xl font-bold text-green-600">42</h3>
                      <ArrowUpRight className="h-5 w-5 text-green-600 ml-1" />
                    </div>
                    <p className="text-sm text-muted-foreground">Entradas Hoy</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <h3 className="text-3xl font-bold text-blue-600">35</h3>
                      <ArrowDownRight className="h-5 w-5 text-blue-600 ml-1" />
                    </div>
                    <p className="text-sm text-muted-foreground">Salidas Hoy</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={vehicleData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="tipo" type="category" width={90} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      borderColor: 'var(--border)'
                    }}
                    formatter={(value: number, name: string) => [value, name === "cantidad" ? "Vehículos" : "Porcentaje (%)"]}
                  />
                  <Legend />
                  <Bar dataKey="cantidad" name="Vehículos" fill="#b5cb22" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="flujo">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <h3 className="text-3xl font-bold">8:00</h3>
                      <Clock className="h-5 w-5 ml-1" />
                    </div>
                    <p className="text-sm text-muted-foreground">Hora Pico Entradas</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <h3 className="text-3xl font-bold">18:30</h3>
                      <Clock className="h-5 w-5 ml-1" />
                    </div>
                    <p className="text-sm text-muted-foreground">Hora Pico Salidas</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold">11.4</h3>
                    <p className="text-sm text-muted-foreground">Promedio Por Hora</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={hourlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hora" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      borderColor: 'var(--border)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="entradas" name="Entradas" fill="#82ca9d" />
                  <Bar dataKey="salidas" name="Salidas" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VehicleCounter;
