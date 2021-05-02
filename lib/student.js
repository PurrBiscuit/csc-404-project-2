// Filter out students with GPAs >= GPA filter input
const filterQualified = (students, gpaFilter = '2.5') =>
  students.filter(({ partialGPA }) =>
    isGPAQualified(partialGPA, gpaFilter)
  )

const formatStudentRecord = ({
  firstName,
  lastName,
  csc141,
  csc142,
  csc240,
  csc241
}) => {
  firstName = (firstName !== '') ? normalizeName(firstName) : undefined
  lastName = (lastName !== '') ? normalizeName(lastName) : undefined

  return {
    firstName,
    lastName,
    courseGrades: {
      csc141,
      csc142,
      csc240,
      csc241
    }
  }
}

const isGPAQualified = (partialGPA, gpaFilter = '2.5') =>
  partialGPA >= gpaFilter

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

module.exports = {
  filterQualified,
  formatStudentRecord,
  isGPAQualified,
  normalizeName,
  sortStudents,
}
