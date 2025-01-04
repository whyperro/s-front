'use client'

import { UserNav } from "@/components/layout/UserNav";
import { SheetMenu } from "@/components/sidebar/SheetMenu";
import CompanySelect from "../selects/CompanySelect";
import { ThemeToggler } from "./ThemeToggler";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import useEcho from '@/hooks/echo/useEcho';
import { User } from "@/types";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
interface NavbarProps {
  title: string;
}
interface EchoEvent {
  message: string;
  userId: User;
}

export function Navbar({ title }: NavbarProps) {

  const { user } = useAuth();
  const echo = useEcho()
  useEffect(() => {
    if (echo && user?.id) {
      const channel = echo.private(`dispatch-notification.${user.id}`).listen(
        'NotificationHangar74Event',
        (event: EchoEvent) => {
          if (event.userId.id === user.id) {
            toast.success("Notificación", {
              description: event.message
            });
          }
        }
      );
      console.log(channel)
      // Cleanup listener when the component unmounts or dependencies change
      return () => {
        channel.stopListening('NotificationHangar74Event');
        echo.leave(`dispatch-notification.${user.id}`);
      };
    }
  }, [echo, user?.id]);
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center justify-center">
        <div className="flex flex-1 items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <CompanySelect />
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ThemeToggler />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
