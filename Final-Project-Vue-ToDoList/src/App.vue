<template>
  <div>
    <HeaderPage />
    <RouterView/>
    <!--<ToDoList/>-->
    <ToDoList2/>
    <!--<HomePage/>
    <SignInPage/>
    <SignUpPage/>
    <AboutUs/>
    <Collaborators/>-->
    <FooterPage />

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { RouterView, /*useRouter*/ } from 'vue-router'
import { useUserStore } from './stores/user'
import HeaderPage from './components/HeaderPage.vue'
import FooterPage from './components/FooterPage.vue'
import ToDoList from './components/ToDoList.vue'
import ToDoList2 from './components/ToDoList2.vue'
/*import HomePage from './components/HomePage.vue'*/
/*import AboutUs from './components/AboutUs.vue'*/
/*import Collaborators from './components/Collaborators.vue'*/
/*import SignInPage from './components/SignInPage.vue'*/
/*import SignUpPage from './components/SignUpPage.vue'*/

/*import Date from './components/Date.vue'*/

/*const router = useRouter()*/ /* */
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
  console.log("Mounted")
  try {
    await userStore.fetchUser() // here we call fetch user
    console.log(user.value)
    if (!user.value) {
      console.log('No estas logeado')
      await userStore.signUp("danalmorse@gmail.com", "password")

      console.log(user.value)
      /*// redirect them to logout if the user is not there
      router.push({ path: '/auth' });*/
    } else {
      console.log('Estas logeado')
      console.log(user.value)
      /*// continue to dashboard
      router.push({ path: '/' });*/
    }
  } catch (e) {
    console.log(e)
  }
})
</script>

