
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
    </>
  );
};

export default MapLabels;
