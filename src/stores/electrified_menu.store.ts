import create from 'zustand';

//        interface        //
interface MenuState {
  hide: boolean;

  setHide: () => void;
  setShow: () => void;
}
//        interface        //

//        function        //
const useStore = create<MenuState>((set) => ({
  hide: true,
  setHide: () =>
    set(() => ({
      hide: true,
    })),
  setShow: () =>
    set(() => ({
      hide: false,
    })),
}));
//        function        //

export default useStore;
