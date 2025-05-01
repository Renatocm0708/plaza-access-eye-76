/*
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
*/


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AlertItem {
  id: string;
  type: "unauthorized" | "failure";
  device: string;
  time: string;
  message: string;
}

const alerts: AlertItem[] = [
  {
    id: "1",
    type: "unauthorized",
    device: "Torniquete Entrada Principal",
    time: "Hace 5 minutos",
    message: "Intento de acceso no autorizado"
  },
  {
    id: "2",
    type: "failure",
    device: "Barrera Vehicular Este",
    time: "Hace 35 minutos",
    message: "Fallo en sensor de posición"
  },
  {
    id: "3",
    type: "unauthorized",
    device: "Torniquete Acceso Sur 2",
    time: "Hace 1 hora",
    message: "Credencial caducada"
  }
];

const AlertsPanel = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Alertas Activas</CardTitle>
          <Badge variant="outline" className="bg-status-warning/10 text-status-warning">
            {alerts.length} Activas
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-2 p-3 border-b last:border-0">
              <div className={`p-2 rounded-full ${
                alert.type === "unauthorized" ? "bg-destructive/10" : "bg-status-warning/10"
              }`}>
                <AlertCircle 
                  size={16} 
                  className={alert.type === "unauthorized" ? "text-destructive" : "text-status-warning"} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-sm truncate">{alert.device}</p>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <X size={14} />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-4">
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            Ver todas las alertas
            <ArrowRight size={12} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
