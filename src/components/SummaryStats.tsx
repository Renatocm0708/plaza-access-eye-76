
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Car } from "lucide-react";

interface SummaryStatsProps {
  timeRange: string;
}

const SummaryStats = ({ timeRange }: SummaryStatsProps) => {
  // Mock data for demonstration - removed pedestrian data
  const stats = {
    day: {
      total: 487,
      vehicular: 487,
      firstWay: 210,
      secondWay: 175,
      thirdWay: 102,
      qr: 156
    },
    week: {
      total: 3215,
      vehicular: 3215,
      firstWay: 1512,
      secondWay: 1095,
      thirdWay: 608,
      qr: 842
    },
    month: {
      total: 15248,
      vehicular: 15248,
      firstWay: 6450,
      secondWay: 5834,
      thirdWay: 2964,
      qr: 3625
    }
  };

  const currentStats = stats[timeRange as keyof typeof stats];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Ingresos vehiculares</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentStats.total.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">
            {timeRange === "day" ? "Hoy" : timeRange === "week" ? "Esta semana" : "Este mes"}
          </p>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Acceso QR</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentStats.qr.toLocaleString()}</div>
          <div className="flex space-x-4 mt-1">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
              <span className="text-xs">{Math.round(currentStats.qr).toLocaleString()} Vehicular</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Histórico por vías</CardTitle>
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
