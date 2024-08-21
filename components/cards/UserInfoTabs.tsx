import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { User } from "@/types/user"
import CompanyInfoCard from "./CompanyInfoCard"
import PersonalInfoCard from "./PersonalInfoCard"


const UserInfoTabs = ({user}: {
    user: User
}) => {
  return (
    <Tabs defaultValue="user_info" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2 bg-primary/30">
        <TabsTrigger value="user_info">Información de Usuario</TabsTrigger>
        <TabsTrigger value="company_info">Información de Empresa</TabsTrigger>
      </TabsList>
      <TabsContent value="user_info">
        <PersonalInfoCard user={user} />
      </TabsContent>
      <TabsContent value="company_info">
        <CompanyInfoCard user={user} />
      </TabsContent>
    </Tabs>
  )
}

export default UserInfoTabs