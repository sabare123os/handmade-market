
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// const { Customer, Product } = require('../schema/schema');
const { Customer, Product, Order } = require('../schema/schema');


// Register Customer with hashed password
router.post('/add-customer', async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    if (!name || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existing = await Customer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Customer already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      name,
      email,
      password: hashedPassword
    });

    await newCustomer.save();

    res.status(201).json({ message: 'Customer added successfully', newCustomer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login Customer
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Customer.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new Product
// router.post('/adding-product', async (req, res) => {
//   try {
//     const { id, name, price, quantity } = req.body;

//     if (!id || !name || price === undefined) {
//       return res.status(400).json({ message: 'ID, name, and price are required' });
//     }

//     const existingProduct = await Product.findOne({ id });
//     if (existingProduct) {
//       return res.status(400).json({ message: 'Product with this ID already exists' });
//     }

//     const product = new Product({
//       id,
//       name,
//       price,
//       quantity: quantity || 1
//     });

//     await product.save();

//     res.status(201).json({ message: 'Product added successfully', product });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Get all Products
router.get('/product', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add product to user's cart
// router.post('/cart/add', async (req, res) => {
//   try {
//     const { email, product } = req.body;
  
//     if (!email || !product) {
//       return res.status(400).json({ message: 'Email and product are required' });
//     }

//     const user = await Customer.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
    

//     const existingProductIndex = user.cart.findIndex(p => p.id === product.id);

//      if (existingProductIndex >= 0) {
//        user.cart[existingProductIndex].quantity += product.quantity || 1;
//      } 
    

//     else {
//       user.cart.push({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         quantity: product.quantity || 1
//       });
//     }

//     await user.save();

//     res.status(200).json({ message: 'Product added to cart', cart: user.cart });
//   } catch (error) {
//     console.error("Add to cart error:", error);
//     res.status(500).json({ message: error.message });
//   }
// });



router.post('/cart/add', async (req, res) => {
  try {
    const { email, product } = req.body;

    if (!email || !product || !product.id) {
      return res.status(400).json({ message: 'Email and product with ID are required' });
    }

    // Find the customer
    const user = await Customer.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if product is already in the cart (convert both to string for comparison)
    const existingProduct = user.cart.find(p => String(p.id) === String(product.id));

    if (existingProduct) {
      return res.status(400).json({ message: 'Product already in cart. Update quantity from the cart page.' });
    }

    // Add product to cart
    user.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity || 1
    });

    await user.save();

    res.status(200).json({ message: 'Product added to cart', cart: user.cart });

  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});



// Remove product from user's cart
router.post('/cart/remove', async (req, res) => {
  try {
    const { email, productId } = req.body;

    if (!email || !productId) {
      return res.status(400).json({ message: 'Email and productId are required' });
    }

    const user = await Customer.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = user.cart.filter(p => p.id !== productId);
    await user.save();

    res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/cart/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await Customer.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ cartItems: user.cart || [] }); // ✅ this must return 'cartItems'
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add product to selected items (favorites)
router.post('/selected-items/add', async (req, res) => {
  try {
    const { email, product } = req.body;

    if (!email || !product) {
      return res.status(400).json({ message: 'Email and product are required' });
    }

    const user = await Customer.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.selectedItems.some(p => p.id === product.id)) {
      return res.status(400).json({ message: 'Product already selected' });
    }

    user.selectedItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity || 1
    });

    await user.save();

    res.status(200).json({ message: 'Product added to selected items', selectedItems: user.selectedItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update product quantity in user's cart
router.put('/cart/update', async (req, res) => {
  try {
    const { email, id, qtyChange } = req.body;

    if (!email || !id || typeof qtyChange !== 'number') {
      return res.status(400).json({ message: 'Email, product id, and qtyChange are required' });
    }

    const user = await Customer.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find product in cart by id
    const product = user.cart.find(p => p.id === id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update quantity but keep it >= 1
    product.quantity = Math.max(1, product.quantity + qtyChange);

    await user.save();

    res.status(200).json({ message: 'Cart updated', cart: user.cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: error.message });
  }
});


// Get user's selected items by email
router.get('/selected-items/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const user = await Customer.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.selectedItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.post('/place-order', async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     await order.save();
//     res.status(201).json({ message: 'Order placed successfully' });
//   } catch (err) {
//     console.error('Failed to save order:', err);
//     res.status(500).json({ error: 'Failed to save order' });
//   }
// });

router.post('/place-order', async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      phone,
      address,
      addressType,
      paymentMethod,
      upiId,
      card,
      cartItems,
      total
    } = req.body;

    // Validate required fields
    if (!email || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'Email and cart items are required to place an order' });
    }

    // Create and save the order
    const order = new Order({
      email,
      firstName,
      lastName,
      phone,
      address,
      addressType,
      paymentMethod,
      upiId,
      card,
      cartItems,
      total
    });

    await order.save();

    // Clear user's cart after placing order
    const user = await Customer.findOne({ email });
    if (user) {
      user.cart = [];
      await user.save();
    }

    res.status(201).json({ message: 'Order placed successfully' });

  } catch (err) {
    console.error('Failed to save order:', err);
    res.status(500).json({ error: 'Failed to place order', details: err.message });
  }
});


module.exports = router;
