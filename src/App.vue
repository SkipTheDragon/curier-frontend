<script lang="ts" setup>
import { useStore } from "./store";
import { useRoute} from "vue-router"
const store = useStore();
const route = useRoute();
</script>

<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1"><router-link :to="{name: 'index'}">Home</router-link></a-menu-item>
        <a-menu-item key="2" v-if="store.getters.isUser('USER')"><router-link :to="{name: 'client-pages-newOrder'}">New Order</router-link></a-menu-item>
        <a-menu-item key="3" v-if="store.getters.isUser('EMPLOYEE')"><router-link :to="{name:'employee'}">Employee Panel</router-link></a-menu-item>
        <a-menu-item key="4" v-if="store.getters.isUser('ADMIN')"><router-link :to="{name: 'admin'}">Admin Panel</router-link></a-menu-item>
        <a-menu-item key="5" v-if="store.state.isAuth === true"><router-link :to="{name: 'logout'}">Logout</router-link></a-menu-item>
        <a-menu-item key="6" v-if="store.state.isAuth === false"><router-link :to="{name: 'login'}">Login</router-link></a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>{{route.name}}</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <router-view></router-view>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      CURier ©2069 Created by Liviu Guta
    </a-layout-footer>
  </a-layout>
</template>

<style>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme="dark"] .site-layout-content {
  background: #141414;
}
</style>
