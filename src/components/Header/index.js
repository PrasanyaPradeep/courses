import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="nav-container">
    <Link to="/">
      <div className="image-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="logo-image"
        />
      </div>
    </Link>
  </nav>
)

export default Header
