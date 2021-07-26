import React from "react"
import StripeCheckout from "react-stripe-checkout"

const PUBLISHABLE_KEY =
  "pk_test_51JHamHGoosB7NEA9BKSl3IvfxHAyaLGZPgkc7AnXdBxjbwHNQg4mEH9z0eVt5UZGQiF03c0Fb5KHJDXUtenQ1RKA00A2aOsEB2"

const StripeCheckoutButton = ({ price }) => {
  // stripe wants price in US Cents
  const priceForStripe = price * 100
  const onToken = (token) => {
    console.log(token)
    alert("Payment Successful")
  }
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={PUBLISHABLE_KEY}
    />
  )
}

export default StripeCheckoutButton
