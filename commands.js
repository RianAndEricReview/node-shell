const fs = require('fs')
const request = require('request')

module.exports = {
  pwd: function(arg, func){
    func(process.cwd())
  },
  date: function(arg, func){
    let today = new Date().toUTCString()
    func(today)
  },
  ls: function(arg, func){
    fs.readdir('.', (err, files) => {
      if (err) throw err
      let fileStr = '';
      files.forEach(file => {
        fileStr += file + '\n';
      })
      func(fileStr);
    })
  },
  echo: function(args, func){
    let strToPrint = '';
    args.split(' ').forEach(arg => {
      if(arg[0] === '$'){
        strToPrint += (process.env[arg.slice(1).toUpperCase()] + ' ')
      } else {
        strToPrint += (arg + ' ')
      }
    })
    func(strToPrint);
  },
  cat: function(filename, func){
    fs.readFile('./' + filename, (err, data) => {
      if(err) throw err
      func(data)
    })
  },
  head: function(filename, func){
    fs.readFile('./' + filename, (err, data) => {
      if(err) throw err
      let firstLines = data.toString().split('\n').slice(0, 5).join('\n') + '\n'
      func(firstLines)
    })
  },
  tail: function(filename, func){
    fs.readFile('./' + filename, (err, data) => {
      if(err) throw err
      let firstLines = data.toString().split('\n').slice(-5).join('\n')
      func(firstLines)
    })
  },
  sort: function(filename, func){
    fs.readFile('./' + filename, (err, data) => {
      if(err) throw err
      let lines = data.toString().split('\n').sort().join('\n')
      func(lines)
    })
  },
  wc: function(filename, func){
    fs.readFile('./' + filename, (err, data) => {
      if(err) throw err
      let lines = data.toString().split('\n').length
      func(lines.toString())
    })
  },
  uniq: function(filename, func){
    fs.readFile('./' + filename, (err, data) => {
      if(err) throw err
      let lines = data.toString().split('\n')
      lines = lines.filter((line, index)=>{
        return !(line === lines[index-1])
      }).join('\n')
      func(lines)
    })
  },
  curl: (url, func) => {
    request(url, (err, res, body) => {
      if(err) throw err
      func(body.toString())
    });
  }
}
