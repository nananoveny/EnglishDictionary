import create from "zustand";
import axios from "axios";

import { BASE_URL } from "../config/config";

let store = (set: any) => ({
  data: [],
  dictionaryFetch: async (text: string) => {
    const response = await axios.get(BASE_URL + text);
    set({ data: await response.data[0] });
  },
});

const useDictionaryStore = create(store);
export default useDictionaryStore;
