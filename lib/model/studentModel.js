const mongoose = require('mongoose')
const { Schema } = mongoose

// Message for invalid letter grade input
const gradeMessage = 'Single letter grades accepted. Include "-" or "+" if necessary'

// Regexp for letter grade input validation
const gradePattern = /^[aA][-]?$|^[b-dB-D][-|+]?$|^[fF]$/

// Messages for invalid name input
const nameInvalidMessage = 'Name can contain only letters and dashes.'
const nameMaxLengthMessage = 'Name can only contain 45 characters max.'

// Regexp for name input validation
const namePattern = /^[a-zA-Z](?:[a-zA-Z-]*[a-zA-Z]+)?$/

const requiredMessage = 'Please enter a value for the required field.'

const schema = new Schema({
  firstName: {
    type: String,
    validate: [ namePattern, nameInvalidMessage ],
    maxLength: [ 45, nameMaxLengthMessage ],
    required: [ true, requiredMessage ]
  },
  lastName: {
    type: String,
    validate: [ namePattern, nameInvalidMessage ],
    maxLength: [ 45, nameMaxLengthMessage ],
    required: [ true, requiredMessage ]
  },
  courseGrades: {
    csc141: {
      type: String,
      validate: [ gradePattern, gradeMessage ],
      required: [ true, requiredMessage ]
    },
    csc142: {
      type: String,
      validate: [ gradePattern, gradeMessage ],
      required: [ true, requiredMessage ]
    },
    csc240: {
      type: String,
      validate: [ gradePattern, gradeMessage ],
      required: [ true, requiredMessage ]
    },
    csc241: {
      type: String,
      validate: [ gradePattern, gradeMessage ],
      required: [ true, requiredMessage ]
    }
  }
}, {
  timestamps: true,
  bufferTimeoutMS: 2000
})

module.exports = {
  gradePattern,
  namePattern,
  studentRecord: mongoose.model('students', schema)
}
