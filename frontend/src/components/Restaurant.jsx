import { Link } from 'react-router-dom'

const Restaurant = ({ restaurant, address }) => {
  return (
    <div className="col-lg-4 pb-1">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{restaurant.name}</h5>
          <p className="card-text">
            <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
            <strong>Address: </strong>{address}
          </p>
          <div className="row">
          <Link to={`/restaurants/${restaurant._id}`} className="btn btn-primary col-lg-5 mx-1 mb-1">
            View Reviews
          </Link>
          <a target="_blank" href={`https://www.google.com/maps/place/${address}`} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Restaurant