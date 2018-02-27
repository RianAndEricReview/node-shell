// Output a prompt
process.stdout.write('prompt > ');
const commands = require('./commands.js')
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  let cmd = data.toString().split(' ')[0].trim();
  let args = data.toString().split(' ').slice(1).join(' ').trim()

  if(commands[cmd]){
    commands[cmd](args, done)
  } else {
    process.stdout.write('You typed: ' + cmd);
    process.stdout.write('\n\nprompt > ');
  }

});

const done = (output) => {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}
