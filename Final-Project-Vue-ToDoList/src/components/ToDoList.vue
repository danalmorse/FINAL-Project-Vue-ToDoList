<!-- eslint-disable prettier/prettier -->
<script setup>
import { reactive, ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user.js";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

/*export default defineComponent({
    setup () {*/
const task = ref("");
const editedTask = ref(null);
const availableStatuses = ["to-do", "in-progress", "finished"];
let tasks = reactive([
  {
    name: "New task",
    status: "to-do",
  },
]);

function submitTask() {
  console.log(tasks);
  if (task.value.length === 0) return;

  if (editedTask.value === null) {
    tasks.push({
      name: task.value,
      status: "to-do",
    });
  } else {
    tasks[editedTask.value].name = task.value;
    editedTask.value = null;
  }
  task.value = "";
  console.log(task);
}

function deleteTask(index) {
  tasks.splice(index, 1);
}

function editTask(index) {
  task.value = tasks[index].name;
  editedTask.value = index;
}

function changeStatus(index) {
  console.log(tasks);
  let newIndex = availableStatuses.indexOf(tasks[index].status);
  if (++newIndex > 2) newIndex = 0;
  tasks[index].status = availableStatuses[newIndex];
}

onMounted(async () => {
  try {
    await userStore.fetchUser(); // here we call fetch user
    console.log(user.value);
    if (!user.value) {
      console.log("No estas logeado");
      /*await userStore.signUp("danalmorse@gmail.com", "password")*/
      console.log(user.value);

      // redirect them to logout if the user is not there
      router.push({ path: "/Sign-In" });
    } else {
      console.log("Estas logeado");
      console.log(user.value);
      // continue to dashboard
      router.push({ path: "/To-Do-List" });
    }
  } catch (e) {
    console.log(e);
  }
});

/*return { task, editedTask, availableStatuses, tasks, submitTask, deleteTask, editTask, changeStatus, onMounted}


    },
    
    
});*/
</script>

<template>
  <div class="bg-light">
    <div class="container pt-5 pb-5">
      <h2 class="text-center text-muted mt-5">Your list of things for today</h2>
      <!--Input-->
      <div class="d-flex pt-5">
        <input
          v-model="task"
          type="text"
          placeholder="enter task"
          class="form-control"
        />
        <button @click="submitTask" class="btn btn-warning rounded-0">
          SUBMIT
        </button>
      </div>
      <!--Task Table-->
      <table class="table table-bordered mt-5">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Status</th>
            <th scope="col" class="text-center">Edit</th>
            <th scope="col" class="text-center">Delete</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(task, index) in tasks" :key="index">
            <td style="width: 500px">
              <span :class="{ finished: task.status === 'finished' }">
                {{ task.name }}
              </span>
            </td>
            <td style="width: 120px">
              <span
                @click="changeStatus(index)"
                class="pointer"
                :class="{
                  'text-danger': task.status === 'to-do',
                  'text-warning': task.status === 'in-progress',
                  'text-success': task.status === 'finished',
                }"
              >
                {{ task.status }}
              </span>
            </td>
            <td>
              <div class="text-center" @click="editTask(index)">
                <button type="submit" class="btn btn-success ms-1">Edit</button>
                <span class="bi bi-pencil-fill"></span>
              </div>
            </td>
            <td>
              <div class="text-center" @click="deleteTask(index)">
                <button type="submit" class="btn btn-danger">Delete</button>
                <span class="bi bi-trash-fill"></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="position-absolute top-90 start-50 translate-middle pt-4">
        <button type="submit" class="btn btn-primary px-8">
          Save List of task
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}

.finished {
  text-decoration: line-through;
}
</style>
