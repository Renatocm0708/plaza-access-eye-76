
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";
import { Car } from "lucide-react";

import DateRangePicker from "./visit-analytics/DateRangePicker";
import OverviewTab from "./visit-analytics/OverviewTab";
import HourlyTab from "./visit-analytics/HourlyTab";
import LanesTab from "./visit-analytics/LanesTab";
import TablesTab from "./visit-analytics/TablesTab";

const VisitAnalytics = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });
  const [analysisView, setAnalysisView] = useState("overview");

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5 text-primary dark:text-primary" />
          Análisis de Visitas Vehiculares
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DateRangePicker date={date} setDate={setDate} />
        
        <div className="space-y-4">
          <Tabs value={analysisView} onValueChange={setAnalysisView} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="hourly">Por Hora</TabsTrigger>
              <TabsTrigger value="lanes">Por Carril</TabsTrigger>
              <TabsTrigger value="tables">Visitantes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <OverviewTab />
            </TabsContent>
            
            <TabsContent value="hourly">
              <HourlyTab />
            </TabsContent>
            
            <TabsContent value="lanes">
              <LanesTab />
            </TabsContent>
            
            <TabsContent value="tables">
              <TablesTab />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitAnalytics;
