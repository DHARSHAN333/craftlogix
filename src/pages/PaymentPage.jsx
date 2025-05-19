// src/pages/PaymentPage.jsx
import React from 'react';
import './PaymentPage.css'; // Import the CSS file for PaymentPage

function PaymentPage() {
  return (
    <div className="payment-page">
      <h2>Make a Payment</h2>
      <form>
        <input type="number" placeholder="Amount" />
        <input type="submit" value="Pay Now" />
      </form>
    </div>
  );
}

export default PaymentPage;
