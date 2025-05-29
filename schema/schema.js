// const mongoose = require('mongoose');

// const productSubSchema = new mongoose.Schema({
//   id: { type: String, required: true },
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, default: 1 },
// }, { _id: false });

// const customerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   cart: [productSubSchema],
//   selectedItems: [productSubSchema],
// });

// const productSchema = new mongoose.Schema({
//   id: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, default: 1 },
// });

// const Product = mongoose.model("Product", productSchema);
// const Customer = mongoose.model("Customer", customerSchema);

// module.exports = { Product, Customer };



const mongoose = require('mongoose');

// Reusable sub-schema for products in cart or selectedItems
const productSubSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
}, { _id: false }); // _id disabled to avoid duplicates inside arrays

// Customer schema
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [productSubSchema],
  selectedItems: [productSubSchema]
});



// Product schema for store catalog
const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
image: { type: String, required: true }

});



const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
  addressType: String,
  paymentMethod: String,
  upiId: String,
  card: {
    number: String,
    expiry: String,
    cvv: String, // ⚠️ Consider removing before saving in production
  },
  cartItems: [productSubSchema],
  total: Number,
  createdAt: { type: Date, default: Date.now },
});




// Models
const Product = mongoose.model("Product", productSchema);
const Customer = mongoose.model("Customer", customerSchema);
const Order = mongoose.model('Order', orderSchema);


module.exports = {
  Product,
  Customer,
  Order
};
