import './index.css'

import {AiOutlineHome} from 'react-icons/ai'
import {FiLogOut, FiShoppingBag} from 'react-icons/fi'

import {Link} from 'react-router-dom'

const Header = () => (
  <nav className="nav-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      alt="website logo"
      className="logo"
    />
    <div className="small-nav-links">
      <Link to="/" className="link">
        <button type="button" className="icon-btn">
          <AiOutlineHome className="icons" />
        </button>
      </Link>

      <Link to="/jobs" className="link">
        <button type="button" className="icon-btn">
          <FiShoppingBag className="icons" />
        </button>
      </Link>
      <Link to="/login" className="link">
        <button type="button" className="icon-btn">
          <FiLogOut className="icons" />
        </button>
      </Link>
    </div>
    <div className="large-nav-links">
      <Link to="/" className="link">
        Home
      </Link>
      <Link to="/jobs" className="link">
        Jobs
      </Link>
    </div>
    <div className="logout-large">
      <Link to="/login" className="link">
        <button type="button" className="logout-btn">
          Logout
        </button>
      </Link>
    </div>
  </nav>
)

export default Header
