module.exports = {
  pwd: function(){
    process.stdout.write(process.cwd())
  },
  date: function(){
    let today = new Date().toUTCString()
    process.stdout.write(today)
  }
}