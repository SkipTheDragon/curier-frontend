<script lang="ts" setup>
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { useStore } from "../../../store";
import { instance } from "../../../api";
import { provide, ref } from "vue";
import EmployeeForm from "../components/EmployeeForm.vue";
import AdminContainer from "../components/AdminContainer.vue";
import { Employee } from "../../../types";
import { openNotification } from "../../../utilities";

const store = useStore();

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    slots: { title: "customTitle", customRender: "name" },
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "firstName",
  },
  {
    title: "Username",
    key: "user",
    dataIndex: "user",
    slots: { customRender: "user" },
  },
  {
    title: "Roles",
    key: "roles",
    dataIndex: "user",
    slots: { customRender: "roleList" },
  },
  {
    title: "Action",
    key: "action",
    slots: { customRender: "action" },
  },
];
let tableData = ref<Object>();

const fetchEmployees = () => {
  instance
    .get("employees", {
      withCredentials: true,
    })
    .then(({ data }) => {
      tableData.value = data;
    });
};

fetchEmployees(); // init

const deleteRecord = (id: number) => {
  openNotification(
    "Employee Deleted!",
    "",
    "blue"
  );
  instance.delete(`employees/${id}`).then(() => fetchEmployees());
};

const visible = ref<boolean>(false);
const currentEdit = ref<Employee>();
const confirmLoading = ref<boolean>(false);
const send = ref<boolean>(false);

const edit = (record: Employee) => {
  visible.value = true;
  currentEdit.value = record;
};

const handleOk = (callback: Function) => {
  send.value = true;
  visible.value = false;
};

provide("showModal", visible);
</script>

<template>
  <admin-container>
    <a-modal
      v-if="currentEdit !== undefined"
      :title="'Editing: ' + currentEdit.firstName + ' ' + currentEdit.lastName"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      okText="Submit"
      @ok="handleOk"
      :key="currentEdit.id"
    >
      <employee-form
        :employee="currentEdit"
        :send="send"
        @finished="send = false"
      ></employee-form>
    </a-modal>
    <a-modal
      v-else
      title="Create new employee"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      okText="Submit"
      @ok="handleOk"
    >
      <employee-form
        :employee="{}"
        :send="send"
        @finished="
          send = false;
          fetchEmployees();
        "
      ></employee-form>
    </a-modal>
    <a-row justify="between" style="width: 100%">
      <a-col :span="12"><h2>Employee Table</h2></a-col>
      <a-col align="end" :span="12"
        ><a-button type="primary" @click="visible = true"
          >Add new Employee</a-button
        ></a-col
      >
    </a-row>
    <br />
    <a-table :columns="columns" :data-source="tableData">
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #customTitle>
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
      <template #user="{ text: user }">
        <span>
          {{ user.username }}
        </span>
      </template>
      <template #roleList="{ text: roleList }">
        <a-tag v-for="role in roleList.roles" :key="role.id">
          <span>
            {{ role.name }}
          </span>
        </a-tag>
      </template>
      <template #action="{ record }">
        <span>
          <a href="#" @click="edit(record)">Edit</a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="Are you sure delete this employee?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="deleteRecord(record.id)"
          >
            <a href="#">Delete</a>
          </a-popconfirm>
        </span>
      </template>
    </a-table>
  </admin-container>
</template>
