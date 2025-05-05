
import AccessPointIcon from "./AccessPointIcon";

interface AccessPoint {
  id: string;
  name: string;
  type: "barrier" | "door";
  online: boolean;
  open: boolean;
}

interface AccessPointsGroupProps {
  title?: string;
  position: "top-left" | "top-right" | "bottom-right" | "bottom-left";
  points: AccessPoint[];
  onToggle: (id: string, property: "online" | "open") => void;
}

const AccessPointsGroup = ({ position, points, onToggle }: AccessPointsGroupProps) => {
  const positionClasses = {
    "top-left": "absolute top-24 left-24 flex space-x-16",
    "top-right": "absolute top-24 right-24 flex space-x-16",
    "bottom-right": "absolute bottom-24 right-24 flex space-x-16",
    "bottom-left": "absolute bottom-24 left-24 flex space-x-16",
  };
  
  return (
    <div className={positionClasses[position]}>
      {points.map(point => (
        <button 
          key={point.id} 
          onClick={() => onToggle(point.id, "open")}
          className="flex flex-col items-center group"
        >
          <AccessPointIcon point={point} />
          <span className="mt-2 text-xs font-medium opacity-80 group-hover:opacity-100">
            {point.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default AccessPointsGroup;
