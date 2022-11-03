<!-- This is Sign In component------------------------------------------------- -->
<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs} from "pinia"
import { useUserStore } from "./../stores/user.js"


export default defineComponent ({
  
  setup () {
    //variables declaration
    const email = ref(null);
    const password = ref(null);
    const router = useRouter();
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    console.log(user);

    // SignIn process
    const onSubmit = async () => {
      try {
        await userStore.signIn ( email.value, password.value )
        router.push({ path: "/To-Do-List"});
      }
      catch (error) {
        console.log(error)
      }
    } 
    return { email, password, onSubmit }
  }
});

</script>

<template>
<section class="bg-light">
  <!--<section class="vh-100 bg-light">-->
  <div class="container-sm py-5 h-100">

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
                    <h5 class="fw-normal mb-3 pb-3 text-center" style="letter-spacing: 1px;">SignIn into your account</h5>
                  <!--Aqui en form hice cambios @submit.prevent="register"-->
                  <form @submit.prevent="onSubmit" class="mx-1 mx-md-4">
                    <!--<form @submit.prevent="onSubmit" @reset="onReset" class="mx-1 mx-md-4"></form>-->
                    <div class="form-outline mb-4">
                      <input type="email" required id="form2Example17" class="form-control form-control-lg" placeholder="Email address" v-model="email"/>
                    </div>

                    <div class="form-outline mb-4">
                      <input type="password" required id="form2Example27" class="form-control form-control-lg" placeholder="Password" v-model="password"/>
                    </div>

                    <div class="pt-1 mb-4">
                      <button class="btn btn-secondary btn-lg btn-block duration-200" type="submit">Sign In</button>
                    </div>

                    <a class="small text-muted" href="#!">Forgot password?</a>
                    <p class="mb-0 pb-lg-2" style="color: #393f81;">Don't have an account? <RouterLink :to="{ name: 'SignUp' }"><a href="#!"
                        style="color: #393f81;">Register here</a></RouterLink></p>
                    <a href="#!" class="small text-muted">Terms of use.</a>
                  </form>
                </div>
                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                  alt="login form" class="img-fluid"/>
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
a {
  text-decoration: none;
}
</style>