import { useState } from "react"
import { login } from "../services/authService"
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

const handleLogin = async () => {
  const response = await login(email, password)
  localStorage.setItem('token', response.data.token)
  navigate('/dashboard')
  console.log('Login successful, token stored in localStorage')

}

  return (
    <div>
        <h1>Login Page</h1>
        <label>E-Mail</label>
          <br/>
        <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Enter your email" />
        <br/>
        <br/>
        <label>Password</label>
          <br/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
         <br/>
         <br/>

        <button onClick={handleLogin}>Login</button>
         <br/>
         <br/>
        <label>Don't have an account? <Link to="/register">Register</Link></label>
    </div>
  )
}

export default LoginPage