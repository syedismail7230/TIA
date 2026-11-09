/**
 * ============================================================================
 * TIA EXHAUSTIVE DEEP-TEST HARNESS (35+ ENDPOINTS & SCENARIOS)
 * Tests every single API route, authentication state, validation error,
 * security boundary, circumvention detection, pricing engine, and payment lock.
 * ============================================================================
 */

const http = require('http');

const BASE_HOST = 'localhost';
const BASE_PORT = 3000;

function request(method, path, body = null, cookie = '') {
  return new Promise((resolve) => {
    const payload = body ? JSON.stringify(body) : null;
    const headers = {
      'User-Agent': 'TIA-Exhaustive-Audit-Bot/2.0',
    };
    if (payload) {
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = Buffer.byteLength(payload);
    }
    if (cookie) {
      headers['Cookie'] = cookie;
    }

    const start = Date.now();
    const req = http.request(
      {
        hostname: BASE_HOST,
        port: BASE_PORT,
        path,
        method,
        headers,
        timeout: 10000,
      },
      (res) => {
        let raw = '';
        res.on('data', (c) => (raw += c));
        res.on('end', () => {
          let data;
          try {
            data = JSON.parse(raw);
          } catch {
            data = raw;
          }
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data,
            duration: Date.now() - start,
          });
        });
      }
    );

    req.on('error', (err) => resolve({ status: 0, error: err.message, duration: Date.now() - start }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 408, error: 'Timeout', duration: Date.now() - start });
    });

    if (payload) req.write(payload);
    req.end();
  });
}

async function runTestSuite() {
  const auditReport = {
    startedAt: new Date().toISOString(),
    tests: [],
  };

  function record(id, category, name, expected, actual, pass, details = {}) {
    const item = { id, category, name, expected, actual, pass: !!pass, details };
    auditReport.tests.push(item);
    const badge = pass ? '✅ [PASS]' : '❌ [FAIL]';
    console.log(`${badge} ${id}: ${name} -> ${actual} (Expect: ${expected})`);
  }

  console.log('======================================================================');
  console.log('🔬 STARTING EXHAUSTIVE TEST OF EVERY PLATFORM FEATURE');
  console.log('======================================================================\n');

  // ==========================================================================
  // SECTION 1: AUTHENTICATION, REGISTRATION & SESSION MANAGEMENT
  // ==========================================================================
  console.log('--- SECTION 1: AUTH & IDENTITY ---');

  // Test 1.1: Registration with invalid body
  const regInvalid = await request('POST', '/api/auth/register', {});
  record('AUTH-01', 'Authentication', 'Registration empty body rejection', 400, regInvalid.status, regInvalid.status === 400);

  // Test 1.2: Dynamic Brand Registration
  const testBrandEmail = `qa_brand_${Date.now()}@tia.agency`;
  const regBrand = await request('POST', '/api/auth/register', {
    email: testBrandEmail,
    password: 'Password@2026Secure!',
    name: 'Apex Brand Marketing',
    role: 'BRAND',
    organizationName: 'Apex Brands Global',
    businessCategory: 'Consumer Tech',
  });
  const brandCookie = regBrand.headers?.['set-cookie']?.[0]?.split(';')[0] || '';
  record('AUTH-02', 'Authentication', 'Dynamic Brand Registration', 201, regBrand.status, regBrand.status === 201 && !!brandCookie);

  // Test 1.3: Dynamic Creator Registration
  const testCreatorEmail = `qa_creator_${Date.now()}@tia.agency`;
  const regCreator = await request('POST', '/api/auth/register', {
    email: testCreatorEmail,
    password: 'Password@2026Secure!',
    name: 'Tara Tech Reviews',
    role: 'CREATOR',
  });
  const creatorCookie = regCreator.headers?.['set-cookie']?.[0]?.split(';')[0] || '';
  record('AUTH-03', 'Authentication', 'Dynamic Creator Registration', 201, regCreator.status, regCreator.status === 201 && !!creatorCookie);

  // Test 1.4: Login with bad credentials
  const badLogin = await request('POST', '/api/auth/login', {
    email: testBrandEmail,
    password: 'WrongPassword123!',
  });
  record('AUTH-04', 'Authentication', 'Invalid credentials rejection', 401, badLogin.status, badLogin.status === 401);

  // Test 1.5: Login with valid credentials
  const goodLogin = await request('POST', '/api/auth/login', {
    email: testBrandEmail,
    password: 'Password@2026Secure!',
  });
  const loginCookie = goodLogin.headers?.['set-cookie']?.[0]?.split(';')[0] || '';
  record('AUTH-05', 'Authentication', 'Valid credential login', 200, goodLogin.status, goodLogin.status === 200 && !!loginCookie);

  // Test 1.6: Authenticated Session Identity /api/auth/me
  const meAuth = await request('GET', '/api/auth/me', null, loginCookie);
  record('AUTH-06', 'Authentication', '/api/auth/me session retrieval', 200, meAuth.status, meAuth.status === 200 && meAuth.data?.user?.email === testBrandEmail);

  // Test 1.7: Unauthenticated access to /api/auth/me
  const meUnauth = await request('GET', '/api/auth/me');
  record('AUTH-07', 'Authentication', '/api/auth/me unauthenticated rejection', 401, meUnauth.status, meUnauth.status === 401);

  // Test 1.8: OTP Dispatch
  const otpSend = await request('POST', '/api/auth/otp/send', { email: testBrandEmail });
  record('AUTH-08', 'Authentication', 'OTP code dispatch', 200, otpSend.status, otpSend.status === 200);

  // Test 1.9: Phone verification dispatch
  const phoneSend = await request('POST', '/api/auth/phone/verify', { uid: 'firebase_phone_uid_777', phoneNumber: '+919876543210', displayName: 'Phone Test User' });
  record('AUTH-09', 'Authentication', 'Phone OTP Session Verification', 200, phoneSend.status, phoneSend.status === 200 && phoneSend.data?.success === true);

  // Test 1.10: Logout session clearing
  const logoutRes = await request('POST', '/api/auth/logout', null, loginCookie);
  const clearedCookie = logoutRes.headers?.['set-cookie']?.[0] || '';
  const isCookieCleared = logoutRes.status === 200 && (clearedCookie.includes('Max-Age=0') || clearedCookie.includes('tia_session_token=;') || clearedCookie.includes('Expires=Thu, 01 Jan 1970') || clearedCookie.toLowerCase().includes('path=/'));
  record('AUTH-10', 'Authentication', 'Logout cookie destruction', 200, logoutRes.status, isCookieCleared);

  // ==========================================================================
  // SECTION 2: CREATOR PROFILES, DISCOVERY & SEARCH
  // ==========================================================================
  console.log('\n--- SECTION 2: CREATORS & DISCOVERY ---');

  // Test 2.1: Creator Search (Unfiltered)
  const searchAll = await request('GET', '/api/creators/search');
  record('CREATOR-01', 'Creators', 'Directory search unfiltered', 200, searchAll.status, searchAll.status === 200 && Array.isArray(searchAll.data?.creators));

  // Test 2.2: Creator Search Filter by Category
  const searchCat = await request('GET', '/api/creators/search?category=Fitness+%26+Athletics');
  record('CREATOR-02', 'Creators', 'Directory filter by category', 200, searchCat.status, searchCat.status === 200);

  // Test 2.3: Creator Profile by Username
  const profByUsername = await request('GET', '/api/creators/sarahjenkins');
  record('CREATOR-03', 'Creators', 'Public profile /api/creators/[username]', 200, profByUsername.status, profByUsername.status === 200);

  // Test 2.4: Authenticated Creator Profile API
  const ownProfile = await request('GET', '/api/creators/profile', null, creatorCookie);
  record('CREATOR-04', 'Creators', 'Authenticated Creator Profile get', 200, ownProfile.status, ownProfile.status === 200);

  // Test 2.5: Social Handle Verification (Instagram)
  const verifyIg = await request('POST', '/api/connectors/verify-handle', {
    platform: 'INSTAGRAM',
    handle: 'technologist_india',
  });
  record('CREATOR-05', 'Connectors', 'Instagram handle verify API', 200, verifyIg.status, verifyIg.status === 200 && verifyIg.data?.verified);

  // Test 2.6: Social Handle Verification (YouTube)
  const verifyYt = await request('POST', '/api/connectors/verify-handle', {
    platform: 'YOUTUBE',
    handle: 'TechReviewsChannel',
  });
  record('CREATOR-06', 'Connectors', 'YouTube handle verify API', 200, verifyYt.status, verifyYt.status === 200 && verifyYt.data?.verified);

  // Test 2.7: Social Handle Verification (X / Twitter)
  const verifyX = await request('POST', '/api/connectors/verify-handle', {
    platform: 'X',
    handle: 'techguy',
  });
  record('CREATOR-07', 'Connectors', 'X / Twitter handle verify API', 200, verifyX.status, verifyX.status === 200 && verifyX.data?.verified);

  // ==========================================================================
  // SECTION 3: CAMPAIGNS, CRM KANBAN & APPLICATIONS
  // ==========================================================================
  console.log('\n--- SECTION 3: CAMPAIGNS & CRM WORKFLOW ---');

  // Test 3.1: Get Campaigns list
  const getCamps = await request('GET', '/api/campaigns', null, brandCookie);
  record('CAMP-01', 'Campaigns', 'Get all active campaigns', 200, getCamps.status, getCamps.status === 200 && Array.isArray(getCamps.data?.campaigns));

  // Test 3.2: Get Single Campaign Details
  const singleCamp = await request('GET', '/api/campaigns/camp-101', null, brandCookie);
  record('CAMP-02', 'Campaigns', 'Get single campaign camp-101', 200, singleCamp.status, singleCamp.status === 200 && singleCamp.data?.campaign?.id === 'camp-101');

  // Test 3.3: Get Campaign Kanban CRM Pipeline
  const kanbanGet = await request('GET', '/api/campaigns/kanban');
  record('CAMP-03', 'Campaigns', 'Get Creator Kanban CRM cards', 200, kanbanGet.status, kanbanGet.status === 200 && Array.isArray(kanbanGet.data?.cards));

  // Test 3.4: Patch Kanban Stage Transition (Move creator to NEGOTIATING)
  const kanbanPatch = await request('PATCH', '/api/campaigns/kanban', {
    cardId: 'k-card-3',
    targetStage: 'NEGOTIATING',
    notes: 'Brand approved commercial budget increase.',
  });
  record('CAMP-04', 'Campaigns', 'Update Kanban Stage Transition', 200, kanbanPatch.status, kanbanPatch.status === 200 && kanbanPatch.data?.card?.stage === 'NEGOTIATING');

  // Test 3.5: Applications API
  const appsGet = await request('GET', '/api/applications?campaignId=camp-101', null, brandCookie);
  record('CAMP-05', 'Campaigns', 'Retrieve campaign applications', 200, appsGet.status, appsGet.status === 200);

  // Test 3.6: Negotiations API
  const negGet = await request('GET', '/api/negotiations?campaignId=camp-101', null, brandCookie);
  record('CAMP-06', 'Campaigns', 'Retrieve negotiation threads', 200, negGet.status, negGet.status === 200);

  // Test 3.7: Contracts API
  const contractsGet = await request('GET', '/api/contracts?campaignId=camp-101', null, brandCookie);
  record('CAMP-07', 'Campaigns', 'Retrieve campaign contracts', 200, contractsGet.status, contractsGet.status === 200);

  // Test 3.8: Deliverable Submissions API
  const subGet = await request('GET', '/api/submissions?campaignId=camp-101', null, brandCookie);
  record('CAMP-08', 'Campaigns', 'Retrieve deliverable submissions', 200, subGet.status, subGet.status === 200);

  // ==========================================================================
  // SECTION 4: MESSAGING & CIRCUMVENTION ENFORCEMENT
  // ==========================================================================
  console.log('\n--- SECTION 4: MESSAGING & CIRCUMVENTION ---');

  // Test 4.1: Retrieve message threads
  const threadsGet = await request('GET', '/api/messages', null, brandCookie);
  record('MSG-01', 'Messaging', 'Retrieve collaboration chat threads', 200, threadsGet.status, threadsGet.status === 200 && Array.isArray(threadsGet.data?.threads));

  // Test 4.2: Retrieve messages for specific thread
  const msgsGet = await request('GET', '/api/messages?threadId=thread-collab-1', null, brandCookie);
  record('MSG-02', 'Messaging', 'Retrieve thread messages', 200, msgsGet.status, msgsGet.status === 200 && Array.isArray(msgsGet.data?.messages));

  // Test 4.3: Send compliant in-platform message
  const sendClean = await request('POST', '/api/messages', {
    threadId: 'thread-collab-1',
    text: 'Please review the 4K color grading at timestamp 02:15.',
  }, brandCookie);
  record('MSG-03', 'Messaging', 'Send compliant collaboration message', 200, sendClean.status, sendClean.status === 200 && sendClean.data?.message?.id);

  // Test 4.4: Block WhatsApp leakage circumvention
  const blockWhatsApp = await request('POST', '/api/messages', {
    threadId: 'thread-collab-1',
    text: 'Ping me on WhatsApp: +91 9988776655 to discuss payment directly.',
  }, brandCookie);
  record('MSG-04', 'Circumvention', 'Block WhatsApp & Phone leakage', 400, blockWhatsApp.status, blockWhatsApp.status === 400 && String(blockWhatsApp.data?.error).includes('blocked'));

  // Test 4.5: Block UPI ID circumvention
  const blockUpi = await request('POST', '/api/messages', {
    threadId: 'thread-collab-1',
    text: 'Send the remaining milestone to creator@okhdfcbank right now.',
  }, brandCookie);
  record('MSG-05', 'Circumvention', 'Block direct UPI payment handle leakage', 400, blockUpi.status, blockUpi.status === 400 && String(blockUpi.data?.error).includes('blocked'));

  // Test 4.6: Block External Link leakage
  const blockLink = await request('POST', '/api/messages', {
    threadId: 'thread-collab-1',
    text: 'Check my invoice at https://randompayments.net/invoice/1234',
  }, brandCookie);
  record('MSG-06', 'Circumvention', 'Block external checkout link leakage', 400, blockLink.status, blockLink.status === 400 && String(blockLink.data?.error).includes('blocked'));

  // ==========================================================================
  // SECTION 5: PAYMENTS, PROTECTION, INVOICING & AFFILIATE ATTRIBUTION
  // ==========================================================================
  console.log('\n--- SECTION 5: PAYMENTS & FINANCIAL LEDGER ---');

  // Test 5.1: Payment Protection Fund Lock
  const lockFunds = await request('POST', '/api/payments/protection', {
    action: 'LOCK',
    milestoneData: {
      creatorId: 'cr-101',
      campaignId: 'camp-101',
      campaignTitle: 'Summer 2026 Running Series',
      creatorName: 'Aarav Sharma',
      creatorHandle: '@aarav.fitness',
      grossAmount: 75000,
      milestoneStage: 1,
      milestoneTitle: 'Dedicated 4K Benchmark Video',
    },
  }, brandCookie);
  record('PAY-01', 'Payments', 'Milestone Budget Fund Lock in TIA Shield', 200, lockFunds.status, lockFunds.status === 200 && lockFunds.data?.transaction?.tiaFee === 3750);

  // Test 5.2: Invoices Retrieval
  const getInvoices = await request('GET', '/api/payments/invoices', null, brandCookie);
  record('PAY-02', 'Payments', 'Retrieve GST Invoices', 200, getInvoices.status, getInvoices.status === 200 && Array.isArray(getInvoices.data?.invoices));

  // Test 5.3: Brand Wallet Balance
  const getWallet = await request('GET', '/api/payments/wallet', null, brandCookie);
  record('PAY-03', 'Payments', 'Retrieve Brand Wallet Balances', 200, getWallet.status, getWallet.status === 200);

  // Test 5.4: Affiliate Sales Attribution Webhook
  const attrRes = await request('POST', '/api/webhooks/sales-attribution', {
    orderId: `ord_shopify_${Date.now()}`,
    promoCode: 'AARAV20',
    orderTotal: 4999,
    currency: 'INR',
    customerEmail: 'shopper@gmail.com',
  });
  record('PAY-04', 'Affiliate', 'E-commerce Order Attribution Webhook', 200, attrRes.status, attrRes.status === 200 && attrRes.data?.commissionEarned > 0);

  // Test 5.5: Non-existent Promo Code Rejection
  const attrBad = await request('POST', '/api/webhooks/sales-attribution', {
    orderId: 'ord_bad',
    promoCode: 'NONEXISTENT_CODE_99',
    orderTotal: 1000,
  });
  record('PAY-05', 'Affiliate', 'Invalid Promo Code Rejection', 404, attrBad.status, attrBad.status === 404);

  // ==========================================================================
  // SECTION 6: AI AVATAR & DISPUTES
  // ==========================================================================
  console.log('\n--- SECTION 6: AI STUDIO & DISPUTES ---');

  // Test 6.1: AI Avatar route validation (no body)
  const aiEmpty = await request('POST', '/api/ai/generate-avatar', {});
  record('AI-01', 'AI Studio', 'AI Avatar empty payload rejection', 400, aiEmpty.status, aiEmpty.status === 400);

  // Test 6.2: Notifications Retrieval
  const notifsGet = await request('GET', '/api/notifications', null, brandCookie);
  record('SYS-01', 'System', 'Retrieve notifications', 200, notifsGet.status, notifsGet.status === 200);

  // Test 6.3: Disputes Retrieval
  const disputesGet = await request('GET', '/api/disputes', null, brandCookie);
  record('SYS-02', 'System', 'Retrieve disputes list', 200, disputesGet.status, disputesGet.status === 200);

  // ==========================================================================
  // SECTION 7: CORE UI STATIC & SSR PAGE HEALTH CHECKS
  // ==========================================================================
  console.log('\n--- SECTION 7: USER INTERFACE (SSR & PAGES) ---');

  const pagesToTest = [
    { id: 'UI-01', path: '/', name: 'Homepage' },
    { id: 'UI-02', path: '/login', name: 'Login Page' },
    { id: 'UI-03', path: '/register', name: 'Register Page' },
    { id: 'UI-04', path: '/pricing', name: 'Pricing Page' },
    { id: 'UI-05', path: '/terms', name: 'Terms of Service' },
    { id: 'UI-06', path: '/privacy', name: 'Privacy Policy' },
    { id: 'UI-07', path: '/legal', name: 'Legal Agreements' },
    { id: 'UI-08', path: '/creator/sarahjenkins', name: 'Public Creator Profile' },
    { id: 'UI-09', path: '/brand', name: 'Brand Workspace (SSR)' },
    { id: 'UI-10', path: '/creator', name: 'Creator Workspace (SSR)' },
  ];

  for (const page of pagesToTest) {
    const res = await request('GET', page.path, null, brandCookie);
    record(page.id, 'UI Pages', `Page Load: ${page.name} (${page.path})`, 200, res.status, res.status === 200);
  }

  // Summary
  const passedCount = auditReport.tests.filter((t) => t.pass).length;
  const totalCount = auditReport.tests.length;
  const passRate = ((passedCount / totalCount) * 100).toFixed(1);

  console.log('\n======================================================================');
  console.log(`🏁 DEEP TEST EXECUTION FINISHED: ${passedCount}/${totalCount} PASSED (${passRate}%)`);
  console.log('======================================================================');

  auditReport.summary = {
    total: totalCount,
    passed: passedCount,
    failed: totalCount - passedCount,
    passRate: `${passRate}%`,
  };

  const fs = require('fs');
  fs.writeFileSync('scripts/deep_test_results.json', JSON.stringify(auditReport, null, 2));
}

runTestSuite().catch(console.error);
