
import { Link } from "react-router-dom";
import './LinkTask.css'

function TaskLink({name, link_to, onClick, isActive}) {

  return (
    <Link to={link_to} className={isActive ? "user_task_status-link active" : "user_task_status-link"} onClick={onClick}>{name}</Link>
  )

}

export default TaskLink