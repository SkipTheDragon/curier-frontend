<script lang="ts" setup>
import { defineComponent, ref, watch } from "vue";
import {
  MailOutlined,
  QqOutlined,
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined,
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
        id="dddddd"
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
            <router-link :to="{ name: 'admin-employee' }">
              Dashboard
            </router-link>
          </template>
          <template #expandIcon> </template>
        </a-sub-menu>
        <a-sub-menu key="sub2" @titleClick="titleClick">
          <template #icon>
            <AppstoreOutlined />
          </template>
          <template #title>CRUD</template>
          <a-menu-item key="5"
            ><router-link :to="{ name: 'admin-employee' }"
              >Manage Employees</router-link
            ></a-menu-item
          >
          <a-menu-item key="6"
            ><router-link :to="{ name: 'admin-employee' }"
              >Manage Warehouses</router-link
            ></a-menu-item
          >
          <a-menu-item key="7"
            ><router-link :to="{ name: 'admin-employee' }"
              >Manage Clients</router-link
            ></a-menu-item
          >
          <a-menu-item key="8"
            ><router-link :to="{ name: 'admin-employee' }"
              >Manage Users</router-link
            ></a-menu-item
          >
          <a-menu-item key="9"
            ><router-link :to="{ name: 'admin-employee' }"
              >Manage Locations</router-link
            ></a-menu-item
          >
        </a-sub-menu>
      </a-menu></a-col
    >
    <a-col :span="16">
      <slot></slot>
    </a-col>
  </a-row>
</template>
