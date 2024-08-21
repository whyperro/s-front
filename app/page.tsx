'use client'

import Footer from "@/components/layout/Footer";
import Logo from "@/components/misc/Logo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const onClick = () => {
    router.push('/login')
  }

  return (
    <div className="w-full h-screen flex bg-sky-100">
      <div style={{
        borderRadius: '0 99% 99% 0',
      }} className="w-full h-full bg-clouds bg-cover relative animate-moveBackground">
        <motion.div key="plane"
          initial={{ x: -650, y: 750 }}
          transition={{
            duration: 1.5,
            bounce: 0.40,
            type: "spring"
          }}

          animate={{ x: 0, y: 0 }}
          whileHover={{ scale: 1.1 }}
          exit={{ opacity: 0 }}>
          <Image className="absolute top-56 -right-40 " src={'/plane3.webp'} width={850} height={850} alt="avion" />
        </motion.div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <Logo />
          <Button onClick={onClick}>Iniciar Sesión - v2.0</Button>
        </div>
        <Footer />
      </div>
    </div>
  );
}
