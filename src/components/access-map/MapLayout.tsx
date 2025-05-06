
import MapLabels from "./MapLabels";
import MapLegend from "./MapLegend";
import AccessPointsGroup from "./AccessPointsGroup";
import { useAccessPoints } from "./useAccessPoints";
import VerticalSeparators from "./VerticalSeparators";
import LaneLabels from "./LaneLabels";

const MapLayout = () => {
  const { getPointsByIds, toggleAccessPoint } = useAccessPoints();
  
  // Group access points by position
  const leftBarrierPoints = getPointsByIds(["b1", "b2"]);
  const topRightPoints = getPointsByIds(["b3", "b4", "b5"]);
  const bottomRightPoints = getPointsByIds(["b6", "b7", "b8"]);
  
  return (
    <div className="relative bg-slate-100 rounded-lg p-6 h-[500px]">
      {/* Plaza outline */}
      <div className="absolute inset-10 border-2 border-slate-300 rounded-lg"></div>
      
      <MapLabels />
      <VerticalSeparators />
      <LaneLabels />
      
      {/* Access Points Groups */}
      <AccessPointsGroup 
        position="top-left" 
        points={leftBarrierPoints} 
        onToggle={toggleAccessPoint} 
      />
      
      <AccessPointsGroup 
        position="top-right" 
        points={topRightPoints} 
        onToggle={toggleAccessPoint} 
      />
      
      <AccessPointsGroup 
        position="bottom-right" 
        points={bottomRightPoints} 
        onToggle={toggleAccessPoint} 
      />
      
      <MapLegend />
    </div>
  );
};

export default MapLayout;
