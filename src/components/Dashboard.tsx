import { useState, useEffect } from "react";
import SummaryStats from "./SummaryStats";
import KeyIndicators from "./KeyIndicators";
import AccessMap from "./AccessMap";
import AccessAlerts from "./AccessAlerts";
import DeviceStatus from "./DeviceStatus";
import VisitAnalytics from "./VisitAnalytics";
import { Sun, Moon, FileText } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import * as XLSX from 'xlsx';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("day");
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  const handleExportData = () => {
    if (!dateRange?.from || !dateRange?.to) {
      alert("Por favor seleccione un rango de fechas para exportar");
      return;
    }
    
    // Generar datos de ejemplo para exportar - solo vehiculares
    const data = [
      ["Fecha", "Tipo", "Nombre", "Dirección", "Tipo Acceso", "Método", "Entrada/Salida"],
      [format(new Date(), "yyyy-MM-dd HH:mm:ss"), "Visitante", "Juan Pérez", "Bloque A, Apto 101", "Vehicular", "QR", "Entrada"],
      [format(new Date(), "yyyy-MM-dd HH:mm:ss"), "Residente", "María Gómez", "Bloque B, Apto 205", "Vehicular", "Tag", "Entrada"],
      [format(new Date(), "yyyy-MM-dd HH:mm:ss"), "Visitante", "Carlos López", "Bloque A, Apto 101", "Vehicular", "Personal", "Salida"],
      [format(new Date(), "yyyy-MM-dd HH:mm:ss"), "Residente", "Ana Rodríguez", "Bloque C, Apto 310", "Vehicular", "Tag", "Salida"],
    ];
    
    // Crear libro de Excel y hoja
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Añadir la hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, "Registros de Acceso");
    
    // Generar el archivo de Excel y descargarlo
    XLSX.writeFile(wb, `registros_acceso_${format(dateRange.from, "yyyy-MM-dd")}_${format(dateRange.to, "yyyy-MM-dd")}.xlsx`);
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <img 
            src="/lovable-uploads/0ccdcd89-fe7a-4b2a-9256-05bafa7f6d27.png" 
            alt="SafeLand Logo" 
            className="h-10"
          />
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">Dashboard de Control de Acceso</h2>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
          <div className="flex flex-row items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden md:inline">Exportar Datos</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3" align="end">
                <div className="space-y-3">
                  <h3 className="font-medium">Seleccione rango de fechas</h3>
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    className="p-3 pointer-events-auto"
                  />
                  <div className="pt-2 flex justify-end">
                    <Button 
                      onClick={handleExportData}
                      className="bg-lime-500 hover:bg-lime-600"
                    >
                      Exportar Excel
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <Switch 
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
              <Moon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-1 rounded-md text-sm font-medium ${
                timeRange === "day" ? "bg-lime-500 dark:bg-lime-600 text-white" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
              onClick={() => setTimeRange("day")}
            >
              Día
            </button>
            <button
              className={`px-4 py-1 rounded-md text-sm font-medium ${
                timeRange === "week" ? "bg-lime-500 dark:bg-lime-600 text-white" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
              onClick={() => setTimeRange("week")}
            >
              Semana
            </button>
            <button
              className={`px-4 py-1 rounded-md text-sm font-medium ${
                timeRange === "month" ? "bg-lime-500 dark:bg-lime-600 text-white" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
              onClick={() => setTimeRange("month")}
            >
              Mes
            </button>
          </div>
        </div>
      </div>
      
      {/* Summary Stats Section */}
      <SummaryStats timeRange={timeRange} />
      
      {/* Key Indicators & Access Alerts & Device Status - Improved layout for mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <KeyIndicators timeRange={timeRange} />
        </div>
        <div className="lg:col-span-1">
          <div className="grid grid-cols-1 gap-6">
            <AccessAlerts />
            <DeviceStatus />
          </div>
        </div>
      </div>
      
      {/* Visit Analytics - Improved for mobile */}
      <div className="mt-6">
        <VisitAnalytics />
      </div>
      
      {/* Access Map - Improved for mobile */}
      <div className="mt-6">
        <AccessMap />
      </div>
    </div>
  );
};

export default Dashboard;
