// Keep telemetry disabled and commands portable without shell-specific environment syntax.
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
if(existsSync('.env'))process.loadEnvFile('.env');
const cli=fileURLToPath(new URL('../node_modules/astro/bin/astro.mjs',import.meta.url));
const child=spawn(process.execPath,[cli,...process.argv.slice(2)],{stdio:'inherit',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}});
child.on('error',error=>{console.error(error);process.exitCode=1;});
child.on('exit',code=>{process.exitCode=code??1;});
