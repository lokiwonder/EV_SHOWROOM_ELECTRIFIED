import create from 'zustand';

//        interface        //
interface UpdateStatusState {
  update_status: number;

  setUpdateStatus: (status: number) => void;
}
//        interface        //

//        function        //
const useStore = create<UpdateStatusState>((set) => ({
  update_status: 1,
  setUpdateStatus: (update_status) =>
    set((state) => ({
      ...state,
      update_status,
    })),
}));
//        function        //

export default useStore;
