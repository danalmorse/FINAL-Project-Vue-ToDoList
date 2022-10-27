// /store/task.js

import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: null
  }),
  actions: {
    async fetchTasks () {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      this.tasks = tasks;
    }
  }
});

async fetchUser() {
  /*const user = await supabase.auth.user(); /* supabase user function v1*/
  const { user, error } = await supabase.auth.api.getUser(); /*Supabase GetUser v1 */
  console.log(user.value)
  if (user) {
    this.user = user;
  };
  if (error) throw error; /*Preguntar si esta bien poner este if si es error por utilizar la funcion getUser supabase v1*/
}, /*bien  */