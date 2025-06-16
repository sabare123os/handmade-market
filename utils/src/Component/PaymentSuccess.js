import React from 'react';
import'./PaymentSuccess.css';

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4"id='paymentsuccess'>
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full"id='payment-card'>
        {/* ✅ Actual Green Tick GIF */}
        <img
          src="https://i.gifer.com/7efs.gif" // This one shows a green animated tick
          alt="Payment Success"
          className="w-24 h-24 mx-auto mb-4 id='tickgif'"
        />

        <h2 className="text-2xl font-semibold text-gray-800 mb-2"id='orderplacedsuccessfully'>Order Placed Successfully!</h2><br></br>
        <p className="text-gray-600 mb-6"id='greetings1'>
          Thank you for your purchase. 
        </p>
        <p id='greetings2'>To track down your order <a href=''>click here</a></p>

        <button
          onClick={() => window.location.href = '/home'}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full"id='button-to-home'
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
