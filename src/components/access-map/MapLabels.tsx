
const MapLabels = () => {
  return (
    <>
      {/* Top label */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-300 px-4 py-0.5 rounded text-sm font-medium">
        Almax +
      </div>
      
      {/* Bottom label */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-slate-300 px-4 py-0.5 rounded text-sm font-medium">
        Entrada Principal
      </div>
      
      {/* Left label - Vertical labels on left side */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4">
        <div className="bg-slate-300 px-2 py-0.5 rounded text-xs font-medium rotate-90 w-20 text-center mb-8">
          Acceso Vehicular
        </div>
        <div className="bg-slate-300 px-2 py-0.5 rounded text-xs font-medium h-24 flex items-center transform -rotate-90 w-24 justify-center">
          Propietario
        </div>
        <div className="bg-slate-300 px-2 py-0.5 rounded text-xs font-medium h-24 flex items-center transform -rotate-90 w-24 justify-center">
          Visita
        </div>
      </div>
      
      {/* Right label - Vertical labels on right side */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4">
        <div className="bg-slate-300 px-2 py-0.5 rounded text-xs font-medium rotate-90 w-20 text-center mb-8">
          Acceso Vehicular
        </div>
        <div className="bg-slate-300 px-2 py-0.5 rounded text-xs font-medium h-24 flex items-center transform rotate-90 w-24 justify-center">
          Propietario
        </div>
        <div className="bg-slate-300 px-2 py-0.5 rounded text-xs font-medium h-24 flex items-center transform rotate-90 w-24 justify-center">
          Propietario / Visita con QR
        </div>
        <div className="bg-slate-300 px-2 py-0.5 rounded text-xs font-medium h-24 flex items-center transform rotate-90 w-24 justify-center">
          Visita
        </div>
      </div>
    </>
  );
};

export default MapLabels;
