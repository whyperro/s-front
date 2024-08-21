import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { User } from "@/types/user"
import { Trash2, UserPen } from "lucide-react"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
  
const UserInfoCard = ({user}: {
  user: User
}) => {
  return (
    <Card className="w-[380px]">
      <CardHeader>
          <div className="flex flex-col items-center justify-between">
          <Image className="rounded-full" alt="profile picture" src={'/kanye.png'} width={250} height={250} />  
            <div className="flex flex-col gap-2 items-center">
              <CardTitle className="text-4xl">{user.first_name} {user.last_name}</CardTitle>
              <CardDescription>
                <Badge className="bg-black text-[10px]">Administrador</Badge>
              </CardDescription>
            </div>
          </div>
      </CardHeader>
      <CardFooter className="flex justify-center items-center gap-4">
        <Button className="hover:scale-110 transition-all ease-in duration-100"><UserPen className="size-5"/></Button>

        <Button variant={'destructive'} className="hover:scale-110 transition-all ease-in duration-100"><Trash2 className="size-4 "/></Button>
      </CardFooter>
    </Card>

  )
}

export default UserInfoCard