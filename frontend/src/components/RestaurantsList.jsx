import { useState, useEffect } from 'react'


import Restaurant from './Restaurant'

import RestaurantDataService from '../services/restaurant'

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([])
  const [searchName, setSearchName ] = useState("")
  const [searchZip, setSearchZip ] = useState("")
  const [searchCuisine, setSearchCuisine ] = useState("")
  const [cuisines, setCuisines] = useState(["All Cuisines"])

  useEffect(() => {
    retrieveRestaurants()
    retrieveCuisines()
  }, [])

  const onChangeSearchName = e => {
    const searchName = e.target.value
    setSearchName(searchName)
  }

  const onChangeSearchZip = e => {
    const searchZip = e.target.value
    setSearchZip(searchZip)
  }

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value
    setSearchCuisine(searchCuisine)
    
  }

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then(data => {
        setRestaurants(data.restaurants)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(data => {
        setCuisines(["All Cuisines"].concat(data))
        
      })
      .catch(e => {
        console.log(e)
      })
  }

  const refreshList = () => {
    retrieveRestaurants()
  }

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(data => {
        setRestaurants(data.restaurants)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const findByName = () => {
    find(searchName, "name")
  }

  const findByZip = () => {
    find(searchZip, "zipcode")
  }

  const findByCuisine = () => {
    if (searchCuisine == "All Cuisines") {
      refreshList()
    } else {
      find(searchCuisine, "cuisine")
    }
  }

  const restaurantList = restaurants.map((restaurant) => {
    const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`
    return (
      <Restaurant key={restaurant._id} restaurant={restaurant} address={address} />
    )
  })

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">

          <select onChange={onChangeSearchCuisine}>
            {cuisines.map(cuisine => {
              return (
                <option value={cuisine}> {cuisine.substring(0, 20)} </option>
              )
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>

        </div>
      </div>
      <ul className="row">
        {restaurantList}
      </ul>
    </div>
  )
}

export default RestaurantsList