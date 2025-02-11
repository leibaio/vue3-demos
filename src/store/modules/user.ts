// @ts-ignore
import { Module } from "vuex";
interface UserState {
  name: string;
}
const userModule: Module<UserState, any> = {
  namespaced: true,
  state: () => ({
    name: "",
  }),
  mutations: {
    setName(state: any, name: string) {
      state.name = name;
    },
  },
  actions: {
    updateName({ commit }: any, name: string) {
      commit("setName", name);
    },
  },
  getters: {
    userName: (state: any) => state.name,
  },
};
export default userModule;
