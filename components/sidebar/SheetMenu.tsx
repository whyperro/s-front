'use client';

import { MenuIcon } from "lucide-react";
import Link from "next/link";

import { Menu } from "@/components/sidebar/Menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useCompanyStore } from "@/stores/CompanyStore";
import CompanySelectMobile from "../selects/CompanySelectMobile";

export function SheetMenu() {

  const { selectedCompany, selectedStation } = useCompanyStore()

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-[40px]"
            variant="link"
            asChild
          >
            <Link href={selectedCompany === "hangar 74" ? "/hangar74/dashboard" : "/transmandu/dashboard"} className="flex items-center gap-2">
              <Image src={'/logo.png'} width={150} height={150} alt="Logo" />
            </Link>
          </Button>
        </SheetHeader>
        <CompanySelectMobile />
        {
          selectedCompany && selectedStation ? <Menu isOpen company={selectedCompany} /> :

            <p className="text-sm text-muted-foreground text-center mt-10">Por favor, seleccione una <strong>Empresa</strong> y una <strong>Estacion</strong>.</p>
        }
      </SheetContent>
    </Sheet>
  );
}
