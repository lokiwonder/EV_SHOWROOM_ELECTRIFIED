import create from "zustand";

//        interface        //
interface DownloadStatusState {
  download_status: boolean;

  setDownloadStatus: (status: boolean) => void;
}
//        interface        //

//        function        //
const useStore = create<DownloadStatusState>((set) => ({
  download_status: false,
  setDownloadStatus: (download_status) =>
    set((state) => ({
      ...state,
      download_status,
    })),
}));
//        function        //

export default useStore;
