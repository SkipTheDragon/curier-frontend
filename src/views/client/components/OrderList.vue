<script lang="ts" setup>
import { SearchOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, toRefs } from "vue";
import { instance } from "../../../api";
import { Order, Warehouse } from "../../../types";
import { statusToText } from "../../../utilities";
import OrderList1 from "../../../components/OrderList.vue";
const showDrawer = () => {
  visible.value = true;
};

const onClose = () => {
  visible.value = false;
};
const visible = ref<boolean>(false);


</script>

<template>
  <a-drawer
    title="Your orders"
    placement="right"
    :closable="false"
    :visible="visible"
    :width="812"
    @close="onClose"
  >
   <OrderList1 v-if="visible" action-page="client-pages-order-id" endpoint="myshipments"></OrderList1>
  </a-drawer>
  <a-button
    type="primary"
    @click="
      showDrawer();
    "
    >Orders</a-button
  >
</template>
