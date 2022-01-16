// vuex.d.ts
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface Authenticated {
    id: number;
    username: string|undefined;
    roles: string[]|undefined;
    isAuth: boolean;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<Authenticated>
  }
}