import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login(){

const [username,setUsername]=useState("")
const [password,setPassword]=useState("")

const navigate = useNavigate()

const handleLogin=()=>{

const storedUser = JSON.parse(localStorage.getItem("user"))

if(
storedUser &&
storedUser.username===username &&
storedUser.password===password
){
localStorage.setItem("loggedIn",true)
navigate("/dashboard")
}
else{
alert("Invalid Login")
}

}

return(

<div className="container">

<h2>Login</h2>

<input
placeholder="Username"
onChange={(e)=>setUsername(e.target.value)}
/>

<br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/>

<button onClick={handleLogin}>
Login
</button>

<p>
Don't have an account? <Link to="/signup">Signup here</Link>
</p>

</div>

)

}

export default Login