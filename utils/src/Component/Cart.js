

// import React, { useState, useEffect } from 'react';
// import './Cart.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Cart() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));
//   const userId = user?.email || null;
//   const [cartItems, setCartItems] = useState([]);


//   const fetchCart = async () => {
//     if (!userId) {
//       setCartItems([]);
//       return;
//     }

//     try {
//       const res = await axios.get(`http://localhost:5000/cart/${userId}`);
//       console.log("CART RESPONSE:", res.data);
//       setCartItems(res.data.cartItems || []);
//     } catch (err) {
//       console.error('Failed to fetch cart:', err);
//     }
//   };

//   const incrementQty = async (productId) => {
//     if (!userId) {
//       alert("Please log in to update your cart.");
//       navigate('/login');
//       return;
//     }

//     try {
//       await axios.put(`http://localhost:5000/api/cart/update`, {
//         userId,
//         productId,
//         qtyChange: 1
//       });
//       fetchCart();
//     } catch (err) {
//       console.error('Failed to increase quantity:', err);
//       alert("Failed to update quantity, please try again.");
//     }
//   };

//   const decrementQty = async (productId) => {
//     if (!userId) {
//       alert("Please log in to update your cart.");
//       navigate('/login');
//       return;
//     }

//     try {
//       await axios.put(`http://localhost:5000/api/cart/update`, {
//         userId,
//         productId,
//         qtyChange: -1
//       });
//       fetchCart();
//     } catch (err) {
//       console.error('Failed to decrease quantity:', err);
//       alert("Failed to update quantity, please try again.");
//     }
//   };

//   // const removeItem = async (productId) => {
//   //   if (!userId) {
//   //     alert("Please log in to update your cart.");
//   //     navigate('/login');
//   //     return;
//   //   }

//   //   try {
//   //     await axios.delete(`http://localhost:5000/api/cart/remove`, {
//   //       data: { userId, productId }
//   //     });
//   //     fetchCart();
//   //   } catch (err) {
//   //     console.error('Failed to remove item:', err);
//   //     alert("Failed to remove item, please try again.");
//   //   }
//   // };
// const removeItem = async (productId) => {
//   try {
//     await axios.post("http://localhost:5000/cart/remove", {
//       email: userId,
//       productId
//     });
//     fetchCart();
//   } catch (err) {
//     alert(err.response?.data?.message || 'Failed to remove item');
//   }
// };
//   const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

//   useEffect(() => {
//     if (!userId) {
//       alert("Please log in to view your cart.");
//       navigate('/login');
//     } else {
//       fetchCart();
//     }
//   }, [userId, navigate]);

//   const CartPage = ({ cartItems }) => {

  
//   const total = cartItems.reduce((sum, item) => {
//     const price = parseFloat(item.price) || 0;
//     const quantity = parseInt(item.quantity) || 1;
//     return sum + price * quantity;
//   }, 0);
//   return (
//     <div className="cart-container">
//       <h1>Your Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <table className="cart-table">
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Price (₹)</th>
//                 <th>Quantity</th>
//                 <th>Subtotal (₹)</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map(({ productId, name, price, qty }) => {
//                 const subtotal = parseFloat(item.price) * parseInt(item.quantity);
//             return (
                
//                 <tr key={productId}>
//                   <td>{name}</td>
//                   <td>{price.toFixed(2)}</td>
//                   <td>
//                     <button
//                       className="qty-btn"
//                       onClick={() => decrementQty(productId)}
//                       disabled={qty <= 1}
//                     >
//                       -
//                     </button>
//                     <span className="qty-value">{qty}</span>
//                     <button
//                       className="qty-btn"
//                       onClick={() => incrementQty(productId)}
//                     >
//                       +
//                     </button>
//                   </td>
//                   <td>{(price * qty).toFixed(2)}</td>
                 

//                   <td>
//                     <button
//                       className="remove-btn"
//                       onClick={() => removeItem(productId)}
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               );
//           })}
//             </tbody>
//           </table>

//           <div className="cart-summary">
//             <h2>Total: ₹{totalPrice.toFixed(2)}</h2>
            
             

//             <button className="checkout-btn" onClick={() => navigate('/checkout')}>
//               Proceed to Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Cart() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.email || null;
  const [cartItems, setCartItems] = useState([]);
const products = [
  { id: 1, name: 'Pot', price: 99.99, img: '/images/product1.jpg' },
  { id: 2, name: 'Jewellery', price: 999.99, img: '/images/product2.jpg' },
  { id: 3, name: 'Wooden Mug', price: 69.99, img: '/images/product3.jpg' },
  { id: 4, name: 'Handmade Knife', price: 249.99, img: '/images/product4.jpg' },
  { id: 5, name: 'Dress', price: 499.99, img: '/images/product5.jpg' },
];

  const fetchCart = async () => {
    if (!userId) {
      setCartItems([]);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/cart/${userId}`);
      console.log("CART RESPONSE:", res.data);
      setCartItems(res.data.cartItems || []);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  
const incrementQty = async (productId) => {
  if (!user) {
    alert("Please log in to update your cart.");
    navigate('/login');
    return;
  }

  try {
    await axios.put(`http://localhost:5000/cart/update`, {  // note URL change from /api/cart/update to /cart/update to match router
      email: user.email,
      id: productId,
      qtyChange: 1
    });
    fetchCart();
  } catch (err) {
    console.error('Failed to increase quantity:', err);
    alert("Failed to update quantity, please try again.");
  }
};

const decrementQty = async (productId) => {
  if (!user) {
    alert("Please log in to update your cart.");
    navigate('/login');
    return;
  }

  try {
    await axios.put(`http://localhost:5000/cart/update`, {
      email: user.email,
      id: productId,
      qtyChange: -1
    });
    fetchCart();
  } catch (err) {
    console.error('Failed to decrease quantity:', err);
    alert("Failed to update quantity, please try again.");
  }
};

  
  const removeItem = async (productId) => {
  if (!user) {
    alert("Please log in to remove items.");
    navigate('/login');
    return;
  }

  try {
    await axios.post("http://localhost:5000/cart/remove", {
      email: user.email,
      productId
    });
    fetchCart();
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to remove item');
  }
};


  const totalPrice = cartItems.reduce((total, item) => {
  const price = parseFloat(item.price) || 0;
  const quantity = parseInt(item.quantity) || 1;
  return total + price * quantity;
}, 0);


  useEffect(() => {
    if (!userId) {
      alert("Please log in to view your cart.");
      navigate('/login');
    } else {
      fetchCart();
    }
  }, [userId, navigate]);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxRate = 0.10;
  const taxAmount = total * taxRate;
  const grandTotal = total + taxAmount;
  const handleCheckout = () => {
    navigate('/payment'); // or pass grandTotal with state
  };

  return (
    <div className="cart-container">
      <div className='cart-container1'>
      <h1>Your Cart</h1>
      <Link to={'/home'}> <h2>HOME</h2></Link>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Subtotal (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
             <tbody>
  {cartItems.map(({ id, name, price, quantity }) => {
    const product = products.find((p) => p.name === name);
    const imageSrc = product ? product.img : '/images/default.jpg';
    const subtotal = price * quantity;
    
    return (
      <tr key={id}>
        <td className="product-info">
          <img src={imageSrc} alt={name} className="product-img" />
          <span>{name}</span>
        </td>
        <td>{price.toFixed(2)}</td>
        <td>
          <button
            className="qty-btn"
            onClick={() => decrementQty(id)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="qty-value">{quantity}</span>
          <button
            className="qty-btn"
            onClick={() => incrementQty(id)}
          >
            +
          </button>
        </td>
        <td>{subtotal.toFixed(2)}</td>
        <td>
          <button
            className="remove-btn"
            onClick={() => removeItem(id)}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

          </table>

          {/* <div className="cart-summary">
            <h2>Total: ₹{totalPrice.toFixed(2)}</h2>
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div> */}
          <div className="cart-summary">
  <h2>Summary</h2>
  <div className="summary-item">
    <span>Subtotal:</span>
    <span>₹{total.toFixed(2)}</span>
  </div>
  <div className="summary-item">
    <span>Tax (10%):</span>
    <span>₹{taxAmount.toFixed(2)}</span>
  </div>
  <div className="summary-item total">
    <span>Total:</span>
    <span>₹{grandTotal.toFixed(2)}</span>
  </div>
  <button className="checkout-btn" onClick={handleCheckout}>
    Proceed to Checkout
  </button>
</div>

        </>
      )}
    </div>
  );
}

