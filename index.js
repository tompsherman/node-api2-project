const server = require('./server.js')

require('colors')

server.listen(8008, ()=>{
    console.log('\n *** Server running on port 8008(s) ***'.green.inverse)
})