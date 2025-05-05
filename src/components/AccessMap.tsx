
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MapLayout from "./access-map/MapLayout";

const AccessMap = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Mapa de Acceso</CardTitle>
      </CardHeader>
      <CardContent>
        <MapLayout />
      </CardContent>
    </Card>
  );
};

export default AccessMap;
