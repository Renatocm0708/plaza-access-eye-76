
import { useState } from "react";

export interface AccessPoint {
  id: string;
  name: string;
  type: "barrier" | "door";
  online: boolean;
  open: boolean;
}

export const useAccessPoints = () => {
  // Mock data for access points
  const [accessPoints, setAccessPoints] = useState<AccessPoint[]>([
    // Vehicular barriers
    { id: "b1", name: "Barrera 1", type: "barrier", online: true, open: false },
    { id: "b2", name: "Barrera 2", type: "barrier", online: true, open: true },
    
    // Doors
    { id: "p1", name: "Puerta 1", type: "door", online: true, open: false },
    { id: "p2", name: "Puerta 2", type: "door", online: true, open: false },
    { id: "p3", name: "Puerta 3", type: "door", online: false, open: false },
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
  
  const getPointsByIds = (ids: string[]) => {
    return accessPoints.filter(p => ids.includes(p.id));
  };

  return {
    accessPoints,
    toggleAccessPoint,
    getPointsByIds
  };
};
