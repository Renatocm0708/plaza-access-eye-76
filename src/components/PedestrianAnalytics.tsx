
import React, { useState, useMemo } from "react";
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
import { CalendarDays, User, QrCode, Fingerprint, CreditCard, BadgePercent } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { useIsMobile } from "@/hooks/use-mobile";

// Data generation helper functions for pedestrian access
const generateHourlyData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    qr: Math.floor(Math.random() * 15) + 2,
    easy: Math.floor(Math.random() * 10) + 1,
    fingerprint: Math.floor(Math.random() * 8) + 1,
    card: Math.floor(Math.random() * 7) + 1,
    entrada: Math.floor(Math.random() * 25) + 5,
    salida: Math.floor(Math.random() * 20) + 5,
  }));
};

const generateDailyData = (days = 7) => {
  const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  return Array.from({ length: days }, (_, i) => ({
    day: dayNames[i % 7],
    qr: Math.floor(Math.random() * 80) + 20,
    easy: Math.floor(Math.random() * 60) + 10,
    fingerprint: Math.floor(Math.random() * 50) + 15,
    card: Math.floor(Math.random() * 40) + 5,
    entrada: Math.floor(Math.random() * 120) + 30,
    salida: Math.floor(Math.random() * 100) + 25,
  }));
};

const generateAccessMethodData = () => {
  return [
    { 
      name: "Acceso QR", 
      value: 145, 
      color: "#10b981", 
      id: "qr" 
    },
    { 
      name: "Acceso Fácil", 
      value: 92, 
      color: "#8b5cf6", 
      id: "easy" 
    },
    { 
      name: "Huella", 
      value: 83, 
      color: "#f59e0b", 
      id: "fingerprint" 
    },
    { 
      name: "Tarjeta", 
      value: 50, 
      color: "#ec4899", 
      id: "card" 
    },
  ];
};

const generateFrequentVisitors = () => {
  const entryMethods = ["QR", "Fácil", "Huella", "Tarjeta"];
  return [
    { id: 1, name: "Ana Martínez", visits: 26, lastVisit: "2025-05-04", type: "Peatón", method: entryMethods[0] },
    { id: 2, name: "Luis Rodríguez", visits: 22, lastVisit: "2025-05-05", type: "Peatón", method: entryMethods[2] },
    { id: 3, name: "Carmen Silva", visits: 18, lastVisit: "2025-05-03", type: "Peatón", method: entryMethods[1] },
    { id: 4, name: "Pablo Torres", visits: 14, lastVisit: "2025-05-02", type: "Peatón", method: entryMethods[3] },
    { id: 5, name: "Sofía López", visits: 12, lastVisit: "2025-05-01", type: "Peatón", method: entryMethods[0] },
  ];
};

// Component to show icon based on entry method
const EntryMethodIcon = ({ method }: { method: string }) => {
  switch (method) {
    case "QR":
      return <QrCode className="h-4 w-4 text-green-500" />;
    case "Fácil":
      return <BadgePercent className="h-4 w-4 text-purple-500" />;
    case "Huella":
      return <Fingerprint className="h-4 w-4 text-amber-500" />;
    case "Tarjeta":
      return <CreditCard className="h-4 w-4 text-pink-500" />;
    default:
      return null;
  }
};

const COLORS = ["#10b981", "#8b5cf6", "#f59e0b", "#ec4899"];

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

const PedestrianAnalytics = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });
  const [analysisView, setAnalysisView] = useState("overview");
  const [accessMethodFilter, setAccessMethodFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();

  const hourlyData = useMemo(() => generateHourlyData(), []);
  const dailyData = useMemo(() => generateDailyData(), []);
  const accessMethodData = useMemo(() => generateAccessMethodData(), []);
  
  // Filter access method data based on selected filter
  const filteredAccessMethodData = useMemo(() => {
    if (accessMethodFilter === "all") {
      return accessMethodData;
    }
    return accessMethodData.filter(item => item.id === accessMethodFilter);
  }, [accessMethodFilter, accessMethodData]);

  const frequentVisitors = useMemo(() => generateFrequentVisitors(), []);

  const filteredVisitors = useMemo(() => 
    frequentVisitors.filter(visitor => 
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [frequentVisitors, searchTerm]
  );

  return (
    <Card className="shadow-sm mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary dark:text-primary" />
          Análisis de Accesos Peatonales
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DateRangePicker date={date} setDate={setDate} />
        
        <div className="space-y-4">
          <Tabs value={analysisView} onValueChange={setAnalysisView} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="hourly">Por Hora</TabsTrigger>
              <TabsTrigger value="methods">Métodos de Acceso</TabsTrigger>
              <TabsTrigger value="tables">Visitantes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Daily Traffic Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Accesos Diarios</CardTitle>
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
                            stroke="#10b981" 
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
                
                {/* Access Method Comparison */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Métodos de Acceso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={accessMethodData}
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
                            {accessMethodData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                  </CardContent>
                </Card>
              </div>
              
              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-2xl md:text-3xl font-bold">
                        {dailyData.reduce((acc, day) => acc + day.entrada, 0)}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Total Entradas</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-2xl md:text-3xl font-bold">
                        {dailyData.reduce((acc, day) => acc + day.salida, 0)}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Total Salidas</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-2xl md:text-3xl font-bold">
                        {Math.max(...hourlyData.map(h => h.entrada + h.salida))}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Máximo por Hora</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-2xl md:text-3xl font-bold">58%</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Acceso Recurrente</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="hourly">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Accesos por Hora</CardTitle>
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
                        <Bar dataKey="entrada" name="Entradas" fill="#10b981" />
                        <Bar dataKey="salida" name="Salidas" fill="#3b3f48" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="methods">
              <div className="flex mb-4 flex-wrap gap-2">
                <Button
                  variant={accessMethodFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAccessMethodFilter("all")}
                >
                  Todos
                </Button>
                <Button
                  variant={accessMethodFilter === "qr" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAccessMethodFilter("qr")}
                  className="flex items-center gap-1"
                >
                  <QrCode className="h-4 w-4" /> QR
                </Button>
                <Button
                  variant={accessMethodFilter === "easy" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAccessMethodFilter("easy")}
                  className="flex items-center gap-1"
                >
                  <BadgePercent className="h-4 w-4" /> Fácil
                </Button>
                <Button
                  variant={accessMethodFilter === "fingerprint" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAccessMethodFilter("fingerprint")}
                  className="flex items-center gap-1"
                >
                  <Fingerprint className="h-4 w-4" /> Huella
                </Button>
                <Button
                  variant={accessMethodFilter === "card" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAccessMethodFilter("card")}
                  className="flex items-center gap-1"
                >
                  <CreditCard className="h-4 w-4" /> Tarjeta
                </Button>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Métodos de Acceso Peatonal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredAccessMethodData.length > 1 ? (
                    // For multiple methods, show pie chart
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={filteredAccessMethodData}
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
                            {filteredAccessMethodData.map((entry, index) => (
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
                    // For single method, show bar chart
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={filteredAccessMethodData.map(method => ({ name: method.name, visits: method.value }))}
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
                            name="Accesos" 
                            fill={filteredAccessMethodData.length > 0 ? filteredAccessMethodData[0].color : "#10b981"} 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Method details */}
                  {accessMethodFilter !== "all" && filteredAccessMethodData.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">Detalles de Acceso</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {accessMethodFilter === "qr" && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Acceso QR</h4>
                            <p className="text-sm text-muted-foreground">Los códigos QR se utilizan principalmente para visitantes temporales y proveedores.</p>
                          </div>
                        )}
                        {accessMethodFilter === "easy" && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Acceso Fácil</h4>
                            <p className="text-sm text-muted-foreground">Sistema de acceso rápido para residentes y personal autorizado.</p>
                          </div>
                        )}
                        {accessMethodFilter === "fingerprint" && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Huella Digital</h4>
                            <p className="text-sm text-muted-foreground">Sistema biométrico de alta seguridad para acceso a áreas restringidas.</p>
                          </div>
                        )}
                        {accessMethodFilter === "card" && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Tarjeta de Acceso</h4>
                            <p className="text-sm text-muted-foreground">Tarjetas RFID utilizadas por personal y residentes registrados.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tables">
              <div className="space-y-4">
                <Input
                  placeholder="Buscar visitante..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Visitantes Frecuentes</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Visitante</TableHead>
                          <TableHead className="hidden md:table-cell">Tipo</TableHead>
                          <TableHead className="hidden md:table-cell">Método</TableHead>
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
                                  <User className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                </span>
                                {visitor.name}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1 text-gray-700 dark:text-gray-300" />
                                {visitor.type}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex items-center">
                                <EntryMethodIcon method={visitor.method} />
                                <span className="ml-1">{visitor.method}</span>
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
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default PedestrianAnalytics;
