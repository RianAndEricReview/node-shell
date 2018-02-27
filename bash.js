// Output a prompt
process.stdout.write('prompt > ');
const commands = require('./commands.js')

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  let cmd = data.toString().split(' ')[0];
  let args = data.toString().split(' ').slice(1).join(' ').trim()

  if(commands[cmd]){
    commands[cmd](args)
  } else {
    process.stdout.write('You typed: ' + cmd);
  }


});

