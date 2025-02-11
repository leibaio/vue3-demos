// @ts-ignore
import { Module } from "vuex";

interface CountState {
  count: number;
}

const countModule: Module<CountState, any> = {
  namespaced: true,
  state: () => ({
    count: 0,
  }),
  mutations: {
    countAdd(state: any) {
      state.count += 1;
    },
  },
  actions: {
    countAdd({ commit }: any) {
      commit("countAdd");
    },
  },
  getters: {
    filterCount: (state: any) => state.count * 2,
  },
};

export default countModule;
