
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Device {
  id: string;
  name: string;
  isOnline: boolean;
  lastPing: string;
  status: "open" | "closed";
  location: string;
}

const devices: Device[] = [
  { id: "1", name: "Barrera Vehicular 1", isOnline: true, lastPing: "1m ago", status: "closed", location: "Entrada Norte" },
  { id: "2", name: "Barrera Vehicular 2", isOnline: true, lastPing: "1m ago", status: "closed", location: "Entrada Este" },
  { id: "3", name: "Barrera Vehicular 3", isOnline: false, lastPing: "15m ago", status: "closed", location: "Entrada Oeste" },
  { id: "4", name: "Barrera Vehicular 4", isOnline: false, lastPing: "15m ago", status: "closed", location: "Entrada Oeste" },
  { id: "5", name: "Barrera Vehicular 5", isOnline: false, lastPing: "15m ago", status: "closed", location: "Entrada Oeste" },
  { id: "6", name: "Barrera Vehicular 6", isOnline: false, lastPing: "15m ago", status: "closed", location: "Entrada Oeste" },
  { id: "7", name: "Barrera Vehicular 7", isOnline: false, lastPing: "15m ago", status: "closed", location: "Entrada Oeste" },
  { id: "8", name: "Barrera Vehicular 8", isOnline: false, lastPing: "15m ago", status: "closed", location: "Entrada Oeste" },
];

const DeviceStatus = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Estado de Dispositivos</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <DeviceList devices={devices} />
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
