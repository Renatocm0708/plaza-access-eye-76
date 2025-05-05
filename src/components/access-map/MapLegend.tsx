
import { CircleCheck, CircleX, DoorOpen, DoorClosed } from "lucide-react";

const MapLegend = () => {
  return (
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
        <div className="flex items-center">
          <DoorOpen className="h-4 w-4 text-emerald-500 mr-1" />
          <span>Abierto</span>
        </div>
        <div className="flex items-center ml-2">
          <DoorClosed className="h-4 w-4 text-slate-700 mr-1" />
          <span>Cerrado</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
