<script lang="ts" setup>
import { instance } from "../../../../api";
import { Order } from "../../../../types";
import { ref } from "vue";
import { statusToText } from "../../../../utilities";
const props = defineProps<{ id: number }>();

const order = ref<Order>();
const loadOrderById = () => {
  instance
    .get<Order>(`/shipments/${props.id}`)
    .then(({ data }) => (order.value = data));
};
loadOrderById();

const cancel = (id :number) => {
    instance.post(`/shipments/cancel/${id}`)
}
</script>

<template>
  <div v-if="order !== undefined">
    <a-row>
      <a-col :span="12">
        <h2>Status for: #{{ order.id }}</h2>
      </a-col>
      <a-col :span="12" align="end" v-if="order.status !== 0">
        <a-button @click="cancel(id)" type="primary" :disabled="order.status >= 4"
          >Cancel</a-button
        >
      </a-col>
    </a-row>
    <ul style="list-style-type: none; padding-left: 0">
      <li>
        <b>Start:</b> {{ order.fromWarehouse.name }} ({{
          order.fromWarehouse.location.name
        }})
      </li>
      <li>
        <b>Destination:</b> {{ order.toWarehouse.name }} ({{
          order.toWarehouse.location.name
        }})
      </li>
      <li><b>Price:</b> ${{ order.price }}</li>
      <li><b>Mass:</b> {{ order.mass }}kg</li>
      <li v-if="order.employee !== null">
        <b>Picked up by:</b> {{ order.employee.firstName }}
        {{ order.employee.lastName }}
      </li>
    </ul>

    <h2>Order status</h2>
    <br />
    <br />

    <a-timeline style="display: flex" v-if="order.status !== 0">
      <a-timeline-item
        v-for="i in 6"
        :key="i"
        :color="i <= order.status ? 'green' : 'red'"
      >
        <b :style="{ color: i <= order.status ? 'green' : 'gray' }">{{
          statusToText(i)
        }}</b>
      </a-timeline-item>
    </a-timeline>
    <template v-else>
      <a-result
        status="warning"
        title="Your order has been cancelled!"
      >
      
        <template #extra>
          <a-button key="console" type="primary" href="/client/pages/neworder">Create a new one</a-button>
        </template>
      </a-result>
    </template>
  </div>
</template>
<style scoped>
:deep(.ant-timeline-item) {
  padding-right: 20px;
  min-width: calc(20% - 20px);
}
:deep(.ant-timeline-item-tail) {
  position: absolute;
  top: -20px;
  left: 4px;
  height: 1px;
  width: calc(100% - 10px);
  background: #f0f0f0;
}
:deep(.ant-timeline-item-head) {
  top: -25px;
}
/* :deep(.ant-timeline-item.ant-timeline-item-last >.ant-timeline-item-head-blue) {
    top:-25px;
} */
:deep(.ant-timeline-item-content) {
  min-height: 0;
  margin-left: 0;
}
</style>
