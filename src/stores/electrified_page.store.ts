import create from 'zustand';

import { ChangePageArgument, ElectrifiedPageStoreArgument } from 'src/interfaces';
import { HIGHLIGHTS, CHARGING, BENEFITS } from 'src/constants';

//        interface (local)       //
interface ElectrifiedPage {
  page_class: string;
  page_length: number;
  page_present: number;
  page: any;
}

interface VehiclePageState {
  electrified_page: ElectrifiedPage;

  setMainPage: (arg: ElectrifiedPageStoreArgument) => void;
  setHighlightPage: (arg: ElectrifiedPageStoreArgument) => void;
  setChargingPage: (arg: ElectrifiedPageStoreArgument) => void;
  setBenefitPage: (arg: ElectrifiedPageStoreArgument) => void;
  increasePage: (arg: ElectrifiedPageStoreArgument) => void;
  decreasePage: (arg: ElectrifiedPageStoreArgument) => void;
  resetElectrifiedPage: () => void;
}
//        interface (local)        //

//        variable        //
const initial_electrified_page: ElectrifiedPage = {
  page_class: '',
  page_length: 0,
  page_present: 0,
  page: { type: '', image: '' },
};
//        variable        //

//        function        //
const getIncreasePage = (change_page: ChangePageArgument): any => {
  const { page_class, electrified_index, current_page, electrifies } = change_page;
  if (page_class === HIGHLIGHTS) return electrifies[electrified_index].highlights[current_page + 1];
  else if (page_class === CHARGING) return electrifies[electrified_index].charging[current_page + 1];
  else if (page_class === BENEFITS) return electrifies[electrified_index].benefits[current_page + 1];
};

const getDecreasePage = (change_page: ChangePageArgument): any => {
  const { page_class, electrified_index, current_page, electrifies } = change_page;
  if (page_class === HIGHLIGHTS) return electrifies[electrified_index].highlights[current_page - 1];
  else if (page_class === CHARGING) return electrifies[electrified_index].charging[current_page - 1];
  else if (page_class === BENEFITS) return electrifies[electrified_index].benefits[current_page - 1];
};
//        function        //

const useStore = create<VehiclePageState>((set) => ({
  // description: state 초기화
  electrified_page: initial_electrified_page,

  setMainPage: (arg: ElectrifiedPageStoreArgument) => {
    const { electrified_index, electrifies } = arg;
    const page = electrifies[electrified_index].main;
    set((state) => ({
      electrified_page: {
        page_class: 'main',
        page_length: 0,
        page_present: 0,
        page,
      },
    }));
  },
  setHighlightPage: (arg: ElectrifiedPageStoreArgument) => {
    const { electrified_index, electrifies } = arg;
    const list = electrifies[electrified_index].highlights;
    const page = electrifies[electrified_index].highlights[0];
    set((state) => ({
      electrified_page: {
        page_class: HIGHLIGHTS,
        page_length: list.length,
        page_present: 0,
        page,
      },
    }));
  },
  setChargingPage: (arg: ElectrifiedPageStoreArgument) => {
    const { electrified_index, electrifies } = arg;
    const list = electrifies[electrified_index].charging;
    const page = electrifies[electrified_index].charging[0];
    set((state) => ({
      electrified_page: {
        page_class: CHARGING,
        page_length: list.length,
        page_present: 0,
        page,
      },
    }));
  },
  setBenefitPage: (arg: ElectrifiedPageStoreArgument) => {
    const { electrified_index, electrifies } = arg;
    const list = electrifies[electrified_index].benefits;
    const page = electrifies[electrified_index].benefits[0];
    set((state) => ({
      electrified_page: {
        page_class: BENEFITS,
        page_length: list.length,
        page_present: 0,
        page,
      },
    }));
  },
  increasePage: (arg: ElectrifiedPageStoreArgument) => {
    const { electrified_index, electrifies } = arg;
    set((state) => ({
      electrified_page: {
        page_class: state.electrified_page.page_class,
        page_length: state.electrified_page.page_length,
        page_present: state.electrified_page.page_present + 1,
        page: getIncreasePage({
          page_class: state.electrified_page.page_class,
          electrified_index: electrified_index,
          current_page: state.electrified_page.page_present,
          electrifies,
        }),
      },
    }));
  },
  decreasePage: (arg: ElectrifiedPageStoreArgument) => {
    const { electrified_index, electrifies } = arg;
    set((state) => ({
      electrified_page: {
        page_class: state.electrified_page.page_class,
        page_length: state.electrified_page.page_length,
        page_present: state.electrified_page.page_present - 1,
        page: getDecreasePage({
          page_class: state.electrified_page.page_class,
          electrified_index: electrified_index,
          current_page: state.electrified_page.page_present,
          electrifies,
        }),
      },
    }));
  },
  resetElectrifiedPage: () =>
    set((state) => ({
      electrified_page: initial_electrified_page,
    })),
}));

export default useStore;
