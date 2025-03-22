"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { format, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { ChevronDown } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { toast } from "sonner";

const DoubleDateFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const [date1, setDate1] = useState<DateRange | undefined>(undefined);
  const [date2, setDate2] = useState<DateRange | undefined>(undefined);
  const [daysDifference, setDaysDifference] = useState<number | null>(null);

  const pushToUrl = () => {
    const query = {
      from1: date1?.from ? format(date1.from, "yyyy-MM-dd") : undefined,
      to1: date1?.to ? format(date1.to, "yyyy-MM-dd") : undefined,
      from2: date2?.from ? format(date2.from, "yyyy-MM-dd") : undefined,
      to2: date2?.to ? format(date2.to, "yyyy-MM-dd") : undefined,
    };

    const url = qs.stringifyUrl({ url: pathname, query }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  };

  const handleFirstDateChange = (newDate: DateRange | undefined) => {
    setDate1(newDate);

    if (newDate?.from && newDate?.to) {
      const diffDays = differenceInDays(newDate.to, newDate.from);
      setDaysDifference(diffDays);
      setDate2(undefined); // Se limpia el segundo rango para permitir nueva selección
    } else {
      setDaysDifference(null);
      setDate2(undefined);
    }
  };

  const handleSecondDateChange = (newDate: DateRange | undefined) => {
    if (newDate?.from && newDate?.to) {
      const selectedDiff = differenceInDays(newDate.to, newDate.from);
      if (daysDifference !== null && selectedDiff !== daysDifference) {
        toast.error(`El rango debe ser exactamente de ${daysDifference} días`);
        return;
      }
    }
    setDate2(newDate);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Primer selector de fechas */}
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full">
            <span>
              {date1?.from && date1?.to
                ? `${format(date1.from, "dd/MM/yyyy")} - ${format(date1.to, "dd/MM/yyyy")}`
                : "Seleccionar rango 1"}
            </span>
            <ChevronDown className="size-4 ml-2 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Calendar
            mode="range"
            selected={date1}
            onSelect={handleFirstDateChange}
            numberOfMonths={2}
            locale={es}
          />
        </PopoverContent>
      </Popover>

      {/* Segundo selector de fechas */}
      <Popover>
        <PopoverTrigger asChild disabled={daysDifference === null}>
          <Button className="w-full" disabled={daysDifference === null}>
            <span>
              {date2?.from && date2?.to
                ? `${format(date2.from, "dd/MM/yyyy")} - ${format(date2.to, "dd/MM/yyyy")}`
                : "Seleccionar rango 2"}
            </span>
            <ChevronDown className="size-4 ml-2 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Calendar
            mode="range"
            selected={date2}
            onSelect={handleSecondDateChange}
            numberOfMonths={2}
            locale={es}
            disabled={daysDifference === null}
          />
        </PopoverContent>
      </Popover>

      {/* Botones de acción */}
      <div className="flex items-center gap-2">
        <Button onClick={() => { setDate1(undefined); setDate2(undefined); setDaysDifference(null); }} className="w-full" variant="outline">
          Reiniciar
        </Button>
        <Button onClick={pushToUrl} className="w-full" disabled={!date1 || !date2}>
          Aplicar
        </Button>
      </div>
    </div>
  );
};

export default DoubleDateFilter;
    