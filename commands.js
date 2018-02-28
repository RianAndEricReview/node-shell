const fs = require('fs')
const request = require('request')
const chalk = require('chalk')

module.exports = {
  pwd: function(input, arg, func){
    //takes no input/arg
    func(process.cwd())
  },
  date: function(input, arg, func){
    //takes no input/arg
    let today = new Date().toUTCString()
    func(today)
  },
  ls: function(input, arg, func){
    //takes no input/arg
    fs.readdir('.', (err, files) => {
      if (err) throw err
      let fileStr = '';
      files.forEach(file => {
        fileStr += file + '\n';
      })
      func(fileStr);
    })
  },
  echo: function(input, args, func){
    let textToPrint = input ? input : args
    let strToPrint = '';
    textToPrint.split(' ').forEach(word => {
      if(word[0] === '$'){
        strToPrint += (process.env[word.slice(1).toUpperCase()] + ' ')
      } else {
        strToPrint += (word + ' ')
      }
    })
    func(strToPrint);
  },
  cat: function(input, filename, func){
    if(!input){
      fs.readFile('./' + filename, (err, data) => {
        if(err) throw err
        func(data.toString())
      })
    } else {
      func(input)
    }
  },
  head: function(input, filename, func){
    if(!input){
      fs.readFile('./' + filename, (err, data) => {
        if(err) throw err
        let firstLines = data.toString().split('\n').slice(0, 5).join('\n') + '\n'
        func(firstLines)
      })
    } else {
      let firstLines = input.toString().split('\n').slice(0, 5).join('\n') + '\n'
      func(firstLines)
    }
  },
  tail: function(input, filename, func){
    if(!input){
      fs.readFile('./' + filename, (err, data) => {
        if(err) throw err
        let firstLines = data.toString().split('\n').slice(-5).join('\n')
        func(firstLines)
      })
    } else {
      let firstLines = input.toString().split('\n').slice(-5).join('\n')
        func(firstLines)
    }
  },
  sort: function(input, filename, func){
    if(!input){
      fs.readFile('./' + filename, (err, data) => {
        if(err) throw err
        let lines = data.toString().split('\n').sort().join('\n')
        func(lines)
      })
    } else {
      let lines = input.toString().split('\n').sort().join('\n')
      func(lines)
    }
  },
  wc: function(input, filename, func){
    if(!input){
      fs.readFile('./' + filename, (err, data) => {
        if(err) throw err
        let lines = data.toString().split('\n').length
        func(lines.toString())
      })
    } else {
      let lines = input.toString().split('\n').length
      func(lines.toString())
    }
  },
  uniq: function(input, filename, func){
    if(!input){
      fs.readFile('./' + filename, (err, data) => {
        if(err) throw err
        let lines = data.toString().split('\n')
        lines = lines.filter((line, index)=>{
          return !(line === lines[index-1])
        }).join('\n')
        func(lines)
      })
    } else {
      let lines = input.split('\n')
      lines = lines.filter((line, index)=>{
        return !(line === lines[index-1])
      }).join('\n')
      func(lines)
    }
  },
  curl: (input, arg, func) => {
    let url = input ? input : arg
    request(url, (err, res, body) => {
      if(err) throw err
      func(body.toString())
    });
  },
}
