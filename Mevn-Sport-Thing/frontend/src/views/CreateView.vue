<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import store from './stores'

const API_URL = 'http://localhost:3000';

export default {
  //works by having a reactive variable that waits to get teh response for axios 
  //before being retunred since it retunrs immediately
  setup() {
    const token = this.$store

    return {
      leagues,
      link
    };
  }
};
</script>

<template>
    <body>
        <Suspense>
          
          
        </Suspense>
        
        
        
 
    </body>

</template>

<style scoped>

</style>