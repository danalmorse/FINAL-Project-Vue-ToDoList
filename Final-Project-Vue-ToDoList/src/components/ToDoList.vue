<!-- This is the right ToDoList component / eslint-disable prettier/prettier -->
<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user.js";
import { useTaskStore } from "../stores/task.js";
import { useRouter } from "vue-router";

/*const router = useRouter();*/
// User Store variables
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

// task Store variables
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

/*let taskList = reactive(tasks)*/



onMounted(async () => {
  try {
    await taskStore.fetchTasks()
  } catch (e) {
    console.log(e)
  }
});

//Displaying errors in banner

/*const { errors } = storeToRefs(taskStore);
let errorMsg = reactive(errors);
let isError = ref(false);
onMounted(async () => {
  errorMsg.value = null
});
const showError = computed({
  set: (value) => {
    isError.value = value;
  },
});*/

//Showing waiting animation
/*let loading = ref(false);
const triggerModal = computed({
  set: (value) => {
    loading.value = value;
  },
});*/

// Creating new Task
const title = ref("");

const createNew = async () => {
  const newTask = {
    user_id: user.value.id,
    title: title,
    is_complete: false,
    /*inserted_at: new Date(),*/
    };
    try {
        await taskStore.createTask(newTask);
        await taskStore.fetchTasks();
        title.value = '';
        /*if (errorMsg.value != null) {
        showError.value = true;
        }*/
    } catch (e) {
    console.log(e);
    }
};

// Showing if task is complete

const completed = async (taskId, isComplete) => {
    try {
        isComplete = !isComplete
        await taskStore.toogleCompleted(taskId, isComplete)
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
      <h2 class="text-center text-muted mt-5">Your list of things for today</h2>
      <!--Input-->
      <!--Agregue el form-->
      <form @submit.prevent="createNew">
        <div class="d-flex pt-5">
          <input
            v-model="title"
            type="text"
            placeholder="enter task"
            class="form-control"
          />
          <button type="submit" class="btn btn-warning rounded-0">
            Create
          </button>
          <!--<button @click="submitTask" class="btn btn-warning rounded-0">
          SUBMIT
        </button>-->
        </div>
      </form>

      <!--OTra cosa agregada de A-->
      <!-- Error banner-->
        <!--<div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="isError">
            <strong> {{ errorMsg }} </strong> Task should be at least 4 characters long.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
            @click="isError = !isError"></button>
        </div>-->



      <!--Task Table-->
      <table class="table table-bordered mt-5">
        <thead>
          <tr>
            <th scope="col">Task</th>
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
                <div class="form-check" @click="completed(task.id, task.is_complete)">
                    <input v-if="task.is_complete" type="checkbox" class="form-check-input" checked />
                    <!--<label class="form-check-label" for="save-info"></label>-->
                    <input v-else type="checkbox" class="form-check-input" />
                </div>
            </td>

            <td>
              <div class="text-center" @click="editTask(index)">
                <button type="submit" class="btn btn-success ms-1">Edit</button>
                <span class="bi bi-pencil-fill"></span>
              </div>
            </td>
            <td>
              <div class="text-center" @click="remove(task.id)">
              <!--<div class="text-center" @click="deleteTask(index)">-->
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
