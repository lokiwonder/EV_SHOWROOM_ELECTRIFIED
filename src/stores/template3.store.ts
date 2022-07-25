import create from 'zustand';

//        interface
interface Template_3_State {
  first: boolean;
  setFirst: () => void;
  notFirst: () => void;
}
//        interface

//        function
const useStore = create<Template_3_State>((set) => ({
  first: true,
  setFirst: () =>
    set((state) => ({
      ...state,
      first: true,
    })),
  notFirst: () =>
    set((state) => ({
      ...state,
      first: false,
    })),
}));
//        function

export default useStore;
