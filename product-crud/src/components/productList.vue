<template>
  <div class="productlist">
    <h2>{{ title }}</h2>
    <table id="productTab">
      <tr>
        <th></th>
        <th>Code</th>
        <th>Name</th>
        <th>Line</th>
        <th>In Stock</th>
        <th>Purchase</th>
        <th>MSRP</th>
      </tr>
      <tbody v-for="item in products" :key="item.productCode">
        <tr >
          <td><button type="button" @click="showChg">{{ posnegChar }}</button></td>
          <td>{{ item.productCode }}</td>
          <td>{{ item.productName }}</td>
          <td>{{ item.productLine }}</td>
          <td class="qty">{{ item.quantityInStock }}</td>
          <td class="qty">{{ item.buyPrice.toFixed(2) }}</td>
          <td class="qty">{{ item.MSRP.toFixed(2) }}</td>
        </tr>
        <tr v-show="showChgFields">
          <chgProduct :productcode="item.productCode"/>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import chgProduct from './chgProduct.vue';

export default {
  name: 'productlist',
  components: {
    chgProduct
  },
  data: function () {
    return {
      title: `Product List`,
      showChgFields: false,
      posnegChar : '+',
      products: []
    }
  },
  created() {
    axios.get(`http://localhost:3000/products`)
      .then( (resp) => {
        this.products = resp.data;
      })
      .catch( (error) => {
        console.log(error);
      })
  },
  methods : {
    showChg() {
      // switches this field between true and false.
      this.showChgFields = !this.showChgFields;
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
.qty {
  text-align: right;
}
</style>
