
import { DoorClosed, DoorOpen } from "lucide-react";

interface AccessPoint {
  id: string;
  name: string;
  type: "barrier" | "door";
  online: boolean;
  open: boolean;
}

interface AccessPointIconProps {
  point: AccessPoint;
}

const AccessPointIcon = ({ point }: AccessPointIconProps) => {
  // Size determined by point type
  const size = point.type === "barrier" ? "h-12 w-12" : "h-10 w-10";
  
  // Status indicator (small dot in the corner)
  const StatusIndicator = () => (
    <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${point.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
  );
  
  if (point.type === "barrier") {
    // Use a different color for barriers
    return point.open ? (
      <div className="relative">
        <DoorOpen className={`${size} text-blue-500`} />
        <StatusIndicator />
      </div>
    ) : (
      <div className="relative">
        <DoorClosed className={`${size} text-slate-700`} />
        <StatusIndicator />
      </div>
    );
  } else {
    // Doors
    return point.open ? (
      <div className="relative">
        <DoorOpen className={`${size} text-emerald-500`} />
        <StatusIndicator />
      </div>
    ) : (
      <div className="relative">
        <DoorClosed className={`${size} text-slate-700`} />
        <StatusIndicator />
      </div>
    );
  }
};

export default AccessPointIcon;
