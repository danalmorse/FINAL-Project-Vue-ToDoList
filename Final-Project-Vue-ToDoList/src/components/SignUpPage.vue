<script>
import { ref } from "vue";
import { storeToRefs} from "pinia";
import { useRouter } from "vue-router";
import { useUserStore} from "./../stores/user.js";
/*import { supabase } from '../supabase';*/


export default {
  
  setup () {
    // create data / vars
    const namecomplete = ref ("");
    const email = ref("");
    const password = ref(null);
    const confirmPassword = ref(null);
    const errorMsg = ref(null);
    const checked = ref(null);
    
    /*Estos a ver si puedo hacer el error en formulario */
    const errorMsg2 = ref(null);
    const errorMsg3 = ref(null);

    const router = useRouter();
    const userStore = useUserStore();
    const { user } = storeToRefs (userStore)

    /* verificar tema de errores formulario de aqui*/
    /*const errorinfo = "";*/
    let noproceed = false;
  
    const onSubmit = async () => {
      
      /* revisar tambien tema formulario de aqui*/
       /*---Full Name check in box--------------------------------*/
        if (namecomplete.value.length <= 0) {
          errorMsg2.value = "Error: invalid name not correct"
          noproceed = true;
        }

         /*---email check in box with regex email check JS-----------*/
        if (email.value.length === 0 || /^\s+$/.test(email.value)) {
          errorMsg3.value = "Error: invalid email address"
          noproceed = true;
        }

        
      /* hasta aqui------------------------------------------------------------------*/
      if (password.value === confirmPassword.value) {
        try {
          await userStore.signUp ( email.value, password.value)  
          /* como pongo "please check your email confirmation"*/
          router.push({ path: "/Sign-In" });
        
        /*} catch (e) {
          console.log(e)
        },*/
      } catch (error) { /*Preguntar si esto esta bien ya que no declaro error en const arriba */
          errorMsg.value = error.message;
          setTimeout(() => {
          errorMsg.value = null;
          }, 5000);
      } 
        return; /* Esto no creo que este bien */
      }
      errorMsg.value = "Error: Passwords do not match";
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);

      /*---check in proceeds or not and clean form-----------------*/
      if (noproceed === true){
          return false;
        }
    };
          
          /*const { error } = await supabase.auth.signUp({*/
          /*  email: email.value,
            password: password.value,
          });
          if (error) throw error;
          router.push({ name: "SignIn" });
        } catch (error) {
          errorMsg.value = error.message;
          setTimeout(() => {
          errorMsg.value = null;
          }, 5000);
        }
        return;
      }
      errorMsg.value = "Error: Passwords do not match";
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    };*/

    return { namecomplete, email, password, confirmPassword, errorMsg, checked, onSubmit, errorMsg2, errorMsg3 }; /*verificar si errorMsg 2 y 3 dan bien */
  },

};
</script>

<template>
<section class="vh-100 bg-light">
  <div class="container-sm h-100">
    
    <!--Register section-->
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <div class="d-flex align-items-center mb-3 pb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-smartwatch" viewBox="0 0 16 16">
                      <path d="M9 5a.5.5 0 0 0-1 0v3H6a.5.5 0 0 0 0 1h2.5a.5.5 0 0 0 .5-.5V5z"/>
                      <path d="M4 1.667v.383A2.5 2.5 0 0 0 2 4.5v7a2.5 2.5 0 0 0 2 2.45v.383C4 15.253 4.746 16 5.667 16h4.666c.92 0 1.667-.746 1.667-1.667v-.383a2.5 2.5 0 0 0 2-2.45V8h.5a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5H14v-.5a2.5 2.5 0 0 0-2-2.45v-.383C12 .747 11.254 0 10.333 0H5.667C4.747 0 4 .746 4 1.667zM4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3z"/>
                      <use xlink:href="#bootstrap"></use>
                    </svg>
                    <span class="h1 fw mb-0">Day To Day Task App</span>
                  </div>
                  <h5 class="fw-normal mb-3 pb-3 text-center" style="letter-spacing: 1px;">SignUp and register an account</h5>
                
                <!--Aqui en form hice cambios @submit.prevent="register" prteguntar si esta bien????????????????????????????????????????????-->
                <form @submit.prevent="onSubmit" class="mx-1 mx-md-4">
                  <!--<form @submit.prevent="onSubmit" class="mx-1 mx-md-4">-->

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" required id="form3Example1c" class="form-control" placeholder="Your name" v-model="namecomplete"/>
                      <!--<label class="form-label" for="form3Example1c">Your Name</label>-->
                      <span> {{ errorMsg2 }} </span>
                    </div>
                  <!--Aqui es donde estoy poniendo error formulario preguntar???
                  <span> {{ errorinfo.namecomplete }} </span>-->
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" required id="form3Example3c" class="form-control" placeholder="Your email" v-model="email"/>
                      <!--<label class="form-label" for="form3Example3c">Your Email</label>-->
                      <span> {{ errorMsg3 }} </span>
                    </div>
                  <!--Aqui es donde estoy poniendo error formulario preguntar???
                  <span> {{ errorinfo.email }} </span>-->
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" required id="form3Example4c" class="form-control" placeholder="password" v-model="password"/>
                      <!--<label class="form-label" for="form3Example4c">Password</label>-->
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" required id="form3Example4cd" class="form-control" placeholder="Repeat your password" v-model="confirmPassword"/>
                      <!--<label class="form-label" for="form3Example4cd">Repeat your password</label>-->
                    </div>
                  </div>

                  <div class="form-check d-flex justify-content-center mb-2">
                    <input class="form-check-input me-2" required type="checkbox" value="" id="form2Example3c" v-model="checked"/>
                    <label class="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!" class="text-muted">Terms of use</a>
                    </label>
                  </div>

                  <div class="form-check d-flex justify-content-center mb-0">
                    <p class="mb-3 pb-lg-2" style="color: #393f81;">Already have an account? <RouterLink :to="{ name: 'SignIn' }"><a href="#!"
                      style="color: #393f81;">Sign In</a></RouterLink></p>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" class="btn btn-secondary btn-lg duration-200">Register</button>
                  </div>
                  <!--Error Handling, preguntar si esta bien???????????????????????????????????-->
                  <div v-if="errorMsg" class="alert alert-danger text-center">
                    <p class="text-align-center">{{ errorMsg }}</p>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                  class="img-fluid" alt="Sample image">

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