const { formatErrors } = require('../lib/utils')
const { studentRecord } = require('../lib/model/studentModel')
const { expect } = require('chai')

describe('utils', () => {
  describe('formatErrors', () => {
    it('should format the validation errors from mongoose properly', () => {
      const invalidRecord = new studentRecord({
        firstName: '',
        lastName: '',
        courseGrades: {
          csc141: '',
          csc142: '',
          csc240: '',
          csc241: ''
        }
      })

      const expectedFormat = {
        firstName: 'Please enter a value for the required field.',
        lastName: 'Please enter a value for the required field.',
        'courseGrades.csc141': 'Please enter a value for the required field.',
        'courseGrades.csc142': 'Please enter a value for the required field.',
        'courseGrades.csc240': 'Please enter a value for the required field.',
        'courseGrades.csc241': 'Please enter a value for the required field.'
      }

      const errors = formatErrors(invalidRecord.validateSync().errors)

      expect(errors).to.deep.equal(expectedFormat)
    })
  })
})
