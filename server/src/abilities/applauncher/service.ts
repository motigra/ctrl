import * as util from 'util';
import * as child_process from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as manifest from './manifest.json';

/* Handle loading and processing of manifest */

type LauncherApp = {
    name: string;
    cmd: string;
    icon?: string;
}

function getManifest(): Record<string, LauncherApp> {
    return manifest;
}

/* Handle executing app by name */

async function runApp(key: string) {
    const app: LauncherApp = manifest[key];
    if (!app || !app.cmd) throw `applauncher error: invalid app ${key}`;
    return runCommand(app.cmd);
}

const exec = util.promisify(child_process.exec);

async function runCommand(command: string) {
  const { stdout, stderr } = await exec(command);
  if(stderr){console.error('stderr:', stderr);}
  return stdout;
}

export { getManifest, runApp }
