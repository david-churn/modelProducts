<template>
  <div id="app">
    <h1>Classic Models Products</h1>
    <addProduct :prodlines="productLines"></addProduct>
    <productlist :prodlines="productLines"></productlist>
  </div>
</template>

<script>
import axios from 'axios';
import productlist from './components/productList.vue';
import addProduct from './components/addProduct.vue';

export default {
  name: 'app',
  components: {
    productlist,
    addProduct
  },
  data: function () {
    return {
      productLines : [],
    }
  },
  created() {
    axios.get(`http://localhost:3000/productlines`)
      .then( (resp) => {
        this.productLines = resp.data;
      })
      .catch( (error) => {
        console.log(error);
      })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  text-align:center;
}
legend {
  font-weight: bold;
}
textarea {
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.qty {
  text-align: right;
}
</style>
