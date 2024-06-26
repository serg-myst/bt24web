import nophoto from "./no-image.png"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom" 
import './Department.css'

function DepartmentsList(department_list) {
  
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = () => {
  const apiUrl = import.meta.env.VITE_API_URL_DEPARTMENTS;

  axios.get(apiUrl).then((resp) => {
    setDepartments(resp.data.data);
  });
  }

  useEffect(() => {
    fetchDepartments()
  },[])

  function Photo(photo) {
    if (photo == null) {
      return <p><img style={{width: 100, hight: 100}} src={photo} alt='photo'></img></p> 
    }  
  }

  return (
    <section className="card__section-department">
      <div className="container">
        <div className="wrapper-department">
        {departments.map(dep => {
        return (
         <div className="card-department" key={dep.id}>
            <div className="card__header-department">
              <p className="card__header-department-text">{dep.name}</p>
              <Link to={`/department/${dep.name}/${dep.id}`} className="card__link-department"><span className="card__link-department-text">Сотрудники</span></Link>
            </div>
            <div className="card__body-department">
              {dep.dep_head===null ? <p className="card__body-department-text1">{"Руководитель: <<не указан>>"}</p> : <p className="card__body-department-text1">Руководитель: {dep.dep_head.user.last_name} {dep.dep_head.user.name} {dep.dep_head.user.second_name}</p>}
              {dep.dep_head===null ? <p className="card__body-department-text2">{"Должность: <<не указана>>"}</p> : <p className="card__body-department-text2">Должность: {dep.dep_head.user.work_position}</p>}
              {dep.dep_head===null ? <p className="card__body-department-img"><img src={nophoto} alt='photo'></img></p> : <p className="card__body-department-img"><img src={dep.dep_head.user.photo == null ? nophoto : dep.dep_head.user.photo} alt='photo'></img></p>}
            </div>
          </div>
        )
      })}
        </div>
      </div>
    </section>
  )

}

export default DepartmentsList