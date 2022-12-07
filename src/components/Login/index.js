import './index.css'

import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    loginSuccess: true,
    errormsg: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangeUserPassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 3})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = errormsg => {
    this.setState({loginSuccess: false, errormsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const details = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(details),
    }

    const response = await fetch(apiUrl, option)

    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const jwtToken = data.jwt_token
      //   console.log(jwtToken)
      this.onSuccessLogin(jwtToken)
    } else {
      console.log(data.error_msg)
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errormsg, loginSuccess} = this.state
    // console.log(username, password)
    const Token = Cookies.get('jwt_token')
    if (Token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg">
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </div>
          <div className="input-container">
            <label htmlFor="user-name" className="username-label">
              USERNAME
            </label>
            <input
              id="user-name"
              type="text"
              className="user-name"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUserName}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="username-label">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="user-name"
              placeholder="Password"
              value={password}
              onChange={this.onChangeUserPassword}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {loginSuccess ? null : <p className="error-msg">*{errormsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
