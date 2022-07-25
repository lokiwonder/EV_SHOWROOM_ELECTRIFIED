import create from 'zustand';

//        interface        //
interface GestureState {
  gesture: boolean;
  change: boolean;
  home: boolean;
  checkGesture: (type: string) => void;
  setChange: () => void;
  noChange: () => void;
  setHome: () => void;
}
//        interface        //

let gesture_timeout: NodeJS.Timeout;
let home_timeout: NodeJS.Timeout;

const useStore = create<GestureState>((set) => ({
  gesture: true,
  change: true,
  home: true,
  checkGesture: (class_name: string) => {
    // set((state) => ({
    //   home: false
    // }))
    if (class_name !== '' && class_name !== 'main') {
      set((state) => ({
        gesture: true,
      }));
      clearTimeout(gesture_timeout);
      clearTimeout(home_timeout);
      gesture_timeout = setTimeout(() => {
        set((state) => ({
          change: false,
          gesture: false,
        }))
      }, 120000);
      home_timeout = setTimeout(() => {
        set((state) => ({
          home: true
        }))
      }, 150000);
    } else {
      clearTimeout(gesture_timeout);
      clearTimeout(home_timeout);
      set((state) => ({
        gesture: true,
      }));
    }
  },
  setChange: () =>
  set((state) => ({
     change: true,
   })),
 noChange: () =>
   set((state) => ({
     change: false,
   })), 
  setHome: () => set((state) => ({
    home: false,
  })), 
}));

export default useStore;
