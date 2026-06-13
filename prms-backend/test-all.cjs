const { execSync } = require('child_process');

function curl(url, headers) {
  let cmd = 'curl -s ' + url;
  if (headers) {
    for (const k in headers) {
      cmd += ' -H "' + k + ': ' + headers[k] + '"';
    }
  }
  return execSync(cmd, { encoding: 'utf-8', cwd: '/home/wong/ProjectA/ProjectA/prms-backend' });
}

function parse(raw) {
  try { return JSON.parse(raw); } catch(e) { return raw; }
}

console.log('=== CORRECTED PATH TESTS ===\n');

const loginRaw = curl('http://localhost:3500/auth/login', {'Content-Type': 'application/json'}, JSON.stringify({email:'admin@prms.com',password:'Password123'}));