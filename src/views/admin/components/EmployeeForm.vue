<script lang="ts" setup>
import { SelectTypes } from "ant-design-vue/lib/select";
import { Moment } from "moment";
import {
  defineComponent,
  inject,
  reactive,
  toRaw,
  UnwrapRef,
  Ref,
  ref,
  watch,
} from "vue";
import { instance } from "../../../api";
import { Authenticated, Employee } from "../../../types";
import { openNotification } from "../../../utilities";
import UserForm from "./UserForm.vue";

let props = defineProps<{ employee: Employee; send: Boolean }>();

const formState: UnwrapRef<Employee> = reactive(props.employee);
const showModal = inject("showModal") as Ref<Boolean>;
const options1 = ref<SelectTypes["options"]>();
const data1 = ref<Authenticated[]>();
const labelCol = { span: 4 };
const wrapperCol = { span: 14 };
const selectedUserObject = ref<Authenticated>();
const emit = defineEmits<{ (e: "finished"): void }>();

instance.get<Authenticated[]>("users").then(({ data }) => {
  options1.value = data.map(
    /** @ts-ignore */
    (sdata) => {
      return { value: sdata.id, label: sdata.username };
    }
  );
  data1.value = data;
});

const handleChange = (id: number) => {
  const user: Authenticated | undefined = data1.value?.find((o) => o.id === id);
  selectedUserObject.value = user;
};

watch(
  () => props.send,
  () => {
    if (props.send === true) {
      if (selectedUserObject.value !== undefined)
        formState.user = selectedUserObject.value;

      instance.post("/employees", toRaw(formState)).then(() => {
        emit("finished");
        openNotification(
          "Your changes have been saved!",
          `User ${formState.firstName} ${formState.lastName} has been edited successfully `,
          "#52c41a",
          false,
        );
      });
    }
  }
);
const user = ref<number | undefined>();
const addNewUser = ref<boolean>(false);
user.value = formState.user === undefined ? -1 : formState.user.id;
</script>

<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="First name">
      <a-input v-model:value="formState.firstName" />
    </a-form-item>
    <a-form-item label="Last name">
      <a-input v-model:value="formState.lastName" />
    </a-form-item>
    <a-form-item label="User">
      <a-row>
        <a-col :span="12">
          <a-select
            v-model:value="user"
            show-search
            placeholder="input search text"
            :options="options1"
            @change="handleChange"
          >
          </a-select>
        </a-col>

        <a-col :span="10" offset="2">
          <a-button type="primary" @click="addNewUser = true"
            >Add new User</a-button
          >
        </a-col>
      </a-row>
    </a-form-item>
    <UserForm
      v-if="addNewUser"
      :key="addNewUser"
      @finished="addNewUser = false"
      @cancelled="addNewUser = false"
    />
  </a-form>
</template>
