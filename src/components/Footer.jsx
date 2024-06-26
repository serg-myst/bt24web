import './Footer.css'
import moment from 'moment'

function Footer() {
  return (
    <footer className='footer'>
      <span className='footer-text'>Copyright {moment().format('YYYY')}</span>
    </footer>
  )
}

export default Footer