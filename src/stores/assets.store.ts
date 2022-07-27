import { IAssetValue } from '@interface';
import create from 'zustand';

//        interface        //
interface AssetsState {
  asset_list: Array<IAssetValue>;

  setAssetList: (asset_list: Array<IAssetValue>) => void;
}
//        interface        //

//        function        //
const useStore = create<AssetsState>((set) => ({
  asset_list: [],
  setAssetList: (asset_list) =>
    set((state) => ({
      ...state,
      asset_list,
    })),
}));
//        function        //

export default useStore;
