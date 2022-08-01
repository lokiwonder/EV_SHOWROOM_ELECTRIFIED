import create from "zustand";

import { Setting } from "src/interfaces";
import { DATA } from "src/function";

//        interface        //
interface SettingState {
  setting: Setting;

  setSetting: (setting: Setting) => void;
}
//        interface        //

let tmp: any;

const INIT_DATA = async () => {
  tmp = (await DATA()).setting;
};

INIT_DATA();

//        function        //
const useStore = create<SettingState>((set) => ({
  setting: tmp,
  setSetting: async (setting) => {
    set((state) => ({
      ...state,
      setting,
    }));
  }
}));

//        function        //

export default useStore;
