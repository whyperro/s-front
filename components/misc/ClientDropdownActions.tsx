import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EyeIcon, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const ClientDropdownActions = ({ dni }: { dni: string }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="flex gap-2 justify-center">
        <DropdownMenuItem
          onClick={() => {
            router.push(`/clientes/${dni}`);
          }}
        >
          <EyeIcon className="size-5" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ClientDropdownActions;
