const express = require('express')
const router = express.Router()

const { calcGPA } = require('../lib/calculate')
const { courses, gradeScale } = require('../lib/data')
const { formatErrors } = require('../lib/utils')
const { formatStudentRecord } = require('../lib/student')
const { studentRecord } = require('../lib/model/studentModel')

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
      res.render('input', {
        courses,
        gradeScale,
        student,
        partialGPA: calcGPA(student)
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
