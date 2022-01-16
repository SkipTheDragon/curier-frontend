<script lang="ts" setup>
import { useStore } from "../store";
const store = useStore();


</script>
<template>
  Welcome {{store.state.username}}
</template>