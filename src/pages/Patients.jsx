import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPatients, createPatient, deletePatient } from '../api/patients'

function Patients() {
  const [patients, setPatients] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')

  useEffect(() => {
    getPatients().then((data) => setPatients(data))
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !age.trim()) {
    alert('Please fill in all fields')
    return
    }

    await createPatient({ name, email, age: Number(age) })
    setName('')
    setEmail('')
    setAge('')
    const updatedList = await getPatients()
    setPatients(updatedList)
  }

  async function handleDelete(userId) {
  await deletePatient(userId)
  setPatients((prev) => prev.filter((p) => p.id !== userId))
}

  return (
    <div>
      <h2>Patients</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">Add Patient</button>
      </form>

      <ul className="list">
        {patients.map((patient) => (
          <li key={patient.id} className="list-item">
           <div className="list-item-links">
             <Link to={`/chat/${patient.id}`}>{patient.name}</Link>
             <span>|</span>
             <Link to={`/history/${patient.id}`}>History</Link>
             <span>|</span>
             <Link to={`/insights/${patient.id}`}>Insights</Link>
             <span className="list-item-meta">{patient.email}</span>
           </div>
          <button className="danger" onClick={() => handleDelete(patient.id)}>Delete</button>
        </li>
  ))}
</ul>
        </div>
)
}

export default Patients

