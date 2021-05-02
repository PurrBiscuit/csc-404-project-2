const express = require('express')
const { map, path } = require('ramda')
const router = express.Router()

const { calcGPA } = require('../lib/calculate')
const { courses, gradeScale } = require('../lib/data')
const { normalizeName } = require('../lib/student')
const { studentRecord } = require('../lib/model/studentModel')

const formatErrors = errors =>
  map(path(['properties', 'message']))(errors)

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

/* POST input page. */
// router.post('/', (req, res) => {
//   const student = formatStudentRecord(req.body)
//   const { errors, valid } = validateInput(student)
//   let partialGPA

//   if (valid) {
//     students.push(student)

//     partialGPA = calcGPA(student)
//   }

//   res.render('input', {
//     courses,
//     errors,
//     gradeScale,
//     student,
//     partialGPA
//   })
// })

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
