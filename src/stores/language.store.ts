import create from 'zustand';

//        interface        //
interface LanguageState {
  language: string;

  setLanguage: (language: string) => void;
}
//        interface        //

//        function        //
const useStore = create<LanguageState>((set) => ({
  language: 'en',
  setLanguage: (language) =>
    set((state) => ({
      ...state,
      language,
    })),
}));
//        function        //

export default useStore;
