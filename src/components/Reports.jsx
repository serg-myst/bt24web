import './Reports.css'
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import TableTask from './Table';
import { Link } from "react-router-dom";

function Reports() {

  const [departments, setDepartments] = useState([]);
  const [activeMenuItem, setActiveMenuItem] = useState("000");
  const {depid} = useParams();

  const fetchDepartments = () => {
  const apiUrl = import.meta.env.VITE_API_URL_DEPARTMENTS;
  axios.get(apiUrl).then((resp) => {
    setDepartments(resp.data.data);
  });
  }

  useEffect(() => {
    fetchDepartments();
  },[]);

  return (
    <section className="table__section">
      <div className="container"> 
         <nav className="nav_reports">
          <ul className="nav__list">
            {/*
            <li className={activeMenuItem === "000" ? "nav__list-item active" : "nav__list-item"} key="000" onClick={() => setActiveMenuItem("000")}>
              <a className='nav__list-link' href='#'>Все</a>
            </li>
            */}
            {departments.map(dep => {
            return (
              <li className={activeMenuItem === dep.id ? "nav__list-item active" : "nav__list-item"} key={dep.id} onClick={() => setActiveMenuItem(dep.id)}>
              <Link className='nav__list-link' to={`/reports/${dep.id}`}>{dep.name}</Link>
            </li>
          )
        })}
          </ul>   
        {activeMenuItem === "000" ? <h3 className='nav_reports-title'>Выберите раздел для формирования отчета по задачам</h3> : <TableTask depId = {depid}/>}
      </nav> 
      </div>
    </section>
  )
}

export default Reports