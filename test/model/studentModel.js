const { expect } = require('chai')

const { gradePattern, namePattern, studentRecord } = require('../../lib/model/studentModel')

const validateRegex = (inputs, regex, valid = true) =>
  inputs.filter(input =>
    regex.test(input) === valid
  )

describe('model/studentModel', () => {
  describe('gradePattern regex', () => {
    it('should contain only valid inputs', () => {
      const validNameInputs = [
        'Steve',
        'Joe',
        'Kyle',
        'Hudson',
        'Sa',
        'kim',
        'jackson',
        'FraNcois',
        'Smith-Westington',
        'Pepitone',
        'Q'
      ]

      expect(validateRegex(validNameInputs, namePattern)).to.deep.equal(validNameInputs)
    })

    it('should contain only invalid inputs', () => {
      const invalidNameInputs = [
        '123132',
        '  Seth',
        'Billy ',
        '-M',
        '1Frank5',
        '&Gloria',
        'Sammy+Smith',
        'First Last',
        'test-'
      ]

      expect(validateRegex(invalidNameInputs, namePattern, false)).to.deep.equal(invalidNameInputs)
    })
  })

  describe('namePattern regex', () => {
    it('should contain only valid inputs', () => {
      const validGradeInputs = [ 'A', 'a', 'A-', 'b+', 'B', 'b-', 'C+', 'c', 'C-', 'd+', 'd', 'D-', 'F', 'f' ]

      expect(validateRegex(validGradeInputs, gradePattern)).to.deep.equal(validGradeInputs)
    })

    it('should contain only invalid inputs', () => {
      const invalidGradeInputs = [ 'A+', 'e', 'E', 'z-', 'banana', '+A', '-d', '1', '&', ' A', 'B ', 'F+', 'F-' ]

      expect(validateRegex(invalidGradeInputs, gradePattern, false)).to.deep.equal(invalidGradeInputs)
    })
  })

  describe('student record with firstName property over max length', () => {
    const overMaxLengthFirstName = {
      firstName: 'asdsadsadsadasdasfgfehetrjrhmdfbdfbsdfdsffhehf',
      lastName: 'Smith',
      courseGrades: {
        csc141: 'A',
        csc142: 'B',
        csc240: 'F',
        csc241: 'D'
      }
    }

    it('should return the correct error message', () =>
      studentRecord.create(overMaxLengthFirstName)
        .catch(error => {
          expect(error.errors.firstName.properties.message).to.equal('Name can only contain 45 characters max.')
        })
    )
  })

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

    it('should return the correct error message', () =>
      studentRecord.create(invalidFirstName)
        .catch(error => {
          expect(error.errors.firstName.properties.message).to.equal('Name can contain only letters and dashes.')
        })
    )
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

    it('should return the correct error message', () =>
      studentRecord.create(missingFirstName)
        .catch(error => {
          expect(error.errors.firstName.properties.message).to.equal('Please enter a value for the required field.')
        })
    )
  })

  describe('student record with lastName property over max length', () => {
    const overMaxLengthLastName = {
      firstName: 'Mike',
      lastName: 'asdsadsadsadasdasfgfehetrjrhmdfbdfbsdfdsffhehf',
      courseGrades: {
        csc141: 'A',
        csc142: 'B',
        csc240: 'F',
        csc241: 'D'
      }
    }

    it('should return the correct error message', () =>
      studentRecord.create(overMaxLengthLastName)
        .catch(error => {
          expect(error.errors.lastName.properties.message).to.equal('Name can only contain 45 characters max.')
        })
    )
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

    it('should return the correct error message', () =>
      studentRecord.create(invalidLastName)
        .catch(error => {
          expect(error.errors.lastName.properties.message).to.equal('Name can contain only letters and dashes.')
        })
    )
  })

  describe('student record with missing lastName property', () => {
    const missingLastName = {
      firstName: 'Smith',
      courseGrades: {
        csc141: 'A',
        csc142: 'B',
        csc240: 'F',
        csc241: 'D'
      }
    }

    it('should return the correct error message', () =>
      studentRecord.create(missingLastName)
        .catch(error => {
          expect(error.errors.lastName.properties.message).to.equal('Please enter a value for the required field.')
        })
    )
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

    it('should return the correct error message', () =>
      studentRecord.create(invalidCSC141CourseGrade)
        .catch(error =>
          expect(error.errors['courseGrades.csc141'].properties.message).to.equal('Single letter grades accepted. Include "-" or "+" if necessary')
        )
    )
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

    it('should return the correct error message', () =>
      studentRecord.create(missingCSC141CourseGrade)
        .catch(error =>
          expect(error.errors['courseGrades.csc141'].properties.message).to.equal('Please enter a value for the required field.')
        )
    )
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

    it('should return the correct error message', () =>
      studentRecord.create(invalidCSC142CourseGrade)
        .catch(error =>
          expect(error.errors['courseGrades.csc142'].properties.message).to.equal('Single letter grades accepted. Include "-" or "+" if necessary')
        )
    )
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

    it('should return the correct error message', () =>
      studentRecord.create(missingCSC142CourseGrade)
        .catch(error =>
          expect(error.errors['courseGrades.csc142'].properties.message).to.equal('Please enter a value for the required field.')
        )
    )
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

    it('should return the correct error message', () =>
      studentRecord.create(invalidCSC240CourseGrade)
        .catch(error =>
          expect(error.errors['courseGrades.csc240'].properties.message).to.equal('Single letter grades accepted. Include "-" or "+" if necessary')
        )
    )
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

    it('should return the correct error message', () =>
      studentRecord.create(missingCSC240CourseGrade)
        .catch(error =>
          expect(error.errors['courseGrades.csc240'].properties.message).to.equal('Please enter a value for the required field.')
        )
    )
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

    it('should return the correct error message', () =>
      studentRecord.create(invalidCSC241CourseGrade)
        .catch(error =>
          expect(error.errors['courseGrades.csc241'].properties.message).to.equal('Single letter grades accepted. Include "-" or "+" if necessary')
        )
    )
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

    it('should return the correct error message', () =>
      studentRecord.create(missingCSC241CourseGrade)
        .catch(error =>
          expect(error.errors['courseGrades.csc241'].properties.message).to.equal('Please enter a value for the required field.')
        )
    )
  })

  describe('student record with valid input', () => {
    afterEach('clean the mongo test db collection', () =>
      studentRecord.deleteMany({})
    )

    const student = {
      firstName: 'Markus',
      lastName: 'Dingo',
      courseGrades: {
        csc141: 'B',
        csc142: 'C',
        csc240: 'A-',
        csc241: 'B+'
      }
    }

    it('should create the record in the database', () =>
      studentRecord.create(student)
        .then(async () => {
          const record = await studentRecord.findOne(student)
          expect(record).to.not.be.null
        })
    )

    it('should assign an id property to the student record', () =>
      studentRecord.create(student)
        .then(async () => {
          const record = await studentRecord.findOne(student)
          expect(record).to.have.property('_id')
        })
    )
  })
})
