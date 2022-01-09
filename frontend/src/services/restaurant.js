class RestaurantDataService {
  static url = 'http://localhost:5000/api/v1/restaurants'

  async getAll(page = 0) {
    const response = await fetch(`${RestaurantDataService.url}?page=${page}`)
    return response.json()
  }

  async get(id) {
    const response = await fetch(`${RestaurantDataService.url}/id/${id}`)
    return response.json()
  }

  async find(query, by = "name", page = 0) {
    const response = await fetch(`${RestaurantDataService.url}?${by}=${query}&page=${page}`)
    return response.json()
  } 

  async createReview(data) {
    const response = await fetch(
      `${RestaurantDataService.url}/reviews`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }
    )
    return response.json()
  }

  async updateReview(data) {
    const response = await fetch(
      `${RestaurantDataService.url}/reviews`, 
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }
    )
    return response.json()
  }

  async deleteReview(id, userId) {
    const response = await fetch(
      `${RestaurantDataService.url}/reviews?id=${id}`, 
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({user_id: userId})
      }
    )
    return response.json()
  }

  async getCuisines(id) {
    const response = await fetch(`${RestaurantDataService.url}/cuisines`)
    return response.json()
  }
}

export default new RestaurantDataService()