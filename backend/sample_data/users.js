import bcrypt from 'bcryptjs'
import { femaleFirstNames, maleFirstNames } from './auxiliary/firstNames.js'
import { femaleMiddleNames, maleMiddleNames } from './auxiliary/middleNames.js'
import { lastNames } from './auxiliary/lastNames.js'
import { NUMBER_OF_USERS } from './constants.js'

const password = bcrypt.hashSync('password', 10)

const users = []
for (let i = 0; i < NUMBER_OF_USERS; i++) {
  const sex = Math.random() < 0.5 ? 'female' : 'male'
  let firstName, middleName, lastName
  if (sex === 'female') {
    firstName =
      femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)]
    middleName =
      femaleMiddleNames[Math.floor(Math.random() * femaleMiddleNames.length)]
    lastName = `${lastNames[Math.floor(Math.random() * lastNames.length)]}а`
  } else {
    firstName =
      maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
    middleName =
      maleMiddleNames[Math.floor(Math.random() * maleMiddleNames.length)]
    lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  }
  const positionNumber = Math.random() < 0.3 ? 1 : 0
  users.push({
    login: `${lastName}${firstName[0].toUpperCase()}${middleName[0].toUpperCase()}`,
    password,
    firstName,
    middleName,
    lastName,
    positionNumber,
  })
}

export default [
  {
    login: 'admin',
    password: bcrypt.hashSync('admin', 10),
    firstName: 'Admin',
    isAdmin: true,
    positionNumber: 2,
  },
  ...users,
]
