<template>
  <td class="chgProduct" colspan="7">
    <form>
      <fieldset>
        <legend>Change Product Information</legend>
        <div>Code: {{ product.productCode }}
          <button type="button" @click="delProduct">Delete</button>
        </div>
        <div>Name: <input v-model="product.productName"></div>
        <div>Line:
          <select v-model="product.productLine">
            <option value="none" selected disabled></option>
            <option v-for="aline in prodlines" :key="aline.productLine"
            :v-bind:value="aline.productLine">{{ aline.productLine }}</option>
          </select>
        </div>
        <div>Scale: <input v-model="product.productScale"></div>
        <div>Vendor: <input v-model="product.productVendor"></div>
        <div>Description: <textarea v-model="product.productDescription"></textarea></div>
        <div>In Stock: <input v-model="product.quantityInStock" type="number" class="qty"></div>
        <div>Purchase price: <input v-model="product.buyPrice" type="number" step=".01" class="qty"></div>
        <div>MSRP: <input v-model="product.MSRP" type="number" step=".01" class="qty"></div>
        <div>
          <button type="button" @click="resetProduct">Cancel</button>
          <button type="button" @click="chgProduct">Save</button>
        </div>
      </fieldset>
    </form>
  </td>
</template>

<script>
import axios from 'axios';

export default {
  name: 'chgProduct',
  props: {
    product : Object,
    prodlines : Array,
  },
  data: function () {
    return {
      title: `Update Product`,
      originalProduct : { },
    }
  },
  created() {
    this.originalProduct = {
      productName : this.product.productName,
      productLine : this.product.productLine,
      productScale : this.product.productScale,
      productVendor : this.product.productVendor,
      productDescription : this.product.productDescription,
      quantityInStock : this.product.quantityInStock,
      buyPrice : this.product.buyPrice,
      MSRP : this.product.MSRP };
  },
  methods : {
    chgProduct() {
      let cmsg=confirm(`change ${this.product.productCode}?`);
      if (cmsg=== true) {
        if (this.product.quantityInStock < 0 ) {
          this.product.quantityInStock *= -1;
        }
        if (this.product.buyPrice < 0 ) {
          this.product.buyPrice *= -1;
        }
        if (this.product.MSRP < 0 ) {
          this.product.MSRP *= -1;
        }
        axios.put(`http://localhost:3000/chgproduct/${this.product.productCode}`, this.product )
        .then ((response) => {
          console.log(response);
        })
        .catch(() => {
          // something went wrong?  console.log it?
        })
      }
    },
    delProduct () {
      let dmsg = confirm(`delete ${this.product.productCode}?`);
      if (dmsg === true) {
        axios.delete(`http://localhost:3000/delproduct/${this.product.productCode}`)
        .then ((response) => {
          // how do I check the return code here?
          console.log(response);
          location.reload();
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
</style>
