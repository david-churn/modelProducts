<template>
  <div class="addProduct">
    <h2><button type="button" @click="showAdd">{{ posnegChar }}</button>{{ title }}</h2>
    <div v-show="showAddFields">
      <form>
        <fieldset>
          <legend>New Product Information</legend>
          <div>Code: <input v-model="product.productCode"></div>
          <div>Name: <input v-model="product.productName"></div>
          <div>Line: <input v-model="product.productLine"></div>
          <div>Scale: <input v-model="product.productScale"></div>
          <div>Vendor: <input v-model="product.productVendor"></div>
          <div>Description: <input v-model="product.productDescription"></div>
          <div>In Stock: <input v-model="product.quantityInStock" type="number"></div>
          <div>Purchase price: <input v-model="product.buyPrice" type="number"></div>
          <div>MSRP: <input v-model="product.MSRP" type="number"></div>
          <div><button type="button" @click="addProduct">Add product</button></div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'addProduct',
  data: function () {
    return {
      title: `Add Product`,
      showAddFields: false,
      posnegChar : '+',
      product : { },
    }
  },
  methods : {
    addProduct() {
      axios.post('http://localhost:3000/addproduct', this.product )
      .then (() => {
        // how do I check the return code here?
      })
      .catch(() => {
        // something went wrong?  console.log it?
      })
    },
    showAdd() {
      // switches this field between true and false.
      this.showAddFields = !this.showAddFields;
      if (this.posnegChar === '+') {
        this.posnegChar='-';
      }
      else {
        this.posnegChar='+';
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  margin: 0 0.3em;
}
legend {
  font-weight: bold;
}
input {
  margin: 0.2em;
}
.qty {
  text-align: right;
}
</style>
