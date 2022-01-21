<script lang="ts" setup>
import EmployeeContainer from '../components/EmployeeContainer.vue';
import OrderList from '../../../components/OrderList.vue';

</script>

<template>
    <EmployeeContainer>
        <OrderList endpoint="shipments/taken" action-page="employee-pages-order-id"></OrderList>
    </EmployeeContainer>
</template>