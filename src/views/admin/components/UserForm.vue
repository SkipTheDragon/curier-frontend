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
import { Authenticated, Role } from "../../../types";
import { openNotification } from "../../../utilities";

export interface User extends Authenticated {
  password: string | undefined;
}
const user = ref<User>({} as User);
user.value.password = "";

const formState: UnwrapRef<User> = reactive(user.value);

const options1 = ref<SelectTypes["options"]>();
const data1 = ref<Role[]>();
const labelCol = { span: 4, offset: 1 };
const wrapperCol = { span: 14 };
const selectedRoles = ref<Role[]>();
const emit = defineEmits<{ (e: "finished"): void; (e: "cancelled"): void }>();

instance.get<Role[]>("roles").then(({ data }) => {
  options1.value = data.map(
    /** @ts-ignore */
    (sdata) => {
      return { value: sdata.id, label: sdata.name };
    }
  );
  data1.value = data;
});

const handleChange = (id: number[]) => {
  const roles: Role[] | undefined = id.map((o) => data1.value?.find((s) => s.id === o )) as Role[];
  selectedRoles.value = roles;
};

const onSubmit = () => {
  instance.post("/users", {
    username: formState.username,
    password: formState.password,
    roles: selectedRoles.value,
  }).then(() => {
    emit("finished");
    openNotification(
      "Your changes have been saved!",
      `User ${formState.username} has been edited successfully `,
      "#52c41a",
    );
  });
};
</script>

<template>
  <div style="background: rgba(0, 0, 0, 0.01)">
    <br />

    <h4>Create new user</h4>
    <br />
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="Username">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="Password">
        <a-input v-model:value="formState.password" />
      </a-form-item>
      <a-form-item label="Role">
        <a-col :span="12">
          <a-select
            mode="multiple"
            v-model:value="formState.roles"
            show-search
            placeholder="input search text"
            :options="options1"
            @change="handleChange"
          >
          </a-select>
        </a-col>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 23, offset: 1 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px" @click="$emit('cancelled')">
          Cancel
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
