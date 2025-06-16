// import React, { useState, useEffect } from 'react';
// import './Payment.css';
// import { Link } from 'react-router-dom';

// export default function Payment() {
//   const [formData, setFormData] = useState({
//     deliveryOption: 'ship',
//     addressType: 'home',
//     firstName: '',
//     lastName: '',
//     address: '',
//     email: '',
//     phone: '',
//   });

//   const [cartItems, setCartItems] = useState([]);
//   const [selectedPayment, setSelectedPayment] = useState('card');
//   const [upiId, setUpiId] = useState('');
//   const [cardData, setCardData] = useState({
//     number: '',
//     expiry: '',
//     cvv: '',
//   });

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cartItems');
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleCardChange = (e) => {
//     setCardData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let paymentInfo = '';
//     if (selectedPayment === 'upi') {
//       paymentInfo = `UPI ID: ${upiId}`;
//     } else if (selectedPayment === 'card') {
//       paymentInfo = `Card ending in ${cardData.number.slice(-4)}`;
//     } else {
//       paymentInfo = 'PayPal account';
//     }
//     alert(`Payment submitted via ${selectedPayment.toUpperCase()}!\n${paymentInfo}`);
//   };

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
//   const tax = subtotal * 0.28;
//   const grandTotal = subtotal + tax;

//   return (
//     <div className="payment-container">
//       <h2>Checkout</h2>
//       <div className="payment-card">
//         <div className="payment-content">
//           {/* LEFT SIDE */}
//           <form className="delivery-form" onSubmit={handleSubmit}>
//             <div className="delivery-options">
//                 <h4>Shipping Address:</h4>
//               {/* <button
//                 type="button"
//                 className={formData.deliveryOption === 'ship' ? 'active' : ''}
//                 onClick={() => setFormData({ ...formData, deliveryOption: 'ship' })}
//               >Ship</button>
//               <button
//                 type="button"
//                 className={formData.deliveryOption === 'pickup' ? 'active' : ''}
//                 onClick={() => setFormData({ ...formData, deliveryOption: 'pickup' })}
//               >Pick Up</button>
//             </div>

//             <div className="address-type">
//               <button
//                 type="button"
//                 className={formData.addressType === 'home' ? 'active' : ''}
//                 onClick={() => setFormData({ ...formData, addressType: 'home' })}
//               >Home/Office</button>
//               <button
//                 type="button"
//                 className={formData.addressType === 'apo' ? 'active' : ''}
//                 onClick={() => setFormData({ ...formData, addressType: 'apo' })}
//               >APO/FPO</button> */}
//             </div>

//             <div className="form-fields">
//               <div className='name'>
//               <input name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
//               <input name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
//              </div>
//              <div className='emailphone'>
//               <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//               <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
//               </div>
//             <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
              
//             </div>

//             <div className="payment-methods">
//               <h4>Payment Method:</h4>
//               <label>
                
//                 <input type="radio" name="payment" value="card" checked={selectedPayment === 'card'} onChange={() => setSelectedPayment('card')} />
//                 Credit/Debit Card
//               </label>
//               <label>
//                 <input type="radio" name="payment" value="upi" checked={selectedPayment === 'upi'} onChange={() => setSelectedPayment('upi')} />
//                 UPI
//               </label>
              
//             </div>

//             {/* Payment Inputs */}
//             {selectedPayment === 'upi' && (
//               <div className='upi'>
//               <input
//                 type="text"
//                 placeholder="Enter UPI ID"
//                 value={upiId}
//                 onChange={(e) => setUpiId(e.target.value)}
//                 required
//               />
//               </div>
//             )}

//             {selectedPayment === 'card' && (
//               <div className="card-fields">
//                 <input name="number" type="text" placeholder="Card Number" value={cardData.number} onChange={handleCardChange} required />
//                <div className='validity'>
//                 <input name="expiry" type="text" placeholder="MM/YY" value={cardData.expiry} onChange={handleCardChange} required />
//                 <input name="cvv" type="password" placeholder="CVV" value={cardData.cvv} onChange={handleCardChange} required />
//               </div>
//               </div>
//             )}

//             <Link to={'/payment-success'}> < button type="submit" className="save-btn">Pay ₹{grandTotal.toFixed(2)}</button></Link>
//           </form>

//           {/* RIGHT SIDE */}
//           <div className="payment-summary">
//             <h3>In Your Bag</h3>
//             <div className="cart-scroll">
//               {cartItems.map(item => (
//                 <div key={item.id} className="item-preview">
//                   <img src={item.img} alt={item.name} />
//                   <div>
//                     <h6><strong>{item.name}</strong></h6>
//                     <small>Qty: {item.qty} | ₹{item.price.toFixed(2)}</small>
//                     <div>₹{(item.qty * item.price).toFixed(2)}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <hr />
//             <div className="summary-item"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
//             <div className="summary-item"><span>Tax:</span><span>₹{tax.toFixed(2)}</span></div>
//             <hr/>
//             <div className="summary-total"><span>Total:</span><span>₹{grandTotal.toFixed(2)}</span></div>
            
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Payment.css';  // Use Cart styles to keep design consistent

// export default function Payment() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));
//   const userEmail = user?.email || null;
//   const [cartItems, setCartItems] = useState([]);

//   // Payment form fields
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiry, setExpiry] = useState('');
//   const [cvv, setCvv] = useState('');
//   const [error, setError] = useState('');


  
//   // Fetch cart items same as in Cart.js
//   const fetchCart = async () => {
//     if (!userEmail) {
//       alert("Please log in to view your cart.");
//       navigate('/login');
//       return;
//     }
//     try {
//       const res = await axios.get(`http://localhost:5000/cart/${userEmail}`);
//       setCartItems(res.data.cartItems || []);
//     } catch (err) {
//       console.error('Failed to fetch cart:', err);
//       alert('Failed to load cart items');
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   // Totals calculation
//   const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const taxRate = 0.1;
//   const taxAmount = total * taxRate;
//   const grandTotal = total + taxAmount;

//   const [formData, setFormData] = useState({
//   firstName: '',
//   lastName: '',
//   email: userEmail || '',
//   phone: '',
//   address: '',
//   addressType: 'home',
// });

// const [selectedPayment, setSelectedPayment] = useState('card');
// const [upiId, setUpiId] = useState('');
// const [cardData, setCardData] = useState({
//   number: '',
//   expiry: '',
//   cvv: '',
// });

// const handleChange = (e) => {
//   setFormData({ ...formData, [e.target.name]: e.target.value });
// };

// const handleCardChange = (e) => {
//   setCardData({ ...cardData, [e.target.name]: e.target.value });
// };


//   // Validation
//   const validateForm = () => {
//     if (!cardNumber.match(/^\d{16}$/)) {
//       setError('Card number must be 16 digits');
//       return false;
//     }
//     if (!expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
//       setError('Expiry date must be in MM/YY format');
//       return false;
//     }
//     if (!cvv.match(/^\d{3}$/)) {
//       setError('CVV must be 3 digits');
//       return false;
//     }
//     if (cartItems.length === 0) {
//       setError('Your cart is empty.');
//       return false;
//     }
//     setError('');
//     return true;
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       // Call backend payment API here if exists
//       // await axios.post('http://localhost:5000/payment/process', { userEmail, cartItems, paymentInfo: {cardNumber, expiry, cvv} });

//       alert('Payment successful!');
//       navigate('/payment-success');
//     } catch (err) {
//       alert('Payment failed. Please try again.');
//     }
//   };

//   const products = [
//   { id: 1, name: 'Pot', img: '/images/product1.jpg' },
//   { id: 2, name: 'Jewellery', img: '/images/product2.jpg' },
//   { id: 3, name: 'Wooden Mug', img: '/images/product3.jpg' },
//   { id: 4, name: 'Handmade Knife', img: '/images/product4.jpg' },
//   { id: 5, name: 'Dress', img: '/images/product5.jpg' },
// ];


//   return (
    
//     <div className="payment-container">
//       <h2>Checkout</h2>

//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className="payment-card">
//           <div className="payment-content">
//             {/* LEFT SIDE */}
//             <form className="delivery-form" onSubmit={handlePayment}>
//   <div className="delivery-options">
//     <h4>Shipping Address:</h4>
//     {/* Optional delivery mode buttons (enable if needed later) */}
//   </div>

  

//   <div className="form-fields">
//     <div className="name">
//       <input
//         name="firstName"
//         type="text"
//         placeholder="First Name"
//         value={formData.firstName}
//         onChange={handleChange}
//         required
//       />
//       <input
//         name="lastName"
//         type="text"
//         placeholder="Last Name"
//         value={formData.lastName}
//         onChange={handleChange}
//         required
//       />
//     </div>
//     <div className="emailphone">
//       <input
//         name="email"
//         type="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />
//       <input
//         name="phone"
//         type="tel"
//         placeholder="Phone Number"
//         value={formData.phone}
//         onChange={handleChange}
//         required
//       />
//     </div>
//     <textarea
//       name="address"
//       placeholder="Address"
//       value={formData.address}
//       onChange={handleChange}
//       required
//     />
//   </div>

//   <div className="payment-methods">
//     <h4>Payment Method:</h4>
//     <label>
//       <input
//         type="radio"
//         name="payment"
//         value="card"
//         checked={selectedPayment === 'card'}
//         onChange={() => setSelectedPayment('card')}
//       />
//       Credit/Debit Card
//     </label>
//     <label>
//       <input
//         type="radio"
//         name="payment"
//         value="upi"
//         checked={selectedPayment === 'upi'}
//         onChange={() => setSelectedPayment('upi')}
//       />
//       UPI
//     </label>
//   </div>

//   {selectedPayment === 'upi' && (
//     <div className="upi">
//       <input
//         type="text"
//         placeholder="Enter UPI ID"
//         value={upiId}
//         onChange={(e) => setUpiId(e.target.value)}
//         required
//       />
//     </div>
//   )}

//   {selectedPayment === 'card' && (
//     <div className="card-fields">
//       <input
//         name="number"
//         type="text"
//         placeholder="Card Number"
//         value={cardData.number}
//         onChange={handleCardChange}
//         required
//       />
//       <div className="validity">
//         <input
//           name="expiry"
//           type="text"
//           placeholder="MM/YY"
//           value={cardData.expiry}
//           onChange={handleCardChange}
//           required
//         />
//         <input
//           name="cvv"
//           type="password"
//           placeholder="CVV"
//           value={cardData.cvv}
//           onChange={handleCardChange}
//           required
//         />
//       </div>
//     </div>
//   )}

//   <button type="submit" className="save-btn">Pay ₹{grandTotal.toFixed(2)}</button>
// </form>



//             {/* RIGHT SIDE */}
//             <div className="payment-summary">
//               <h3>In Your Bag</h3>
//               <div className="cart-scroll">
//                 {/* {cartItems.map(({ id, name, price, quantity }) => (
//                   <div key={id} className="item-preview">
                    
//                     <div>
//                       <h6><strong>{name}</strong></h6>
//                       <small>Qty: {quantity} | ₹{price.toFixed(2)}</small>
//                       <div>₹{(price * quantity).toFixed(2)}</div>
//                     </div>
//                   </div>
//                 ))} */}
//                 {cartItems.map(({ id, name, price, quantity }) => {
//   const product = products.find((p) => p.name === name);
//   const imageSrc = product ? product.img : '/images/default.jpg';

//   return (
//     <div key={id} className="item-preview">
//       <img src={imageSrc} alt={name} className="product-img" />
//       <div>
//         <h6><strong>{name}</strong></h6>
//         <small>Qty: {quantity} | ₹{price.toFixed(2)}</small>
//         <div>₹{(price * quantity).toFixed(2)}</div>
//       </div>
//     </div>
//   );
// })}

//               </div>

//               <hr />
//               <div className="summary-item">
//                 <span>Subtotal:</span>
//                 <span>₹{total.toFixed(2)}</span>
//               </div>
//               <div className="summary-item">
//                 <span>Tax (10%):</span>
//                 <span>₹{taxAmount.toFixed(2)}</span>
//               </div>
//               <hr />
//               <div className="summary-total">
//                 <span>Total:</span>
//                 <span>₹{grandTotal.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>

//   );
// }




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Payment.css';

export default function Payment() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userEmail = user?.email || null;
  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: userEmail || '',
    phone: '',
    address: '',
    addressType: 'home',
  });

  const [selectedPayment, setSelectedPayment] = useState('card');
  const [upiId, setUpiId] = useState('');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });

  const [error, setError] = useState('');

  const products = [
    { id: 1, name: 'Pot', img: '/images/product1.jpg' },
    { id: 2, name: 'Jewellery', img: '/images/product2.jpg' },
    { id: 3, name: 'Wooden Mug', img: '/images/product3.jpg' },
    { id: 4, name: 'Handmade Knife', img: '/images/product4.jpg' },
    { id: 5, name: 'Dress', img: '/images/product5.jpg' },
  ];

  useEffect(() => {
    const fetchCart = async () => {
      if (!userEmail) {
        alert('Please log in to view your cart.');
        navigate('/login');
        return;
      }
      try {
        const res = await axios.get(`http://localhost:5000/cart/${userEmail}`);
        setCartItems(res.data.cartItems || []);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        alert('Failed to load cart items');
      }
    };
    fetchCart();
  }, [userEmail, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      return false;
    }
    if (selectedPayment === 'card') {
      if (!cardData.number.match(/^\d{16}$/)) {
        setError('Card number must be 16 digits');
        return false;
      }
      if (!cardData.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        setError('Expiry must be MM/YY');
        return false;
      }
      if (!cardData.cvv.match(/^\d{3}$/)) {
        setError('CVV must be 3 digits');
        return false;
      }
    }
    if (selectedPayment === 'upi' && !upiId.trim()) {
      setError('Please enter a valid UPI ID');
      return false;
    }
    setError('');
    return true;
  };

  // const handlePayment = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   try {
  //     // Optionally send payment data to backend here

  //     alert('Payment successful!');
  //     navigate('/payment-success');
  //   } catch (err) {
  //     alert('Payment failed. Please try again.');
  //   }
  // };

  const handlePayment = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const orderData = {
    email: formData.email,
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    address: formData.address,
    addressType: formData.addressType,
    paymentMethod: selectedPayment,
    upiId: selectedPayment === 'upi' ? upiId : '',
    card: selectedPayment === 'card' ? cardData : {},
    cartItems,
    total: grandTotal.toFixed(2),
  };

  try {
    await axios.post('http://localhost:5000/place-order', orderData);
    alert('Payment successful!');
    navigate('/payment-success');
  } catch (err) {
    console.error('Order failed:', err);
    alert('Payment failed. Please try again.');
  }
};


  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const grandTotal = subtotal + tax;

  return (
    <div className="payment-container">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="payment-card">
          <div className="payment-content">
            <form className="delivery-form" onSubmit={handlePayment}>
              <div className="form-fields">
                <div className="name">
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="emailphone">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <textarea
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="payment-methods">
                <h4>Payment Method:</h4>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={selectedPayment === 'card'}
                    onChange={() => setSelectedPayment('card')}
                  />
                  Credit/Debit Card
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={selectedPayment === 'upi'}
                    onChange={() => setSelectedPayment('upi')}
                  />
                  UPI
                </label>
              </div>

              {selectedPayment === 'upi' && (
                <div className="upi">
                  <input
                    type="text"
                    placeholder="Enter UPI ID"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    required
                  />
                </div>
              )}

              {selectedPayment === 'card' && (
                <div className="card-fields">
                  <input
                    name="number"
                    type="text"
                    placeholder="Card Number"
                    value={cardData.number}
                    onChange={handleCardChange}
                    required
                  />
                  <div className="validity">
                    <input
                      name="expiry"
                      type="text"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={handleCardChange}
                      required
                    />
                    <input
                      name="cvv"
                      type="password"
                      placeholder="CVV"
                      value={cardData.cvv}
                      onChange={handleCardChange}
                      required
                    />
                  </div>
                </div>
              )}

              {error && <div className="error-msg">{error}</div>}

              <button type="submit" className="save-btn">
                Pay ₹{grandTotal.toFixed(2)}
              </button>
            </form>

            <div className="payment-summary">
              <h3>In Your Bag</h3>
              <div className="cart-scroll">
                {cartItems.map(({ id, name, price, quantity }) => {
                  const product = products.find((p) => p.name === name);
                  const imageSrc = product ? product.img : '/images/default.jpg';
                  return (
                    <div key={id} className="item-preview">
                      <img src={imageSrc} alt={name} className="product-img" />
                      <div>
                        <h6><strong>{name}</strong></h6>
                        <small>Qty: {quantity} | ₹{price.toFixed(2)}</small>
                        <div>₹{(price * quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <hr />
              <div className="summary-item"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="summary-item"><span>Tax:</span><span>₹{tax.toFixed(2)}</span></div>
              <hr />
              <div className="summary-total"><span>Total:</span><span>₹{grandTotal.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
