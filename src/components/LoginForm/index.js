import {Component} from 'react'
import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: false,
  }

  changeEmail = event => {
    this.setState({
      email: event.target.value,
    })
  }

  changePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  submitForm = event => {
    event.preventDefault()
    this.getTheResponse()
  }

  getTheResponse = async () => {
    const {email, password} = this.state

    const url = 'https://bursting-gelding-24.hasura.app/api/rest/get-user-id'

    const headersDetails = {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret':
        'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
    }
    const userDetails = {
      email,
      password,
    }

    const options = {
      headers: headersDetails,
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      if (data.get_user_id.length === 0) {
        this.setState({
          error: true,
        })
      } else {
        const {id} = data.get_user_id[0]
        const {history} = this.props
        Cookies.set('id', id, {expires: 1})
        if (email === 'admin@gmail.com') {
          history.replace(`/admin-dashboard`)
        } else {
          history.replace(`/user/${id}`)
        }
      }
    } else {
      this.setState({
        error: true,
      })
    }
  }

  render() {
    const {error} = this.state
    return (
      <div className="login_Background">
        <h1>Money Matters</h1>
        <div className="login-form-box">
          <form onSubmit={this.submitForm}>
            <label htmlFor="email">E-Mail</label>
            <br />
            <input
              id="email"
              type="text"
              placeholder="E-Mail"
              onChange={this.changeEmail}
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={this.changePassword}
            />
            <br />
            <button type="submit">Submit</button>
            {error && <p>Username or Password is Incorrect</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
