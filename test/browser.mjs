/* ──────────────────────────────────────────────────────────────
   브라우저로 하는 검사

   가짜 서버를 붙여 화면을 실제로 띄우고, 핵심 흐름을 한 번씩 밟습니다.
     · 학생 로그인 → 내 통장 · 거래 내역 · 건의 제출 · 비밀번호 변경
     · 상점지기 · 은행직원에게 역할 카드가 뜨는지
     · 교사 로그인 → 대시보드 · 모든 메뉴 · 급여 지급 · 보너스
   자바스크립트 오류가 하나라도 나면 실패로 칩니다.
   ────────────────────────────────────────────────────────────── */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { reply, state } from './mock.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const API = 'https://script.google.com/macros/s/TEST/exec';
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webmanifest': 'application/manifest+json' };

function serve() {
  const srv = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/index.html';
    const f = path.join(ROOT, p);
    if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
      res.writeHead(404); res.end(); return;
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise(r => srv.listen(0, '127.0.0.1', () => r(srv)));
}

export async function runBrowser() {
  const { chromium } = await import('playwright');
  const out = [];
  const add = (name, ok, detail) => out.push({ name, ok: !!ok, detail: detail || '' });

  const srv = await serve();
  const BASE = 'http://127.0.0.1:' + srv.address().port + '/';
  const opts = { args: ['--no-sandbox'] };
  if (fs.existsSync('/opt/pw-browsers/chromium')) opts.executablePath = '/opt/pw-browsers/chromium';
  const browser = await chromium.launch(opts);

  /* 화면 하나를 새로 엽니다. calls 에 서버로 간 요청이 쌓입니다. */
  async function open({ linked = true, width = 1366, query = '', phone = false } = {}) {
    const ctxOpts = { viewport: { width, height: 900 }, serviceWorkers: 'block' };
    if (phone) ctxOpts.userAgent = 'Mozilla/5.0 (Linux; Android 14; SM-S921N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36';
    const ctx = await browser.newContext(ctxOpts);
    const page = await ctx.newPage();
    const calls = [], errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('dialog', d => d.accept());
    await ctx.route('**/*', async route => {
      const url = route.request().url();
      if (url === API) {
        const body = JSON.parse(route.request().postData() || '{}');
        calls.push(body);
        let payload;
        try { payload = { __r: reply(body.fn, body.args || []) }; }
        catch (e) { payload = { __error: e.message }; }
        return route.fulfill({ status: 200, contentType: 'application/json',
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify(payload) });
      }
      if (url.startsWith(BASE)) return route.continue();
      return route.abort();          // 글꼴·아이콘 같은 바깥 자원은 받지 않습니다
    });
    // 그래프 도구는 바깥에서 받아 오므로 빈 껍데기로 대신합니다
    await ctx.addInitScript(() => {
      function Chart() { this.data = {}; this.options = {}; }
      Chart.prototype.destroy = function () {};
      Chart.prototype.update = function () {};
      Chart.register = function () {};
      Chart.defaults = { font: {}, color: '' };
      window.Chart = Chart;
    });
    if (linked) await ctx.addInitScript(u => localStorage.setItem('CE_API_URL', u), API);
    await page.goto(BASE + query, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    return { ctx, page, calls, errors };
  }
  const sent = (calls, fn) => calls.filter(c => c.fn === fn);
  const shown = (page, sel) => page.evaluate(s => {
    const e = document.querySelector(s); return !!e && e.offsetParent !== null; }, sel);

  try {
    /* ── 1. 학급이 연결되지 않은 첫 방문 ───────────────────── */
    {
      const { ctx, page, errors } = await open({ linked: false });
      add('첫 방문: 학급 연결 안내가 뜬다', await page.$('#ce-setup'));
      add('첫 방문: 오류 없음', errors.length === 0, errors[0]);
      await ctx.close();
    }

    /* ── 2. 로그인 화면 ────────────────────────────────────── */
    {
      const { ctx, page, calls, errors } = await open();
      const n = await page.$$eval('#login-num option', o => o.filter(x => x.value).length);
      add('로그인: 학생 목록 4명', n === 4, n + '명');
      add('로그인: 로고가 그려진다', await page.$('#login-logo-icon-wrap svg'));
      add('로그인: 연결 안내가 뜨지 않는다', !(await page.$('#ce-setup')));
      add('로그인: 목록만 가볍게 읽는다', sent(calls, 'loadAll').length === 0);
      add('로그인: 오류 없음', errors.length === 0, errors[0]);
      await ctx.close();
    }

    /* ── 2-2. 사용 안내 ────────────────────────────────────── */
    const HELP_N = (fs.readFileSync(path.join(ROOT, 'js/help.js'), 'utf8')
                     .match(/\{ t: '/g) || []).length;
    {
      const { ctx, page, errors } = await open();
      add('사용 안내: 로그인 화면에 단추가 보인다', await shown(page, '#login-screen .dw-help-btn'));
      const h = await page.$eval('#login-screen .dw-help-btn', b => b.getBoundingClientRect().height);
      add('사용 안내: 단추 높이 44px 이상', h >= 44, h + 'px');
      await page.click('#login-screen .dw-help-btn');
      await page.waitForTimeout(200);
      add('사용 안내: 창이 열린다', await shown(page, '#dw-help .dw-help-box'));
      add('사용 안내: 제목 "돈워리! 간략 사용법"',
          (await page.textContent('#dw-help .dw-help-title')).trim() === '돈워리! 간략 사용법');
      const n = await page.$$eval('#dw-help .dw-help-item', x => x.length);
      add('사용 안내: 항목 ' + HELP_N + '개', n === HELP_N && n >= 6 && n <= 9, n + '개');
      const nb = await page.$$eval('#dw-help .dw-help-no', x => x.map(e => e.textContent).join(','));
      add('사용 안내: 번호가 1부터 차례로', nb === Array.from({ length: n }, (_, i) => i + 1).join(','), nb);
      const who = await page.$$eval('#dw-help .dw-help-item-t', x => x.every(e => /\((선생님|학생|학생·선생님)\)$/.test(e.textContent.trim())));
      add('사용 안내: 제목 끝에 (선생님)·(학생)', who);
      const demo = await page.$('#dw-help .dw-help-demo');
      add('사용 안내: 미리보기 링크가 새 탭으로 ?demo',
          demo && (await demo.getAttribute('target')) === '_blank' && /\?demo$/.test(await demo.getAttribute('href')));
      const scroll = await page.evaluate(() => {
        const b = document.querySelector('#dw-help .dw-help-box');
        return b.getBoundingClientRect().height <= innerHeight; });
      add('사용 안내: 창이 화면 안에 들어온다', scroll);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(150);
      add('사용 안내: Esc로 닫힌다', !(await page.$('#dw-help')));
      await page.click('#login-screen .dw-help-btn');
      await page.click('#dw-help .dw-help-x');
      add('사용 안내: 닫기 단추로 닫힌다', !(await page.$('#dw-help')));
      await page.click('#login-screen .dw-help-btn');
      await page.mouse.click(5, 5);
      add('사용 안내: 바깥을 누르면 닫힌다', !(await page.$('#dw-help')));
      await page.click('#login-screen .dw-help-btn');
      await page.click('#dw-help .dw-help-foot .btn');
      add('사용 안내: 확인으로 닫힌다', !(await page.$('#dw-help')));
      add('사용 안내: 오류 없음', errors.length === 0, errors[0]);
      await ctx.close();
    }

    /* ── 3. 학생 (직업: 반장) ──────────────────────────────── */
    {
      const { ctx, page, calls, errors } = await open();
      await page.selectOption('#login-num', '1');
      await page.fill('#login-pw', '1');
      await page.click('#form-student .login-btn');
      await page.waitForTimeout(900);

      add('학생: 화면이 열린다', await shown(page, '#student-screen'));
      add('학생: 이름', (await page.textContent('#st-name')).includes('김하늘'));
      add('학생: 잔액 12,000원',
          (await page.textContent('#st-balance')).replace(/[^\d]/g, '') === '12000',
          await page.textContent('#st-balance'));
      const rows = await page.$$eval('#st-ledger tr', r => r.length);
      add('학생: 거래 내역 2건', rows === 2, rows + '건');
      add('학생: 상점 카드는 안 보인다', !(await shown(page, '#st-shop-card')));
      add('학생: 은행 카드는 안 보인다', !(await shown(page, '#st-bank-card')));
      add('학생: 넓은 화면은 두 칸',
          (await page.evaluate(() => getComputedStyle(document.querySelector('.st-grid')).display)) === 'grid');
      add('학생: 로고', await page.$('#student-mark svg'));
      add('학생: 위쪽 줄 맨 앞에 사용 안내 단추', await page.evaluate(() => {
        const b = document.querySelector('.student-topbar .dw-help-btn');
        return !!b && b.offsetParent !== null && b.parentElement.firstElementChild === b; }));
      await page.click('.student-topbar .dw-help-btn');
      add('학생: 사용 안내 창이 열린다', await shown(page, '#dw-help .dw-help-box'));
      await page.keyboard.press('Escape');

      await page.fill('#sug-title', '간식 쿠폰 가격');
      await page.fill('#sug-body', '조금 내려 주세요');
      await page.fill('#sug-reason', '저축해서 사고 싶어요');
      await page.evaluate(() => doSubmitSuggestion());
      await page.waitForTimeout(500);
      add('학생: 건의 제출이 서버로 간다', sent(calls, 'submitSuggestion').length === 1);

      await page.fill('#st-cur-pw', '1');
      await page.fill('#st-new-pw', '5678');
      await page.fill('#st-confirm-pw', '5678');
      await page.evaluate(() => doChangeStudentPw());
      await page.waitForTimeout(500);
      add('학생: 비밀번호 변경이 서버로 간다', sent(calls, 'changeStudentPwDirect').length === 1);

      add('학생: 남의 자료를 읽지 않는다', sent(calls, 'loadAll').length === 0);
      add('학생: 오류 없음', errors.length === 0, errors[0]);
      await ctx.close();
    }

    /* ── 4. 학생 (좁은 화면) ───────────────────────────────── */
    {
      const { ctx, page, errors } = await open({ width: 420 });
      await page.selectOption('#login-num', '1');
      await page.fill('#login-pw', '1');
      await page.click('#form-student .login-btn');
      await page.waitForTimeout(900);
      add('휴대폰: 한 줄로 내려간다',
          (await page.evaluate(() => getComputedStyle(document.querySelector('.st-grid')).display)) !== 'grid');
      add('휴대폰: 사용 안내 단추가 보인다', await shown(page, '.student-topbar .dw-help-btn'));
      add('휴대폰: 위쪽 줄이 넘치지 않는다', await page.evaluate(() => {
        const t = document.querySelector('.student-topbar'); return t.scrollWidth <= t.clientWidth + 1; }));
      add('휴대폰: 오류 없음', errors.length === 0, errors[0]);
      await ctx.close();
    }

    /* ── 5. 상점지기 · 은행직원 ────────────────────────────── */
    for (const [num, card, label] of [['2', '#st-shop-card', '상점지기'],
                                      ['3', '#st-bank-card', '은행직원']]) {
      const { ctx, page, errors } = await open();
      await page.selectOption('#login-num', num);
      await page.fill('#login-pw', num);
      await page.click('#form-student .login-btn');
      await page.waitForTimeout(1100);
      add(label + ': 역할 카드가 뜬다', await shown(page, card));
      add(label + ': 오류 없음', errors.length === 0, errors[0]);
      await ctx.close();
    }

    /* ── 6. 교사 ───────────────────────────────────────────── */
    {
      const { ctx, page, calls, errors } = await open();
      await page.click('.login-tab:last-child');
      await page.fill('#admin-pw', '0000');
      await page.click('#form-teacher .login-btn');
      await page.waitForTimeout(600);
      add('교사: 틀린 비밀번호는 막힌다',
          !(await page.evaluate(() => document.getElementById('admin-screen').classList.contains('show'))));

      await page.fill('#admin-pw', '1234');
      await page.click('#form-teacher .login-btn');
      await page.waitForTimeout(1500);
      add('교사: 화면이 열린다',
          await page.evaluate(() => document.getElementById('admin-screen').classList.contains('show')));
      add('교사: 초기 비밀번호 알림이 뜬다', await page.$('#dw-pw-notice'));
      const tiles = await page.$$eval('#dash-stats .stat', e => e.length);
      add('교사: 지표 타일 6개', tiles === 6, tiles + '개');
      add('교사: 금고 잔액 298,500원',
          (await page.textContent('#dash-stats .stat.featured .stat-value')).replace(/[^\d]/g, '') === '298500');
      add('교사: 사이드바 로고', await page.$('#sidebar-mark svg'));
      add('교사: 왼쪽 메뉴 맨 아래에 사용 안내 단추', await page.evaluate(() => {
        const b = document.querySelector('.sidebar .sidebar-help .dw-help-btn');
        const nav = document.querySelector('.sidebar-nav');
        return !!b && b.offsetParent !== null &&
               b.getBoundingClientRect().top >= nav.getBoundingClientRect().bottom - 1; }));
      await page.click('.sidebar-help .dw-help-btn');
      add('교사: 사용 안내 창이 열린다', await shown(page, '#dw-help .dw-help-box'));
      await page.keyboard.press('Escape');
      add('교사: Esc로 닫힌다', !(await page.$('#dw-help')));
      add('교사: 사이드바가 맨 위부터',
          (await page.evaluate(() => document.querySelector('.sidebar').getBoundingClientRect().top)) === 0);

      // 모든 메뉴를 한 번씩 연다
      const pages = await page.$$eval('.page', p => p.map(x => x.id.replace('page-', '')));
      const broken = [];
      for (const id of pages) {
        if (id === 'bank-mode' || id === 'sk-store') continue;   // 역할 로그인 뒤에만 열리는 화면
        const before = errors.length;
        await page.evaluate(i => showPage(i), id);
        await page.waitForTimeout(350);
        const active = await page.evaluate(i => document.getElementById('page-' + i).classList.contains('active'), id);
        if (!active || errors.length > before) broken.push(id + (errors.length > before ? '(오류)' : '(안 열림)'));
      }
      add('교사: 메뉴 ' + (pages.length - 2) + '개가 모두 열린다', broken.length === 0, broken.join(', '));

      // 학생 명단 — 검색
      await page.evaluate(() => showPage('students'));
      await page.waitForTimeout(300);
      const all = await page.$$eval('#student-table tr', r => r.length);
      await page.fill('#student-search', '김');
      await page.waitForTimeout(200);
      const hit = await page.$$eval('#student-table tr', r => r.length);
      add('교사: 학생 명단 4명', all === 4, all + '명');
      add('교사: 이름 검색', hit === 1, hit + '명');
      await page.fill('#student-search', '');

      // 급여
      await page.evaluate(() => openSalaryModal());
      await page.waitForTimeout(700);
      add('교사: 급여 창이 열린다',
          await page.evaluate(() => document.getElementById('modal-salary').classList.contains('open')));
      await page.evaluate(() => doPaySelected());
      await page.waitForTimeout(700);
      const pay = sent(calls, 'paySelectedSalaries');
      add('교사: 급여 지급이 서버로 간다', pay.length === 1);
      add('교사: 지급 대상 4명이 실린다',
          pay.length === 1 && Array.isArray(pay[0].args[2]) && pay[0].args[2].length === 4,
          pay.length ? JSON.stringify(pay[0].args) : '');

      // 보너스
      await page.evaluate(() => openBonusModal());
      await page.waitForTimeout(400);
      add('교사: 보너스 창이 열린다',
          await page.evaluate(() => document.getElementById('modal-bonus').classList.contains('open')));

      add('교사: 오류 없음', errors.length === 0, errors.slice(0, 2).join(' / '));
      await ctx.close();
    }

    /* ── 6-2. 라이브러리 판 확인 · 새 판으로 바꾸는 법 ───────── */
    async function teacher(o) {
      const t = await open(o);
      await t.page.click('.login-tab:last-child');
      await t.page.fill('#admin-pw', '1234');
      await t.page.click('#form-teacher .login-btn');
      await t.page.waitForTimeout(2600);
      return t;
    }
    const LATEST = (fs.readFileSync(path.join(ROOT, 'js/update.js'), 'utf8')
                     .match(/DW_SERVER_LATEST\s*=\s*'([\d.]+)'/) || [])[1];
    {
      // 예전 판 서버
      state.version = '2.0.0'; state.hasInfo = true;
      const { ctx, page, errors } = await teacher();
      add('판 확인: 예전 판이면 대시보드에 알림 줄', await shown(page, '#dw-old-line'));
      await page.evaluate(() => showPage('settings'));
      await page.waitForTimeout(300);
      const info = await page.textContent('#conn-info');
      add('판 확인: 연결 정보에 "2.0.0판 · 새 판 있음"', info.includes('2.0.0판') && info.includes('새 판 있음'), info.trim().slice(0, 60));
      add('판 확인: 연결 정보에 내 시트 링크',
          (await page.getAttribute('#conn-info a', 'href')) === 'https://docs.google.com/spreadsheets/d/TEST/edit');

      // 다른 창(급여 창)이 열린 채로 안내 창을 띄운다
      await page.evaluate(() => openSalaryModal());
      await page.waitForTimeout(700);
      await page.evaluate(() => openUpdateGuide());
      await page.waitForTimeout(200);
      add('안내 창: 열린다', await shown(page, '#dw-guide .dw-guide-box'));
      add('안내 창: 다른 창 위에 겹쳐 뜬다', await page.evaluate(() => {
        const g = document.querySelector('#dw-guide .dw-guide-box').getBoundingClientRect();
        const top = document.elementFromPoint(g.left + g.width / 2, g.top + 30);
        return !!top && !!top.closest('#dw-guide') &&
               document.getElementById('modal-salary').classList.contains('open');
      }));
      const steps = await page.$$eval('#dw-guide .dw-guide-steps li', l => l.map(x => x.textContent));
      add('안내 창: 3단계', steps.length === 3, steps.length + '단계');
      add('안내 창: 시트 → Apps Script', steps[0] && steps[0].includes('Apps Script'));
      add('안내 창: 라이브러리 CE 버전 올리기', steps[1] && steps[1].includes('CE') && steps[1].includes('가장 높은 숫자'));
      add('안내 창: 배포 관리 → 새 버전, 주소 그대로',
          steps[2] && steps[2].includes('배포 관리') && steps[2].includes('새 버전') && steps[2].includes('주소는 그대로'));
      add('안내 창: 1단계에 내 시트 링크',
          (await page.getAttribute('#dw-guide .dw-guide-steps a', 'href')) === 'https://docs.google.com/spreadsheets/d/TEST/edit');
      const body = await page.textContent('#dw-guide');
      add('안내 창: 컴퓨터에서 하라는 안내', body.includes('컴퓨터에서 해 주세요'));
      add('안내 창: 새로고침 안내', body.includes('새로고침하면 새 판이 적용돼요'));
      add('안내 창: 컴퓨터에서는 휴대폰 문구가 없다', !(await page.$('#dw-guide-phone')));
      add('안내 창: 사본을 새로 받으라는 말이 없다', !/사본/.test(body));
      await page.evaluate(() => closeUpdateGuide());
      add('안내 창: 닫으면 급여 창은 그대로', !(await page.$('#dw-guide')) &&
          await page.evaluate(() => document.getElementById('modal-salary').classList.contains('open')));
      add('판 확인(예전 판): 오류 없음', errors.length === 0, errors.slice(0, 2).join(' / '));
      await ctx.close();
    }
    {
      // getServerInfo 가 아예 없는 더 옛 서버
      state.version = '2.0.0'; state.hasInfo = false;
      const { ctx, page, errors } = await teacher();
      add('옛 서버: 그래도 알림 줄이 뜬다', await shown(page, '#dw-old-line'));
      await page.evaluate(() => openUpdateGuide());
      const li = await page.textContent('#dw-guide .dw-guide-steps li');
      add('옛 서버: 시트 주소를 몰라도 안내가 나온다', li.includes('스프레드시트 열기') && !(await page.$('#dw-guide .dw-guide-steps a')));
      add('옛 서버: 오류 없음', errors.length === 0, errors.slice(0, 2).join(' / '));
      await ctx.close();
    }
    {
      // 최신 판 서버
      state.version = LATEST; state.hasInfo = true;
      const { ctx, page, errors } = await teacher();
      add('최신 판: 알림 줄이 없다', !(await shown(page, '#dw-old-line')));
      await page.evaluate(() => showPage('settings'));
      await page.waitForTimeout(300);
      const info = await page.textContent('#conn-info');
      add('최신 판: "최신 판이에요", 단추 없음', info.includes('최신 판이에요') && !info.includes('새 판 있음') &&
          !(await page.$('#conn-info button')));
      add('최신 판: 오류 없음', errors.length === 0, errors.slice(0, 2).join(' / '));
      await ctx.close();
    }
    {
      // 휴대폰
      state.version = '2.0.0'; state.hasInfo = true;
      const { ctx, page, errors } = await teacher({ width: 412, phone: true });
      await page.evaluate(() => openUpdateGuide());
      const phone = await page.$('#dw-guide-phone');
      add('휴대폰: 컴퓨터에서 열라는 한 줄이 더 나온다',
          phone && (await phone.textContent()).includes('컴퓨터에서 선생님 화면을 열고'));
      add('휴대폰: 안내 창이 화면 안에 들어온다', await page.evaluate(() => {
        const r = document.querySelector('.dw-guide-box').getBoundingClientRect();
        return r.left >= 0 && r.right <= window.innerWidth + 1;
      }));
      add('휴대폰(안내 창): 오류 없음', errors.length === 0, errors.slice(0, 2).join(' / '));
      await ctx.close();
    }
    state.version = '2.0.0'; state.hasInfo = true;

    /* ── 7. 미리보기 (?demo) ────────────────────────────────
       학교 시트 없이 gas/Code.gs 를 브라우저에서 그대로 돌리는 화면입니다.
       서버 계산이 실제로 도는 자리라, 서버를 고쳤을 때 여기서 걸립니다. */
    {
      const { ctx, page, calls, errors } = await open({ linked: false, query: '?demo' });
      await page.waitForTimeout(1500);
      const n = await page.$$eval('#login-num option', o => o.filter(x => x.value).length);
      add('미리보기: 첫 화면에 학생 목록이 뜬다', n > 0, n + '명');
      add('미리보기: 연결 안내가 뜨지 않는다', !(await page.$('#ce-setup')));
      add('미리보기: 바깥 서버로 나가지 않는다', calls.length === 0, calls.length + '건');
      await page.click('#login-screen .dw-help-btn');
      add('미리보기: 사용 안내가 열린다', await shown(page, '#dw-help .dw-help-box'));
      add('미리보기: 안에서는 미리보기 링크를 숨긴다', !(await page.$('#dw-help .dw-help-demo')));
      await page.keyboard.press('Escape');
      add('미리보기: 오류 없음', errors.length === 0, errors[0]);
      await ctx.close();
    }
    {
      const { ctx, page, errors } = await open({ linked: false, query: '?demo=teacher' });
      await page.waitForTimeout(3000);
      add('미리보기(교사): 화면이 열린다',
          await page.evaluate(() => document.getElementById('admin-screen').classList.contains('show')));
      const tiles = await page.$$eval('#dash-stats .stat', e => e.length);
      add('미리보기(교사): 지표 타일 6개', tiles === 6, tiles + '개');
      const rows = await page.$$eval('#dash-table tr, #page-dashboard tbody tr', r => r.length);
      add('미리보기(교사): 학생이 표에 나온다', rows > 0, rows + '줄');

      // 서버 계산이 실제로 도는지 — 보너스 100원을 주면 금고가 100원 줄고
      // 그 학생 잔액이 100원 늘어야 한다. (미리보기의 급여는 이미 지급된 상태다)
      const digits = t => Number(String(t).replace(/[^\d]/g, ''));
      const before = digits(await page.textContent('#dash-stats .stat.featured .stat-value'));
      const who = await page.evaluate(() => ({ num: S.students[0].num, bal: S.students[0].balance }));
      await page.evaluate(() => openBonusModal());
      await page.waitForTimeout(500);
      await page.evaluate(n => { for (const k in BON.picked) BON.picked[k] = false; BON.picked[n] = true; }, who.num);
      await page.fill('#bonus-amount', '100');
      await page.fill('#bonus-reason', '검사');
      await page.evaluate(() => doPayBonus());
      await page.waitForTimeout(1800);
      await page.evaluate(() => showPage('dashboard'));
      await page.waitForTimeout(500);
      const after = digits(await page.textContent('#dash-stats .stat.featured .stat-value'));
      const balAfter = await page.evaluate(n => S.students.find(s => s.num === n).balance, who.num);
      add('미리보기(교사): 보너스 100원 → 금고 100원 감소', before - after === 100, before + ' → ' + after);
      add('미리보기(교사): 보너스 100원 → 학생 잔액 100원 증가', balAfter - who.bal === 100,
          who.bal + ' → ' + balAfter);
      add('미리보기(교사): 예전 판 알림이 뜨지 않는다', !(await shown(page, '#dw-old-line')));
      add('미리보기(교사): 오류 없음', errors.length === 0, errors.slice(0, 2).join(' / '));
      await ctx.close();
    }
    {
      const { ctx, page, errors } = await open({ linked: false, query: '?demo=student' });
      await page.waitForTimeout(3000);
      add('미리보기(학생): 화면이 열린다', await shown(page, '#student-screen'));
      const nm = (await page.textContent('#st-name')).trim();
      add('미리보기(학생): 이름이 채워진다', nm.length > 0, nm);
      add('미리보기(학생): 오류 없음', errors.length === 0, errors.slice(0, 2).join(' / '));
      await ctx.close();
    }
  } finally {
    await browser.close();
    srv.close();
  }
  return out;
}
