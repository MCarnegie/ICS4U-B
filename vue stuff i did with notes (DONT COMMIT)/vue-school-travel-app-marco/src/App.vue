<script>
import TheNavigation from './components/TheNavigation.vue';

export default{
  components: {TheNavigation}
}
</script>

<template>
  <div>
    
   <TheNavigation></TheNavigation>
    
    <div class="container">
      <router-view></router-view>
    </div>
    
  </div>
</template>


