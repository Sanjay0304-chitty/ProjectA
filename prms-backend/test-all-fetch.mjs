async function test() {
  const BASE = 'http://localhost:3500';
  
  function get(path, token) {
    const h = {};
    if (token) h['Authorization'] = 'Bearer ' + token;
    const r = await fetch(BASE + path, { headers: h });
    return r.json();
  }
  
  function post(path, body, token) {
    const h = { 'Content-Type': 'application/json' };
    if (token) h['Authorization'] = 'Bearer ' + token;
    const r = await fetch(BASE + path, {
      method: 'POST',
      headers: h,
      body: JSON.stringify(body)
    });
    return r.json();
  }

  console.log('===== COMPREHENSIVE API TEST SUITE =====\n');

  // 1. Root
  console.log('1.  GET /');
  console.log(JSON.stringify(await get('/')));

  // 2. Health
  console.log('\n2.  GET /health');
  console.log(JSON.stringify(await get('/health')));

  // 3. Register
  console.log('\n3.  POST /auth/register');
  const regResult = await post('/auth/register', {
    email: 'testapi@prms.com', password: 'Password1!', full_name: 'API Test User'
  });
  console.log(JSON.stringify({ success: regResult.success, message: regResult.message }));

  // 4. Admin login
  console.log('\n4.  POST /auth/login (admin)');
  const login = await post('/auth/login', {
    email: 'admin@prms.com', password: 'Password123'
  });
  console.log(JSON.stringify({ success: login.success, user: login.data.user.email, role: login.data.user.role }));
  const AT = login.data.tokens.accessToken;
  const RT = login.data.tokens.refreshToken;

  // 5. GET /auth/me
  console.log('\n5.  GET /auth/me');
  const me = await get('/auth/me', AT);
  console.log(JSON.stringify({ success: me.success, email: me.data.email }));

  // 6. Properties
  console.log('\n6.  GET /properties');
  const props = await get('/properties');
  console.log(JSON.stringify({ success: props.success, count: props.data.length, total: props.pagination.total }));

  // 7. Single property
  console.log('\n7.  GET /properties/prop-001');
  const prop1 = await get('/properties/prop-001');
  console.log(JSON.stringify({ success: prop1.success, title: prop1.data.title }));

  // 8. Search
  console.log('\n8.  GET /search?city=Springfield');
  const srch = await get('/search?city=Springfield');
  console.log(JSON.stringify({ success: srch.success, count: srch.data.total }));

  // 9. Users (authenticated)
  console.log('\n9.  GET /users');
  const users = await get('/users', AT);
  console.log(JSON.stringify({ success: users.success, count: users.data.length, total: users.pagination.total }));

  // 10. Bookings
  console.log('\n10. GET /bookings');
  const books = await get('/bookings', AT);
  console.log(JSON.stringify({ success: books.success, count: books.data.length }));

  // 11. Payments
  console.log('\n11. GET /payments');
  const pay = await get('/payments', AT);
  console.log(JSON.stringify({ success: pay.success, count: pay.data.length }));

  // 12. Maintenance tickets
  console.log('\n12. GET /maintenance/');
  const maint = await get('/maintenance/', AT);
  console.log(JSON.stringify({ success: maint.success, count: maint.data.length }));

  // 13. Admin settings
  console.log('\n13. GET /admin/settings');
  const settings = await get('/admin/settings', AT);
  console.log(JSON.stringify({ success: settings.success, count: settings.data.length }));

  // 14. Admin audit logs
  console.log('\n14. GET /admin/audit-logs');
  const logs = await get('/admin/audit-logs', AT);
  console.log(JSON.stringify({ success: logs.success, count: logs.data.length }));

  // 15. Admin notifications
  console.log('\n15. GET /admin/notifications');
  const notes = await get('/admin/notifications', AT);
  console.log(JSON.stringify({ success: notes.success, count: notes.data.length }));

  // 16. Reports dashboard
  console.log('\n16. GET /reports/dashboard');
  const dash = await get('/reports/dashboard', AT);
  console.log(JSON.stringify({ success: dash.success, hasData: !!dash.data }));

  // 17. Reports revenue
  console.log('\n17. GET /reports/revenue');
  const rev = await get('/reports/revenue', AT);
  console.log(JSON.stringify({ success: rev.success, hasData: !!rev.data }));

  // 18. Reports properties
  console.log('\n18. GET /reports/properties');
  const rp = await get('/reports/properties', AT);
  console.log(JSON.stringify({ success: rp.success, hasData: !!rp.data }));

  // 19. Reports occupancy
  console.log('\n19. GET /reports/occupancy');
  const occ = await get('/reports/occupancy', AT);
  console.log(JSON.stringify({ success: occ.success, hasData: !!occ.data }));

  // 20. Communication conversations
  console.log('\n20. GET /communication/');
  const conv = await get('/communication/', AT);
  console.log(JSON.stringify({ success: conv.success, count: conv.data.length }));

  // 21. POST /maintenance/ create ticket
  console.log('\n21. POST /maintenance/ (create ticket)');
  const ticket = await post('/maintenance/', {
    title: 'Leaky faucet', description: 'Kitchen faucet leaking', priority: 'medium'
  }, AT);
  console.log(JSON.stringify({ success: ticket.success, message: ticket.message }));

  // 22. GET /maintenance/:id
  if (ticket.data && ticket.data.id) {
    console.log('\n22. GET /maintenance/' + ticket.data.id);
    const detail = await get('/maintenance/' + ticket.data.id, AT);
    console.log(JSON.stringify({ success: detail.success, title: detail.data.title }));

    // 23. PATCH resolve
    console.log('\n23. PATCH /maintenance/' + ticket.data.id + '/resolve');
    const rRes = await fetch(BASE + '/maintenance/' + ticket.data.id + '/resolve', {
      method: 'PATCH',
      headers: { 'Authorization': 'Bearer ' + AT }
    });
    const resolved = await rRes.json();
    console.log(JSON.stringify({ success: resolved.success, status: resolved.data.status }));
  }

  // 24. Logout
  console.log('\n24. POST /auth/logout');
  const out = await post('/auth/logout', { refreshToken: RT }, AT);
  console.log(JSON.stringify({ success: out.success }));

  // 25. 404
  console.log('\n25. GET /nonexistent (404 test)');
  const r404 = await fetch(BASE + '/nonexistent');
  const d404 = await r404.json();
  console.log(JSON.stringify(d404));

  console.log('\n===== ALL TESTS COMPLETE =====');
}

test().catch(e => { console.error('ERROR:', e.message); process.exit(1); });