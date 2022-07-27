import { AssetValue } from '@interface';
import create from 'zustand';

//        interface        //
interface AssetsState {
  asset_list: Array<AssetValue>;

  setAssetList: (asset_list: Array<AssetValue>) => void;
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
