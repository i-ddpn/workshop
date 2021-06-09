import bcrypt from 'bcryptjs'

export default [
  {
    login: 'admin',
    password: bcrypt.hashSync('admin', 10),
    firstName: 'Admin',
    isAdmin: true,
  },
]
