
import { useState, useEffect } from "react";
import SummaryStats from "./SummaryStats";
import KeyIndicators from "./KeyIndicators";
import AccessMap from "./AccessMap";
import AccessAlerts from "./AccessAlerts";
import DeviceStatus from "./DeviceStatus";
import VisitAnalytics from "./VisitAnalytics";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("day");
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
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
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="ml-4 dark:border-slate-700 dark:text-white">
                <Download className="h-4 w-4 mr-2" />
                Exportar Datos
              </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-slate-800 dark:text-white">
              <DialogHeader>
                <DialogTitle className="dark:text-white">Exportar Datos de Acceso</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium dark:text-gray-300">Fecha Inicial</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left font-normal dark:border-slate-700 dark:text-white"
                        >
                          {startDate ? format(startDate, 'dd/MM/yyyy', { locale: es }) : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 dark:bg-slate-700">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          className="pointer-events-auto"
                          locale={es}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium dark:text-gray-300">Fecha Final</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left font-normal dark:border-slate-700 dark:text-white"
                        >
                          {endDate ? format(endDate, 'dd/MM/yyyy', { locale: es }) : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 dark:bg-slate-700">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          className="pointer-events-auto"
                          locale={es}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <Button 
                  onClick={handleExport} 
                  className="mt-4 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Exportar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            <Switch 
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
            <Moon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
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
