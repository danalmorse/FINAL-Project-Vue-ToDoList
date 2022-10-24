<script>
/*import { RouterLink } from 'vue-router';*/

import { defineComponent, ref } from "vue";
/*import { supabase } from '../supabase';*/
import { useRouter } from "vue-router";
import { storeToRefs} from "pinia"
import { useUserStore } from "./../stores/user.js"

/*Validation of the sign up form -------------------------------------------------------------
data() {
      return {
        email: "",
        password: "",
        errorinfo: {
            email: "",
            password: "",
      },
      successORerrorMessage: "", este es del fetchAPI
      };
    }, 

    methods: {
      GoandSubmit(event) {
        event.preventDefault()
        this.errorinfo.email="";
        this.errorinfo.password="";

        let noproceed = false;
        /*
         /*---Full Name check in box--------------------------------*/
        /*if (this.password.length <= 0) {
          this.errorinfo.password = "Error: invalid name not correct"
          noproceed = true;
        }*/

         /*---email check in box with regex email check JS-----------*/
        /*if (this.email.length === 0 || /^\s+$/.test(this.email)) {
          this.errorinfo.email = "Error: invalid email address"
          noproceed = true;
        }*/

        /*---check in proceeds or not and clean form-----------------*/
        /*if (noproceed === true){
          return false;
        }*/


export default defineComponent ({
  /* export default {
  name: "SignIn",*/
  setup () {
    //Create data/ vars
    const email = ref(null);
    const password = ref(null);
    const router = useRouter();
    /*const errorMsg = ref(null);*/ /*cambiar como vi en video para mostrar error */
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    console.log(user);

    // SignIn function
    const onSubmit = async () => {
      try {
        /*const { error } = await userStore.signIn ( email.value, password.value)*/
        await userStore.signIn ( email.value, password.value )

        /*if (error) throw error;*/
        router.push({ path: "/To-Do-List"});
      }
      catch (error) {
        console.log(error)
        /*errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);*/
      }
    } 
    /* Lo del video 
    const login = async () => {
      try {
        const { error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
        router.push({ name: "ToDoList"})
      } catch (error){
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };*/
    /*const onReset = () => {
      email.value = null,
      password.value = null
    };*/

    /*return { email, password, errorMsg, login }*/
    /*return { email, password, onSubmit, onReset }*/
    return { email, password, onSubmit }
  }

});

</script>

<template>
<section class="vh-100 bg-light">
  <div class="container-sm py-5 h-100">
    <!--Error Handling
    <div v-if="errorMsg" class="mb-10 p-4 rounder-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>-->

    <!--Register section-->
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style="border-radius: 1rem;">
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">
                
                <!--Aqui en form hice cambios @submit.prevent="register"-->
                <form @click="onSubmit" class="mx-1 mx-md-4">
                  <!--<form @submit.prevent="onSubmit" @reset="onReset" class="mx-1 mx-md-4"></form>-->

                  <div class="d-flex align-items-center mb-3 pb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-smartwatch" viewBox="0 0 16 16">
                      <path d="M9 5a.5.5 0 0 0-1 0v3H6a.5.5 0 0 0 0 1h2.5a.5.5 0 0 0 .5-.5V5z"/>
                      <path d="M4 1.667v.383A2.5 2.5 0 0 0 2 4.5v7a2.5 2.5 0 0 0 2 2.45v.383C4 15.253 4.746 16 5.667 16h4.666c.92 0 1.667-.746 1.667-1.667v-.383a2.5 2.5 0 0 0 2-2.45V8h.5a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5H14v-.5a2.5 2.5 0 0 0-2-2.45v-.383C12 .747 11.254 0 10.333 0H5.667C4.747 0 4 .746 4 1.667zM4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3z"/>
                      <use xlink:href="#bootstrap"></use>
                    </svg>
                    <span class="h1 fw mb-0">Day To Day Task App</span>
                  </div>

                  <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">SignIn into your account</h5>

                  <div class="form-outline mb-4">
                    <input type="email" required id="form2Example17" class="form-control form-control-lg" v-model="email"/>
                    <label class="form-label" for="form2Example17">Email address</label>
                  <!--<span> {{ errorinfo.email }} </span>-->
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" required id="form2Example27" class="form-control form-control-lg" v-model="password"/>
                    <label class="form-label" for="form2Example27">Password</label>
                  <!--<span> {{ errorinfo.password }} </span>-->
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-secondary btn-lg btn-block duration-200" type="button">Sign In</button>
                  </div>

                  <a class="small text-muted" href="#!">Forgot password?</a>
                  <p class="mb-0 pb-lg-2" style="color: #393f81;">Don't have an account? <RouterLink :to="{ name: 'SignUp' }"><a href="#!"
                      style="color: #393f81;">Register here</a></RouterLink></p>
                  <a href="#!" class="small text-muted">Terms of use.</a>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>

</style>