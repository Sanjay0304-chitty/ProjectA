#!/bin/bash
cd /home/wong/ProjectA/ProjectA/prms-backend

npx tsx src/index.ts &
SERVER_PID=$!
sleep 3

echo "= API TEST SUITE ="

echo "1. GET /"
curl -s http://localhost:3500/
echo ""

echo "2. GET /health"
curl -s http://localhost:3500/health
echo ""

echo "3. POST /auth/register"
curl -s -X POST http://localhost:3500/auth/register -H "Content-Type: application/json" -d '{"email":"test3@prms.com","password":"Password1!","full_name":"Test User 3"}'
echo ""

echo "4. POST /auth/login"
curl -s -X POST http://localhost:3500/auth/login -H "Content-Type: application/json" -d '{"email":"admin@prms.com","password":"Password123"}' > /tmp/login.json
cat /tmp/login.json
echo ""

AT=$(node -e "const d=JSON.parse(require('fs').readFileSync('/tmp/login.json','utf8'));console.log(d.data.tokens.accessToken)")
echo "ACCESS_TOKEN: ${AT:0:40}..."

echo "5. GET /properties"
curl -s http://localhost:3500/properties
echo ""

echo "6. GET /search/location=downtown"
curl -s "http://localhost:3500/search?location=downtown&limit=2"
echo ""

echo "7. GET /users with auth"
curl -s http://localhost:3500/users -H "Authorization: Bearer $AT"
echo ""

echo "8. GET /auth/me"
curl -s http://localhost:3500/auth/me -H "Authorization: Bearer $AT"
echo ""

echo "9. GET /maintenance/tickets"
curl -s http://localhost:3500/maintenance/tickets -H "Authorization: Bearer $AT"
echo ""

echo "10. GET /admin/system-settings"
curl -s http://localhost:3500/admin/system-settings -H "Authorization: Bearer $AT"
echo ""

echo "11. GET /reports/summary"
curl -s http://localhost:3500/reports/summary -H "Authorization: Bearer $AT"
echo ""

echo "12. GET /bookings"
curl -s http://localhost:3500/bookings -H "Authorization: Bearer $AT"
echo ""

echo "13. GET /payments"
curl -s http://localhost:3500/payments -H "Authorization: Bearer $AT"
echo ""

echo "14. GET /communication/messages"
curl -s http://localhost:3500/communication/messages -H "Authorization: Bearer $AT"
echo ""

echo "15. POST /auth/logout"
RT=$(node -e "const d=JSON.parse(require('fs').readFileSync('/tmp/login.json','utf8'));console.log(d.data.tokens.refreshToken)")
curl -s -X POST http://localhost:3500/auth/logout -H "Authorization: Bearer $AT" -H "Content-Type: application/json" -d "{\"refreshToken\":\"$RT\"}"
echo ""

echo "16. GET /404-test"
curl -s http://localhost:3500/nonexistent
echo ""

kill $SERVER_PID 2>/dev/null
echo "= ALL TESTS DONE ="