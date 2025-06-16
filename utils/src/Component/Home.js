// import React, { useState, useEffect } from 'react';
// import './Home.css';
// import product1 from '../Assets/product 1.jpg';
// import product2 from '../Assets/product2.jpg';
// import product3 from '../Assets/product3.jpg';
// import product4 from '../Assets/product4.jpg';
// import product5 from '../Assets/product5.jpg';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Home() {
//   const [userEmail, setUserEmail] = useState(null);
//   const navigate = useNavigate();
//   // const user = JSON.parse(localStorage.getItem("user"));
//   // const userEmail = user?.email || null;
// // const userEmail = user?.email || null;

//   const [cart, setCart] = useState([]);
//   const [cartCount, setCartCount] = useState(0);

//   const products = [
//     { id: 1, name: 'Pot', price: 99.99, img: product1 },
//     { id: 2, name: 'Jewellery', price: 999.99, img: product2 },
//     { id: 3, name: 'Wooden Mug', price: 69.99, img: product3 },
//     { id: 4, name: 'Handmade Knife', price: 249.99, img: product4 },
//     { id: 5, name: 'Dress', price: 499.99, img: product5 }
//   ];
// // // console.log(localStorage.getItem('user'));
//   const fetchCart = async () => {
//     if (!userEmail) {
//       setCart([]);
//       setCartCount(0);
//       return;
//     }

//     try {
//       const res = await axios.get(`http://localhost:5000/cart/${userEmail}`);
//       if (res.data && res.data.cartItems) {
//         setCart(res.data.cartItems);
//         // const totalQty = res.data.cartItems.reduce((sum, item) => sum + item.qty, 0);
//         const totalQty = res.data.cartItems.reduce((sum, item) => sum + item.quantity, 0);

//         setCartCount(totalQty);
//       } else {
//         setCart([]);
//         setCartCount(0);
//       }
//     } catch (err) {
//       console.error('Error fetching cart:', err);
//       setCart([]);
//       setCartCount(0);
//     }
//   };

//   const addToCart = async (product) => {
//     if (!userEmail) {
//       alert("Please log in to add items to your cart.");
//       navigate('/login');
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/cart/add", {
//         email: userEmail,
//         product: {
//           id: product.id,
//           name: product.name,
//           price: product.price,
//           quantity: 1,
//         },
//       });

//       if (response.status === 200 && response.data.cart) {
//         setCart(response.data.cart);
//         // const newCount = response.data.cart.reduce((sum, item) => sum + item.qty, 0);
//         const newCount = response.data.cart.reduce((sum, item) => sum + item.quantity, 0);

//         setCartCount(newCount);
//         alert(`${product.name} added to cart`);
//       } else {
//         alert("Failed to add to cart, please try again.");
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       alert("Failed to add to cart, please try again.");
//     }
//   };

//   // useEffect(() => {
//   //   fetchCart();
//   // }, [userEmail]);
//   useEffect(() => {
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   setUserEmail(storedUser?.email || null);
// }, []);


//   return (
//     <div>
//       <header className="header">
//         <div className="logo">Handmade Market</div>
//         <nav>
//           <ul className="nav-links">
//             <li><a href="#">Home</a></li>
//             <li><a href="#about">About</a></li>
//             <li><a href="#">Log In</a></li>
//             <li>
//               <Link to="/cart">
//                 Cart ({cartCount})
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </header>

//       <section className="hero">
//         <div className="hero-text">
//           <h1>Discover Your Style</h1>
//           <p><b>Trendy clothes, shoes, and more delivered to your door.</b></p>
//           <a href="#" className="shopbtn">Shop Now</a>
//         </div>
//       </section>

//       <section className="products">
//         <h2>Featured Products</h2>
//         <div className="product-grid">
//           {products.map((product) => (
//             <div key={product.id} className="product-card">
//               <img src={product.img} alt={product.name} />
//               <h3>{product.name}</h3>
//               <p>₹{product.price}</p>
//               <button className="cart-btn" onClick={() => addToCart(product)}>
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="about" id="about">
//         <div className="about-container">
//           <h2>About Handmade Market</h2>
//           <p className="about-intro">
//             Handmade Market connects you with creators, crafters, and communities that keep traditional skills alive...
//           </p>
          
//           <div className="about-story">
//             <h3>Our Story</h3>
//             <p>
//               It all began at a village fair, where we discovered beautiful handcrafted goods without any digital presence. We realized how much talent goes unnoticed, and Handmade Market was born — to bridge the gap between local makers and global buyers.
//             </p>
//           </div>

//           <div className="about-grid">
//             <div className="about-box">
//               <h3>Sustainability 🌿</h3>
//               <p>We are committed to reducing our environmental footprint. From biodegradable packaging to responsibly sourced natural materials, every step we take is designed to support a greener planet. We also ensure our partners receive fair wages and work in safe environments.</p>
//             </div>
//             <div className="about-box">
//               <h3>Artisan-Crafted 🧵</h3>
//               <p>Our products are lovingly handcrafted by skilled artisans using traditional techniques passed down through generations. We celebrate the heritage, creativity, and craftsmanship of every maker, ensuring each item tells a story of authenticity and care.</p>
//             </div>
//             <div className="about-box">
//               <h3>Community First 🤝</h3>
//               <p>We collaborate with local cooperatives and women-led groups, especially in rural and underrepresented areas. By doing so, we help foster economic independence, preserve cultural identity, and uplift communities through long-term partnerships.</p>
//             </div>
//             <div className="about-box">
//               <h3>Mission & Vision 🎯</h3>
//               <p>Our mission is to revive forgotten crafts and support artisans through visibility and fair trade. Our vision is a world where every handmade item has a home, and every artisan has a platform.</p>
//             </div>
//             <div className="about-box">
//               <h3>Meet Our Artisans 🎨</h3>
//               <p>From potters in Gujarat to weavers in Assam, we work with over 300+ artisans across India. Each brings unique style and heritage, shaping our diverse product line.</p>
//             </div>
//             <div className="about-box">
//               <h3>How It Works 🔁</h3>
//               <ul>
//                 <li>You browse unique items from verified makers</li>
//                 <li>Your order supports the artisan directly</li>
//               </ul>
//             </div>
//           </div>
          
//         </div>
//       </section>

//       <footer className="footer">
//         <p>&copy; 2025 Handmade Market. All rights reserved.</p>
//         <p>Contact us: <a href="mailto:support@handmademarket.com">support@handmademarket.com</a> | +1 234 567 890</p>
//       </footer>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import './Home.css';
import product1 from '../Assets/product1.jpg';
import product2 from '../Assets/product2.jpg';
import product3 from '../Assets/product3.jpg';
import product4 from '../Assets/product4.jpg';
import product5 from '../Assets/product5.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [userEmail, setUserEmail] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const products = [
    { id: 1, name: 'Pot', price: 99.99, img: product1 },
    { id: 2, name: 'Jewellery', price: 999.99, img: product2 },
    { id: 3, name: 'Wooden Mug', price: 69.99, img: product3 },
    { id: 4, name: 'Handmade Knife', price: 249.99, img: product4 },
    { id: 5, name: 'Dress', price: 499.99, img: product5 }
  ];

  const fetchCart = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/cart/${email}`);
      if (res.data && res.data.cartItems) {
        setCart(res.data.cartItems);
        const totalQty = res.data.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalQty);
      } else {
        setCart([]);
        setCartCount(0);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCart([]);
      setCartCount(0);
    }
  };


  const handleLogout = () => {
  localStorage.removeItem("user"); // Clear user data
  setUserEmail(null);              // Clear state
  navigate("/login");             // Redirect to login page
};



  const addToCart = async (product) => {
    if (!userEmail) {
      alert("Please log in to add items to your cart.");
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/cart/add", {
        email: userEmail,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image
        },
      });

      if (response.status === 200 && response.data.cart) {
        setCart(response.data.cart);
        const newCount = response.data.cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(newCount);
        alert(`${product.name} added to cart`);
      } else {
        alert("Failed to add to cart, please try again.");
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert("Failed to add to cart, please try again.");
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const email = storedUser?.email || null;
    setUserEmail(email);
    if (email) fetchCart(email);
  }, []);

  return (
    <div>
      <header className="header">
        <div className="logo">Handmade Market</div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><a href="#about">About</a></li>
            {/* <li><Link to="/login">Log out</Link></li> */}
            <li><button onClick={handleLogout} className="logout-btn">Log out</button></li>

            <li>
              <Link to="/cart">
                Cart ({cartCount})
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Discover Your Style</h1>
          <p><b>Trendy clothes, shoes, and more delivered to your door.</b></p>
          <Link to="#products" className="shopbtn">Shop Now</Link>
        </div>
      </section>

      <section className="products" id="products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.img} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <button className="cart-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-container">
          <h2>About Handmade Market</h2>
          <p className="about-intro">
             Handmade Market connects you with creators, crafters, and communities that keep traditional skills alive. We’re a collective of artisans, designers, and dreamers committed to slow fashion, sustainability, and human stories behind every product.
      </p>

          <div className="about-story">
            <h3>Our Story</h3>
            <p> It all began at a village fair, where we discovered beautiful handcrafted goods without any digital presence. We realized how much talent goes unnoticed, and Handmade Market was born — to bridge the gap between local makers and global buyers.            
               </p>
          </div>

          <div className="about-grid">
            <div className="about-box">
              <h3>Sustainability 🌿</h3>
              <p>We are committed to reducing our environmental footprint. From biodegradable packaging to responsibly sourced natural materials, every step we take is designed to support a greener planet. We also ensure our partners receive fair wages and work in safe environments.</p>
             
            </div>
            <div className="about-box">
              <h3>Artisan-Crafted 🧵</h3>
              <p>Our products are lovingly handcrafted by skilled artisans using traditional techniques passed down through generations. We celebrate the heritage, creativity, and craftsmanship of every maker, ensuring each item tells a story of authenticity and care.</p>
             
            </div>
            <div className="about-box">
              <h3>Community First 🤝</h3>
              <p>We collaborate with local cooperatives and women-led groups, especially in rural and underrepresented areas. By doing so, we help foster economic independence, preserve cultural identity, and uplift communities through long-term partnerships.</p>
            </div>
            <div className="about-box">
              <h3>Mission & Vision 🎯</h3>
              <p>Our mission is to revive forgotten crafts and support artisans through visibility and fair trade. Our vision is a world where every handmade item has a home, and every artisan has a platform.</p>
         
            </div>
            <div className="about-box">
              <h3>Meet Our Artisans 🎨</h3>
              <p>From potters in Gujarat to weavers in Assam, we work with over 300+ artisans across India. Each brings unique style and heritage, shaping our diverse product line.</p>
            </div>
            <div className="about-box">
              <h3>How It Works 🔁</h3>
              <ul>
                <li>You browse unique items from verified makers</li>
                <li>Your order supports the artisan directly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Handmade Market. All rights reserved.</p>
        <p>Contact us: <a href="mailto:support@handmademarket.com">support@handmademarket.com</a> | +1 234 567 890</p>
      </footer>
    </div>
  );
}
