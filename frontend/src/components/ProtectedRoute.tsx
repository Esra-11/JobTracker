import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])

  if (!localStorage.getItem('token')) return null

  return children
}

export default ProtectedRoute