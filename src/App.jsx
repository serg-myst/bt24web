import MainPage from "./components/MainPage"
import NotFoundPage from "./components/NotFoundPage"
import DepartmentUsers from "./components/Users"
import UserTasks from "./components/UserTasks"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Reports from "./components/Reports"


import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
   
  return (
    <div className="wrapper__project">
    <BrowserRouter>  
        <Header /> 
        <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/reports/:depid" element={<Reports />} />
        <Route path="department/:name/:id" element={<DepartmentUsers />} />
        <Route path="tasks/:depname/:depid/:name/:status/:id" element={<UserTasks />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    <Footer />
    </div>
  )
}

export default App
