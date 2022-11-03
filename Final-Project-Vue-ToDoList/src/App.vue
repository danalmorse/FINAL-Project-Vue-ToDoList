<!--This is the APP.vue main component----------------------------------------->

<template>
  <div>
    <HeaderPage />
    
    <RouterView/>

    <FooterPage />

  </div>
</template>

<script setup>

import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from './stores/user';
import { RouterView, useRouter } from 'vue-router';

import HeaderPage from './components/HeaderPage.vue';
import FooterPage from './components/FooterPage.vue';
    
    //variables declaration
    const router = useRouter();
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    onMounted(async () => {
      console.log("Mounted")
      try {
        await userStore.fetchUser() // here we call fetch user
        console.log(user.value)
        if (!user.value) {
          console.log('No estas logeado')
          console.log(user.value)

          // redirect them to logout if the user is not there
          router.push({ path: '/Sign-In' });

        } else {
          console.log('Estas logeado')
          console.log(user.value)
          // continue to dashboard
          router.push({ path: '/To-Do-List' });
        }
      } catch (e) {
        console.log(e)
      }
    })
  

</script>

