app.component('product-details', {
    props: {
        details: {
          type: String,
          required: true
        }
    },
    template:
    /*html*/ 
    `<div>{{details}}</div>`
    
    
});