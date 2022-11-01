<!-- This is the Edit Task in List component -->

<script setup>

import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../stores/task.js'

//For router link
const router = useRouter()

// Data from task
const route = useRoute()
const id = ref(route.params.id)
const title = ref(route.query.title)
const newTitle = ref('')

//Displaying errors in banner
const taskStore = useTaskStore()
const { errors } = storeToRefs(taskStore)
let errorMsg = reactive(errors)
let isError = ref(false)

onMounted(async () => {
    errorMsg.value = null
});

const showError = computed({
    set: (value) => {
        isError.value = value
    }
})

const modifyTask = async (id, newTitle) => {
    try {
        if (newTitle) {
            await taskStore.editTask(id, newTitle)
            newTitle = ''
            if (errorMsg.value != null) {
                //Display error
                showError.value = true
            }
            else {
                //Redirect to dashboard after successful edit
                router.push({ path: '/To-Do-List' })
            }
        }
        else {
            errorMsg.value = "Error!!!: Error something went wrong, please try again. "
            showError.value = true
        }
    } catch (e) {
        console.log(e)
    }
}
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
            <form class="mt-4" @submit.prevent="modifyTask(id, newTitle)">
                <div class="text-center">
                    <label class="text-muted" for="task">New edited Task</label>
                    <input id="title" type="text" class="form-control text-muted" placeholder="--> enter edited task <--"
                        v-model="newTitle" />
                </div>
                <div class="d-flex justify-content-between align-items-baseline">
                    <router-link to="/To-Do-List" class="btn btn-secondary" style="width: 47%">&lt; Go to your list </router-link>
                    <button id="myEditBtn" class="mt-3 btn btn-warning" type="submit" style="width: 48%"> + Edit task </button>
                </div>
            </form>

            <!-- Error banner-->
            <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert" v-if="isError">
                <strong> {{ errorMsg }} </strong> Task should be at least 4 characters long.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                    @click="isError = !isError"></button>
            </div>
        </div>
    </main>
</template>

<style scoped>



#myEditBtn:hover {
    background-color: #dfa926;
}
</style>