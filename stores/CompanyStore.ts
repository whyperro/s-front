import { create } from "zustand";

interface CompanyState {
    selectedCompany: 'transmandu' | 'hangar 74' | null;
    selectedStation: 'transmandu' | 'hangar 74' | null;
}

interface CompanyActions {
    setSelectedCompany: (company: 'transmandu' | 'hangar 74' ) => void;
    setSelectedStation: (station: 'transmandu' | 'hangar 74') => void;
    initFromLocalStorage: () => void;
    reset: () => void;
}

const initialState: CompanyState = {
    selectedCompany: null,
    selectedStation: null,
  }

export const useCompanyStore = create<CompanyState & CompanyActions>((set) => ({
    selectedCompany: null,
    selectedStation: null,
    setSelectedCompany: (company) => {
        set({ selectedCompany: company });
        localStorage.setItem('selectedCompany', company);
    },
    setSelectedStation: (station) => {
        set({ selectedStation: station });
        localStorage.setItem('selectedStation', station);
    },
    initFromLocalStorage: () => {
        const savedSelectedCompany = localStorage.getItem('selectedCompany') as 'transmandu' | 'hangar 74';
        if (savedSelectedCompany) {
            set({ selectedCompany: savedSelectedCompany });
        }

        const savedSelectedStation = localStorage.getItem('selectedStation') as 'transmandu' | 'hangar 74';
        if (savedSelectedStation) {
            set({ selectedStation: savedSelectedStation });
        }
    },
    reset: () => {
        set(initialState);
    }
}))
