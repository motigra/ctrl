import * as util from 'util';
import * as child_process from 'child_process';

const exec = util.promisify(child_process.exec);

async function runCommand(command: string) {
  const { stdout, stderr } = await exec(command);
  if(stderr){console.error('stderr:', stderr);}
  return stdout;
}

export default runCommand;
