
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleX, AlertTriangle } from "lucide-react";

const AccessAlerts = () => {
  // Mock data for alerts
  const alerts = [
    {
      id: 1,
      type: "unauthorized",
      location: "Entrada Peatonal 2",
      timestamp: "09:45",
      description: "Intento de acceso no autorizado"
    },
    {
      id: 2,
      type: "failure",
      location: "Barrera 1",
      timestamp: "08:32",
      description: "Fallo en sistema de apertura"
    },
    {
      id: 3,
      type: "unauthorized",
      location: "Entrada Peatonal 5",
      timestamp: "10:17",
      description: "QR expirado utilizado"
    }
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
          Alertas Activas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="mr-3 mt-0.5">
                <CircleX className={`h-5 w-5 ${alert.type === "unauthorized" ? "text-red-500" : "text-amber-500"}`} />
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <h4 className="font-medium text-slate-800 text-sm">{alert.location}</h4>
                  <Badge variant="outline" className="ml-2 text-xs bg-white">
                    {alert.timestamp}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600">{alert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessAlerts;
