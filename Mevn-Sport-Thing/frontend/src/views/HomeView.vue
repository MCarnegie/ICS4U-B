<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <body>
        <section class="hero">
            <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title">
                Welcome to the site!
                </h1>
                <div class="content">
                    <p>
                        Welcome to the offical yadayada type stuff here about thing 
                    </p>
                    <h1>
                        <RouterLink to="/league" > Go to Schedule</RouterLink>
                    </h1>
                    
                </div>
            </div>
            </div>
        </section>
        
        
    </body>
    
    
</template>

<style scoped>

</style>