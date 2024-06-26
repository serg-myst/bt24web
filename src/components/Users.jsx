import { useParams } from "react-router-dom";
import { Link } from "react-router-dom" 
import { useState, useEffect } from "react";
import axios from "axios";
import nophoto from "./no-image.png"
import { format } from 'date-fns';
import './Users.css'

function DepartmentUsers() {
  const {id, name} = useParams()
  const [users, setUsers] = useState([])

  const fetchDepartments = () => {
    const apiUrl = `${import.meta.env.VITE_API_URL_USERS}${id}`;
    axios.get(apiUrl).then((resp) => {
      setUsers(resp.data.data);
    });
    }
  
    useEffect(() => {
      fetchDepartments()
    }, [id])

  
    return (
      <section className="card__section-user">
      <div className="container">
        <p className="user_name_title">{name}</p>
        <div className="wrapper-user">
        {users.map(user => {
        return (
         <div className="card-user" key={user.id}>
            <div className="card__header-user">
              <p className="card__header-user-text">{`${user.last_name} ${user.name} ${user.second_name}`}</p>
              <Link to={`/tasks/${name}/${id}/${user.last_name} ${user.name} ${user.second_name}/inwork/${user.id}`} className="card__link-user"><span className="card__link-user-text">Задачи</span></Link>
            </div>
            <div className="card__body-user">
              <p className="card__body-user-text1">Должность: {user.work_position == '' ? '<<Не указана>>' : user.work_position}</p>
              <p className="card__body-user-text2">Email: {user.email == '' ? '<<Не указан>>' : user.email}</p>
              <p className="card__body-user-text2">Телефон: {user.phone == '' ? '<<Не указан>>' : user.phone}</p>
              <p className="card__body-user-text2">Дата рождения: {user.birthday === '2000-01-01T00:00:00' ? '<<Не указана>>' : format(new Date(user.birthday), 'dd.MM.yyyy')}</p>
              <p className="card__body-user-img"><img src={user.photo == null ? nophoto : user.photo} alt='photo'></img></p>
            </div>
          </div>
        )
      })}
        </div>
      </div>
    </section>
    )
    
}

export default DepartmentUsers