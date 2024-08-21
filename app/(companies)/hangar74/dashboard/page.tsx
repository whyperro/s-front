'use client';
import { ContentLayout } from '@/components/layout/ContentLayout';
import DashboardTabs from '@/components/misc/DashboardTabs';
import WelcomePage from '@/components/misc/WelcomePage';
import { useCompanyStore } from '@/stores/CompanyStore';

const DashboardPage =  () => {

    const {selectedCompany, selectedStation} = useCompanyStore();

    if(!selectedCompany || !selectedStation){
      return <WelcomePage />
    }

    return (
    <ContentLayout title='Dashboard / Hangar74'>
      <DashboardTabs/>
    </ContentLayout>
  )
}

export default DashboardPage
