
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DoorClosed, DoorOpen, CircleCheck, CircleX, CircleSlash } from "lucide-react";

interface AccessPoint {
  id: string;
  name: string;
  type: "barrier" | "door";
  online: boolean;
  open: boolean;
}

const AccessMap = () => {
  // Mock data for access points
  const [accessPoints, setAccessPoints] = useState<AccessPoint[]>([
    // Vehicular barriers (top left)
    { id: "b1", name: "Barrera 1", type: "barrier", online: true, open: false },
    { id: "b2", name: "Barrera 2", type: "barrier", online: true, open: true },
    
    // Where Puerta 1 is located (x1) - first column
    { id: "p1", name: "Puerta 1", type: "door", online: true, open: false },
    { id: "p2", name: "Puerta 2", type: "door", online: true, open: false },
    { id: "p3", name: "Puerta 3", type: "door", online: false, open: false },
    
    // Where Puerta 3 is located (x2) - second column
    { id: "p4", name: "Puerta 4", type: "door", online: true, open: true },
    { id: "p5", name: "Puerta 5", type: "door", online: true, open: false },
    { id: "p6", name: "Puerta 6", type: "door", online: true, open: false },
    
    
  ]);

  // Toggle access point status (for demonstration purposes)
  const toggleAccessPoint = (id: string, property: "online" | "open") => {
    setAccessPoints(points => 
      points.map(point => 
        point.id === id 
          ? { ...point, [property]: !point[property] } 
          : point
      )
    );
  };

  const AccessPointIcon = ({ point }: { point: AccessPoint }) => {
    // Size determined by point type
    const size = point.type === "barrier" ? "h-12 w-12" : "h-10 w-10";
    
    // Status color
    const statusColor = point.online ? "text-green-500" : "text-red-500";
    
    if (point.type === "barrier") {
      // Use DoorOpen/DoorClosed for barriers too, but with a different style
      return point.open ? (
        <div className="relative">
          <DoorOpen className={`${size} text-blue-500`} />
          <CircleCheck className={`absolute -bottom-2 -right-2 h-5 w-5 ${statusColor}`} />
        </div>
      ) : (
        <div className="relative">
          <DoorClosed className={`${size} text-slate-700`} />
          <CircleSlash className={`absolute -bottom-2 -right-2 h-5 w-5 ${statusColor}`} />
        </div>
      );
    } else {
      return point.open ? (
        <div className="relative">
          <DoorOpen className={`${size} text-emerald-500`} />
          <CircleCheck className={`absolute -bottom-2 -right-2 h-5 w-5 ${statusColor}`} />
        </div>
      ) : (
        <div className="relative">
          <DoorClosed className={`${size} text-slate-700`} />
          <CircleSlash className={`absolute -bottom-2 -right-2 h-5 w-5 ${statusColor}`} />
        </div>
      );
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Mapa de Acceso</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-slate-100 rounded-lg p-6 h-[500px]">
          {/* Plaza outline */}
          <div className="absolute inset-10 border-2 border-slate-300 rounded-lg"></div>
          
          {/* Top label */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-300 px-4 py-0.5 rounded text-sm font-medium">
            Entrada Principal
          </div>
          
          {/* Bottom label */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-slate-300 px-4 py-0.5 rounded text-sm font-medium">
            Entrada Secundaria
          </div>
          
          {/* Left label */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-slate-300 px-4 py-0.5 rounded text-sm font-medium transform -rotate-90">
            Acceso Vehicular
          </div>
          
          {/* Right label - Changed to Acceso Vehicular */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-slate-300 px-4 py-0.5 rounded text-sm font-medium transform rotate-90">
            Acceso Vehicular
          </div>
          
          {/* Top left - Barriers */}
          <div className="absolute top-24 left-24 flex space-x-8">
            {accessPoints
              .filter(p => p.id === "b1" || p.id === "b2")
              .map(point => (
                <button 
                  key={point.id} 
                  onClick={() => toggleAccessPoint(point.id, "open")}
                  className="flex flex-col items-center group"
                >
                  <AccessPointIcon point={point} />
                  <span className="mt-2 text-xs font-medium opacity-80 group-hover:opacity-100">
                    {point.name}
                  </span>
                </button>
              ))}
          </div>
          
          {/* Top right - Three doors */}
          <div className="absolute top-24 right-24 flex space-x-8">
            {accessPoints
              .filter(p => ["p1", "p2", "p3"].includes(p.id))
              .map(point => (
                <button 
                  key={point.id} 
                  onClick={() => toggleAccessPoint(point.id, "open")}
                  className="flex flex-col items-center group"
                >
                  <AccessPointIcon point={point} />
                  <span className="mt-2 text-xs font-medium opacity-80 group-hover:opacity-100">
                    {point.name}
                  </span>
                </button>
              ))}
          </div>
          
          {/* Bottom right - Three doors */}
          <div className="absolute bottom-24 right-24 flex space-x-8">
            {accessPoints
              .filter(p => ["p4", "p5", "p6"].includes(p.id))
              .map(point => (
                <button 
                  key={point.id} 
                  onClick={() => toggleAccessPoint(point.id, "open")}
                  className="flex flex-col items-center group"
                >
                  <AccessPointIcon point={point} />
                  <span className="mt-2 text-xs font-medium opacity-80 group-hover:opacity-100">
                    {point.name}
                  </span>
                </button>
              ))}
          </div>
          
          {/* Bottom left - Remaining doors */}
          <div className="absolute bottom-24 left-24 flex space-x-8">
            {accessPoints
              .filter(p => ["p7", "p8", "p9"].includes(p.id))
              .map(point => (
                <button 
                  key={point.id} 
                  onClick={() => toggleAccessPoint(point.id, "open")}
                  className="flex flex-col items-center group"
                >
                  <AccessPointIcon point={point} />
                  <span className="mt-2 text-xs font-medium opacity-80 group-hover:opacity-100">
                    {point.name}
                  </span>
                </button>
              ))}
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-2 rounded-md border border-slate-200 text-xs space-y-1">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <CircleCheck className="h-4 w-4 text-green-500 mr-1" />
                <span>Online</span>
              </div>
              <div className="flex items-center ml-2">
                <CircleX className="h-4 w-4 text-red-500 mr-1" />
                <span>Offline</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DoorOpen className="h-4 w-4 text-emerald-500 mr-1" />
              <span>Abierto</span>
              <DoorClosed className="h-4 w-4 text-slate-700 ml-2 mr-1" />
              <span>Cerrado</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessMap;
