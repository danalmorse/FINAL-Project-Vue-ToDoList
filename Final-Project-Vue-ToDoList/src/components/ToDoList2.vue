<script>

export default {
    data() {
        return {
            task:'',
            editedTask: null,
            availableStatuses: ['to-do', 'in-progress', 'finished'],

            tasks: [
                {
                    name: 'New task                                         ',
                    status: 'to-do'
                },
            ]
        }
    },

    methods: {
        submitTask() {
            if (this.task.length === 0)
            return;

            if (this.editedTask === null) {
                this.tasks.push({
                    number: '',
                    name: this.task,
                    status: 'to-do'
                });
            } else {
                this.tasks[this.editedTask].name = this.task;
                this.editedTask = null;
            }
            this.task = '';
        },

        deleteTask(index) {
            this.tasks.splice(index, 1);
        },

        editTask(index) {
           this.task = this.tasks[index].name; 
           this.editedTask = index;
        },

        changeStatus(index) {
            let newIndex = this.availableStatuses.indexOf(this.tasks[index].status);
            if (++newIndex > 2) newIndex = 0;
            this.tasks[index].status = this.availableStatuses[newIndex];
        },
    }
};
</script>

<template>
    <div class="bg-light">
    <div class="container pt-5 pb-5">
        <h2 class="text-center text-muted mt-5">Your list of things for today</h2>
        <!--Input-->
        <div class="d-flex pt-5">
            <input v-model="task" type="text" placeholder="enter task" class="form-control">
            <button @click="submitTask" class="btn btn-warning rounded-0">SUBMIT</button>
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
                        <span :class="{'finished': task.status === 'finished'}">
                            {{ task.name }}
                        </span>
                    </td>
                    <td style="width: 120px">
                        <span @click="changeStatus(index)" class="pointer"
                        :class="{'text-danger': task.status === 'to-do', 'text-warning': task.status === 'in-progress',
                        'text-success':task.status === 'finished'}">
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
                <button type="submit" class="btn btn-primary px-8">Save List of task</button>
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