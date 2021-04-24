const {
  gradeMessage,
  gradePattern,
  nameMessage,
  namePattern
} = require('../lib/schema/studentGrades')

const inputPromptSchemaTestCases = [
  {
    actualMessage: nameMessage,
    expectedMessage: 'Name must contain only letters or dashes',
    invalidInputs: [ '123132', '  Seth', 'Billy ', '-M', '1Frank5', '&Gloria', 'Sammy+Smith', 'First Last', 'test-' ],
    prop: 'firstName and lastName',
    regex: namePattern,
    validInputs: [ 'Steve', 'Joe', 'Kyle', 'Hudson', 'Sa', 'kim', 'jackson', 'FraNcois', 'Smith-Westington', 'Pepitone', 'Q' ]
  },
  {
    actualMessage: gradeMessage,
    expectedMessage: 'Single letter grades accepted. Include "-" or "+" if necessary',
    invalidInputs: [ 'A+', 'e', 'E', 'z-', 'banana', '+A', '-d', '1', '&', ' A', 'B ', 'F+', 'F-' ],
    prop: 'courseGrades',
    regex: gradePattern,
    validInputs: [ 'A', 'a', 'A-', 'b+', 'B', 'b-', 'C+', 'c', 'C-', 'd+', 'd', 'D-', 'F', 'f' ]
  }
]

const missingCSC141Student = {
  firstName: 'Darren',
  lastName: 'Nicks',
  courseGrades: {
    csc142: 'B',
    csc240: 'F',
    csc241: 'D'
  }
}

const missingCSC142Student = {
  firstName: 'Victor',
  lastName: 'Eee',
  courseGrades: {
    csc141: 'B+',
    csc240: 'A-',
    csc241: 'a'
  }
}

const missingCSC240Student = {
  firstName: 'Freddy',
  lastName: 'Beans',
  courseGrades: {
    csc141: 'C-',
    csc142: 'D-',
    csc241: 'C+'
  }
}

const missingCSC241Student = {
  firstName: 'Harry',
  lastName: 'Platypus',
  courseGrades: {
    csc141: 'a-',
    csc142: 'a',
    csc240: 'C',
  }
}

const missingFirstNameStudent = {
  lastName: 'Testing',
  courseGrades: {
    csc141: 'A',
    csc142: 'C+',
    csc240: 'B-',
    csc241: 'C'
  }
}

const missingLastNameStudent = {
  firstName: 'Darren',
  courseGrades: {
    csc141: 'A',
    csc142: 'B',
    csc240: 'F',
    csc241: 'D'
  }
}

const missingPropTestCases = [
  {
    prop: 'csc141',
    student: missingCSC141Student
  },
  {
    prop: 'csc142',
    student: missingCSC142Student
  },
  {
    prop: 'csc240',
    student: missingCSC240Student
  },
  {
    prop: 'csc241',
    student: missingCSC241Student
  },
  {
    prop: 'firstName',
    student: missingFirstNameStudent
  },
  {
    prop: 'lastName',
    student: missingLastNameStudent
  }
]

const mixedStudentGroup = [
  {
    firstName: 'Gary',
    lastName: 'Blankenship',
    courseGrades: {
      csc141: 'A',
      csc142: 'C',
      csc240: 'c',
      csc241: 'B+'
    }
  },
  {
    firstName: 'Freddie',
    lastName: 'Mercury',
    courseGrades: {
      csc141: 'A',
      csc142: 'B+',
      csc240: 'a-',
      csc241: 'A'
    }
  },
  {
    firstName: 'Laura',
    lastName: 'Peloton',
    courseGrades: {
      csc141: 'C',
      csc142: 'C-',
      csc240: 'B-',
      csc241: 'C'
    }
  },
  {
    firstName: 'Holden',
    lastName: 'Caulfield',
    courseGrades: {
      csc141: 'B-',
      csc142: 'C',
      csc240: 'd',
      csc241: 'd+'
    }
  },
  {
    firstName: 'Rita',
    lastName: 'Repulsa',
    courseGrades: {
      csc141: 'B',
      csc142: 'A-',
      csc240: 'A',
      csc241: 'b+'
    }
  },
  {
    firstName: 'Tommy',
    lastName: 'Gunn',
    courseGrades: {
      csc141: 'C',
      csc142: 'D',
      csc240: 'c+',
      csc241: 'd'
    }
  },
  {
    firstName: 'Bob',
    lastName: 'Spongey',
    courseGrades: {
      csc141: 'A',
      csc142: 'C+',
      csc240: 'B+',
      csc241: 'A-'
    }
  },
  {
    firstName: 'Jacqueline',
    lastName: 'Maplesmith',
    courseGrades: {
      csc141: 'A',
      csc142: 'A',
      csc240: 'A',
      csc241: 'A'
    }
  }
]

const qualifiedBorderStudent = {
  firstName: 'Terry',
  lastName: 'Franks',
  courseGrades: {
    csc141: 'B',
    csc142: 'B',
    csc240: 'c',
    csc241: 'C'
  }
}

const qualifiedStudent = {
  firstName: 'SalLy',
  lastName: 'smith-SMartyPantsington',
  courseGrades: {
    csc141: 'A',
    csc142: 'A-',
    csc240: 'B+',
    csc241: 'A-'
  }
}

const qualifiedStudentsGroup = [
  {
    firstName: 'Sam',
    lastName: 'Wellington',
    courseGrades: {
      csc141: 'A',
      csc142: 'A-',
      csc240: 'B+',
      csc241: 'A-'
    }
  },
  {
    firstName: 'Yankee',
    lastName: 'Doodle',
    courseGrades: {
      csc141: 'A',
      csc142: 'A-',
      csc240: 'B-',
      csc241: 'B-'
    }
  },
  {
    firstName: 'Sarah',
    lastName: 'Marshall',
    courseGrades: {
      csc141: 'C+',
      csc142: 'B-',
      csc240: 'A',
      csc241: 'A-'
    }
  },
  {
    firstName: 'Bert',
    lastName: 'Reynolds',
    courseGrades: {
      csc141: 'A',
      csc142: 'A-',
      csc240: 'A',
      csc241: 'A'
    }
  }
]

const unqualifiedStudent = {
  firstName: 'Georgie',
  lastName: 'Porgie',
  courseGrades: {
    csc141: 'C',
    csc142: 'D',
    csc240: 'F',
    csc241: 'C'
  }
}

const unqualifiedStudentsGroup = [
  {
    firstName: 'Hank',
    lastName: 'Yule-Flunkington',
    courseGrades: {
      csc141: 'C',
      csc142: 'C-',
      csc240: 'D+',
      csc241: 'F'
    }
  },
  {
    firstName: 'Mary',
    lastName: 'Meandering',
    courseGrades: {
      csc141: 'C',
      csc142: 'C-',
      csc240: 'b-',
      csc241: 'd+'
    }
  },
  {
    firstName: 'Billy',
    lastName: 'Borderline',
    courseGrades: {
      csc141: 'C-',
      csc142: 'C',
      csc240: 'B',
      csc241: 'B'
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
  }
]

const sortStudentsGroup = [
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

module.exports = {
  inputPromptSchemaTestCases,
  missingPropTestCases,
  mixedStudentGroup,
  qualifiedBorderStudent,
  qualifiedStudent,
  qualifiedStudentsGroup,
  unqualifiedStudent,
  unqualifiedStudentsGroup,
  sortStudentsGroup
}
