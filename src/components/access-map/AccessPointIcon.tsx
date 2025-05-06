
import { DoorClosed, DoorOpen } from "lucide-react";

interface AccessPoint {
  id: string;
  name: string;
  type: "barrier";
  online: boolean;
  open: boolean;
}

interface AccessPointIconProps {
  point: AccessPoint;
}

const AccessPointIcon = ({ point }: AccessPointIconProps) => {
  // Size for barriers
  const size = "h-12 w-12";
  
  // Status indicator (small dot in the corner)
  const StatusIndicator = () => (
    <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${point.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
  );
  
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
};

export default AccessPointIcon;
