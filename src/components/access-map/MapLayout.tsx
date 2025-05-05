
import MapLabels from "./MapLabels";
import MapLegend from "./MapLegend";
import AccessPointsGroup from "./AccessPointsGroup";
import { useAccessPoints } from "./useAccessPoints";

const MapLayout = () => {
  const { getPointsByIds, toggleAccessPoint } = useAccessPoints();
  
  // Group access points by position
  const barrierPoints = getPointsByIds(["b1", "b2"]);
  const topRightPoints = getPointsByIds(["p1", "p2", "p3"]);
  const bottomRightPoints = getPointsByIds(["p4", "p5", "p6"]);
  
  return (
    <div className="relative bg-slate-100 rounded-lg p-6 h-[500px]">
      {/* Plaza outline */}
      <div className="absolute inset-10 border-2 border-slate-300 rounded-lg"></div>
      
      <MapLabels />
      
      {/* Access Points Groups */}
      <AccessPointsGroup 
        position="top-left" 
        points={barrierPoints} 
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
