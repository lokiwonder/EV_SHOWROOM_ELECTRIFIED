import create from "zustand";

//        interface        //
interface LoginState {
    login_status: boolean;

  setLogin: () => void;
}
//        interface        //

//        function        //
const useStore = create<LoginState>((set) => ({
  login_status: false,
  setLogin: () =>
    set((state) => ({
      ...state,
      login_status: true,
    })),
}));
//        function        //

export default useStore;
