// Generate password hash for given username
const hashPassword = require('../api/users/util/userFunctions').hashPassword

const password = process.argv[2]
if (!password) {
  console.log('Usage: >genhash password')
}

hashPassword(password, function (err, hash, salt) {
  if (err) {
    console.log(err)
    return
  }
  console.log('--------')
  console.log('Password: ' + password)
  console.log('Salt used: ' + salt)
  console.log('Encrypted hash: ' + hash)
  console.log('--------')
  console.log()
})
