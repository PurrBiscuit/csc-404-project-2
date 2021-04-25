const express = require('express')
const router = express.Router()

const { calcGPAs } = require('../lib/calculate')
const { filterQualified, sortStudents } = require('../lib/student')
const studentRecords = require('../lib/model/student_model')

// /* GET qualified page. */
// router.get('/', (req, res, next) => {

//   studentRecords.find()
//     .then(records => {
//       const studentsWithGPAs = calcGPAs(records)
//       const qualifiedStudents = filterQualified(studentsWithGPAs)
//       const sortedStudents = sortStudents(qualifiedStudents)
//       next()
//       res.render('qualified', {
//         students: sortedStudents,
//         totalStudents: records.length
//       })
//       // next();
//     })
//     .catch(error => {
//       console.log(`Error fetching users: ${error.message}`)
//       next(error)

//       // const studentsWithGPAs = calcGPAs(students)

//       // const qualifiedStudents = filterQualified(studentsWithGPAs)

//       // const sortedStudents = sortStudents(qualifiedStudents)

//       // res.render('qualified', {
//       //   students: sortedStudents,
//       //   totalStudents: students.length
//       // })
//     })
// })


/* GET qualified page. */
router.get('/', (req, res) => {
  res.render('qualified_mongo', {
    students: 0,
    totalStudents: 0
  })
})

/* POST qualified page. */
router.post('/', (req, res, next) => {

  const gpaFilter = req.body.gpaFilter
  console.log('GPA Filter:', gpaFilter)

  studentRecords.find()
    .then(records => {
      const studentsWithGPAs = calcGPAs(records)
      const qualifiedStudents = filterQualified(studentsWithGPAs, gpaFilter)
      const sortedStudents = sortStudents(qualifiedStudents)

      res.render('qualified_mongo', {
        students: sortedStudents,
        totalStudents: records.length,
        gpaFilter: gpaFilter
      })

    })
    .catch(error => {
      console.log(`Error fetching users: ${error.message}`)
      next(error)
    })
})

module.exports = router

