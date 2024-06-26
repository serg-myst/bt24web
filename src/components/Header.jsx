import CurrentTime from "./CurrentTime"
import './Header.css'
import { Link } from "react-router-dom";

function Header() {

  return (
    <header className="header">
      <div className="container"> 
        <div className="header_wrapper">
          <ul className="header__list">
            <li>
              <Link className='header__list-link' to="/">На главную</Link>
            </li>
            <li>
              <Link className='header__list-link' to="/reports/000">Отчеты</Link>
            </li>
          </ul>   
        </div>
      </div>
    </header>
  )
}

export default Header