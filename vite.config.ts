import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite";
import {AntDesignVueResolver} from "unplugin-vue-components/resolvers"
import Pages from "vite-plugin-pages";
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        AntDesignVueResolver(),
      ],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    Pages({
      exclude: ["**/components/*.vue"],
      dirs: [
        // issue #68
        { dir: resolve(__dirname, './src/views'), baseRoute: '' },
        { dir: 'src/features/**/pages', baseRoute: 'features' },
        { dir: 'src/views/admin/pages', baseRoute: 'admin' },
      ],
      extensions: ['vue', 'md'],
      extendRoute(route) {
        if (route.name === 'about')
          route.props = (route: any) => ({ query: route.query.q })

        if (route.name === 'components') {
          return {
            ...route,
            beforeEnter: (route: any) => {
              // eslint-disable-next-line no-console
            },
          }
        }
      },
    }),

    vue()]
})
