import create from 'zustand';

import { Electrified } from '@interface';
import * as R from 'ramda';

//        interface        //
interface SelectVehicleState {
  selected_electrified: string;

  selectVehicle: (selected_vehicle: string) => void;
  getSelectedVehicleIndex: (electrified_name: string, electrifies: Electrified[]) => number;
  resetSelectVehicle: () => void;
}
//        interface        //

const useStore = create<SelectVehicleState>((set) => ({
  // description: 
  selected_electrified: '',
  // description: 
  selectVehicle: (selected_electrified: string) =>
    set((state) => ({
      selected_electrified,
    })),
  // description: 
  getSelectedVehicleIndex: (electrified_name, electrifies) => 
    R.findIndex(R.propEq('electrified_item_name', electrified_name))(electrifies),
  // description: 
  resetSelectVehicle: () =>
    set((state) => ({
      selected_electrified: '',
    })),
}));

export default useStore;
