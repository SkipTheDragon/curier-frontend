<script lang="ts" setup>
import { instance } from "../api";
import { useStore } from "../store";
import FileDownload from "js-file-download"
const store = useStore();

// instance.get("/shipments/export/").then(({data}) => {
//   FileDownload(data, 'shipments.pdf')
// });
</script>
<template>
  Welcome {{store.state.username}}
</template>