


<template>
    <section class="destination">
        <h1>{{ destination.name }}</h1>

        <div class="destination-details">
            <img :src="`/images/${destination.image}`" :alt="ajsdh">
            <p>{{ destination.description }}</p>
        </div>
    </section>
        
  
</template>

<script>

import sourceData from "@/data.json"


export default{
    computed:{
        destinationId(){
            //anything coming from route is a string
            return parseInt(this.$route.params.id);
        },
        destination(){
            return sourceData.destinations.find(destination => destination.id === this.destinationId)
        }
    }
    
}
</script>