import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";


import "./Checkout.css";
import CardIcon from "../images/credit-card.jpg";
import ProductImage from "../images/product-image.jpg";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    console.log("Stripe Public Key:", process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};



const Checkout = () => {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const item = {
    price: "price_1OEoesSGCRZCMfvwSUo22LqF",
    quantity: 1
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`
  };

  const redirectToCheckout = async () => {
    setLoading(true);

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);

    if (error) {
      setStripeError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="checkout">
      <h1>CHECKOUT PAGE</h1>
      <p className="checkout-title">Buy Something</p>
      <p className="checkout-description">Window Shopping :)</p>
      <h1 className="checkout-price">$19</h1>
      <img
        className="checkout-product-image"
        src={ProductImage}
        alt="Product"
      />
      {stripeError && <p className="error-message">{stripeError}</p>}
      <button
        className="checkout-button"
        onClick={redirectToCheckout}
        disabled={isLoading}
      >
        <div className="grey-circle">
          <div className="purple-circle">
            <img className="icon" src={CardIcon} alt="credit-card-icon" />
          </div>
        </div>
        <div className="text-container">
          <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
        </div>
      </button>
    </div>
  );
};

export default Checkout;
