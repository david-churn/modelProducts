<template>
  <div id="app">
    <h1>Classic Models Products</h1>
    <addProduct/>
    <productlist/>
  </div>
</template>

<script>
import productlist from './components/productList.vue'
import addProduct from './components/addProduct.vue'

export default {
  name: 'app',
  components: {
    productlist,
    addProduct
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
</style>
