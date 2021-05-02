const { expect } = require('chai')

const {
  calcGPA,
  calcGPAs,
  sumGrades
} = require('../lib/calculate')

const { studentRecord } = require('../lib/model/studentModel')

describe('calculate', () => {
  describe('single student record', () => {
    const student = {
      firstName: 'Georgie',
      lastName: 'Porgie',
      courseGrades: {
        csc141: 'C',
        csc142: 'D',
        csc240: 'F',
        csc241: 'C'
      }
    }

    it('should be valid', () => {
      const studentMongoose = new studentRecord(student)

      expect(studentMongoose.validateSync()).to.be.undefined
    })

    it('should sum up the grades to a correct raw score of 5.0', () => {
      const sum = sumGrades(student.courseGrades)

      expect(sum).to.equal(5.00)
    })

    it('should calculate the correct partial GPA of 1.3', () => {
      const partialGPA = calcGPA(student)

      expect(partialGPA).to.equal(1.3)
    })
  })

  describe('multiple student records', () => {
    const students = [
      {
        firstName: 'Gary',
        lastName: 'Blankenship',
        courseGrades: {
          csc141: 'A',
          csc142: 'C',
          csc240: 'c',
          csc241: 'B+'
        }
      },
      {
        firstName: 'Freddie',
        lastName: 'Mercury',
        courseGrades: {
          csc141: 'A',
          csc142: 'B+',
          csc240: 'a-',
          csc241: 'A'
        }
      },
      {
        firstName: 'Laura',
        lastName: 'Peloton',
        courseGrades: {
          csc141: 'C',
          csc142: 'C-',
          csc240: 'B-',
          csc241: 'C'
        }
      },
      {
        firstName: 'Holden',
        lastName: 'Caulfield',
        courseGrades: {
          csc141: 'B-',
          csc142: 'C',
          csc240: 'd',
          csc241: 'd+'
        }
      },
      {
        firstName: 'Rita',
        lastName: 'Repulsa',
        courseGrades: {
          csc141: 'B',
          csc142: 'A-',
          csc240: 'A',
          csc241: 'b+'
        }
      },
      {
        firstName: 'Tommy',
        lastName: 'Gunn',
        courseGrades: {
          csc141: 'C',
          csc142: 'D',
          csc240: 'c+',
          csc241: 'd'
        }
      },
      {
        firstName: 'Bob',
        lastName: 'Spongey',
        courseGrades: {
          csc141: 'A',
          csc142: 'C+',
          csc240: 'B+',
          csc241: 'A-'
        }
      },
      {
        firstName: 'Jacqueline',
        lastName: 'Maplesmith',
        courseGrades: {
          csc141: 'A',
          csc142: 'A',
          csc240: 'A',
          csc241: 'A'
        }
      }
    ]

    it('should contain only valid student records', () => {
      const invalidRecords = students.filter(student => {
        const studentMongoose = new studentRecord(student)

        return studentMongoose.validateSync()
      })

      expect(invalidRecords).to.be.of.length(0)
    })

    it('should calculate all the partial GPAs to the correct values', () => {
      const correctRecords = [
        {
          firstName: 'Gary',
          lastName: 'Blankenship',
          partialGPA: 2.8
        },
        {
          firstName: 'Freddie',
          lastName: 'Mercury',
          partialGPA: 3.8
        },
        {
          firstName: 'Laura',
          lastName: 'Peloton',
          partialGPA: 2.1
        },
        {
          firstName: 'Holden',
          lastName: 'Caulfield',
          partialGPA: 1.8
        },
        {
          firstName: 'Rita',
          lastName: 'Repulsa',
          partialGPA: 3.5
        },
        {
          firstName: 'Tommy',
          lastName: 'Gunn',
          partialGPA: 1.6
        },
        {
          firstName: 'Bob',
          lastName: 'Spongey',
          partialGPA: 3.3
        },
        {
          firstName: 'Jacqueline',
          lastName: 'Maplesmith',
          partialGPA: 4.0
        }
      ]

      const partialGPARecords = calcGPAs(students)

      expect(partialGPARecords).to.deep.equal(correctRecords)
    })
  })
})
