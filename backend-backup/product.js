'use strict';
// 3/6/2019 David Churn created

// third party
const bodyParser = require('body-parser');  // JSON parser
const cors = require('cors');  // security
const express = require('express');  // ?!?back-end framework?
const mysql = require('mysql')  // database

// local files
const dbauth = require('./database');

let corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccsssStatus: 200
};

const app = express();
app.use(cors({corsOptions}));
app.use(bodyParser.json());

// connect to the database.
let connection = mysql.createConnection(dbauth);

// get an ordered list of the product lines.
app.get('/productlines', cors(corsOptions), (request,response) => {
  connection.query(`select productLine from productlines order by productLine`,
    function(error, results,fields) {
      if (error) throw error;
      response.send(results);
    });
})

// get the product information
app.get('/products', cors(corsOptions), (request,response) => {
  connection.query(`select productCode, productName, productLine, productScale, productVendor, productDescription, quantityInStock, buyPrice, MSRP from products`,
    function(error, results,fields) {
      if (error) throw error;
      response.send(results);
    });
})
app.get('/product/:id', cors(corsOptions), (request,response) => {
  connection.query(`select productName, productLine, productScale, productVendor, productDescription, quantityInStock, buyPrice, MSRP from products where productCode='${request.params.id}'`,
    function(error, results,fields) {
      if (error) throw error;
      response.send(results);
    });
})

// Add a new product
app.post ('/addProduct', cors(corsOptions), (request,response) => {
  let insQuery = `insert into products (productCode, productName, productLine, productScale, productVendor, productDescription, quantityInStock, buyPrice, MSRP) values ('${request.body.productCode}','${request.body.productName}','${request.body.productLine}','${request.body.productScale}','${request.body.productVendor}','${request.body.productDescription}',${request.body.quantityInStock},${request.body.buyPrice},${request.body.MSRP})`;
  console.log(`insQuery=`, insQuery);
  connection.query(insQuery,
    function (error, results, fields) {
      if (error) throw error;
      response.send(`product added`);
    });
})

// Update all the columns for one product
app.put ('/chgProduct/:id', cors(corsOptions), (request,response) => {
  let updQuery = `update products set productName='${request.body.productName}', productLine='${request.body.productLine}',
  productScale='${request.body.productScale}',
  productVendor='${request.body.productVendor}',
  productDescription='${request.body.productDescription}',
  quantityInStock=${request.body.quantityInStock},
  buyPrice=${request.body.buyPrice},
  MSRP=${request.body.MSRP} where productCode='${request.params.id}'`;
  console.log(`updQuery=`, updQuery);
  connection.query(updQuery,
    function(error,results, fields) {
      if (error) throw error;
      response.send(`product changed`);
    });
})

//  Delete one product
app.delete ('/delProduct/:id', cors(corsOptions), (request,response) => {
  let delQuery = `delete from products where productCode = '${request.params.id}'`;
  console.log(`delQuery=`,delQuery);
  connection.query(delQuery,
    function (error,results, fields) {
      if (error) throw error;
      response.send(`product deleted`);
    });
})

// what port should I listen for queries?
app.listen(3000, () => {
  console.log(`>>>product server started<<<`);
})
