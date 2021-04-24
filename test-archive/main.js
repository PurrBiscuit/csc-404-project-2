const { validate } = require('revalidator')

const {
  schema
} = require('../lib/schema/studentGrades')

const {
  calcGPA,
  calcGPAs,
  sumGrades
} = require('../lib/calculate')

const {
  filterQualified,
  isGPAQualified,
  normalizeName,
  sortStudents
} = require('../lib/student')

const {
  inputPromptSchemaTestCases,
  missingPropTestCases,
  mixedStudentGroup,
  qualifiedBorderStudent,
  qualifiedStudent,
  qualifiedStudentsGroup,
  unqualifiedStudent,
  unqualifiedStudentsGroup,
  sortStudentsGroup
} = require('./stubs')

const {
  getInvalidRecords,
  printContext,
  printTestResults,
  runComparisonTest,
  runInputTest,
  runValidationTest,
  starryPrinter
} = require('./utils')

//
// Unit Tests for the regex and responses from the prompt schema
//
const testInputPromptSchema = ({
  invalidInputs,
  prop,
  regex,
  validInputs
}) => {
  // testing for valid inputs
  runInputTest({
    name: `Checks valid inputs: ${prop} property`,
    inputs: validInputs,
    regex
  })

  // testing for invalid inputs
  runInputTest({
    name: `Checks invalid inputs: ${prop} property`,
    inputs: invalidInputs,
    valid: false,
    regex
  })
}

//
// Unit Tests for a single student with missing, required inputs
//
const testSingleStudentWithMissingProp = ({ prop, student, studentSchema }) => {
  const { valid } = validate(student, studentSchema)

  runValidationTest({
    name: `Invalid Student Record: missing ${prop} property`,
    expected: 'invalid',
    valid,
    extraErrorOutput: `- should be required by schema but is marked as optional`
  })
}

//
// Unit Tests for a single student with valid inputs
//
const testSingleStudentWithValidInput = ({
  student,
  studentSchema,
  expectedFirstName,
  expectedLastName,
  expectedRawScore,
  expectedPartialGPA,
  expectedQualified
}) => {
  // test to make sure all required attributes are present and valid for the student record
  const { errors, valid } = validate(student, studentSchema)

  runValidationTest({
    name: 'Validates schema for required properties with valid values',
    valid,
    extraErrorOutput: `- review the following errors:\n${JSON.stringify(errors, null, 2)}`
  })

  // test first name normalization is correct
  const actualFirstName = normalizeName(student.firstName)

  runComparisonTest({
    name: 'Normalize first name',
    actual: actualFirstName,
    expected: expectedFirstName
  })

  // test last name normalization is correct
  const actualLastName = normalizeName(student.lastName)

  runComparisonTest({
    name: 'Normalizes last name',
    actual: actualLastName,
    expected: expectedLastName
  })

  // test raw score summation is correct
  const actualRawScore = sumGrades(student.courseGrades)

  runComparisonTest({
    name: 'Calculates total raw score',
    actual: actualRawScore,
    expected: expectedRawScore
  })

  // test GPA calculation is correct
  const actualPartialGPA = calcGPA(student)

  runComparisonTest({
    name: 'Calculates partial GPA',
    actual: actualPartialGPA,
    expected: expectedPartialGPA
  })

  // make sure the student qualifies based on calculated GPA
  const actualQualified = isGPAQualified(actualPartialGPA)

  runComparisonTest({
    name: 'Checks to see if partial GPA qualifies for internship',
    actual: actualQualified,
    expected: expectedQualified
  })
}

//
// Unit Tests for a group of students with valid inputs
//
const testStudentsGroupWithValidInput = ({
  students,
  studentSchema,
  expectedPartialGPAs,
  expectedQualified
}) => {
  const invalids = getInvalidRecords(students, studentSchema)

  runValidationTest({
    name: 'Validates student records in group',
    valid: invalids.length === 0,
    extraErrorOutput: `- the following student records were invalid:\n${JSON.stringify(invalids, null, 2)}`
  })

  const studentPartialGPARecords = calcGPAs(students)
  const actualPartialGPAs = studentPartialGPARecords.map(({ partialGPA }) => partialGPA)

  runComparisonTest({
    name: 'Calculates partial GPAs',
    actual: actualPartialGPAs,
    expected: expectedPartialGPAs
  })

  const actualQualifed = filterQualified(studentPartialGPARecords)

  runComparisonTest({
    name: 'Filters qualified students',
    actual: actualQualifed.length,
    expected: expectedQualified
  })
}

// Unit test for sorting function
const testStudentSorting = ({
  students,
  studentSchema,
  expectedPartialGPAs,
  expectedQualified,
  expectedSorted
}) => {
  const invalids = getInvalidRecords(students, studentSchema)

  runValidationTest({
    name: 'Validates student records in group',
    valid: invalids.length === 0,
    extraErrorOutput: `- the following student records were invalid:\n${JSON.stringify(invalids, null, 2)}`
  })

  const studentPartialGPARecords = calcGPAs(students)
  const actualPartialGPAs = studentPartialGPARecords.map(({ partialGPA }) => partialGPA)

  runComparisonTest({
    name: 'Calculates partial GPAs',
    actual: actualPartialGPAs,
    expected: expectedPartialGPAs
  })

  const actualQualifed = filterQualified(studentPartialGPARecords)

  runComparisonTest({
    name: 'Filters qualified students',
    actual: actualQualifed.length,
    expected: expectedQualified
  })

  const actualSorted = sortStudents(students)

  runComparisonTest({
    name: 'Sorts students',
    actual: actualSorted,
    expected: expectedSorted
  })
}


//
// Main test suite runner function
//
const runTest = () => {
  starryPrinter('Starting the Internship Qualifier Project Test Suite')

  // testing the input prompt schema for valid/invalid inputs and responses
  printContext('Prompt Schema')

  inputPromptSchemaTestCases.forEach(testCase =>
    testInputPromptSchema(testCase)
  )

  // test an individual, unqualified student with valid inputs
  printContext('Single Unqualified Student With Valid Input')

  testSingleStudentWithValidInput({
    student: unqualifiedStudent,
    studentSchema: schema,
    expectedFirstName: 'Georgie',
    expectedLastName: 'Porgie',
    expectedRawScore: 5,
    expectedPartialGPA: 1.3,
    expectedQualified: false
  })

  // test an individual, qualified student with valid inputs
  printContext('Single Qualified Student With Valid Input')

  testSingleStudentWithValidInput({
    student: qualifiedStudent,
    studentSchema: schema,
    expectedFirstName: 'Sally',
    expectedLastName: 'Smith-Smartypantsington',
    expectedRawScore: 14.67,
    expectedPartialGPA: 3.7,
    expectedQualified: true
  })

  // test an individual, qualified student with
  // valid inputs and a partial GPA = 2.5
  printContext('Single, Border Case, Qualified Student With Valid Input')

  testSingleStudentWithValidInput({
    student: qualifiedBorderStudent,
    studentSchema: schema,
    expectedFirstName: 'Terry',
    expectedLastName: 'Franks',
    expectedRawScore: 10,
    expectedPartialGPA: 2.5,
    expectedQualified: true
  })

  // test some student records with missing inputs
  printContext('Single Student Records With Missing Inputs')

  missingPropTestCases.forEach(testCase =>
    testSingleStudentWithMissingProp({ ...testCase, studentSchema: schema })
  )

  // test a group of students that all qualify
  printContext('Group of Qualified Students')

  testStudentsGroupWithValidInput({
    students: qualifiedStudentsGroup,
    studentSchema: schema,
    expectedPartialGPAs: [3.7, 3.3, 3.2, 3.9],
    expectedQualified: qualifiedStudentsGroup.length
  })

  // test a group of students that all don't qualify
  printContext('Group of Unqualified Students')

  testStudentsGroupWithValidInput({
    students: unqualifiedStudentsGroup,
    studentSchema: schema,
    expectedPartialGPAs: [1.3, 1.9, 2.4, 1.3],
    expectedQualified: 0
  })

  // test a group of mixed (qualified and unqualified) students
  printContext('Group of Qualified and Unqualified Students')

  testStudentsGroupWithValidInput({
    students: mixedStudentGroup,
    studentSchema: schema,
    expectedPartialGPAs: [2.8, 3.8, 2.1, 1.8, 3.5, 1.6, 3.3, 4.0],
    expectedQualified: 5
  })

  // test sorting of group of students
  printContext('Sort Students')

  const expectedSorted = [
    {
      firstName: 'Billy',
      lastName: 'Borderline',
      courseGrades: { csc141: 'C-', csc142: 'C', csc240: 'A-', csc241: 'B' }
    },
    {
      firstName: 'Mary',
      lastName: 'Meandering',
      courseGrades: { csc141: 'C', csc142: 'A', csc240: 'b-', csc241: 'd+' }
    },
    {
      firstName: 'Gina',
      lastName: 'Notgonnacutit',
      courseGrades: { csc141: 'C', csc142: 'C-', csc240: 'F', csc241: 'D+' }
    },
    {
      firstName: 'Hank',
      lastName: 'Yule-Flunkington',
      courseGrades: { csc141: 'C', csc142: 'C-', csc240: 'D+', csc241: 'F' }
    }
  ]

  testStudentSorting({
    students: sortStudentsGroup,
    studentSchema: schema,
    expectedPartialGPAs: [1.3, 2.6, 2.5, 1.3],
    expectedQualified: 2,
    expectedSorted: expectedSorted
  })

  // print out the final results of the test-suite
  printTestResults()
}

// Start up the test suite
runTest()
