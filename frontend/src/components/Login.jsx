import { useState } from 'react'

const Login = ({ login }) => {
  const initialState = {
    name: '',
    id: ''
  }

  const [user, setUser] = useState(initialState)

  const handleInputChange = e => {
    const { name, value } = e.target
    console.log(name, value)
    setUser({ ...user, [name]: value })
    console.log (user)
  }

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>

        <button onClick={() => login(user)} className="btn btn-success">
          Login
        </button>
      </div>
    </div>
  )
}

export default Login