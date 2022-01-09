import mongodb from "mongodb"
import dotenv from "dotenv"

import app from './server.js'
import RestaurantDAO from './dao/restaurantDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 5000

MongoClient.connect(process.env.RESTREVIEWS_URI)
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await RestaurantDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening in port ${port}`)
    })
  })
