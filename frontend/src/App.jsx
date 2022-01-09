import { useState} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import AddReview from './components/AddReview'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Restaurants from './components/Restaurants'
import RestaurantsList from './components/RestaurantsList'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  async function login(user = null) {
    setUser(user)
    navigate("/")
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div className="App">
      <header>
        <Navbar user={user} logout={logout} />
      </header>
      <Routes >
        <Route path="/" element={< RestaurantsList /> } />
        <Route path="restaurants" element={ <RestaurantsList /> } />
        <Route path="restaurants/:id/review" element={ <AddReview user={user} /> } />
        <Route path="restaurants/:restaurant_id" element={ <Restaurants user={user} /> } />
        <Route path="login/" element={ <Login login={login} /> } />
      </Routes>
    </div>
  )
}

export default App
