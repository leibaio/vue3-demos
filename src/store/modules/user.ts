// @ts-ignore
import { Module } from "vuex";
interface UserState {
  name: string;
  token: string;
}
const userModule: Module<UserState, any> = {
  namespaced: true,
  state: () => ({
    name: "",
    token: "",
  }),
  mutations: {
    setName(state: UserState, name: string) {
      state.name = name;
    },
    setToken(state: UserState, token: string) {
      state.token = token;
    },
  },
  actions: {
    updateName({ commit }: any, name: string) {
      commit("setName", name);
    },
    updateToken({ commit }: any, token: string) {
      commit("setToken", token);
      localStorage.setItem("userToken", token);
    },
  },
  getters: {
    userName: (state: UserState) => state.name,
    userToken: (state: UserState) => state.token,
  },
};
export default userModule;
