const express = require('express')
const router = express.Router()

const { calcGPA } = require('../lib/calculate')
const { courses, gradeScale } = require('../lib/data')
const { formatErrors } = require('../lib/utils')
const { normalizeName } = require('../lib/student')
const { studentRecord } = require('../lib/model/studentModel')

const formatStudentRecord = ({
  firstName,
  lastName,
  csc141,
  csc142,
  csc240,
  csc241
}) => {
  firstName = (firstName !== '') ? normalizeName(firstName) : undefined
  lastName = (lastName !== '') ? normalizeName(lastName) : undefined

  return {
    firstName,
    lastName,
    courseGrades: {
      csc141,
      csc142,
      csc240,
      csc241
    }
  }
}

/* GET input page. */
router.get('/', (req, res) => {
  res.render('input', {
    courses,
    gradeScale
  })
})

/* POST input page.
 Create mongoDB document */
router.post('/', (req, res, next) => {
  const student = formatStudentRecord(req.body)

  studentRecord.create(student)
    .then(() => {
      const partialGPA = calcGPA(student)

      res.render('input', {
        courses,
        gradeScale,
        student,
        partialGPA
      })
    })
    .catch(error => {
      console.log(`Error saving user: ${error.message}`)

      if (error.name === 'ValidationError')
        res.render('input', {
          courses,
          errors: formatErrors(error.errors),
          gradeScale,
          student
        })
      else
        next(error)
    })
})

module.exports = router
