import React from "react"
import { connect } from "react-redux"
import {
  emailSignInStart,
  googleSignInStart
} from "../../redux/user/user-actions.js"
import CustomButton from "../custom-button/custom-button"
import FormInput from "../form-input/form-input"
import "./sign-in.scss"

class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: ""
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const { emailSignInStart } = this.props
    const { email, password } = this.state

    this.setState({ email: "", password: "" })
    emailSignInStart(email, password)
  }

  handleChange = (event) => {
    const { value, name } = event.target

    this.setState({ [name]: value })
  }

  render() {
    const { googleSignInStart } = this.props
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            label="email"
            handleChange={this.handleChange}
            value={this.state.email}
            required
          />
          <FormInput
            name="password"
            type="password"
            label="password"
            handleChange={this.handleChange}
            value={this.state.password}
            required
          />

          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton
              type="button"
              onClick={googleSignInStart}
              isGoogleSignIn
            >
              Sign In with Google
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn)
