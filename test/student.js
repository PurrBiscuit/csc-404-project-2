const { compose, dissoc, map } = require('ramda')
const { expect } = require('chai')

const {
  filterQualified,
  formatStudentRecord,
  isGPAQualified,
  normalizeName,
  sortStudents
} = require('../lib/student')

const { studentRecord } = require('../lib/model/studentModel')

describe('student', () => {
  describe('format student record input into correct mongoose schema shape', () => {
    const input = {
      firstName: 'gary',
      lastName: 'fredericks',
      csc141: 'A',
      csc142: 'B+',
      csc240: 'C',
      csc241: 'B-'
    }

    const expectedFormat = {
      firstName: 'Gary',
      lastName: 'Fredericks',
      courseGrades: {
        csc141: 'A',
        csc142: 'B+',
        csc240: 'C',
        csc241: 'B-'
      }
    }

    it('should format the object properly', () =>
      expect(formatStudentRecord(input)).to.deep.equal(expectedFormat)
    )

    it('should be valid after formatting', () => {
      const student = new studentRecord(formatStudentRecord(input))

      expect(student.validateSync()).to.be.undefined
    })
  })

  describe('student record with name that needs to be normalized', () => {
    const normalizedStudent = {
      firstName: normalizeName('SalLy'),
      lastName: normalizeName('smith-SMartyPantsington'),
      courseGrades: {
        csc141: 'A',
        csc142: 'A-',
        csc240: 'B+',
        csc241: 'A-'
      }
    }

    it('should normalize the name properties on the record', () => {
      const correctRecord = {
        firstName: 'Sally',
        lastName: 'Smith-Smartypantsington',
        courseGrades: {
          csc141: 'A',
          csc142: 'A-',
          csc240: 'B+',
          csc241: 'A-'
        }
      }

      expect(normalizedStudent).to.deep.equal(correctRecord)
    })

    it('should be valid after normalization', () => {
      const student = new studentRecord(normalizedStudent)

      expect(student.validateSync()).to.be.undefined
    })
  })

  describe('partialGPA is qualified or not', () => {
    it('should qualify with the partial GPA filter set to the default of 2.5', () =>
      expect(isGPAQualified(2.5)).to.be.true
    )

    it('should not qualify with the partial GPA filter set to the default of 2.5', () =>
      expect(isGPAQualified(1.0)).to.be.false
    )

    it('should qualify with a GPA filter of 3.3 passed in', () =>
      expect(isGPAQualified(3.5, 3.3)).to.be.true
    )

    it('should not qualify with a GPA filter of 3.3 passed in', () =>
      expect(isGPAQualified(3.0, 3.3)).to.be.false
    )
  })

  describe('student records with partial GPA calculated', () => {
    const students = [
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
        firstName: 'Billy',
        lastName: 'Borderline',
        partialGPA: 2.5
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

    it('should filter out qualified students from unqualified ones with default partial GPA of 2.5', () => {
      const correctRecords = [
        {
          firstName: 'Gary',
          lastName: 'Blankenship'
        },
        {
          firstName: 'Freddie',
          lastName: 'Mercury'
        },
        {
          firstName: 'Billy',
          lastName: 'Borderline'
        },
        {
          firstName: 'Rita',
          lastName: 'Repulsa'
        },
        {
          firstName: 'Bob',
          lastName: 'Spongey'
        },
        {
          firstName: 'Jacqueline',
          lastName: 'Maplesmith'
        }
      ]

      const removePartialGPAProp = map(dissoc('partialGPA'))

      const qualifiedStudents = compose(removePartialGPAProp, filterQualified)(students)

      expect(qualifiedStudents).to.deep.equal(correctRecords)
    })

    it('should filter out qualified students from unqualified ones with partial GPA set to 3.0', () => {
      const correctRecords = [
        {
          firstName: 'Freddie',
          lastName: 'Mercury'
        },
        {
          firstName: 'Rita',
          lastName: 'Repulsa'
        },
        {
          firstName: 'Bob',
          lastName: 'Spongey'
        },
        {
          firstName: 'Jacqueline',
          lastName: 'Maplesmith'
        }
      ]

      const removePartialGPAProp = map(dissoc('partialGPA'))

      const qualifiedStudents = compose(removePartialGPAProp, filterQualified)(students, 3.0)

      expect(qualifiedStudents).to.deep.equal(correctRecords)
    })
  })

  describe('unsorted list of student records', () => {
    const unsortedStudents = [
      {
        firstName: 'Gina',
        lastName: 'Notgonnacutit',
        courseGrades: {
          csc141: 'C',
          csc142: 'C-',
          csc240: 'F',
          csc241: 'D+'
        }
      },
      {
        firstName: 'Billy',
        lastName: 'Borderline',
        courseGrades: {
          csc141: 'C-',
          csc142: 'C',
          csc240: 'A-',
          csc241: 'B'
        }
      },
      {
        firstName: 'Mary',
        lastName: 'Meandering',
        courseGrades: {
          csc141: 'C',
          csc142: 'A',
          csc240: 'b-',
          csc241: 'd+'
        }
      },
      {
        firstName: 'Hank',
        lastName: 'Yule-Flunkington',
        courseGrades: {
          csc141: 'C',
          csc142: 'C-',
          csc240: 'D+',
          csc241: 'F'
        }
      }
    ]

    it('should contain only valid student records', () => {
      const invalidRecords = unsortedStudents.filter(student => {
        const studentMongoose = new studentRecord(student)

        return studentMongoose.validateSync()
      })

      expect(invalidRecords).to.be.of.length(0)
    })

    it('should sort records in ascending order by the lastName property', () => {
      const correctRecords = [
        {
          firstName: 'Billy',
          lastName: 'Borderline',
          courseGrades: {
            csc141: 'C-',
            csc142: 'C',
            csc240: 'A-',
            csc241: 'B'
          }
        },
        {
          firstName: 'Mary',
          lastName: 'Meandering',
          courseGrades: {
            csc141: 'C',
            csc142: 'A',
            csc240: 'b-',
            csc241: 'd+'
          }
        },
        {
          firstName: 'Gina',
          lastName: 'Notgonnacutit',
          courseGrades: {
            csc141: 'C',
            csc142: 'C-',
            csc240: 'F',
            csc241: 'D+'
          }
        },
        {
          firstName: 'Hank',
          lastName: 'Yule-Flunkington',
          courseGrades: {
            csc141: 'C',
            csc142: 'C-',
            csc240: 'D+',
            csc241: 'F'
          }
        }
      ]

      expect(sortStudents(unsortedStudents)).to.deep.equal(correctRecords)
    })
  })
})
