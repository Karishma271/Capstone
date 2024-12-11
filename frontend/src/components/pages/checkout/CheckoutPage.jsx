import React, { useEffect } from 'react';

const CheckoutPage = () => {
  useEffect(() => {
    // Load Stripe.js asynchronously
    const stripeScript = document.createElement('script');
    stripeScript.src = 'https://js.stripe.com/v3/buy-button.js';
    stripeScript.async = true;
    document.head.appendChild(stripeScript);

    // Ensure Stripe.js has loaded before attempting to render the Buy Button
    stripeScript.onload = () => {
      const stripeBuyButton = document.createElement('stripe-buy-button');
      stripeBuyButton.setAttribute('buy-button-id', "buy_btn_1QS9QjP6NlN8CVJrWT3iqU7E");
      stripeBuyButton.setAttribute('publishable-key', 'pk_test_51QS8roP6NlN8CVJr8TqKC1OEMb4PBARnfv4Bump5rSmg02xHJ1a08b77WqXCxDCuh94egG9xhT6E2RC2gpVkH8Mt00Dhsjho4G');

      // Append the Stripe Buy Button element to the component
      document.getElementById('checkout-container').appendChild(stripeBuyButton);
    };

    return () => {
      // Clean up the script element when the component is unmounted
      document.head.removeChild(stripeScript);
    };
  }, []);

  return (
    <div id="checkout-container">
      {/* Placeholder for the Stripe Buy Button */}
    </div>
  );
};

export default CheckoutPage;
