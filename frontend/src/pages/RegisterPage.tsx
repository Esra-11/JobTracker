import { useState } from "react"
import { login, register } from "../services/authService"
import { useNavigate } from 'react-router-dom'

function RegisterPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState('')

const handleRegister = async () => {
try{
      await register(email, password)
  console.log('Register successful')
  navigate('/login')
}catch(error){
    setError('Registration failed. Please try again.')
}
}
  return (
    <div>
        <h1>Register Page</h1>
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

        <button onClick={handleRegister}>Register</button>
        {error && <p>{error}</p>}
    </div>
  )
}
export default RegisterPage