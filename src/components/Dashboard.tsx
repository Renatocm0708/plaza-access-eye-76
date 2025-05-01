
import { useState } from "react";
import SummaryStats from "./SummaryStats";
import KeyIndicators from "./KeyIndicators";
import AccessMap from "./AccessMap";
import AccessAlerts from "./AccessAlerts";
import DeviceStatus from "./DeviceStatus";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("day");
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard de Control de Acceso</h2>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-1 rounded-md text-sm font-medium ${
              timeRange === "day" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
            }`}
            onClick={() => setTimeRange("day")}
          >
            Día
          </button>
          <button
            className={`px-4 py-1 rounded-md text-sm font-medium ${
              timeRange === "week" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
            }`}
            onClick={() => setTimeRange("week")}
          >
            Semana
          </button>
          <button
            className={`px-4 py-1 rounded-md text-sm font-medium ${
              timeRange === "month" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
            }`}
            onClick={() => setTimeRange("month")}
          >
            Mes
          </button>
        </div>
      </div>
      
      {/* Summary Stats Section */}
      <SummaryStats timeRange={timeRange} />
      
      {/* Key Indicators & Access Map */}
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
      
      {/* Access Map */}
      <div className="mt-6">
        <AccessMap />
      </div>
    </div>
  );
};

export default Dashboard;
