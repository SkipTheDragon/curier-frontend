<script lang="ts" setup>
import { SelectTypes } from "ant-design-vue/lib/select";
import { TableOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, toRaw, UnwrapRef, ref } from "vue";
import { instance } from "../../../api";
import { Warehouse, Order } from "../../../types";
import OrderList from "../components/OrderList.vue";
import { openNotification } from "../../../utilities";
import { RuleObject } from "ant-design-vue/lib/form/interface";

const warehouses = ref<SelectTypes["options"]>();
const warehousesFull = ref<Warehouse[]>();

instance.get("warehouses").then(({ data }) => {
  warehouses.value = data.map(
    /** @ts-ignore */
    (sdata) => {
      return {
        value: sdata.id,
        label: sdata.name + ` (${sdata.location.name})`,
      };
    }
  );
  warehousesFull.value = data;
});

const formState: UnwrapRef<Order> = reactive({
  fromWarehouse: "",
  toWarehouse: "",
  price: 0,
  mass: 0,
  status: 1,
});

const handleFinish = () => {
  const fromWarehouseObject = warehousesFull.value?.find(
    (o) => o.id === formState.fromWarehouse
  );
  const toWarehouseObject = warehousesFull.value?.find(
    (o) => o.id === formState.toWarehouse
  );
  const finalFormState: Order = toRaw(formState);
  if (fromWarehouseObject !== undefined && toWarehouseObject !== undefined) {
    finalFormState.fromWarehouse = fromWarehouseObject;
    finalFormState.toWarehouse = toWarehouseObject;
  }
  instance.post("shipments", finalFormState).then(({ data }) => {
    openNotification("Your order has been placed!", "", "#52c41a", false);
  });
};

const calcPrice = () => {
  if (formState.fromWarehouse !== "" && formState.toWarehouse !== "") {
    const price = 1.4;
    const fromWarehouseObject = warehousesFull.value?.find(
      (o) => o.id === formState.fromWarehouse
    );
    const toWarehouseObject = warehousesFull.value?.find(
      (o) => o.id === formState.toWarehouse
    );

    const distance =
      fromWarehouseObject?.location.coordX -
      toWarehouseObject?.location.coordX +
      fromWarehouseObject?.location.coordY -
      toWarehouseObject?.location.coordY;
    const finalDistance = (distance / 4) * (distance < 0 ? -1 : 1);
    const finalPrice = (finalDistance * (price * formState.mass)) / 50;
    formState.price = finalPrice / 5 < 5 ? 10 : finalPrice;
  }
};
const formRef = ref();
let checkLocations = async (rule: RuleObject, value: number) => {
  if (!value) {
    return Promise.reject("Please select one location");
  } else if(formState.fromWarehouse === formState.toWarehouse) {
      return Promise.reject("Your locations must differ")
  }
};
let checkMass = async (rule: RuleObject, value: string) => {
  if (value === "") {
    return Promise.reject("Please input mass quantity");
  } else if(value == "0") {
    return Promise.reject("Needs to be greater than 0 kg");
  }else if(parseInt(value) > 50) {
    return Promise.reject("We cant deliver such a heavy package");
  }
};


const rules = {
  fromWarehouse: [
    { required: true, validator: checkLocations, trigger: "change" },
  ],
  toWarehouse: [{ required: true, validator: checkLocations, trigger: "change" }],
  mass: [{ required: true, validator: checkMass, trigger: "change" }],
};
</script>
<template>
  <a-row justify="between" style="width: 100%">
    <a-col :span="12"><h2>New Order</h2></a-col>
    <a-col align="end" :span="12">
      <OrderList />
    </a-col>
  </a-row>
  <br />
  <a-form
    name="custom-validation"
    :model="formState"
    ref="formRef"
    :rules="rules"
    @finish="handleFinish"
  >
    <a-form-item name="fromWarehouse" has-feedback label="Current location">
      <a-select
        v-model:value="formState.fromWarehouse"
        show-search
        placeholder="Select your current location"
        :default-active-first-option="false"
        :show-arrow="false"
        :filter-option="false"
        :not-found-content="null"
        :options="warehouses"
        @change="calcPrice"
      >
      </a-select>
    </a-form-item>
    <a-form-item name="toWarehouse" has-feedback label="Location For Delivery">
      <a-select
        v-model:value="formState.toWarehouse"
        show-search
        placeholder="Select your location"
        :default-active-first-option="false"
        :show-arrow="false"
        :filter-option="false"
        :not-found-content="null"
        :options="warehouses"
        @change="calcPrice"
      >
      </a-select>
    </a-form-item>
    <a-form-item name="price" has-feedback label="Final price">
      <a-input
        placeholder="Basic usage"
        :disabled="true"
        v-model:value="formState.price"
      >
        <template #prefix> $ </template>
      </a-input>
    </a-form-item>
    <a-form-item name="mass" has-feedback label="Mass">
      <a-input
        placeholder="Basic usage"
        v-model:value="formState.mass"
        :required="true"
        :min="1"
        @change="calcPrice"
      >
        <template #prefix>
          <TableOutlined />
        </template>
        <template #suffix> kg </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">Place order</a-button>
    </a-form-item>
  </a-form>
</template>
