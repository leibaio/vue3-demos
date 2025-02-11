// @ts-ignore
import { createStore } from "vuex";
import countModule from "./modules/count";
import userModule from "./modules/user";

// @ts-ignore
export default createStore<RootState>({
  modules: {
    count: countModule,
    user: userModule,
  },
});
