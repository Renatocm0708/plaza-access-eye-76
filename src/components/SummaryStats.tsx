
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Car } from "lucide-react";

interface SummaryStatsProps {
  timeRange: string;
}

const SummaryStats = ({ timeRange }: SummaryStatsProps) => {
  // Mock data for demonstration - only vehicular data
  const stats = {
    day: {
      total: 487,
      firstWay: 210,
      secondWay: 175,
      thirdWay: 102,
      qrVehicular: 156,
      tagEntries: 245,
      gateEntries: 86
    },
    week: {
      total: 3215,
      firstWay: 1512,
      secondWay: 1095,
      thirdWay: 608,
      qrVehicular: 842,
      tagEntries: 1650,
      gateEntries: 723
    },
    month: {
      total: 15248,
      firstWay: 6450,
      secondWay: 5834,
      thirdWay: 2964,
      qrVehicular: 3625,
      tagEntries: 7750,
      gateEntries: 3873
    }
  };

  const currentStats = stats[timeRange as keyof typeof stats];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Ingresos totales vehiculares</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentStats.total.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">
            Solo acceso vehicular
          </p>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Ingresos de Tag</CardTitle>
          <Car className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentStats.tagEntries.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">
            {timeRange === "day" ? "Hoy" : timeRange === "week" ? "Esta semana" : "Este mes"}
          </p>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Acceso QR Vehicular</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentStats.qrVehicular.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">
            Códigos QR vehiculares
          </p>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Ingresos desde Garita</CardTitle>
          <Car className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentStats.gateEntries.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">
            {timeRange === "day" ? "Hoy" : timeRange === "week" ? "Esta semana" : "Este mes"}
          </p>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm md:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Histórico por vías vehiculares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs text-slate-600 mb-1">Primera vía</p>
              <div className="text-xl font-bold">{currentStats.firstWay.toLocaleString()}</div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(currentStats.firstWay / currentStats.total) * 100}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-600 mb-1">Segunda vía</p>
              <div className="text-xl font-bold">{currentStats.secondWay.toLocaleString()}</div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(currentStats.secondWay / currentStats.total) * 100}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-600 mb-1">Tercera vía</p>
              <div className="text-xl font-bold">{currentStats.thirdWay.toLocaleString()}</div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(currentStats.thirdWay / currentStats.total) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryStats;
