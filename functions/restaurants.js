exports = async function(payload, response){

  const { restaurantsPerPage = 20, page = 0 } = payload.query
  
  let query = {}
  if (payload.query.cuisine) {
    query = {  'cuisine': { $eq: payload.query.cuisine } }
  } else if (payload.query.zipcode) {
    query = { 'address.zipcode': { $eq: payload.query.zipcode }}
  } else if (payload.query.name) {
    query = { $text: { $search: payload.query.name } }
  }

  const collection = context.services.get('mongodb-atlas').db('sample_restaurants').collection('restaurants')
  const restaurantsList = await collection.find(query).skip(page*restaurantsPerPage).limit(restaurantsPerPage).toArray()
  restaurantsList.forEach(restaurant => {
    restaurant._id = restaurant._id.toString()
  })
  
  const resultsCount = await collection.count(query)
  
  const responseData = {
    restaurants: restaurantsList,
    page: page.toString(),
    filters: {},
    entries_per_page: restaurantsPerPage.toString(),
    total_results: resultsCount.toString(),
  }

  return responseData
};