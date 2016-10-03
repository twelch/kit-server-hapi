var fs = require('fs')
const settings = require('./settings')
module.exports = settings

/*
TODO - switch to reading settings from file each request 
so that app restart not requires on setting change.
Consider using hapi to load settings into request object and
stop using require
*/

/*
export default function getSettings() {
  fs.readFile('./settings.json', 'utf8', function (err, data) {
    if (err) throw err
    return JSON.parse(data)
  })
}
*/

