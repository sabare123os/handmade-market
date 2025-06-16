// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Register from './Component/Register';
// import Login from './Component/Login';
// import Home from './Component/Home';
// import Cart from './Component/Cart';
// import Payment from'./Component/Payment';
// import PaymentSuccess from './Component/PaymentSuccess';
// import React, { useEffect } from 'react';

// function App() {
  
//   return (
//     <BrowserRouter>
//       <Routes>
        
//         <Route path="/" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/cart"element={<Cart/>}/>
//         <Route path="/payment"element={<Payment/>}/>
//         <Route path="/payment-success" element={<PaymentSuccess />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Component/Register';
import Login from './Component/Login';
import Home from './Component/Home';
import Cart from './Component/Cart';
import Payment from './Component/Payment';
import PaymentSuccess from './Component/PaymentSuccess';
import React from 'react';

function App() {
  const userId = localStorage.getItem('currentUser');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/home"element={<Home/>}/> */}
        <Route
           path="/home"element={userId ? <Home /> : <Navigate to="/login" replace />}
         />
        <Route
          path="/cart"element={userId ? <Cart /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/payment"element={userId ? <Payment /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/payment-success"element={userId ? <PaymentSuccess /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to={userId ? "/home" : "/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

