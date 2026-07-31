import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signup } from '../api/auth'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    try {
      await signup({ name, email, age: Number(age), password })
      navigate('/login')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <h2>Create your account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
       <div className="form-row">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
       </div>
       <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  )
}

export default Signup