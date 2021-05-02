const mongoose = require('mongoose')

/**
 * Connect to MongoDB.
 */

before('connect to mongo db', () =>
  mongoose.connect(process.env.MONGODB_TEST_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 2000
  })
    .then(() => {
      console.log('Successfully connected to MongoDB using Mongoose!\n')
    })
    .catch(error => {
      console.log('ERROR: ', error.message)
    })
)

after('tear down the connection to the database', () =>
  mongoose.connection.close()
)
