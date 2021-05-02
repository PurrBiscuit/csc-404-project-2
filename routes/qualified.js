const express = require('express')
const router = express.Router()

const { calcGPAs } = require('../lib/calculate')
const { filterQualified, sortStudents } = require('../lib/student')
const { studentRecord } = require('../lib/model/studentModel')

/* GET qualified page. */
router.get('/', (req, res) => {
  res.render('qualifiedMongo', {
    students: 0,
    totalStudents: 0
  })
})

/* POST qualified page. */
router.post('/', (req, res, next) => {
  const gpaFilter = req.body.gpaFilter

  studentRecord.find().lean()
    .then(records => {
      const studentsWithGPAs = calcGPAs(records)
      const qualifiedStudents = filterQualified(studentsWithGPAs, gpaFilter)

      res.render('qualifiedMongo', {
        students: sortStudents(qualifiedStudents),
        totalStudents: records.length,
        gpaFilter
      })

    })
    .catch(error => {
      console.log(`Error fetching users: ${error.message}`)
      next(error)
    })
})

module.exports = router

