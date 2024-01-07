import create from 'zustand';

export interface StoreState {
  nekoData: any[];
  fetchNeko: () => Promise<void>;
}

const useStore = create<StoreState>((set) => ({
  nekoData: [],
  fetchNeko: async () => {
    try {
      const response = await fetch('https://nekos.best/api/v2/neko');
      const data = await response.json();
      set({ nekoData: data.results });
    } catch (error) {
      console.error('Error fetching neko data:', error);
    }
  },
}));

export default useStore;
