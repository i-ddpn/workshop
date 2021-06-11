import { femaleFirstNames, maleFirstNames } from './auxiliary/firstNames.js'
import { femaleMiddleNames, maleMiddleNames } from './auxiliary/middleNames.js'
import { lastNames } from './auxiliary/lastNames.js'
import { NUMBER_OF_CLIENTS } from './constants.js'

const randomNumber = (length) =>
  Math.floor(Math.random() * 10 ** length)
    .toString()
    .padStart(length, '0')

const clients = []
for (let i = 0; i < NUMBER_OF_CLIENTS; i++) {
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

  const phoneNumber = `+7 (${randomNumber(3)}) ${randomNumber(
    3
  )}-${randomNumber(2)}-${randomNumber(2)}`

  clients.push({
    firstName,
    middleName,
    lastName,
    phoneNumber,
  })
}

export default clients
