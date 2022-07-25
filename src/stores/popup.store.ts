import create from 'zustand';

//        interface        //
interface PopupState {
  popup: string;
  openPopup: (popup: string) => void;
  closePopup: () => void;
}
//        interface        //

const useStore = create<PopupState>((set) => ({
    popup: '',
    openPopup: (popup) =>
    set((state) => ({
        popup
    })),
    closePopup: () =>
    set((state) => ({
        popup: '',
    })),
}));

export default useStore;
