const express = require('express')
const router = express.Router()

const { calcGPAs } = require('../lib/calculate')
const { students } = require('../lib/data')
const { filterQualified, sortStudents } = require('../lib/student')
const studentRecords = require('../lib/model/student_model')

/* GET qualified page. */
router.get('/', (req, res, next) => {

  studentRecords.find()
    .then(records => {
      const studentsWithGPAs = calcGPAs(records)
      const qualifiedStudents = filterQualified(studentsWithGPAs)
      const sortedStudents = sortStudents(qualifiedStudents)
      next()
      res.render('qualified', {
        students: sortedStudents,
        totalStudents: records.length
      })
      // next();
    })
    .catch(error => {
      console.log(`Error fetching users: ${error.message}`)
      next(error)

      // const studentsWithGPAs = calcGPAs(students)

      // const qualifiedStudents = filterQualified(studentsWithGPAs)

      // const sortedStudents = sortStudents(qualifiedStudents)

      // res.render('qualified', {
      //   students: sortedStudents,
      //   totalStudents: students.length
      // })
    })
})

module.exports = router
