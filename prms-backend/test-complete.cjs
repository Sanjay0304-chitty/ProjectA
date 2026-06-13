const http = require('http');

function request(method, path, token, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3500,
      path: path,
      method: method,
      headers: {}
    };
    if (token) options.headers['Authorization'] = 'Bearer ' + token;
    if (body) {
      const data = JSON.stringify(body);
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(data);
      const req = http.request(options, (res) => {
        let rawData = '';
        res.on('data', (chunk) => rawData += chunk);
        res.on('end', () => {
          try { resolve(JSON.parse(rawData)); } catch(e) { resolve(rawData); }
        });
      });
      req.on('error', reject);
      req.write(data);
      req.end();
    } else {
      const req = http.request(options, (res) => {
        let rawData = '';
        res.on('data', (chunk) => rawData += chunk);
        res.on('end', () => {
          try { resolve(JSON.parse(rawData)); } catch(e) { resolve(rawData); }
        });
      });
      req.on('error', reject);
      req.end();
    }
  });
}

async function main() {
  const g = (p, t) => request('GET', p, t);
  const p = (url, b, t) => request('POST', url, t, b);
  
  console.log('===== COMPREHENSIVE API TEST SUITE =====\n');
  
  console.log('1.  GET /');
  console.log(JSON.stringify(await g('/')));
  
  console.log('\n2.  GET /health');
  console.log(JSON.stringify(await g('/health')));
  
  console.log('\n3.  POST /auth/register');
  console.log(JSON.stringify(await p('/auth/register', {email:'testapi2@prms.com',password:'Password1!',full_name:'API Test 2'})));
  
  console.log('\n4.  POST /auth/login (admin)');
  const login = await p('/auth/login', {email:'admin@prms.com',password:'Password123'});
  console.log(JSON.stringify({success:login.success, email:login.data.user.email}));
  const AT = login.data.tokens.accessToken;
  const RT = login.data.tokens.refreshToken;
  
  console.log('\n5.  GET /auth/me');
  console.log(JSON.stringify(await g('/auth/me', AT)));
  
  console.log('\n6.  GET /properties');
  const props = await g('/properties');
  console.log(JSON.stringify({success:props.success, count:props.data.length, total:props.pagination.total}));
  
  console.log('\n7.  GET /properties/prop-001');
  console.log(JSON.stringify(await g('/properties/prop-001')));
  
  console.log('\n8.  GET /search?city=Springfield');
  const srch = await g('/search?city=Springfield');
  console.log(JSON.stringify({success:srch.success, total:srch.data.total}));
  
  console.log('\n9.  GET /users');
  const users = await g('/users', AT);
  console.log(JSON.stringify({success:users.success, count:users.data.length}));
  
  console.log('\n10. GET /bookings');
  const books = await g('/bookings', AT);
  console.log(JSON.stringify({success:books.success, count:books.data.length}));
  
  console.log('\n11. GET /payments');
  const pay = await g('/payments', AT);
  console.log(JSON.stringify({success:pay.success, count:pay.data.length}));
  
  console.log('\n12. GET /maintenance/');
  const maint = await g('/maintenance/', AT);
  console.log(JSON.stringify({success:maint.success, count:maint.data.length}));
  
  console.log('\n13. GET /admin/settings');
  const settings = await g('/admin/settings', AT);
  console.log(JSON.stringify({success:settings.success, count:settings.data.length}));
  
  console.log('\n14. GET /admin/audit-logs');
  const logs = await g('/admin/audit-logs', AT);
  console.log(JSON.stringify({success:logs.success, count:logs.data.length}));
  
  console.log('\n15. GET /admin/notifications');
  const notes = await g('/admin/notifications', AT);
  console.log(JSON.stringify({success:notes.success, count:notes.data.length}));
  
  console.log('\n16. GET /reports/dashboard');
  console.log(JSON.stringify(await g('/reports/dashboard', AT)));
  
  console.log('\n17. GET /reports/revenue');
  console.log(JSON.stringify(await g('/reports/revenue', AT)));
  
  console.log('\n18. GET /reports/properties');
  console.log(JSON.stringify(await g('/reports/properties', AT)));
  
  console.log('\n19. GET /reports/occupancy');
  console.log(JSON.stringify(await g('/reports/occupancy', AT)));
  
  console.log('\n20. GET /communication/');
  console.log(JSON.stringify(await g('/communication/', AT)));
  
  console.log('\n21. POST /maintenance/ (create)');
  const ticket = await p('/maintenance/', {title:'Leaky faucet',description:'Kitchen faucet',priority:'medium'}, AT);
  console.log(JSON.stringify({success:ticket.success}));
  
  if (ticket.data && ticket.data.id) {
    console.log('\n22. GET /maintenance/' + ticket.data.id);
    console.log(JSON.stringify(await g('/maintenance/' + ticket.data.id, AT)));
  }
  
  console.log('\n23. POST /auth/logout');
  console.log(JSON.stringify(await p('/auth/logout', {refreshToken:RT}, AT)));
  
  console.log('\n24. GET /nonexistent (404)');
  console.log(JSON.stringify(await g('/nonexistent')));
  
  console.log('\n===== ALL TESTS COMPLETE =====');
}

main().catch(e => { console.error('ERROR:', e); process.exit(1); });