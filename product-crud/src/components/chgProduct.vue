<template>
  <div class="chgProduct">
    <form>
      <fieldset>
        <legend>Change Product Information</legend>
        <div>Code: {{ this.productcode }}
          <button type="button" @click="delProduct">Delete</button>
        </div>
        <div>Name: <input v-model="product.productName"></div>
        <div>Line: <input v-model="product.productLine"></div>
        <div>Scale: <input v-model="product.productScale"></div>
        <div>Vendor: <input v-model="product.productVendor"></div>
        <div>Description: <input v-model="product.productDescription"></div>
        <div>In Stock: <input v-model="product.quantityInStock" type="number" class="qty"></div>
        <div>Purchase price: <input v-model="product.buyPrice" type="number" step=".01"></div>
        <div>MSRP: <input v-model="product.MSRP" type="number" step=".01"></div>
        <div>
          <button type="button" @click="resetProduct">Cancel</button>
          <button type="button" @click="chgProduct">Save</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'chgProduct',
  props: {
    productcode: String
  },
  data: function () {
    return {
      title: `Update Product`,
      product : { },
      originalProduct : { },
    }
  },
  created() {
    axios.get(`http://localhost:3000/product/${this.productcode}`)
      .then( (response) => {
        // console.log(response);
        this.product = response.data[0];
        this.originalProduct = {
          productName : this.product.productName,
          productLine : this.product.productLine,
          productScale : this.product.productScale,
          productVendor : this.product.productVendor,
          productDescription : this.product.productDescription,
          quantityInStock : this.product.quantityInStock,
          buyPrice : this.product.buyPrice,
          MSRP : this.product.MSRP };
      })
      .catch( (error) => {
        console.log(error);
      })
  },
  methods : {
    chgProduct() {
      let cmsg=confirm(`change ${this.productcode}?`);
      if (cmsg=== true) {
        axios.post(`http://localhost:3000/chgproduct/${this.productcode}`, this.product )
        .then ((response) => {
          // console.log(response);
        })
        .catch(() => {
          // something went wrong?  console.log it?
        })      
      }
    },
    delProduct () {
      let dmsg = confirm(`delete ${this.productcode}?`);
      if (dmsg === true) {
        axios.delete(`http://localhost:3000/delproduct/${this.productcode}`)
        .then ((response) => {
          // how do I check the return code here?
          // console.log(response);
        })
        .catch(() => {
          // something went wrong?  console.log it?
        })
      }
    },
    resetProduct() {
      this.product = {
        productName : this.originalProduct.productName,
        productLine : this.originalProduct.productLine,
        productScale : this.originalProduct.productScale,
        productVendor : this.originalProduct.productVendor,
        productDescription : this.originalProduct.productDescription,
        quantityInStock : this.originalProduct.quantityInStock,
        buyPrice : this.originalProduct.buyPrice,
        MSRP : this.originalProduct.MSRP };
    }
  }
}
</script>

<!-- chg "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  margin: 0.3em;
}
input {
  margin: 0.2em;
}
legend {
  font-weight: bold;
}
.qty {
  text-align: right;
}
</style>
