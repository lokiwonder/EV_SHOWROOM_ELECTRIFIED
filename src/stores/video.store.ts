import { VideoURL } from '@class';
import create from 'zustand';

//        interface        //
interface VideoState {
  videos: Array<VideoURL>;

  setVideos: (videos: Array<VideoURL>) => void;
}
//        interface        //

//        function        //
const useStore = create<VideoState>((set) => ({
    videos: [],
    setVideos: (videos: Array<VideoURL>) =>
    set((state) => ({
      ...state,
      videos,
    })),
}));
//        function        //

export default useStore;
