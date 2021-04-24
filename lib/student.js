const { validate } = require('revalidator')
const { schema } = require('./schema/studentGrades')

// Filter out students with GPAs >= 2.5
const filterQualified = students =>
  students.filter(({ partialGPA }) =>
    isGPAQualified(partialGPA)
  )

const isGPAQualified = partialGPA =>
  partialGPA >= 2.5

const normalizeName = name => {
  if (name.includes('-')) {
    const hyphenatedName = name.split('-').reduce((acc, n) => {
      return n ? [...acc, `${n[0].toUpperCase()}${n.slice(1).toLowerCase()}`] : acc
    }, [])

    return hyphenatedName.join('-')
  }

  return name[0].toUpperCase() + name.slice(1).toLowerCase()
}

const sortStudents = students =>
  students.sort((first, second) =>
    first.lastName > second.lastName ? 1 : -1
  )

const validateInput = student => {
  const { errors, valid } = validate(student, schema)

  const formattedErrors = errors.reduce((acc, { attribute, property, message }) => {
    if (attribute === 'required') message = 'Please enter a value for the required field.'
    acc[property] = message

    return acc
  }, {})

  return { errors: formattedErrors, valid }
}

module.exports = {
  filterQualified,
  isGPAQualified,
  normalizeName,
  sortStudents,
  validateInput
}
