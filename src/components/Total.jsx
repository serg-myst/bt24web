
function Total({taskList}) {

    if (taskList.length === 0) {
      return ""
    }

    const GetSum = () => {
      let sum =''
      if (taskList.length > 0) {
        sum = 0
        taskList.forEach(el => sum += Number(el.timeEstimate))
      }
      return sum
    }

    const totalSum = GetSum()  

    console.log(totalSum)
   
    return (
      <div className="table__report_total"><span className="table__report_total-text">Плановых часов: {totalSum}</span></div>
    )
} 

export default Total