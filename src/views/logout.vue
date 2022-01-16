<script lang="ts" setup>
import { logout } from "../utilities";
import { useStore } from "../store";
import {useRouter} from "vue-router";

const store = useStore();
if(store.state.isAuth === true) {
  logout();
} 
  useRouter().push("/login");

</script>

<template>

</template>
