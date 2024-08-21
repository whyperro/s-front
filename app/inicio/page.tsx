'use client';
import { ContentLayout } from '@/components/layout/ContentLayout';
import DashboardTabs from '@/components/misc/DashboardTabs';
import WelcomePage from '@/components/misc/WelcomePage';
import { useCompanyStore } from '@/stores/CompanyStore';
import { useRouter } from 'next/navigation';

const DashboardPage =  () => {

  const router = useRouter();

  const {selectedCompany, selectedStation} = useCompanyStore()

    if(selectedCompany && selectedStation){
      return router.push(`/${selectedCompany.toLowerCase().split(" ").join("")}/dashboard`)
    }

    return (
    <>
      <WelcomePage />
    </>
  )
}

export default DashboardPage
