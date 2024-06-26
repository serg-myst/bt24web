
import photo_404 from "./not_found_404.svg"
import './NotFoundPage.css'

function NotFoundPage() {
  return (
    <div className="page_not_found">
    <div className="container">
      <div className="not_found">
       <img className="not_found_img" src={photo_404}></img>       
      </div>
    </div> 
    </div>
  )
}

export default NotFoundPage