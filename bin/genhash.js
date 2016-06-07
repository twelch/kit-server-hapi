//Generate password hash for given username
const hashPassword = require('../api/users/util/userFunctions').hashPassword

const password = process.argv[2]
if (!password) {
  console.log('Usage: >genhash password')
}

const hash = hashPassword(password, function(err, hash, salt){
  console.log('--------')
  console.log('Password: '+password)
  console.log('Salt used: '+salt)
  console.log('Encrypted hash: ' + hash)
  console.log('--------')
  console.log()
});