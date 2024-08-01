import './Table.css'
import axios from "axios"
import { useEffect, useState } from "react"
import moment from 'moment'
import DatePickerComp from "./DatePicker"
import Total from './Total'

function TableTask({depId}) {
  const [userTasks, setUserTasks] = useState([]);
  const dayMilliseconds = 24*60*60*1000;
  const [dateStart, setDateStart] = useState(new Date()-(7 * dayMilliseconds));
  const [dateEnd, setDateEnd] = useState(new Date());

  const data = {
    "user_id": 1,
    "date_start": `${moment(dateStart).format()}`,
    "date_stop": `${moment(dateEnd).format()}`
  }

  const fetchUserTasks = () => {
    const apiUrl = `${import.meta.env.VITE_API_URL_DEP_TASKS}${depId}`;
    axios({method: 'post', url: apiUrl, data: data, headers: {
      "Content-type": "application/json; charset=UTF-8"
    }}).then((resp) => {
      setUserTasks(resp.data.data);
    });
    }

    useEffect(() => {
      fetchUserTasks();
  },[depId, dateStart, dateEnd]);
  
  return (
    <div className="table__container">
      <div className='table__report-period'>
        <p className='table__report--period-text'>Период закрытых задач:</p>
        <DatePickerComp  setDateStart={setDateStart} setDateEnd={setDateEnd} dateStart={dateStart} dateEnd={dateEnd}/> 
      </div>   
      <div className='table__report__legend'>
          <span className='table__report__legend-color'></span>  
          <p className='table__report__legend-text'>- Важная задача</p>    
      </div>
      {userTasks.map(user => {
        return ( 
        <div className="table" key={user.id}>
          <h3 className='table__report-header'>{user.last_name} {user.name} {user.second_name}</h3>
          <div className="table__header">
              <div className="table__header-row">
                  <div className="table__header-cell-1"><span className="table__header-cell-text">Задача</span></div>
              </div>
                <div className="table__header-row">
                  <div className="table__header-cell-2"><span className="table__header-cell-text">Статус</span></div>
              </div>
            <div className="table__header-row">
                  <div className="table__header-cell-3"><span className="table__header-cell-text">Описание</span></div>
              </div>
              <div className="table__header-row">
                  <div className="table__header-cell-4"><span className="table__header-cell-text">Заказчик</span></div>
              </div>
              <div className="table__header-row">
                  <div className="table__header-cell-5"><span className="table__header-cell-text">Создана</span></div>
              </div>
              <div className="table__header-row">
                  <div className="table__header-cell-6"><span className="table__header-cell-text">Срок</span></div>
              </div>
              <div className="table__header-row">
                  <div className="table__header-cell-7"><span className="table__header-cell-text">Закрыта</span></div>
              </div>
              <div className="table__header-row">
                  <div className="table__header-cell-8"><span className="table__header-cell-text">Начало</span></div>
              </div>
              <div className="table__header-row">
                  <div className="table__header-cell-9"><span className="table__header-cell-text">Окончание</span></div>
              </div>
              <div className="table__header-row">
                  <div className="table__header-cell-10"><span className="table__header-cell-text">Время, час</span></div>
              </div>
          </div>
          {user.tasks.map(taskList => {
            {const taskComponents = taskList.map(task =>  
              <a target='_blank' href={`${import.meta.env.VITE_API_URL_BT}${user.id}/tasks/task/view/${task.id}/`}>
                <div className={task.priority === 2 ? "table__row high" : "table__row"} key={task.id}>
                    <div className="table__row-row">
                        <div className="table__row-cell-1"><span className="table__row-cell-text">{task.id}</span></div>
                    </div>
                    <div className="table__row-row">
                        <div className="table__row-cell-2"><span className="table__row-cell-text">{task.status}</span></div>
                    </div>
                    <div className="table__row-row">
                        <div className="table__row-cell-3"><span className="table__row-cell-text">{task.title}</span></div>
                    </div>
                    <div className="table__row-row">
                        <div className="table__row-cell-4"><span className="table__row-cell-text">{task.creator.name.replace(/(.+) (.).+ (.).+/, '$1 $2. $3.')}</span></div>
                    </div>
                    <div className="table__row-row">
                        <div className="table__row-cell-5"><span className="table__row-cell-text">{task.createdDate===null ? "" : moment(task.createdDate).format('DD.MM.YYYY')}</span></div>
                    </div>
                    <div className="table__row-row">
                        <div className="table__row-cell-6"><span className="table__row-cell-text">{task.deadline===null ? "" : moment(task.deadline).format('DD.MM.YYYY')}</span></div>
                    </div>
                    <div className="table__row-row">
                        <div className="table__row-cell-7"><span className="table__row-cell-text">{task.closedDate===null ? "" : moment(task.closedDate).format('DD.MM.YYYY')}</span></div>
                    </div>
                    <div className="table__row-row">
                        <div className="table__row-cell-8"><span className="table__row-cell-text">{task.startDatePlan===null ? "" : moment(task.startDatePlan).format('DD.MM.YYYY')}</span></div>
                    </div>
                    <div className="table__row-row">
                        <div className="table__row-cell-9"><span className="table__row-cell-text">{task.endDatePlan===null ? "" : moment(task.endDatePlan).format('DD.MM.YYYY')}</span></div>
                    </div>
                    <div className="table__row-row">
                        <div className="table__row-cell-10"><span className="table__row-cell-text">{task.timeEstimate}</span></div>
                    </div>             
                </div>
               </a>
          )
          return (
            <>
              {taskComponents}
              <Total taskList={taskList}/>
            </>
          )
        } 
 
        })} 
      </div>
        ) 
      })}    
      </div>
  )

}

export default TableTask