import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { ReactComponent as Logo } from "../../assets/crown.svg"
import { selectCartHidden } from "../../redux/cart/cart-selectors"
import { signOutStart } from "../../redux/user/user-actions.js"
import { selectCurrentUser } from "../../redux/user/user-selectors"
import CartDropdown from "../cart-dropdown/cart-dropdown"
import CartIcon from "../cart-icon/cart-icon"
import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsContainer
} from "./header-styles"

const Header = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const hidden = useSelector(selectCartHidden)

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        {currentUser ? (
          <OptionLink as="div" onClick={() => dispatch(signOutStart())}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropdown />}
    </HeaderContainer>
  )
}

export default Header
