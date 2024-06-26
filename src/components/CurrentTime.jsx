import { useState } from "react"

function GetTime() {
  const [now, SetNow] = useState(new Date())

  setInterval(() => SetNow(new Date()), 1000) 

  return (
    <span className="current_time">Текущее время: {now.toLocaleTimeString()}</span>
  )

}

export default GetTime