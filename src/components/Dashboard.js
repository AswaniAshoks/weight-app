import WeightForm from "./WeightForm"
import WeightList from "./WeightList"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Dashboard(){

const navigate = useNavigate()
const [refresh, setRefresh] = useState(false)

const logout = () => {
localStorage.removeItem("loggedIn")
navigate("/")
}

const refreshData = () => {
setRefresh(!refresh)
}

return(
<div style={{padding:"20px"}}>

<h2>Weight Dashboard</h2>

<button onClick={logout}>Logout</button>

<WeightForm refreshData={refreshData} />

<WeightList refresh={refresh} />

</div>
)

}

export default Dashboard