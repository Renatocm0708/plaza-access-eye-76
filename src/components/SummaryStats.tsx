
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Car, User } from "lucide-react";

interface SummaryStatsProps {
  timeRange: string;
}

const SummaryStats = ({ timeRange }: SummaryStatsProps) => {
  // Mock data for demonstration - including pedestrian data
  const stats = {
    day: {
      total: 857,
      vehicular: 487,
      pedestrian: 370,
      firstWay: 210,
      secondWay: 175,
      thirdWay: 102,
      qrVehicular: 156,
      tagEntries: 245,
      gateEntries: 86,
      qrPedestrian: 145,
      easyAccess: 92,
      fingerprint: 83,
      cardAccess: 50
    },
    week: {
      total: 5680,
      vehicular: 3215,
      pedestrian: 2465,
      firstWay: 1512,
      secondWay: 1095,
      thirdWay: 608,
      qrVehicular: 842,
      tagEntries: 1650,
      gateEntries: 723,
      qrPedestrian: 895,
      easyAccess: 645,
      fingerprint: 550,
      cardAccess: 375
    },
    month: {
      total: 26432,
      vehicular: 15248,
      pedestrian: 11184,
      firstWay: 6450,
      secondWay: 5834,
      thirdWay: 2964,
      qrVehicular: 3625,
      tagEntries: 7750,
      gateEntries: 3873,
      qrPedestrian: 4325,
      easyAccess: 3012,
      fingerprint: 2458,
      cardAccess: 1389
    }
  };

  const currentStats = stats[timeRange as keyof typeof stats];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Ingresos totales</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentStats.total.toLocaleString()}</div>
          <div className="flex space-x-4 mt-1">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
              <span className="text-xs">{currentStats.vehicular.toLocaleString()} Vehicular</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></div>
              <span className="text-xs">{currentStats.pedestrian.toLocaleString()} Peatonal</span>
            </div>
          </div>
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
          <CardTitle className="text-sm font-medium text-slate-500">Acceso QR</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(currentStats.qrVehicular + currentStats.qrPedestrian).toLocaleString()}</div>
          <div className="flex space-x-4 mt-1">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
              <span className="text-xs">{currentStats.qrVehicular.toLocaleString()} Vehicular</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></div>
              <span className="text-xs">{currentStats.qrPedestrian.toLocaleString()} Peatonal</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Ingresos desde Garita</CardTitle>
          <User className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentStats.gateEntries.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">
            {timeRange === "day" ? "Hoy" : timeRange === "week" ? "Esta semana" : "Este mes"}
          </p>
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
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(currentStats.firstWay / currentStats.vehicular) * 100}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-600 mb-1">Segunda vía</p>
              <div className="text-xl font-bold">{currentStats.secondWay.toLocaleString()}</div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(currentStats.secondWay / currentStats.vehicular) * 100}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-600 mb-1">Tercera vía</p>
              <div className="text-xl font-bold">{currentStats.thirdWay.toLocaleString()}</div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(currentStats.thirdWay / currentStats.vehicular) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Acceso peatonal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-xs text-slate-600 mb-1">QR</p>
              <div className="text-xl font-bold">{currentStats.qrPedestrian.toLocaleString()}</div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${(currentStats.qrPedestrian / currentStats.pedestrian) * 100}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-600 mb-1">Fácil Acceso</p>
              <div className="text-xl font-bold">{currentStats.easyAccess.toLocaleString()}</div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${(currentStats.easyAccess / currentStats.pedestrian) * 100}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-600 mb-1">Huella</p>
              <div className="text-xl font-bold">{currentStats.fingerprint.toLocaleString()}</div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${(currentStats.fingerprint / currentStats.pedestrian) * 100}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-600 mb-1">Tarjeta</p>
              <div className="text-xl font-bold">{currentStats.cardAccess.toLocaleString()}</div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                <div className="bg-pink-500 h-1.5 rounded-full" style={{ width: `${(currentStats.cardAccess / currentStats.pedestrian) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryStats;
