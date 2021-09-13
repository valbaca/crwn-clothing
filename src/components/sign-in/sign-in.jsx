import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { googleSignInStart } from "../../redux/user/user-actions.js"
import CustomButton from "../custom-button/custom-button"
import FormInput from "../form-input/form-input"
import "./sign-in.scss"

const SignIn = ({ emailSignInStart }) => {
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })
  const { email, password } = credentials

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(emailSignInStart(email, password))
  }

  const handleChange = (event) => {
    const { value, name } = event.target
    setCredentials({ ...credentials, [name]: value })
  }

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          label="email"
          handleChange={handleChange}
          value={email}
          required
        />
        <FormInput
          name="password"
          type="password"
          label="password"
          handleChange={handleChange}
          value={password}
          required
        />

        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            onClick={() => dispatch(googleSignInStart())}
            isGoogleSignIn
          >
            Sign In with Google
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

export default SignIn
