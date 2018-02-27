const fs = require('fs')

module.exports = {
  pwd: function(arg){
    process.stdout.write(process.cwd())
    process.stdout.write('\nprompt > ');
  },
  date: function(arg){
    let today = new Date().toUTCString()
    process.stdout.write(today)
    process.stdout.write('\nprompt > ');
  },
  ls: function(arg){
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
  },
  cat: function(filename){
    fs.readFile('./' + filename, (err, data) => {
      if(err) throw err
      process.stdout.write(data)
      process.stdout.write('\nprompt > ')
    })
  },
  head: function(filename){
    fs.readFile('./' + filename, (err, data) => {
      if(err) throw err
      let firstLines = data.toString().split('\n').slice(0, 5).join('\n')
      process.stdout.write(firstLines)
      process.stdout.write('\nprompt > ')
    })
  },
  tail: function(filename){
    fs.readFile('./' + filename, (err, data) => {
      if(err) throw err
      let firstLines = data.toString().split('\n').slice(-5).join('\n')
      process.stdout.write(firstLines)
      process.stdout.write('\nprompt > ')
    })
  },
  sort: function(filename){
    fs.readFile('./' + filename, (err, data) => {
      if(err) throw err
      let lines = data.toString().split('\n').sort().join('\n')
      process.stdout.write(lines)
      process.stdout.write('\nprompt > ')
    })
  },
  wc: function(filename){
    fs.readFile('./' + filename, (err, data) => {
      if(err) throw err
      let lines = data.toString().split('\n').length
      process.stdout.write(lines.toString())
      process.stdout.write('\nprompt > ')
    })
  },
  uniq: function(filename){
    fs.readFile('./' + filename, (err, data) => {
      if(err) throw err
      let lines = data.toString().split('\n')
      lines = lines.filter((line, index)=>{
        console.log('line', line, 'prev', lines[index-1])
        return !(line === lines[index-1])
      }).join('\n')
      process.stdout.write(lines)
      process.stdout.write('\nprompt > ')
    })
  },
}
