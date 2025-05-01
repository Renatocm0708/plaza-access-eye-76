
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleX } from "lucide-react";

const DeviceStatus = () => {
  // Mock data for device status
  const devices = [
    { id: 1, name: "Barrera 1", type: "vehicular", online: true, open: false },
    { id: 2, name: "Barrera 2", type: "vehicular", online: true, open: true },
    { id: 3, name: "Torniquete 1", type: "pedestrian", online: true, open: false },
    { id: 4, name: "Torniquete 2", type: "pedestrian", online: false, open: false },
    { id: 5, name: "Torniquete 3", type: "pedestrian", online: true, open: false },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Estado de Dispositivos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {devices.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
              <div className="flex items-center">
                <div 
                  className={`h-2.5 w-2.5 rounded-full mr-2 ${device.online ? "bg-green-500" : "bg-red-500"}`}
                ></div>
                <span className="text-sm font-medium">{device.name}</span>
              </div>
              <div className="flex items-center">
                <Badge 
                  className={`${device.online 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"} mr-2`}
                >
                  {device.online ? "Online" : "Offline"}
                </Badge>
                <Badge 
                  className={`${device.open 
                    ? "bg-emerald-100 text-emerald-800" 
                    : "bg-slate-100 text-slate-800"}`}
                >
                  {device.open ? "Abierto" : "Cerrado"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceStatus;
