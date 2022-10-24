// /store/user.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      /*const user = await supabase.auth.user(); /* supabase user function v1*/
      const { user, error } = await supabase.auth.api.getUser(); /*Supabase GetUser v1 */
      console.log(user)
      if (user) {
        this.user = user;
      };
      if (error) throw error; /*Preguntar si esta bien poner este if si es error por utilizar la funcion getUser supabase v1*/
    }, /*bien  */
    
    async signUp(email, password) {
      const { user, session, error } = await supabase.auth.signUp({ /*Preguntar si esta bien Supabase v1 SignUp function */
        email: email,
        password: password,
      });
      if (error) throw error;
      if (session) console.log(session); /*Preguntar si esto es asi? */
      if (user) this.user = user;
    },
    /* lo nuevo-------------Preguntar si esta bien---------------------------------------------------*/
    async signIn ( email, password ) {
      try {
        const { user, session, error } = await supabase.auth.signIn({ /*Preguntar si es esta bien utilice supabase signIn function */
          email: email,
          password: password
        });
        if (user) this.user = user;
        if (session) console.log(session); /*Preguntar si esto es asi? */
        if (error) throw error; 
      }
      catch (error) {
        console.log(error)
      };
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();

      if (error) console.log(error);
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
