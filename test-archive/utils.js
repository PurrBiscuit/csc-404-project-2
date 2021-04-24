const { green, red } = require('chalk')
const { error, success } = require('log-symbols')
const { validate } = require('revalidator')

const testResults = {
  errorCount: 0,
  successCount: 0
}

const compareArrays = (actual, expected) => {
  const keys1 = Object.keys(actual)
  const keys2 = Object.keys(expected)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    const val1 = actual[key]
    const val2 = expected[key]
    const areObjects = isObject(val1) && isObject(val2)
    if (
      areObjects && !compareArrays(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false
    }
  }

  return true
}

const isObject = object => {
  return object != null && typeof object === 'object'
}

const compareValues = (actual, expected) => {
  if (Array.isArray(actual) && Array.isArray(expected))
    return compareArrays(actual, expected)

  return actual === expected
}

const getInvalidRecords = (records, schema) =>
  records.reduce((acc, record, index) => {
    const { errors, valid } = validate(record, schema)

    if (!valid)
      acc.push({
        recordIndex: index,
        record,
        errors
      })

    return acc
  }, [])

const logError = (msg, actual, expected) => {
  testResults.errorCount++

  console.log('  ', error, 'ERROR:', msg, `\n       Expected: ${green(expected)}\n       Actual: ${red(actual)}\n`)
}

const logResult = ({ actual, expected, extraErrorOutput, name, success }) => {
  if (success)
    return logSuccess(name)

  const errorMessage = extraErrorOutput ? `${name} ${extraErrorOutput}` : name
  logError(errorMessage, actual, expected)
}

const logSuccess = msg => {
  testResults.successCount++
  console.log('  ', success, msg)
}

const printContext = context => {
  const msg = `Context - ${context}:`

  console.log(`\n${msg}`)
  console.log('-'.repeat(msg.length))
}

const printTestResults = () => {
  const {
    errorCount,
    successCount
  } = testResults

  const errorNumber = errorCount == 0 ? green(errorCount) : red(errorCount)
  console.log(`\n\n${green(successCount)} Successful Tests; ${errorNumber} Failed Tests\n`)

  if (errorCount != 0)
    throw new Error('An error was encountered during unit testing.  Review testing output for exact reason.')
}

const runComparisonTest = ({ name, actual, expected }) => {
  if (actual === undefined && expected === undefined)
    return logResult({
      name,
      success: false,
      extraErrorOutput: '- actual and expected values are undefined',
      actual,
      expected
    })

  const success = compareValues(actual, expected)
  return logResult({ actual, expected, name, success })
}

const runInputTest = ({ name, inputs, regex, valid = true }) => {
  const matches = inputs.filter(input =>
    regex.test(input) === valid
  )

  const success = matches.length === inputs.length ? true : false

  logResult({ name, success, actual: `[${matches}]`, expected: `[${inputs}]` })
}

const runValidationTest = ({ expected = 'valid', extraErrorOutput, name, valid }) => {
  const actual = valid ? 'valid' : 'invalid'
  const success = actual === expected

  return logResult({ actual, expected, name, success, extraErrorOutput })
}

const starryPrinter = msg => {
  const starLines = '*'.repeat(msg.length + 4)
  const starPadding = `* ${' '.repeat(msg.length)} *`

  console.log(`${starLines}\n${starPadding}\n* ${msg} *\n${starPadding}\n${starLines}`)
}

module.exports = {
  getInvalidRecords,
  printContext,
  printTestResults,
  runComparisonTest,
  runInputTest,
  runValidationTest,
  starryPrinter,
  compareValues
}
