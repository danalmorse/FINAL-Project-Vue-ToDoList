// /store/task.js



import { defineStore } from 'pinia';
import { supabase } from '../supabase';

// Lets Create a store using Pinia 
export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: null,
    errors: null, /* Agregue este de A */
  }),

  actions: {
    async fetchTasks () {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: true });
      this.tasks = tasks;
    },
  
    async createTask(newTask) {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .insert([{
            user_id: newTask.user_id,
            title: newTask.title.value,
            is_complete: newTask.is_complete,
            /*inserted_at: newTask.inserted_at*/
          }])
          .select()
        this.errors = null;
        if (error) throw error
      } catch (error) {
        this.errors = "Error!!!: Something went wrong, please try again. "
      }
    },

    async editTask(id, title) {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .update({ title: title })
          .eq('id', id)
        this.errors = null;
        if (error) throw error
      } catch (error) {
        this.errors = "Error!!!: Error something went wrong, please try again. "
      }
    },

    async toogleCompleted(id, isComplete) {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .update({ is_complete: isComplete })
          .eq('id', id)
          /*.match({ id })*/
        this.errors = null;
        if (error) throw error
      } catch (error) {
        this.errors = "Error!!!: Error completing task, please try again. "
      }
    },
    
    async deleteTask(id) {
      try {
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('id', id)
        this.errors = null;
        if (error) throw error
      } catch (error) {
        this.errors = "Error!!!: Error deleting task, please try again."
      }
    },
  },

    persist: {
      enabled: true,
      strategies: [
        {
          key: "tasks",
          storage: localStorage,
        },
  
        {
          key: "errors",
          storage: localStorage,
        },
      ],
    },
  });
