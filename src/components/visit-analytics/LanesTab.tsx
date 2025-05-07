
import React, { useState, useMemo, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { generateLaneData, generateExitLaneData } from "@/utils/visitAnalyticsData";
import { useIsMobile } from "@/hooks/use-mobile";

const LanesTab = () => {
  const [laneFilter, setLaneFilter] = useState("todas");
  const [directionFilter, setDirectionFilter] = useState("entrada"); // entrada o salida
  const isMobile = useIsMobile();

  const allLaneData = useMemo(() => generateLaneData(), []);
  const allExitLaneData = useMemo(() => generateExitLaneData(), []);
  
  // Filter lane data based on selected filter and direction
  const laneData = useMemo(() => {
    const dataToFilter = directionFilter === "entrada" ? allLaneData : allExitLaneData;
    if (laneFilter === "todas") {
      return dataToFilter;
    }
    return dataToFilter.filter(item => item.id === laneFilter);
  }, [laneFilter, directionFilter, allLaneData, allExitLaneData]);

  // Debug filter changes
  useEffect(() => {
    console.log("Lane filter changed to:", laneFilter);
    console.log("Direction filter:", directionFilter);
    console.log("Filtered data:", laneData);
  }, [laneFilter, directionFilter, laneData]);

  return (
    <>
      <div className="flex mb-4 flex-wrap gap-2">
        <Button
          variant={directionFilter === "entrada" ? "default" : "outline"}
          size="sm"
          onClick={() => setDirectionFilter("entrada")}
          className="mr-2"
        >
          Entradas
        </Button>
        <Button
          variant={directionFilter === "salida" ? "default" : "outline"}
          size="sm"
          onClick={() => setDirectionFilter("salida")}
          className="mr-4"
        >
          Salidas
        </Button>
        
        <Button
          variant={laneFilter === "todas" ? "default" : "outline"}
          size="sm"
          onClick={() => setLaneFilter("todas")}
        >
          Todos
        </Button>
        
        {directionFilter === "entrada" ? (
          <>
            <Button
              variant={laneFilter === "propietarios" ? "default" : "outline"}
              size="sm"
              onClick={() => setLaneFilter("propietarios")}
            >
              Carril 1 - Propietarios
            </Button>
            <Button
              variant={laneFilter === "visitantesQR" ? "default" : "outline"}
              size="sm"
              onClick={() => setLaneFilter("visitantesQR")}
            >
              Carril 2 - Visitantes QR
            </Button>
            <Button
              variant={laneFilter === "visitantes" ? "default" : "outline"}
              size="sm"
              onClick={() => setLaneFilter("visitantes")}
            >
              Carril 3 - Visitantes
            </Button>
          </>
        ) : (
          <>
            <Button
              variant={laneFilter === "salidaPropietarios" ? "default" : "outline"}
              size="sm"
              onClick={() => setLaneFilter("salidaPropietarios")}
            >
              Carril 4 - Propietarios
            </Button>
            <Button
              variant={laneFilter === "salidaVisitantes" ? "default" : "outline"}
              size="sm"
              onClick={() => setLaneFilter("salidaVisitantes")}
            >
              Carril 5 - Visitantes
            </Button>
          </>
        )}
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            {directionFilter === "entrada" ? "Entradas" : "Salidas"} por Carril
          </CardTitle>
        </CardHeader>
        <CardContent>
          {laneData.length > 1 ? (
            // For multiple lanes, show pie chart
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={laneData}
                    cx="50%"
                    cy="50%"
                    labelLine={!isMobile}
                    outerRadius={isMobile ? 100 : 150}
                    fill="#8884d8"
                    dataKey="value"
                    label={isMobile ? undefined : ({ name, value, percent }) => 
                      `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {laneData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
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
          ) : (
            // For single lane, show bar chart
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={laneData.map(lane => ({ name: lane.name, visits: lane.value }))}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.2)" />
                  <XAxis type="number" stroke="currentColor" />
                  <YAxis dataKey="name" type="category" stroke="currentColor" width={150} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      borderColor: 'var(--border)',
                      color: 'var(--foreground)'
                    }}
                  />
                  <Bar 
                    dataKey="visits" 
                    name="Visitas" 
                    fill={laneData.length > 0 ? laneData[0].color : "#b5cb22"} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default LanesTab;
