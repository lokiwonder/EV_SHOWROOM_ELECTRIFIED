import create from 'zustand';

//        interface        //
interface LoadState {
    load_status: boolean;

  setLoad: () => void;
}
//        interface        //

//        function        //
const useStore = create<LoadState>((set) => ({
    load_status: false,
  setLoad: () =>
    set((state) => ({
      ...state,
      load_status: true,
    })),
}));
//        function        //

export default useStore;
