// Message for invalid letter grade input
const gradeMessage = 'Single letter grades accepted. Include "-" or "+" if necessary'

// Regexp for letter grade input validation
const gradePattern = /^[aA][-]?$|^[b-dB-D][-|+]?$|^[fF]$/

// Message for invalid letter grade input
const nameMessage = '45 characters max containing only letters and dashes.'

// Regexp for letter grade input validation
const namePattern = /^[a-zA-Z](?:[a-zA-Z-]*[a-zA-Z]+)?$/

const mongoose = require('mongoose'),
  { Schema } = mongoose

const schema = new Schema({
  // properties: {
  firstName: {
    type: String,
    pattern: namePattern,
    maxLength: 45,
    message: nameMessage,
    required: true
  },
  lastName: {
    type: String,
    pattern: namePattern,
    maxLength: 45,
    message: nameMessage,
    required: true
  },
  courseGrades: {
    type: 'object',
    required: true,
    properties: {
      csc141: {
        pattern: gradePattern,
        message: gradeMessage,
        required: true
      },
      csc142: {
        pattern: gradePattern,
        message: gradeMessage,
        required: true
      },
      csc240: {
        pattern: gradePattern,
        message: gradeMessage,
        required: true
      },
      csc241: {
        pattern: gradePattern,
        message: gradeMessage,
        required: true
      }
    }
  }
  // }
}, {
  timestamps: true,
  bufferTimeoutMS: 2000
})

module.exports = mongoose.model('students', schema)

// module.exports = {
//   gradeMessage,
//   gradePattern,
//   nameMessage,
//   namePattern,
//   schema

// }
