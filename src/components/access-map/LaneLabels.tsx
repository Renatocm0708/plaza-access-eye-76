
const LaneLabels = () => {
  return (
    <>
      {/* Left side lane labels */}
      <div className="absolute left-14 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4">
        <div className="absolute left-[20px] top-1/3 bg-slate-300 px-3 py-1 rounded text-xs font-medium w-20 text-center">
          Propietario
        </div>
        <div className="absolute left-[150px] top-1/3 bg-slate-300 px-3 py-1 rounded text-xs font-medium w-20 text-center">
          Visita
        </div>
      </div>
      
      {/* Right side lane labels */}
      <div className="absolute right-14 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4">
        <div className="absolute right-[260px] top-1/3 bg-slate-300 px-3 py-1 rounded text-xs font-medium w-20 text-center">
          Propietario
        </div>
        <div className="absolute right-[130px] top-1/3 bg-slate-300 px-3 py-1 rounded text-xs font-medium w-28 text-center">
          Propietario/Visita con QR
        </div>
        <div className="absolute right-[30px] top-1/3 bg-slate-300 px-3 py-1 rounded text-xs font-medium w-20 text-center">
          Visita
        </div>
      </div>
    </>
  );
};

export default LaneLabels;
