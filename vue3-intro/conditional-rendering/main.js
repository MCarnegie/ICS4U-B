const app = Vue.createApp({
   data() {
      return {
         product: 'Socks',
         image: './assets/images/socks_blue.jpg',
         inStock: false,
         inventory:8,
         onSale: true,
         variants: [
            { id: 2234, color: 'green' },
            { id: 2235, color: 'blue' }
          ],
          sizes:[
            "small",
            "medium",
            "large"
          ]
      
      }
   }
})