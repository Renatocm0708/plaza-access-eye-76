
import { useState } from "react";

export interface AccessPoint {
  id: string;
  name: string;
  type: "barrier";
  online: boolean;
  open: boolean;
}

export const useAccessPoints = () => {
  // Mock data for access points - only vehicle barriers
  const [accessPoints, setAccessPoints] = useState<AccessPoint[]>([
    // Vehicular barriers
    { id: "b1", name: "Barrera 8", type: "barrier", online: true, open: false },
    { id: "b2", name: "Barrera 7", type: "barrier", online: true, open: true },
    { id: "b3", name: "Barrera 2", type: "barrier", online: true, open: false },
    { id: "b4", name: "Barrera 4", type: "barrier", online: true, open: false },
    { id: "b5", name: "Barrera 6", type: "barrier", online: false, open: false },
    { id: "b6", name: "Barrera 1", type: "barrier", online: true, open: true },
    { id: "b7", name: "Barrera 3", type: "barrier", online: true, open: false },
    { id: "b8", name: "Barrera 5", type: "barrier", online: true, open: false },
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
