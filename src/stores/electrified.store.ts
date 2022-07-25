import create from 'zustand';

import { Electrified } from '@interface';
import { DATA } from '@function';

//        interface
interface ElectrifiedState {
  electrifies: Electrified[];
  initElectirified: (data: any) => void;
  setElectirified: (data: any, language: string) => void;
}
//        interface

//        function
const getElectrified = (data: any, language: string): Electrified[] => {
  if (data)
    for (const translation of data) if (language === translation.language) return translation.electrifies;
  else return null;
};
const useStore = create<ElectrifiedState>((set) => ({
  electrifies: null,
  initElectirified: (data) => {
    const electrifies = getElectrified(data.translations, data.setting.default_language);
    set((state) => ({
      ...state,
      electrifies,
    }));
  },
  setElectirified: (data, language) => {
    const electrifies = getElectrified(data.translations, language);
    set((state) => ({
      ...state,
      electrifies,
    }));
  },
}));
//        function

export default useStore;
