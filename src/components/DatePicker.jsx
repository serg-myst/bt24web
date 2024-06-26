import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.css'
import { useState } from "react"

function DatePickerComp({setDateStart, setDateEnd, dateStart, dateEnd}) {

  return(
  <div className='date-pickker-wrapper'>
    <span className='date-pickker-text'>C</span>
    <DatePicker className="date-pickker_input" dateFormat='dd.MM.yyyy' selected={dateStart} onChange={(dateStart) => setDateStart(dateStart)} />
    <span className='date-pickker-text'>по</span>
    <DatePicker className="date-pickker_input" dateFormat='dd.MM.yyyy' selected={dateEnd} onChange={(dateEnd) => setDateEnd(dateEnd)} />
  </div>  
  )
}

export default DatePickerComp