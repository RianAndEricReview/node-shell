const fs = require('fs')

module.exports = {
  pwd: function(){
    process.stdout.write(process.cwd())
    process.stdout.write('\nprompt > ');
  },
  date: function(){
    let today = new Date().toUTCString()
    process.stdout.write(today)
    process.stdout.write('\nprompt > ');
  },
  ls: function(){
    fs.readdir('.', (err, files) => {
      if (err) throw err
      files.forEach(file => {
        process.stdout.write(file.toString() + '\n')
      })
      process.stdout.write('\nprompt > ');
    })
  },
  echo: function(args){
    args.split(' ').forEach(arg => {
      if(arg[0] === '$'){
        process.stdout.write(process.env[arg.slice(1).toUpperCase()] + ' ')
      } else {
        process.stdout.write(arg + ' ')
      }
    })
    process.stdout.write('\nprompt > ')
  }
}
