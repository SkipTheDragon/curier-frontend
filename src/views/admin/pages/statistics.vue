<script lang="ts" setup>
import AdminContainer from "../components/AdminContainer.vue";
import { instance } from "../../../api";
import { ref, watch } from "vue";
import moment from "moment";
import { Order } from "../../../types";
import { parse } from "path/posix";

const months = ref<string[]>([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);
const selectedMonths = ref<string[]>(months.value);
const shipments = ref<Order[]>();
const values = ref<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const range = ref<string[]>([
  "2022-01-07T19:43:33.527Z",
  "2022-02-18T19:43:33.527Z",
]);

const options = {
  chart: {
    id: "vuechart-example",
  },
  xaxis: {
    categories: selectedMonths.value,
  },
};


const getShipments = () => {
  instance
    .get(
      `shipments/between/${moment(range.value[0]).format(
        "YYYY-M-D H:m:s"
      )}/${moment(range.value[1]).format("YYYY-M-D H:m:s")}`
    )
    .then(({ data }) => {
      shipments.value = data;
      shipments.value?.map((shipment) => {
        const monthNumber: number = parseInt(
          moment(shipment.createdDate).format("M")
        );
        values.value[monthNumber] =
          values.value[monthNumber] + values.value[monthNumber] === undefined
            ? 1
            : 1;
      });
    });

  selectedMonths.value = months.value.slice(
    parseInt(moment(range.value[0]).format("M")),
    parseInt(moment(range.value[1]).format("M"))
  );
};

getShipments();

watch(
  () => values,
  () => {}
);

const series = [
  {
    name: "Orders",
    data: values,
  },
];
</script>

<template>
  <AdminContainer>
    Set range between:
    <a-range-picker
      :placeholder="['Start month', 'End month']"
      valueFormat="YYYY-M-D H:m:s"
      @change="getShipments"
      v-model:value="range"
    />
    <br />
    <br />
    <template v-if="shipments?.length === 0">
      <br />
      <br />
      <a-empty />
      <br />
      <br />
    </template>
    <template v-else>
      <a-divider
        >Orders between
        <b>{{ moment(range[0]).format("dddd, MMMM Do YYYY") }}</b> -
        <b> {{ moment(range[1]).format("dddd, MMMM Do YYYY") }}</b></a-divider
      >
      <br />
      <apexchart
        :key="selectedMonths"
        type="bar"
        :options="options"
        :series="series"
      ></apexchart>
    </template>
  </AdminContainer>
</template>
