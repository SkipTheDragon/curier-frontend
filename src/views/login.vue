<script lang="ts" setup>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { reactive, UnwrapRef, h } from "vue";
import { useStore } from "../store";
import { login } from "../utilities";
import {useRouter} from "vue-router";

const store = useStore();
interface FormState {
  username: string;
  password: string;
}
const formState: UnwrapRef<FormState> = reactive({
  username: "",
  password: "",
});

if(store.state.isAuth === true) {
  useRouter().push("/");
} 

const handleFinish = (values: FormState) => login(formState);
</script>

<template>
  <a-form
    v-if="store.state.isAuth === false"
    :model="formState"
    @finish="handleFinish"
  >
    <a-form-item>
      <a-input v-model:value="formState.username" placeholder="Username">
        <template #prefix>
          <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-model:value="formState.password"
        autocomplete="off"
        type="password"
        placeholder="Password"
      >
        <template #prefix>
          <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="formState.username === '' || formState.password === ''"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>
