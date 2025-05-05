
import React, { useState } from "react";
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CalendarDays, Users, Car } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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

const generateEntranceData = () => {
  return [
    { name: "Entrada Norte", value: 540 },
    { name: "Entrada Sur", value: 320 },
    { name: "Entrada Este", value: 210 },
    { name: "Entrada Oeste", value: 280 },
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DateRangePicker = ({ 
  date, 
  setDate 
}: { 
  date: { from: Date | undefined; to: Date | undefined }; 
  setDate: React.Dispatch<React.SetStateAction<{ from: Date | undefined; to: Date | undefined }>>
}) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal w-[280px]",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            {date.from ? (
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
            defaultMonth={date.from}
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
  const [date, setDate] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(),
    to: undefined,
  });
  const [analysisView, setAnalysisView] = useState("overview");
  const [entranceFilter, setEntranceFilter] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");

  const hourlyData = generateHourlyData();
  const dailyData = generateDailyData();
  const entranceData = generateEntranceData();
  const frequentVisitors = generateFrequentVisitors();
  const addressVisits = generateAddressVisits();

  const filteredVisitors = frequentVisitors.filter(visitor => 
    visitor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAddresses = addressVisits.filter(address => 
    address.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Análisis de Visitas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DateRangePicker date={date} setDate={setDate} />
        
        <div className="space-y-4">
          <Tabs value={analysisView} onValueChange={setAnalysisView} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="hourly">Por Hora</TabsTrigger>
              <TabsTrigger value="entrances">Por Garita</TabsTrigger>
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
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="pedestrian" 
                            name="Peatonal" 
                            stroke="#10b981" 
                            strokeWidth={2} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="vehicular" 
                            name="Vehicular" 
                            stroke="#3b82f6" 
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
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            <Cell fill="#3b82f6" />
                            <Cell fill="#10b981" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold">{dailyData.reduce((acc, day) => acc + day.total, 0)}</h3>
                      <p className="text-sm text-muted-foreground">Total Visitas</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold">{Math.round(dailyData.reduce((acc, day) => acc + day.vehicular, 0) / dailyData.reduce((acc, day) => acc + day.total, 0) * 100)}%</h3>
                      <p className="text-sm text-muted-foreground">Con Vehículo</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold">08:00</h3>
                      <p className="text-sm text-muted-foreground">Hora Pico</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold">45%</h3>
                      <p className="text-sm text-muted-foreground">Visitas Recurrentes</p>
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
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pedestrian" name="Peatonal" fill="#10b981" />
                        <Bar dataKey="vehicular" name="Vehicular" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="entrances">
              <div className="flex mb-4">
                <div className="flex space-x-2">
                  <Button
                    variant={entranceFilter === "todas" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEntranceFilter("todas")}
                  >
                    Todas
                  </Button>
                  <Button
                    variant={entranceFilter === "norte" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEntranceFilter("norte")}
                  >
                    Norte
                  </Button>
                  <Button
                    variant={entranceFilter === "sur" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEntranceFilter("sur")}
                  >
                    Sur
                  </Button>
                  <Button
                    variant={entranceFilter === "este" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEntranceFilter("este")}
                  >
                    Este
                  </Button>
                  <Button
                    variant={entranceFilter === "oeste" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEntranceFilter("oeste")}
                  >
                    Oeste
                  </Button>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Visitas por Garita</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={entranceData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value, percent }) => 
                            `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                          }
                        >
                          {entranceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
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
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Visitante</TableHead>
                              <TableHead>Tipo</TableHead>
                              <TableHead className="text-right">Visitas</TableHead>
                              <TableHead className="text-right">Última Visita</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredVisitors.map((visitor) => (
                              <TableRow key={visitor.id}>
                                <TableCell className="font-medium">{visitor.name}</TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    {visitor.type === "Vehículo" ? 
                                      <Car className="h-4 w-4 mr-1 text-blue-500" /> : 
                                      <Users className="h-4 w-4 mr-1 text-green-500" />
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
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Dirección</TableHead>
                              <TableHead className="text-right">Residentes</TableHead>
                              <TableHead className="text-right">Visitas</TableHead>
                              <TableHead className="text-right">Última Visita</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredAddresses.map((address) => (
                              <TableRow key={address.id}>
                                <TableCell className="font-medium">{address.address}</TableCell>
                                <TableCell className="text-right">{address.residents}</TableCell>
                                <TableCell className="text-right">{address.visits}</TableCell>
                                <TableCell className="text-right">{address.lastVisit}</TableCell>
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
