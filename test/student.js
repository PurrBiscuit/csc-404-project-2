const { compose, dissoc, map } = require('ramda')
const { expect } = require('chai')

const {
  filterQualified,
  isGPAQualified,
  normalizeName,
  sortStudents,
  validateInput
} = require('../lib/student')

describe('student', () => {
  describe('student record with invalid firstName property', () => {
    const invalidFirstName = {
      firstName: '123',
      lastName: 'Smith',
      courseGrades: {
        csc141: 'A',
        csc142: 'B',
        csc240: 'F',
        csc241: 'D'
      }
    }

    it('should be invalid', () => {
      const { valid } = validateInput(invalidFirstName)

      expect(valid).to.be.false
    })


    it('should have correct error message object', () => {
      const error = {
        firstName: '45 characters max containing only letters and dashes.'
      }

      const { errors } = validateInput(invalidFirstName)

      expect(errors).to.deep.equal(error)
    })
  })

  describe('student record with missing firstName property', () => {
    const missingFirstName = {
      lastName: 'Smith',
      courseGrades: {
        csc141: 'A',
        csc142: 'B',
        csc240: 'F',
        csc241: 'D'
      }
    }

    it('should be invalid', () => {
      const { valid } = validateInput(missingFirstName)

      expect(valid).to.be.false
    })

    it('should have correct error message object', () => {
      const error = {
        firstName: 'Please enter a value for the required field.'
      }

      const { errors } = validateInput(missingFirstName)

      expect(errors).to.deep.equal(error)
    })
  })

  describe('student record with invalid lastName property', () => {
    const invalidLastName = {
      firstName: 'Mike',
      lastName: '123',
      courseGrades: {
        csc141: 'A',
        csc142: 'B',
        csc240: 'F',
        csc241: 'D'
      }
    }

    it('should be invalid', () => {
      const { valid } = validateInput(invalidLastName)

      expect(valid).to.be.false
    })

    it('should have correct error message object', () => {
      const error = {
        lastName: '45 characters max containing only letters and dashes.'
      }

      const { errors } = validateInput(invalidLastName)

      expect(errors).to.deep.equal(error)
    })
  })

  describe('student record with missing lastName property', () => {
    const missingLastName = {
      firstName: 'Mike',
      courseGrades: {
        csc141: 'A',
        csc142: 'B',
        csc240: 'F',
        csc241: 'D'
      }
    }

    it('should be invalid', () => {
      const { valid } = validateInput(missingLastName)

      expect(valid).to.be.false
    })

    it('should have correct error message object', () => {
      const error = {
        lastName: 'Please enter a value for the required field.'
      }

      const { errors } = validateInput(missingLastName)

      expect(errors).to.deep.equal(error)
    })
  })

  describe('student record with invalid courseGrades.csc141 property', () => {
    const invalidCSC141CourseGrade = {
      firstName: 'Mike',
      lastName: 'Smith',
      courseGrades: {
        csc141: 'X',
        csc142: 'B',
        csc240: 'F',
        csc241: 'D'
      }
    }

    it('should be invalid', () => {
      const { valid } = validateInput(invalidCSC141CourseGrade)

      expect(valid).to.be.false
    })

    it('should have correct error message object', () => {
      const error = {
        'courseGrades.csc141': 'Single letter grades accepted. Include "-" or "+" if necessary'
      }

      const { errors } = validateInput(invalidCSC141CourseGrade)

      expect(errors).to.deep.equal(error)
    })
  })

  describe('student record with missing courseGrades.csc141 property', () => {
    const missingCSC141CourseGrade = {
      firstName: 'Mike',
      lastName: 'Smith',
      courseGrades: {
        csc142: 'B',
        csc240: 'F',
        csc241: 'D'
      }
    }

    it('should be invalid', () => {
      const { valid } = validateInput(missingCSC141CourseGrade)

      expect(valid).to.be.false
    })

    it('should have correct error message object', () => {
      const error = {
        'courseGrades.csc141': 'Please enter a value for the required field.'
      }

      const { errors } = validateInput(missingCSC141CourseGrade)

      expect(errors).to.deep.equal(error)
    })
  })

  describe('student record with invalid courseGrades.csc142 property', () => {
    const invalidCSC142CourseGrade = {
      firstName: 'Mike',
      lastName: 'Smith',
      courseGrades: {
        csc141: 'A',
        csc142: 'X',
        csc240: 'F',
        csc241: 'D'
      }
    }

    it('should be invalid', () => {
      const { valid } = validateInput(invalidCSC142CourseGrade)

      expect(valid).to.be.false
    })

    it('should have correct error message object', () => {
      const error = {
        'courseGrades.csc142': 'Single letter grades accepted. Include "-" or "+" if necessary'
      }

      const { errors } = validateInput(invalidCSC142CourseGrade)

      expect(errors).to.deep.equal(error)
    })
  })

  describe('student record with missing courseGrades.csc142 property', () => {
    const missingCSC142CourseGrade = {
      firstName: 'Mike',
      lastName: 'Smith',
      courseGrades: {
        csc141: 'B',
        csc240: 'F',
        csc241: 'D'
      }
    }

    it('should be invalid', () => {
      const { valid } = validateInput(missingCSC142CourseGrade)

      expect(valid).to.be.false
    })

    it('should have correct error message object', () => {
      const error = {
        'courseGrades.csc142': 'Please enter a value for the required field.'
      }

      const { errors } = validateInput(missingCSC142CourseGrade)

      expect(errors).to.deep.equal(error)
    })
  })

  describe('student record with invalid courseGrades.csc240 property', () => {
    const invalidCSC240CourseGrade = {
      firstName: 'Mike',
      lastName: 'Smith',
      courseGrades: {
        csc141: 'A',
        csc142: 'B',
        csc240: 'X',
        csc241: 'D'
      }
    }

    it('should be invalid', () => {
      const { valid } = validateInput(invalidCSC240CourseGrade)

      expect(valid).to.be.false
    })

    it('should have correct error message object', () => {
      const error = {
        'courseGrades.csc240': 'Single letter grades accepted. Include "-" or "+" if necessary'
      }

      const { errors } = validateInput(invalidCSC240CourseGrade)

      expect(errors).to.deep.equal(error)
    })
  })

  describe('student record with missing courseGrades.csc240 property', () => {
    const missingCSC240CourseGrade = {
      firstName: 'Mike',
      lastName: 'Smith',
      courseGrades: {
        csc141: 'B',
        csc142: 'F',
        csc241: 'D'
      }
    }

    it('should be invalid', () => {
      const { valid } = validateInput(missingCSC240CourseGrade)

      expect(valid).to.be.false
    })

    it('should have correct error message object', () => {
      const error = {
        'courseGrades.csc240': 'Please enter a value for the required field.'
      }

      const { errors } = validateInput(missingCSC240CourseGrade)

      expect(errors).to.deep.equal(error)
    })
  })

  describe('student record with invalid courseGrades.csc241 property', () => {
    const invalidCSC241CourseGrade = {
      firstName: 'Mike',
      lastName: 'Smith',
      courseGrades: {
        csc141: 'A',
        csc142: 'B',
        csc240: 'C',
        csc241: 'X'
      }
    }

    it('should be invalid', () => {
      const { valid } = validateInput(invalidCSC241CourseGrade)

      expect(valid).to.be.false
    })

    it('should have correct error message object', () => {
      const error = {
        'courseGrades.csc241': 'Single letter grades accepted. Include "-" or "+" if necessary'
      }

      const { errors } = validateInput(invalidCSC241CourseGrade)

      expect(errors).to.deep.equal(error)
    })
  })

  describe('student record with missing courseGrades.csc241 property', () => {
    const missingCSC241CourseGrade = {
      firstName: 'Mike',
      lastName: 'Smith',
      courseGrades: {
        csc141: 'B',
        csc142: 'F',
        csc240: 'D'
      }
    }

    it('should be invalid', () => {
      const { valid } = validateInput(missingCSC241CourseGrade)

      expect(valid).to.be.false
    })

    it('should have correct error message object', () => {
      const error = {
        'courseGrades.csc241': 'Please enter a value for the required field.'
      }

      const { errors } = validateInput(missingCSC241CourseGrade)

      expect(errors).to.deep.equal(error)
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

    it('should be valid after normalization', () => {
      const { valid } = validateInput(normalizedStudent)

      expect(valid).to.be.true
    })

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
  })

  describe('partialGPA is qualified or not', () => {
    it('should qualify with a partial GPA of 2.5', () =>
      expect(isGPAQualified(2.5)).to.be.true
    )

    it('should not qualify with a partial GPA of 1.0', () =>
      expect(isGPAQualified(1.0)).to.be.false
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

    it('should filter out qualified students from unqualified ones', () => {
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
        const { valid } = validateInput(student)

        return !valid
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
