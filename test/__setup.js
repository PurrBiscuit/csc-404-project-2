const mongoose = require('mongoose')

/**
 * Connect to MongoDB.
 */

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 2000
})
  .then(() => {
    console.log('Successfully connected to MongoDB using Mongoose!')
  })
  .catch(error => {
    console.log('ERROR: ', error.message)
  })

after('tear down the connection to the database', () =>
  mongoose.connection.close()
)
