import { useState, useEffect } from "react"
import RestaurantDataService from "../services/restaurant"
import { Link, useParams } from "react-router-dom"

const Restaurants = ({ user }) => {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  }
  const [restaurant, setRestaurant] = useState(initialRestaurantState)
  const { restaurant_id } = useParams()

  const getRestaurant = id => {
    RestaurantDataService.get(restaurant_id)
      .then(response => {
        setRestaurant(response.data)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    getRestaurant(restaurant_id)
  }, [restaurant_id])

  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId, user.id)
      .then(response => {
        setRestaurant(prevState => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(err => {
        consolerr.log(err)
      })
  }

  return (
    <>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
            <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
          </p>
          <Link to={`/restaurants/${restaurant_id}/review`} className="btn btn-primary">
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => {
                return (
                  <div className="col-lg-4 pb-1" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          {review.text}<br/>
                          <strong>User: </strong>{review.name}<br/>
                          <strong>Date: </strong>{review.date}
                        </p>
                        {user && user.id === review.user_id &&
                          <div className="row">
                            <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                            <Link 
                              to={`/restaurants/${restaurant_id}/review`}
                              state={{ currentReview: review }} 
                              className="btn btn-primary col-lg-5 mx-1 mb-1"
                            >
                              Edit
                            </Link>
                          </div>                   
                        }
                      </div>
                    </div>
                  </div>
                );
              })
              ) : (
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </>
  )
}

export default Restaurants