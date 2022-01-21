<script setup lang="ts">
import OrderList from '../../components/OrderList.vue';
import EmployeeContainer from './components/EmployeeContainer.vue';
</script>
<template>
<EmployeeContainer>
       <OrderList endpoint="shipments/free" action-page="employee-pages-order-id"></OrderList>
</EmployeeContainer>
</template>