<template>
  <div class="addProduct">
    <form>
      <fieldset>
        <legend>New Product Information</legend>
        <div>Code: <input v-model="newProduct.productCode"></div>
        <div>Name: <input v-model="newProduct.productName"></div>
        <div>Line:
          <select v-model="newProduct.productLine">
            <option value="none" selected disabled></option>
            <option v-for="aline in prodlines" :key="aline.productLine"
            :v-bind:value="aline.productLine">{{ aline.productLine }}</option>
          </select>
        </div>
        <div>Scale: <input v-model="newProduct.productScale"></div>
        <div>Vendor: <input v-model="newProduct.productVendor"></div>
        <div>Description: <textarea v-model="newProduct.productDescription"></textarea></div>
        <div>In Stock: <input v-model="newProduct.quantityInStock" type="number" class="qty"></div>
        <div>Purchase price: <input v-model="newProduct.buyPrice" type="number" step=".01" class="qty"></div>
        <div>MSRP: <input v-model="newProduct.MSRP" type="number" step=".01" class="qty"></div>
        <div><button type="button" @click="addProduct">Add product</button></div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'addProduct',
  props: {
      prodlines : Array
  },
  data: function () {
    return {
      title: `Add Product`,
      newProduct : { },
    }
  },
  methods : {
    addProduct() {
      if (this.newProduct.quantityInStock < 0 ) {
        this.newProduct.quantityInStock *= -1;
      }
      if (this.newProduct.buyPrice < 0 ) {
        this.newProduct.buyPrice *= -1;
      }
      if (this.newProduct.MSRP < 0 ) {
        this.newProduct.MSRP *= -1;
      }
      axios.post('http://localhost:3000/addproduct', this.newProduct )
      .then (() => {
        // how do I check the return code here?
        this.newProduct = {};
        location.reload();
      })
      .catch(() => {
        // something went wrong?  console.log it?
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  margin: 0 0.3em;
}
form {
  margin: 1em;
  width: 80%;
}
input, option {
  margin: 0.2em;
}
</style>
