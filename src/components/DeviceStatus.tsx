/*
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
*/


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Device {
  id: string;
  name: string;
  type: "peatonal" | "vehicular";
  isOnline: boolean;
  lastPing: string;
  status: "open" | "closed";
  location: string;
}

const devices: Device[] = [
  { id: "1", name: "Torniquete Principal 1", type: "peatonal", isOnline: true, lastPing: "1m ago", status: "closed", location: "Entrada Norte" },
  { id: "2", name: "Torniquete Principal 2", type: "peatonal", isOnline: true, lastPing: "1m ago", status: "closed", location: "Entrada Norte" },
  { id: "3", name: "Barrera Vehicular 1", type: "vehicular", isOnline: true, lastPing: "1m ago", status: "closed", location: "Entrada Este" },
  { id: "4", name: "Barrera Vehicular 2", type: "vehicular", isOnline: false, lastPing: "15m ago", status: "closed", location: "Entrada Oeste" },
  { id: "5", name: "Torniquete Lateral", type: "peatonal", isOnline: true, lastPing: "1m ago", status: "open", location: "Lateral Sur" },
];

const DeviceStatus = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Estado de Dispositivos</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="peatonal">Peatonal</TabsTrigger>
            <TabsTrigger value="vehicular">Vehicular</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <DeviceList devices={devices} />
          </TabsContent>
          
          <TabsContent value="peatonal" className="mt-0">
            <DeviceList devices={devices.filter(d => d.type === "peatonal")} />
          </TabsContent>
          
          <TabsContent value="vehicular" className="mt-0">
            <DeviceList devices={devices.filter(d => d.type === "vehicular")} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const DeviceList = ({ devices }: { devices: Device[] }) => {
  return (
    <div className="space-y-3">
      {devices.map((device) => (
        <div key={device.id} className="flex items-center justify-between p-3 border-b last:border-0">
          <div className="flex items-center gap-4">
            <div className={`h-2 w-2 rounded-full ${
              device.isOnline ? "bg-status-online" : "bg-status-offline"
            } animate-pulse-soft`} />
            <div>
              <p className="font-medium text-sm">{device.name}</p>
              <p className="text-xs text-muted-foreground">{device.location}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              device.status === "open" 
                ? "bg-status-open/10 text-status-online" 
                : "bg-status-closed/10 text-status-closed"
            }`}>
              {device.status === "open" ? "Abierto" : "Cerrado"}
            </span>
            <span className="text-xs text-muted-foreground">{device.lastPing}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeviceStatus;
