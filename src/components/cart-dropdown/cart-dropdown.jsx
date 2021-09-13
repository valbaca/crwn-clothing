import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { toggleCartHidden } from "../../redux/cart/cart-actions"
import { selectCartItems } from "../../redux/cart/cart-selectors"
import CartItem from "../cart-item/cart-item"
import CustomButton from "../custom-button/custom-button"
import "./cart-dropdown.scss"

const CartDropdown = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const cartItems = useSelector(selectCartItems)

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push("/checkout")
          dispatch(toggleCartHidden())
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  )
}

export default CartDropdown
