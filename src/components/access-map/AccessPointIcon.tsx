
import { DoorClosed, DoorOpen, CircleCheck, CircleSlash } from "lucide-react";

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

export default AccessPointIcon;
