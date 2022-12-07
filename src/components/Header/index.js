import './index.css'

import {AiOutlineHome} from 'react-icons/ai'
import {FiLogOut, FiShoppingBag} from 'react-icons/fi'

import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/" className="link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo"
        />
      </Link>

      <ul className="small-nav-links">
        <Link to="/" className="link">
          <li className="icon-btn">
            <AiOutlineHome className="icons" />
          </li>
        </Link>

        <Link to="/jobs" className="link">
          <li className="icon-btn">
            <FiShoppingBag className="icons" />
          </li>
        </Link>
        <Link to="/login" className="link">
          <li className="icon-btn" onClick={onClickLogout}>
            <FiLogOut className="icons" />
          </li>
        </Link>
      </ul>
      <div className="large-nav-links">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/jobs" className="link">
          Jobs
        </Link>
      </div>
      <div className="logout-large">
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
