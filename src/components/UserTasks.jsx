import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import './UserTasks.css'
import TaskLink from './TaskLink'
import DatePickerComp from "./DatePicker"
import moment from 'moment'
import { Link } from "react-router-dom" 

function UserTasks() {
  const {depname, depid, id, status, name} = useParams()
  const [tasks, setTasks] = useState([])
  const [type, setType] = useState(status)
  const dayMilliseconds = 24*60*60*1000;
  const [dateStart, setDateStart] = useState(new Date()-(7 * dayMilliseconds));
  const [dateEnd, setDateEnd] = useState(new Date());

  function GetApiUrl(status) {
    switch (status) {
    case 'closed':
      return import.meta.env.VITE_API_URL_TASK_CLOSED;
    case 'deferred':
      return import.meta.env.VITE_API_URL_TASK_DEFERRED; 
    default:
      return import.meta.env.VITE_API_URL_WORK; 
    }
  }

  const apiUrl = GetApiUrl(status)


  const data = {
    "user_id": `${id}`,
    "date_start": `${moment(dateStart).format()}`,
    "date_stop": `${moment(dateEnd).format()}`
  }

  const fetchDepartments = () => {
    status === 'closed' ? axios({method: 'post', url: apiUrl, data: data, headers: {
      "Content-type": "application/json; charset=UTF-8"
    }}).then((resp) => {
      setTasks(resp.data.data);
    }) : axios.get(`${apiUrl}${id}`).then((resp) => {
    setTasks(resp.data.data);
  });
  }

  useEffect(() => {
    fetchDepartments()
  },[status, dateStart, dateEnd])

  function handlerClick(type) {
    setType(type)
  }

  return(
    <section className="card__section-task">
    <div className="container">
      <div className="user_task__department">
        <Link className="user_task__department-link" to={`/department/${depname}/${depid}`}><span className="user_task__department-link-text">Cписок сотрудников</span></Link>
        <p className="task_name_title">Cотрудник: {name}</p>   
      </div>
      <ul className="user_task_status-list">
      <li>
        <TaskLink name='В работе' isActive={type==='inwork'} link_to={`/tasks/${depname}/${depid}/${name}/inwork/${id}`} onClick={() => handlerClick('inwork')} />      
      </li>
      <li>
        <TaskLink name='Завершенные' isActive={type==='closed'} link_to={`/tasks/${depname}/${depid}/${name}/closed/${id}`} onClick={() => handlerClick('closed')} />  
      </li>
      <li>
        <TaskLink name='Отложенные' isActive={type==='deferred'} link_to={`/tasks/${depname}/${depid}/${name}/deferred/${id}`} onClick={() => handlerClick('deferred')} />      
      </li>
      </ul>  
      {type==='closed' ? <DatePickerComp setDateStart={setDateStart} setDateEnd={setDateEnd} dateStart={dateStart} dateEnd={dateEnd}/> : ''}
      <div className="wrapper-task">
        {tasks.map(task => {
        return (
         <div className="card-task" key={task.id}>
            <div className="card__header-task">
              <p className="card__header-task-text">{`№ ${task.id} ${task.title}`}</p>
            </div>
            <div className="card__body-task">
              <p className="card__body-task-text"><span className="card__body-task-span">Описание:</span> {task.title}</p>  
              <p className="card__body-task-text1">Статус: {task.status}</p>
              <div className="card__body-task-date">
                <p className="card__body-task-text2">Создана: {format(new Date(task.createdDate), 'dd.MM.yyyy')}</p>
                <p className="card__body-task-text2">Срок: {task.deadline == null ? '<<не указан>>' : format(new Date(task.deadline), 'dd.MM.yyyy')}</p> 
                {type==='end' ? <p className="card__body-task-closed">Закрыта: {format(new Date(task.closedDate), 'dd.MM.yyyy')}</p> : ''}
              </div>
              <p className="card__body-task-text2">{`Заказчик: ${task.creator.name} (${task.creator.workPosition})`}</p>
              <div className="card__body-user_task">
                <a className="card__link-task" target="_blank" href={`${import.meta.env.VITE_API_URL_BT}${id}/tasks/task/view/${task.id}/`}>
                  <p className="card__link-task-text">Подробно о задаче</p>
                </a>
                <div className={moment(task.deadline).isSameOrBefore(moment(), 'day') && task.status === 'В работе' ? "info-line active" : "info-line"}>
                  <span className="card__body-info">!</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
        </div>
    </div>
    </section>
  )

}

export default UserTasks