const { expect } = require('chai')
const { validate } = require('revalidator')

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
        'courseGrades.csc141': 'Single letter grades accepted. Include \"-\" or \"+\" if necessary'
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
        'courseGrades.csc142': 'Single letter grades accepted. Include \"-\" or \"+\" if necessary'
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
        'courseGrades.csc240': 'Single letter grades accepted. Include \"-\" or \"+\" if necessary'
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
        'courseGrades.csc241': 'Single letter grades accepted. Include \"-\" or \"+\" if necessary'
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
})
