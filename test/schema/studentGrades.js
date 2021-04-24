const { expect } = require('chai')

const { gradePattern, namePattern } = require('../../lib/schema/studentGrades')

const validateRegex = (inputs, regex, valid = true) =>
  inputs.filter(input =>
    regex.test(input) === valid
  )

describe('schema/studentGrades', () => {
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
})
