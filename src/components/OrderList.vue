<script lang="ts" setup>
import { SearchOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, toRefs } from "vue";
import { instance } from "../api";
import { Order, Warehouse } from "../types";
import { statusToText } from "../utilities";

const props = defineProps<{
    endpoint: string,
    actionPage: string
}>();

const visible = ref<boolean>(false);
const orders = ref<Order[]>();

const fetchOrders = () => {
  instance.get<Order[]>(props.endpoint).then(({ data }) => {
    orders.value = data;
  });
};

const state = reactive({
  searchText: '',
  searchedColumn: '',
});
const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
};

const handleReset = clearFilters => {
  clearFilters();
  state.searchText = '';
};

const searchInput = ref();
const searchBy = (value: string, record: Object) =>
  record.toString().toLowerCase().includes(value.toLowerCase());
  
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "From",
    dataIndex: "fromWarehouse.location.name",
    key: "fromWarehouse",
    slots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
      customRender: "customRender",
    },
    onFilter: (value: string, record: Order) =>
      searchBy(value, (record.fromWarehouse as Warehouse).location.name),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: "To",
    dataIndex: "toWarehouse.location.name",
    key: "toWarehouse",
    slots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
      customRender: "customRender",
    },
    onFilter: (value: string, record: Order) =>
      searchBy(value, (record.toWarehouse as Warehouse).location.name),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: "Mass",
    dataIndex: "mass",
    key: "mass",
    slots: {
      customRender: "mass",
    },
    sorter: (a: Order, b: Order) => a.mass - b.mass,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    slots: {
      customRender: "price",
    },
    // onFilter: (value: string, record: Order) => record.name.indexOf(value) === 0,
    sorter: (a: Order, b: Order) => a.price - b.price,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    slots: {
      customRender: "status",
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    slots: {
      customRender: "actions",
    },
  },
];
fetchOrders();
</script>

<template>
    <a-table :data-source="orders" :columns="columns">
      <template #status="{ text: status }">
        {{ statusToText(status) }}
      </template>
      <template #price="{ text: price }"> ${{ price }} </template>
      <template #mass="{ text: mass }"> {{ mass }} kg </template>
      <template #actions="{record}">
          <router-link :to="{name: actionPage, params: {
              id : record.id
          } }">View</router-link>
      </template>
      <template
        #filterDropdown="{
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          column,
        }"
      >
        <div style="padding: 8px">
          <a-input
            ref="searchInput"
            :placeholder="`Search ${column.title}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="
              (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
            "
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon><SearchOutlined /></template>
            Search
          </a-button>
          <a-button
            size="small"
            style="width: 90px"
            @click="handleReset(clearFilters)"
          >
            Reset
          </a-button>
        </div>
      </template>

      <template #filterIcon="filtered">
        <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>

      <template #customRender="{ text, column }">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              class="highlight"
              :key="i"
            >
              {{ fragment }}
            </mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{ text }}
        </template>
      </template>
    </a-table>
</template>
