import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useGetUserLocationsByCompanyId } from "@/hooks/useGetUserLocationsByCompanyId";
import { useCompanyStore } from "@/stores/CompanyStore";
import { Company } from "@/types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CompanySelect = () => {

  const { user, loading: userLoading } = useAuth();

  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);

  const [stationAddress, setStationAddress] = useState<string | null>(null);

  const { mutate, data: locations, isPending: locationsLoading } = useGetUserLocationsByCompanyId();

  const { selectedCompany, selectedStation, setSelectedCompany, setSelectedStation, initFromLocalStorage } = useCompanyStore();

  const router = useRouter();

  useEffect(() => {
    initFromLocalStorage();
  }, []);


  useEffect(() => {
    if (selectedCompany) {
      const companyId = filteredCompanies.find(c => c.name.toLowerCase() === selectedCompany.toLowerCase())?.id;
      if (companyId) {
        mutate(companyId);  // Invoca la mutación con el ID de la compañía
      }
    }
  }, [selectedCompany, filteredCompanies, mutate]);

  useEffect(() => {
    if (selectedStation && locations) {
      const selectedLocation = locations.find(location => location.cod_iata === selectedStation);
      if (selectedLocation) {
        setStationAddress(selectedLocation.cod_iata);
      } else {
        setStationAddress(null);
      }
    }
  }, [selectedStation, locations]);

  const handleCompanySelect = (value: 'transmandu' | 'hangar 74') => {
    setSelectedCompany(value);
    setStationAddress(null);  // Resetea la dirección al seleccionar una nueva compañía
    if (selectedStation) {
      router.push(`/${value.split(" ").join("")}/dashboard`);
    }
  };

  const handleStationSelect = (value: 'transmandu' | 'hangar 74') => {
    setSelectedStation(value);
    const selectedLocation = locations?.find(location => location.cod_iata === value);
    if (selectedLocation) {
      setStationAddress(selectedLocation.address);
    }
  };

  return (
    <div className="flex flex-col md:hidden gap-2 mt-8 items-center mb-0">
      <Select onValueChange={handleCompanySelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={selectedCompany ? `${selectedCompany[0].toUpperCase() + selectedCompany.slice(1)}` : 'Empresa'} />
        </SelectTrigger>
        <SelectContent defaultValue={''}>
          {userLoading && <Loader2 className="size-4 animate-spin" />}
          {user && user.companies && user?.companies.map((c: Company) => (
            <SelectItem value={c.name.toLowerCase()} key={c.name}>{c.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={handleStationSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={locationsLoading ? <Loader2 className="animate-spin size-4" /> : stationAddress || 'Estación'} />
        </SelectTrigger>
        <SelectContent>
          {
            locationsLoading
              ? <Loader2 className="size-4 animate-spin" />
              : locations?.map((location) => (
                <SelectItem value={location.cod_iata} key={location.cod_iata}>{location.cod_iata}</SelectItem>
              ))
          }
        </SelectContent>
      </Select>
    </div>
  );
};

export default CompanySelect;
