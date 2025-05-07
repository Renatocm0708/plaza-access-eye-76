
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Car } from "lucide-react";
import EntryMethodIcon from "./EntryMethodIcon";
import { generateFrequentVisitors, generateAddressVisits } from "@/utils/visitAnalyticsData";

const TablesTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const frequentVisitors = useMemo(() => generateFrequentVisitors(), []);
  const addressVisits = useMemo(() => generateAddressVisits(), []);

  const filteredVisitors = useMemo(() => 
    frequentVisitors.filter(visitor => 
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [frequentVisitors, searchTerm]
  );
  
  const filteredAddresses = useMemo(() => 
    addressVisits.filter(address => 
      address.address.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [addressVisits, searchTerm]
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Buscar visitante o dirección..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />
      
      <Tabs defaultValue="visitors">
        <TabsList className="mb-4">
          <TabsTrigger value="visitors">Visitantes Frecuentes</TabsTrigger>
          <TabsTrigger value="addresses">Visitas por Dirección</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visitors">
          <Card>
            <CardContent className="p-0 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Visitante</TableHead>
                    <TableHead className="hidden md:table-cell">Vehículo</TableHead>
                    <TableHead className="hidden md:table-cell">Método</TableHead>
                    <TableHead className="text-right">Visitas</TableHead>
                    <TableHead className="text-right">Última Visita</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVisitors.map((visitor) => (
                    <TableRow key={visitor.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <span className="md:hidden mr-2">
                            <Car className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                          </span>
                          {visitor.name}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <Car className="h-4 w-4 mr-1 text-gray-700 dark:text-gray-300" />
                          {visitor.type}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <EntryMethodIcon method={visitor.method} />
                          <span className="ml-1">{visitor.method}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{visitor.visits}</TableCell>
                      <TableCell className="text-right">{visitor.lastVisit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="addresses">
          <Card>
            <CardContent className="p-0 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dirección</TableHead>
                    <TableHead className="text-right">Residentes</TableHead>
                    <TableHead>Método más usado</TableHead>
                    <TableHead className="text-right">Visitas</TableHead>
                    <TableHead className="text-right hidden md:table-cell">Última Visita</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAddresses.map((address) => (
                    <TableRow key={address.id}>
                      <TableCell className="font-medium">{address.address}</TableCell>
                      <TableCell className="text-right">{address.residents}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <EntryMethodIcon method={address.method} />
                          <span className="ml-1">{address.method}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{address.visits}</TableCell>
                      <TableCell className="text-right hidden md:table-cell">{address.lastVisit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TablesTab;
