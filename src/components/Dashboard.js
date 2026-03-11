import WeightForm from "./WeightForm"
import WeightList from "./WeightList"
import { useNavigate } from "react-router-dom"

function Dashboard(){

const navigate = useNavigate()

const logout=()=>{
localStorage.removeItem("loggedIn")
navigate("/")
}

return(

<div>

<h2>Weight Dashboard</h2>

<button onClick={logout}>
Logout
</button>

<WeightForm/>

<WeightList/>

</div>

)

}

export default Dashboard