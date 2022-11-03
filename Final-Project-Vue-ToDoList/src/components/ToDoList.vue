<!-- This is the right ToDoList component ----------------------------------------------->
<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user.js";
import { useTaskStore } from "../stores/task.js";
import moment from 'moment';
/*import { useRouter } from "vue-router";*/
/*const router = useRouter();*/

  //variables declaration-------------------
// User Store variables
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

// task Store variables
const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);
/*let taskList = reactive(tasks)*/

  //Get Tasks from Store

onMounted(async () => {
  try {
    await taskStore.fetchTasks()
  } catch (e) {
    console.log(e)
  }
});


// Creating new Task

const title = ref("");

const createNew = async () => {
  const newTask = {
    user_id: user.value.id,
    title: title,
    is_complete: false,
    };
    try {
        await taskStore.createTask(newTask);
        await taskStore.fetchTasks();
        title.value = '';
        
    } catch (e) {
    console.log(e);
    }
};

// Showing if task is complete

const toBeCompleted = async (taskId, completedCheck) => {
    try {
        completedCheck = !completedCheck
        await taskStore.checkpointCompleted(taskId, completedCheck)
        await taskStore.fetchTasks()
        
    } catch (e) {
        console.log(e)
    }
}

// Deleting Task
const remove = async (taskId) => {
    try {
        await taskStore.deleteTask(taskId)
        await taskStore.fetchTasks()
    } catch (e) {
        console.log(e)
    }
};

</script>

<template>
  <div class="bg-light">
    <div class="container pt-5 pb-5">
      <h2 class="text-center text-muted mt-5">Your list of things for today <span class="font-weight-bold text-primary">{{ user.email }}</span>!!!</h2>
      <h3 class="text-center text-primary">{{ moment().format("ddd, MMM Do YYYY, h:mm a")}}</h3>
      <!--Input-->
      <!--Agregue el form-->
      <form @submit.prevent="createNew">
        <div class="d-flex pt-5">
          <input
            v-model="title"
            type="text"
            placeholder="--> enter task <--"
            class="form-control"
            required
          />
          <button id="myCreateBtn" type="submit" class="btn btn-warning rounded-0">
            Create
          </button>
        </div>
      </form>

      <!--Tasks list Table-->
      <table class="table table-bordered mt-5">
        <thead>
          <tr>
            <th scope="col">Tasks list by order of entry</th>
            <th scope="col">Completed?</th>
            <th scope="col" class="text-center">Edit</th>
            <th scope="col" class="text-center">Delete</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <!--<tr v-for="(task, index) in taskList" :index="index" :task="task">-->
          <tr v-for="(task, index) in tasks" :key="index">
            <td style="width: 60%">
              <span>
                {{ task.title }}
              </span>
            </td>
            <td style="width: 10%">
                <div class="form-check" @click="toBeCompleted(task.id, task.is_complete)">
                    <input v-if="task.is_complete" type="checkbox" class="form-check-input" checked />
                    <!--<label class="form-check-label" for="save-info"></label>-->
                    <input v-else type="checkbox" class="form-check-input" />
                </div>
            </td>

            <td style="width: 10%">
                <!--<div class="text-center" @click="modifyTask(task.id, task.newTitle)">-->
              <div class="text-center">
                <router-link :to="{ name: 'EditTaskList', params: { id: task.id }, query: { title: task.title } }"
                    class="text-decoration-none text-reset">
                    <button type="submit" class="btn btn-success ms-1">Edit</button>
                </router-link>
                
                <span class="bi bi-pencil-fill"></span>
              </div>
            </td>
            <td style="width: 10%">
              <div class="text-center" @click="remove(task.id)">
              <!--<div class="text-center" @click="deleteTask(index)">-->
                <button type="submit" class="btn btn-danger">Delete</button>
                <span class="bi bi-trash-fill"></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}

#myCreateBtn:hover {
    background-color: #dfa926;
}

.finished {
  text-decoration: line-through;
}
</style>
