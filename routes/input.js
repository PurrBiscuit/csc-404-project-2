const express = require('express')
const router = express.Router()

const { calcGPA } = require('../lib/calculate')
const { courses, gradeScale } = require('../lib/data')
const { normalizeName, validateInput } = require('../lib/student')
const studentRecord = require('../lib/model/student_model')

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
  const { errors, valid } = validateInput(student)
  let partialGPA

  if (valid) {
    studentRecord.create(student)
      .catch(error => {
        console.log(`Error saving user: ${error.message}`)
        next(error)
      })

    partialGPA = calcGPA(student)
  }

  res.render('input', {
    courses,
    errors,
    gradeScale,
    student,
    partialGPA
  })
})

module.exports = router
