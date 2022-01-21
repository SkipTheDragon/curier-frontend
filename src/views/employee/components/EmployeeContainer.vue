<script lang="ts" setup>
import { defineComponent, ref, watch } from "vue";
import {
  MailOutlined,
  QqOutlined,
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined,
  BarChartOutlined
} from "@ant-design/icons-vue";
const selectedKeys = ref<string[]>(["1"]);
const openKeys = ref<string[]>(["sub1"]);
const handleClick = (e: Event) => {};
const titleClick = (e: Event) => {};
// watch(
//   () => openKeys,
//   (val) => {
//   }
// );
</script>

<template>
  <a-row>
    <a-col :span="8"
      ><a-menu
        style="width: 256px"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        @click="handleClick"
      >
        <a-sub-menu key="sub1" @titleClick="titleClick">
          <template #icon>
            <HomeOutlined />
          </template>
          <template #title>
            <router-link :to="{ name: 'employee' }"> Free Orders </router-link>
          </template>
          <template #expandIcon> </template>
        </a-sub-menu>
        <a-sub-menu key="sub1" @titleClick="titleClick">
          <template #icon>
            <BarChartOutlined />
          </template>
          <template #title>
            <router-link :to="{ name: 'employee-pages-my-orders' }">  My Orders </router-link>
          </template>
          <template #expandIcon> </template>
        </a-sub-menu>
      </a-menu></a-col
    >
    <a-col :span="16">
      <slot></slot>
    </a-col>
  </a-row>
</template>
