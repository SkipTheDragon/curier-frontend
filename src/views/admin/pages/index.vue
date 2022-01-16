<script lang="ts" setup>
import { ref } from "vue";
import { instance } from "../../../api";
import AdminContainer from "../components/AdminContainer.vue";

export type Statistics = {
  warehouses: number;
  users: number;
  orders: number;
};

const statistics = ref<Statistics>();
const fetchStatistics = () => {
  instance.get<Statistics>("stats").then(({ data }) => {
    statistics.value = data;
  });
};
fetchStatistics();
</script>
<template>
  <admin-container>
    <h2 style="margin-bottom: 0px">Welcome Back!</h2>
    <p style="margin-top: 0px">Take a look at how everything is going:</p>
    <br />
    <a-row>
      <a-col :span="8">
        <a-statistic title="Users" :value="statistics?.users" style="margin-right: 50px" />
      </a-col>
      <a-col :span="8">
        <a-statistic title="Orders" :value="statistics?.orders" />
      </a-col>
      <a-col :span="8">
        <a-statistic title="Warehouse" :value="statistics?.warehouses" />
      </a-col>
    </a-row>
  </admin-container>
</template>
