
// Data generation helper functions
export const generateHourlyData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    vehicular: Math.floor(Math.random() * 30) + 5,
    entrada: Math.floor(Math.random() * 50) + 5,
    salida: Math.floor(Math.random() * 40) + 5,
    total: Math.floor(Math.random() * 80) + 10,
  }));
};

export const generateDailyData = (days = 7) => {
  const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  return Array.from({ length: days }, (_, i) => ({
    day: dayNames[i % 7],
    vehicular: Math.floor(Math.random() * 150) + 30,
    entrada: Math.floor(Math.random() * 180) + 40,
    salida: Math.floor(Math.random() * 150) + 40,
    total: Math.floor(Math.random() * 350) + 80,
  }));
};

export const generateLaneData = () => {
  return [
    { 
      name: "Carril Propietarios", 
      value: 540, 
      color: "#b5cb22", 
      id: "propietarios" 
    },
    { 
      name: "Carril Visitantes QR", 
      value: 320, 
      color: "#8ba313", 
      id: "visitantesQR" 
    },
    { 
      name: "Carril Visitantes", 
      value: 210, 
      color: "#626e0e", 
      id: "visitantes" 
    },
  ];
};

export const generateExitLaneData = () => {
  return [
    { 
      name: "Salida Propietarios", 
      value: 480, 
      color: "#b5cb22", 
      id: "salidaPropietarios" 
    },
    { 
      name: "Salida Visitantes", 
      value: 320, 
      color: "#626e0e", 
      id: "salidaVisitantes" 
    },
  ];
};

export const generateFrequentVisitors = () => {
  const entryMethods = ["QR", "Tag"];
  return [
    { id: 1, name: "Juan Pérez", visits: 23, lastVisit: "2025-05-04", type: "Vehículo", method: entryMethods[0] },
    { id: 2, name: "Ana López", visits: 19, lastVisit: "2025-05-05", type: "Vehículo", method: entryMethods[1] },
    { id: 3, name: "Carlos Ruiz", visits: 15, lastVisit: "2025-05-03", type: "Vehículo", method: entryMethods[0] },
    { id: 4, name: "María González", visits: 12, lastVisit: "2025-05-02", type: "Vehículo", method: entryMethods[1] },
    { id: 5, name: "Roberto Díaz", visits: 10, lastVisit: "2025-05-01", type: "Vehículo", method: entryMethods[0] },
  ];
};

export const generateAddressVisits = () => {
  const entryMethods = ["QR", "Tag"];
  return [
    { id: 1, address: "Bloque A, Apto 101", visits: 45, residents: 3, lastVisit: "2025-05-05", method: entryMethods[0] },
    { id: 2, address: "Bloque B, Apto 205", visits: 38, residents: 2, lastVisit: "2025-05-04", method: entryMethods[1] },
    { id: 3, address: "Bloque C, Apto 310", visits: 29, residents: 4, lastVisit: "2025-05-05", method: entryMethods[0] },
    { id: 4, address: "Bloque D, Apto 402", visits: 23, residents: 2, lastVisit: "2025-05-03", method: entryMethods[1] },
    { id: 5, address: "Bloque A, Apto 206", visits: 19, residents: 1, lastVisit: "2025-05-02", method: entryMethods[0] },
  ];
};
