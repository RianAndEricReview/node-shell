// Output a prompt

let cmdList = []

process.stdout.write('prompt > ');
const commands = require('./commands.js')
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmdString = data.toString().trim();
  cmdList = cmdString.split(/\s*\|\s*/g) // any amount of whitespace, pipe, any amount of whitespace
  let curCmd = cmdList.shift()
  let cmd = curCmd.split(' ')[0].trim();
  let args = curCmd.split(' ').slice(1).join(' ').trim()

  if(commands[cmd]){
    commands[cmd](null, args, done)
  } else {
    process.stdout.write('You typed: ' + cmd);
    process.stdout.write('\n\nprompt > ');
  }

});

function done (output) {
  if(cmdList.length){
    let curCmd = cmdList.shift()
    let cmd = curCmd.split(' ')[0].trim();
    let args = curCmd.split(' ').slice(1).join(' ').trim()
    commands[cmd](output, args, done)
  } else {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
  }
}

