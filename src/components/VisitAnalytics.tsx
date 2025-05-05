
import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { CalendarDays, Users, Car } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { useIsMobile } from "@/hooks/use-mobile";

// Data generation helper functions
const generateHourlyData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    pedestrian: Math.floor(Math.random() * 50) + 5,
    vehicular: Math.floor(Math.random() * 30) + 5,
    total: Math.floor(Math.random() * 80) + 10,
  }));
};

const generateDailyData = (days = 7) => {
  const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  return Array.from({ length: days }, (_, i) => ({
    day: dayNames[i % 7],
    pedestrian: Math.floor(Math.random() * 200) + 50,
    vehicular: Math.floor(Math.random() * 150) + 30,
    total: Math.floor(Math.random() * 350) + 80,
  }));
};

// Updated lane data with more descriptive structure and using CSS variables for colors
const generateLaneData = () => {
  return [
    { 
      name: "Carril Propietarios", 
      value: 540, 
      colorVar: "var(--lane-owners)", 
      id: "propietarios" 
    },
    { 
      name: "Carril Visitantes QR", 
      value: 320, 
      colorVar: "var(--lane-visitors-qr)", 
      id: "visitantesQR" 
    },
    { 
      name: "Carril Visitantes", 
      value: 210, 
      colorVar: "var(--lane-visitors)", 
      id: "visitantes" 
    },
  ];
};

const generateFrequentVisitors = () => {
  return [
    { id: 1, name: "Juan Pérez", visits: 23, lastVisit: "2025-05-04", type: "Vehículo" },
    { id: 2, name: "Ana López", visits: 19, lastVisit: "2025-05-05", type: "Peatonal" },
    { id: 3, name: "Carlos Ruiz", visits: 15, lastVisit: "2025-05-03", type: "Vehículo" },
    { id: 4, name: "María González", visits: 12, lastVisit: "2025-05-02", type: "Peatonal" },
    { id: 5, name: "Roberto Díaz", visits: 10, lastVisit: "2025-05-01", type: "Vehículo" },
  ];
};

const generateAddressVisits = () => {
  return [
    { id: 1, address: "Bloque A, Apto 101", visits: 45, residents: 3, lastVisit: "2025-05-05" },
    { id: 2, address: "Bloque B, Apto 205", visits: 38, residents: 2, lastVisit: "2025-05-04" },
    { id: 3, address: "Bloque C, Apto 310", visits: 29, residents: 4, lastVisit: "2025-05-05" },
    { id: 4, address: "Bloque D, Apto 402", visits: 23, residents: 2, lastVisit: "2025-05-03" },
    { id: 5, address: "Bloque A, Apto 206", visits: 19, residents: 1, lastVisit: "2025-05-02" },
  ];
};

// Date range picker component
const DateRangePicker = ({ 
  date, 
  setDate 
}: { 
  date: DateRange | undefined; 
  setDate: (range: DateRange | undefined) => void
}) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal w-full md:w-[280px]",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy")} - {format(date.to, "dd/MM/yyyy")}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy")
              )
            ) : (
              <span>Seleccionar rango de fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

const VisitAnalytics = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });
  const [analysisView, setAnalysisView] = useState("overview");
  const [laneFilter, setLaneFilter] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();

  const hourlyData = useMemo(() => generateHourlyData(), []);
  const dailyData = useMemo(() => generateDailyData(), []);
  const allLaneData = useMemo(() => generateLaneData(), []);
  
  // Filter lane data based on selected filter - fixed to actually filter the data
  const laneData = useMemo(() => {
    if (laneFilter === "todas") {
      return allLaneData;
    }
    return allLaneData.filter(item => item.id === laneFilter);
  }, [laneFilter, allLaneData]);

  const frequentVisitors = useMemo(() => generateFrequentVisitors(), []);
  const addressVisits = useMemo(() => generateAddressVisits(), []);

  const filteredVisitors = useMemo(() => 
    frequentVisitors.filter(visitor => 
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [frequentVisitors, searchTerm]
  );

  const filteredAddresses = useMemo(() => 
    addressVisits.filter(address => 
      address.address.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [addressVisits, searchTerm]
  );

  // Debug filter changes
  useEffect(() => {
    console.log("Lane filter changed to:", laneFilter);
    console.log("Filtered data:", laneData);
  }, [laneFilter, laneData]);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary dark:text-primary" />
          Análisis de Visitas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DateRangePicker date={date} setDate={setDate} />
        
        <div className="space-y-4">
          <Tabs value={analysisView} onValueChange={setAnalysisView} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="hourly">Por Hora</TabsTrigger>
              <TabsTrigger value="lanes">Por Carril</TabsTrigger>
              <TabsTrigger value="tables">Visitantes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
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
                            dataKey="pedestrian" 
                            name="Peatonal" 
                            stroke="var(--chart-pedestrian)" 
                            strokeWidth={2} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="vehicular" 
                            name="Vehicular" 
                            stroke="var(--chart-vehicular)" 
                            strokeWidth={2} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Access Type Comparison */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Tipos de Acceso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Con Vehículo", value: 450 },
                              { name: "Sin Vehículo", value: 650 }
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
                            <Cell fill="var(--chart-vehicular)" />
                            <Cell fill="var(--chart-pedestrian)" />
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
                      <h3 className="text-2xl md:text-3xl font-bold">{dailyData.reduce((acc, day) => acc + day.total, 0)}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Total Visitas</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-2xl md:text-3xl font-bold">{Math.round(dailyData.reduce((acc, day) => acc + day.vehicular, 0) / dailyData.reduce((acc, day) => acc + day.total, 0) * 100)}%</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Con Vehículo</p>
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
            </TabsContent>
            
            <TabsContent value="hourly">
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
                        <Bar dataKey="pedestrian" name="Peatonal" fill="var(--chart-pedestrian)" />
                        <Bar dataKey="vehicular" name="Vehicular" fill="var(--chart-vehicular)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="lanes">
              {/* Lane filter buttons - improved visually */}
              <div className="flex mb-4 flex-wrap gap-2">
                <Button
                  variant={laneFilter === "todas" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLaneFilter("todas")}
                  className="min-w-20"
                >
                  Todos
                </Button>
                <Button
                  variant={laneFilter === "propietarios" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLaneFilter("propietarios")}
                  className="min-w-20"
                >
                  Propietarios
                </Button>
                <Button
                  variant={laneFilter === "visitantesQR" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLaneFilter("visitantesQR")}
                  className="min-w-20"
                >
                  Visitantes QR
                </Button>
                <Button
                  variant={laneFilter === "visitantes" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLaneFilter("visitantes")}
                  className="min-w-20"
                >
                  Visitantes
                </Button>
              </div>
              
              {/* Alternate between pie chart and bar chart based on data count */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Visitas por Carril</CardTitle>
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
                              <Cell key={`cell-${index}`} fill={entry.colorVar} />
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
                            fill={laneData.length > 0 ? laneData[0].colorVar : "var(--chart-pedestrian)"} 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tables">
              <div className="space-y-4">
                <Input
                  placeholder="Buscar visitante o dirección..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
                
                <Tabs defaultValue="visitors">
                  <TabsList className="mb-4">
                    <TabsTrigger value="visitors">Visitantes Frecuentes</TabsTrigger>
                    <TabsTrigger value="addresses">Visitas por Dirección</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="visitors">
                    <Card>
                      <CardContent className="p-0 overflow-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Visitante</TableHead>
                              <TableHead className="hidden md:table-cell">Tipo</TableHead>
                              <TableHead className="text-right">Visitas</TableHead>
                              <TableHead className="text-right">Última Visita</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredVisitors.map((visitor) => (
                              <TableRow key={visitor.id}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center">
                                    <span className="md:hidden mr-2">
                                      {visitor.type === "Vehículo" ? 
                                        <Car className="h-4 w-4 text-gray-700 dark:text-gray-300" /> : 
                                        <Users className="h-4 w-4 text-lime-500 dark:text-lime-400" />
                                      }
                                    </span>
                                    {visitor.name}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <div className="flex items-center">
                                    {visitor.type === "Vehículo" ? 
                                      <Car className="h-4 w-4 mr-1 text-gray-700 dark:text-gray-300" /> : 
                                      <Users className="h-4 w-4 mr-1 text-lime-500 dark:text-lime-400" />
                                    }
                                    {visitor.type}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">{visitor.visits}</TableCell>
                                <TableCell className="text-right">{visitor.lastVisit}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="addresses">
                    <Card>
                      <CardContent className="p-0 overflow-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Dirección</TableHead>
                              <TableHead className="text-right">Residentes</TableHead>
                              <TableHead className="text-right">Visitas</TableHead>
                              <TableHead className="text-right hidden md:table-cell">Última Visita</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredAddresses.map((address) => (
                              <TableRow key={address.id}>
                                <TableCell className="font-medium">{address.address}</TableCell>
                                <TableCell className="text-right">{address.residents}</TableCell>
                                <TableCell className="text-right">{address.visits}</TableCell>
                                <TableCell className="text-right hidden md:table-cell">{address.lastVisit}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitAnalytics;
