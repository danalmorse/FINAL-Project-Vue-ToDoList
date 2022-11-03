<!-- This is the Edit Task in List component --------------------------------------------->
<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '../stores/task.js';

    //variables declaration
const taskStore = useTaskStore();
const { errors } = storeToRefs(taskStore);
const router = useRouter();
const route = useRoute();
const id = ref(route.params.id);
const title = ref(route.query.title);
const newTitle = ref('');

let errorVar = ref(false);
let errorDply = reactive(errors);


onMounted(async () => {
    errorDply.value = null
});

const errorDisplay = computed({
    set: (value) => {
        errorVar.value = value
    }
});

    //edit task in list with error and redirect to Task List after edited
const editTaskList = async (id, newTitle) => {
    try {
        if (newTitle) {
            await taskStore.editTask(id, newTitle)
            newTitle = ''
            if (errorDply.value != null) {
                errorDisplay.value = true
            }
            else {
                router.push({ path: '/To-Do-List' })
            }
        }
        else {
            errorDply.value = "Error!!!: please try again. "
            errorDisplay.value = true
        }
    } catch (e) {
        console.log(e)
    }
};
</script>

<template>
    <main class=" d-flex flex-column justify-content-center bg-light">
        <div class="container pt-5 pb-5" >
            <div class="text-muted mt-2 text-center">Task to be edited</div>
            <div class="text fs-6 card bg">
                <div class="card-body">
                    {{ title }}
                </div>
            </div>
            <form class="mt-4" @submit.prevent="editTaskList(id, newTitle)">
                <div class="text-center">
                    <label class="text-muted" for="task">New edited Task</label>
                    <input id="title" type="text" class="form-control text-muted" placeholder="--> enter edited task <--"
                        v-model="newTitle" />
                </div>
                <div class="d-flex justify-content-between align-items-baseline">
                    <router-link to="/To-Do-List" class="btn btn-secondary" style="width: 47%">Go to tasks list </router-link>
                    <button id="myEditBtn" class="mt-3 btn btn-warning" type="submit" style="width: 48%"> + Edit task </button>
                </div>
            </form>

            <!-- Error Message-->
            <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert" v-if="errorVar">
                <strong> {{ errorDply }} </strong> Enter task information.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                    @click="errorVar = !errorVar"></button>
            </div>
        </div>
    </main>
</template>

<style scoped>



#myEditBtn:hover {
    background-color: #dfa926;
}
</style>