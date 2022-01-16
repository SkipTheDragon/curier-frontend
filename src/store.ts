// store.ts
import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import { Authenticated } from "./types";

// define injection key
export const key: InjectionKey<Store<Authenticated>> = Symbol();

export const store = createStore<Authenticated>({
  state: {
    id: -1,
    username: undefined,
    roles: undefined,
    isAuth: false,
  },
  mutations: {
    login(state, payload) {
        state.id = payload.id;
        state.username = payload.username;
        state.roles = payload.roles;
        state.isAuth = true;
    },
    logout(state) {
        state.id= -1;
        state.username= undefined;
        state.roles= undefined;
        state.isAuth= false;
    },
  },
  getters: {
    isUser: (state) => (role: string) => {
      const allowedRoles = role.split(' or ');
      const rolesFinal: string[] = [];
      allowedRoles.forEach((role) => {
          rolesFinal.push("ROLE_" + role);
      })
      return state.roles !== undefined ? state.roles.some((role) => rolesFinal.includes(role)) : false
    },
  },
  plugins: [createPersistedState()],
});
// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
