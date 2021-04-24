const { expect } = require('chai')
const { validate } = require('revalidator')

const { schema } = require('../../lib/schema/studentGrades')

describe('schema/studentGrades', () => {
  describe('student record with invalid firstName property', () => {
    const invalidFirstName = {
      firstName: '143',
      lastName: 'Smith',
      courseGrades: {
        csc141: 'A',
        csc142: 'B',
        csc240: 'F',
        csc241: 'D'
      }
    }

    it('should be invalid', () => {
      const { valid } = validate(invalidFirstName, schema)

      expect(valid).to.be.false
    })

    it('should include only one error in errors array', () => {
      const { errors } = validate(invalidFirstName, schema)

      expect(errors).to.be.of.length(1)
    })

    it('should have correct error message object', () => {
      const error = {
        attribute: 'pattern',
        property: 'firstName',
        message: '45 characters max containing only letters and dashes.'
      }

      const { errors } = validate(invalidFirstName, schema)

      expect(errors[0]).to.include(error)
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
      const { valid } = validate(missingFirstName, schema)

      expect(valid).to.be.false
    })

    it('should include only one error in errors array', () => {
      const { errors } = validate(missingFirstName, schema)

      expect(errors).to.be.of.length(1)
    })

    it('should have correct error message object', () => {
      const error = {
        attribute: 'required',
        property: 'firstName',
        message: '45 characters max containing only letters and dashes.'
      }

      const { errors } = validate(missingFirstName, schema)

      expect(errors[0]).to.include(error)
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
      const { valid } = validate(invalidLastName, schema)

      expect(valid).to.be.false
    })

    it('should include only one error in errors array', () => {
      const { errors } = validate(invalidLastName, schema)

      expect(errors).to.be.of.length(1)
    })

    it('should have correct error message object', () => {
      const error = {
        attribute: 'pattern',
        property: 'lastName',
        message: '45 characters max containing only letters and dashes.'
      }

      const { errors } = validate(invalidLastName, schema)

      expect(errors[0]).to.include(error)
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
      const { valid } = validate(missingLastName, schema)

      expect(valid).to.be.false
    })

    it('should include only one error in errors array', () => {
      const { errors } = validate(missingLastName, schema)

      expect(errors).to.be.of.length(1)
    })

    it('should have correct error message object', () => {
      const error = {
        attribute: 'required',
        property: 'lastName',
        message: '45 characters max containing only letters and dashes.'
      }

      const { errors } = validate(missingLastName, schema)

      expect(errors[0]).to.include(error)
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
      const { valid } = validate(invalidCSC141CourseGrade, schema)

      expect(valid).to.be.false
    })

    it('should include only one error in errors array', () => {
      const { errors } = validate(invalidCSC141CourseGrade, schema)

      expect(errors).to.be.of.length(1)
    })

    it('should have correct error message object', () => {
      const error = {
        attribute: 'pattern',
        property: 'courseGrades.csc141',
        message: 'Single letter grades accepted. Include "-" or "+" if necessary'
      }

      const { errors } = validate(invalidCSC141CourseGrade, schema)

      expect(errors[0]).to.include(error)
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
      const { valid } = validate(missingCSC141CourseGrade, schema)

      expect(valid).to.be.false
    })

    it('should include only one error in errors array', () => {
      const { errors } = validate(missingCSC141CourseGrade, schema)

      expect(errors).to.be.of.length(1)
    })

    it('should have correct error message object', () => {
      const error = {
        attribute: 'required',
        property: 'courseGrades.csc141',
        message: 'Single letter grades accepted. Include "-" or "+" if necessary'
      }

      const { errors } = validate(missingCSC141CourseGrade, schema)

      expect(errors[0]).to.include(error)
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
      const { valid } = validate(invalidCSC142CourseGrade, schema)

      expect(valid).to.be.false
    })

    it('should include only one error in errors array', () => {
      const { errors } = validate(invalidCSC142CourseGrade, schema)

      expect(errors).to.be.of.length(1)
    })

    it('should have correct error message object', () => {
      const error = {
        attribute: 'pattern',
        property: 'courseGrades.csc142',
        message: 'Single letter grades accepted. Include "-" or "+" if necessary'
      }

      const { errors } = validate(invalidCSC142CourseGrade, schema)

      expect(errors[0]).to.include(error)
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
      const { valid } = validate(missingCSC142CourseGrade, schema)

      expect(valid).to.be.false
    })

    it('should include only one error in errors array', () => {
      const { errors } = validate(missingCSC142CourseGrade, schema)

      expect(errors).to.be.of.length(1)
    })

    it('should have correct error message object', () => {
      const error = {
        attribute: 'required',
        property: 'courseGrades.csc142',
        message: 'Single letter grades accepted. Include "-" or "+" if necessary'
      }

      const { errors } = validate(missingCSC142CourseGrade, schema)

      expect(errors[0]).to.include(error)
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
      const { valid } = validate(invalidCSC240CourseGrade, schema)

      expect(valid).to.be.false
    })

    it('should include only one error in errors array', () => {
      const { errors } = validate(invalidCSC240CourseGrade, schema)

      expect(errors).to.be.of.length(1)
    })

    it('should have correct error message object', () => {
      const error = {
        attribute: 'pattern',
        property: 'courseGrades.csc240',
        message: 'Single letter grades accepted. Include "-" or "+" if necessary'
      }

      const { errors } = validate(invalidCSC240CourseGrade, schema)

      expect(errors[0]).to.include(error)
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
      const { valid } = validate(missingCSC240CourseGrade, schema)

      expect(valid).to.be.false
    })

    it('should include only one error in errors array', () => {
      const { errors } = validate(missingCSC240CourseGrade, schema)

      expect(errors).to.be.of.length(1)
    })

    it('should have correct error message object', () => {
      const error = {
        attribute: 'required',
        property: 'courseGrades.csc240',
        message: 'Single letter grades accepted. Include "-" or "+" if necessary'
      }

      const { errors } = validate(missingCSC240CourseGrade, schema)

      expect(errors[0]).to.include(error)
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
      const { valid } = validate(invalidCSC241CourseGrade, schema)

      expect(valid).to.be.false
    })

    it('should include only one error in errors array', () => {
      const { errors } = validate(invalidCSC241CourseGrade, schema)

      expect(errors).to.be.of.length(1)
    })

    it('should have correct error message object', () => {
      const error = {
        attribute: 'pattern',
        property: 'courseGrades.csc241',
        message: 'Single letter grades accepted. Include "-" or "+" if necessary'
      }

      const { errors } = validate(invalidCSC241CourseGrade, schema)

      expect(errors[0]).to.include(error)
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
      const { valid } = validate(missingCSC241CourseGrade, schema)

      expect(valid).to.be.false
    })

    it('should include only one error in errors array', () => {
      const { errors } = validate(missingCSC241CourseGrade, schema)

      expect(errors).to.be.of.length(1)
    })

    it('should have correct error message object', () => {
      const error = {
        attribute: 'required',
        property: 'courseGrades.csc241',
        message: 'Single letter grades accepted. Include "-" or "+" if necessary'
      }

      const { errors } = validate(missingCSC241CourseGrade, schema)

      expect(errors[0]).to.include(error)
    })
  })
})
