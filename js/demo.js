/* ──────────────────────────────────────────────────────────────
   돈워리! — 미리보기 (주소 끝에 ?demo)

   학교 스프레드시트 없이 화면을 둘러볼 수 있게 합니다.
   서버 코드(gas/Code.gs)를 그대로 브라우저에서 돌리고,
   스프레드시트 대신 메모리 속 가짜 표를 씁니다.
   이름은 모두 지어낸 것이고, 바꾼 내용은 새로고침하면 사라집니다.
   ────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── 가짜 스프레드시트 ─────────────────────────────────────── */
  function Sheet(name) { this.name = name; this.rows = []; }
  Sheet.prototype.getName = function () { return this.name; };
  Sheet.prototype._trim = function () {
    var r = this.rows;
    while (r.length && r[r.length - 1].every(function (v) { return v === '' || v === null || v === undefined; })) r.pop();
  };
  Sheet.prototype.getLastRow = function () { this._trim(); return this.rows.length; };
  Sheet.prototype.getLastColumn = function () {
    var w = 0;
    this.rows.forEach(function (r) {
      for (var i = r.length - 1; i >= 0; i--) { if (r[i] !== '' && r[i] !== null && r[i] !== undefined) { if (i + 1 > w) w = i + 1; break; } }
    });
    return w;
  };
  Sheet.prototype._cell = function (r, c) {
    var row = this.rows[r - 1];
    if (!row) return '';
    var v = row[c - 1];
    return v === undefined || v === null ? '' : v;
  };
  Sheet.prototype._put = function (r, c, v) {
    while (this.rows.length < r) this.rows.push([]);
    var row = this.rows[r - 1];
    while (row.length < c) row.push('');
    row[c - 1] = v;
  };
  Sheet.prototype.getRange = function (row, col, nr, nc) {
    return new Range(this, row, col, nr || 1, nc || 1);
  };
  Sheet.prototype.appendRow = function (arr) {
    this._trim();
    this.rows.push(arr.slice());
    return this;
  };
  Sheet.prototype.deleteRow = function (r) { this.rows.splice(r - 1, 1); return this; };
  Sheet.prototype.deleteRows = function (r, n) { this.rows.splice(r - 1, n); return this; };
  Sheet.prototype.setFrozenRows = function () { return this; };

  function Range(sh, r, c, nr, nc) { this.sh = sh; this.r = r; this.c = c; this.nr = nr; this.nc = nc; }
  Range.prototype.getValues = function () {
    var out = [];
    for (var i = 0; i < this.nr; i++) {
      var row = [];
      for (var j = 0; j < this.nc; j++) row.push(this.sh._cell(this.r + i, this.c + j));
      out.push(row);
    }
    return out;
  };
  Range.prototype.getValue = function () { return this.sh._cell(this.r, this.c); };
  Range.prototype.setValue = function (v) { this.sh._put(this.r, this.c, v); return this; };
  Range.prototype.setValues = function (vals) {
    for (var i = 0; i < vals.length; i++)
      for (var j = 0; j < vals[i].length; j++) this.sh._put(this.r + i, this.c + j, vals[i][j]);
    return this;
  };
  ['setFontWeight', 'setBackground', 'setFontColor', 'setNumberFormat'].forEach(function (k) {
    Range.prototype[k] = function () { return this; };
  });

  var book = {
    sheets: {},
    getSheetByName: function (n) { return this.sheets[n] || null; },
    insertSheet: function (n) { var s = new Sheet(n); this.sheets[n] = s; return s; },
    getSheets: function () { var s = this.sheets; return Object.keys(s).map(function (k) { return s[k]; }); }
  };

  /* ── 시계: 지난 일을 꾸밀 때만 날짜를 앞당깁니다 ────────────── */
  var NOW = null;
  var RealDate = Date;
  function FakeDate() {
    var a = Array.prototype.slice.call(arguments);
    if (!a.length) return new RealDate(NOW !== null ? NOW : RealDate.now());
    return new (Function.prototype.bind.apply(RealDate, [null].concat(a)))();
  }
  FakeDate.prototype = RealDate.prototype;
  FakeDate.now = function () { return NOW !== null ? NOW : RealDate.now(); };
  FakeDate.UTC = RealDate.UTC;
  FakeDate.parse = RealDate.parse;

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  var Utilities = {
    formatDate: function (d, tz, fmt) {
      if (!(d instanceof RealDate)) d = new RealDate(d);
      var y = d.getFullYear(), M = d.getMonth() + 1, D = d.getDate(), h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
      return fmt.replace(/yyyy|MM|dd|HH|mm|ss|M|d/g, function (t) {
        return { yyyy: y, MM: pad(M), dd: pad(D), HH: pad(h), mm: pad(m), ss: pad(s), M: M, d: D }[t];
      });
    }
  };
  var Session = { getScriptTimeZone: function () { return 'Asia/Seoul'; } };
  var SpreadsheetApp = { getActiveSpreadsheet: function () { return book; } };
  var trig = { timeBased: function () { return trig; }, atHour: function () { return trig; }, nearMinute: function () { return trig; }, everyDays: function () { return trig; }, create: function () { return trig; } };
  var ScriptApp = { getProjectTriggers: function () { return []; }, deleteTrigger: function () {}, newTrigger: function () { return trig; } };
  var ContentService = { createTextOutput: function (t) { return { setMimeType: function () { return t; } }; }, MimeType: { JSON: 'json' } };
  var HtmlService = { createHtmlOutput: function () { return {}; }, XFrameOptionsMode: {} };

  /* ── 서버 코드 불러와서 돌리기 ─────────────────────────────── */
  var G = null;
  function boot() {
    return fetch('gas/Code.gs?v=' + (window.CE_VERSION || ''), { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('미리보기 파일을 받지 못했어요.'); return r.text(); })
      .then(function (src) {
        var f = new Function('SpreadsheetApp', 'Utilities', 'Session', 'ScriptApp', 'ContentService', 'HtmlService', 'Date',
          src + '\n;return {table:_apiTable(), ensureInit:ensureInit, pw:_getStoredPw, saveStudent:saveStudent, assignJob:assignJob,' +
          'saveJob:saveJob, paySelectedSalaries:paySelectedSalaries, applyTax:applyTax, processBuy:processBuy, payBonus:payBonus,' +
          'createSaving:createSaving, approveSaving:approveSaving, processMatureSavings:processMatureSavings, treasuryDeposit:treasuryDeposit,' +
          'submitSuggestion:submitSuggestion, replySuggestion:replySuggestion, saveItem:saveItem, getItems:getItems, getSheet:getSheet,' +
          'SHEET_NAMES:SHEET_NAMES, getSavings:function(){return sheetToArray(SHEET_NAMES.SAVINGS);}};');
        G = f(SpreadsheetApp, Utilities, Session, ScriptApp, ContentService, HtmlService, FakeDate);
        G.ensureInit();
        seed();
      });
  }

  /* ── 지어낸 우리 반 ───────────────────────────────────────── */
  var NAMES = ['강하늘', '김도윤', '김서아', '나은호', '문지안', '박하준', '배서윤', '서이안', '손예린', '안시우',
               '양지호', '오유나', '윤도현', '이채원', '임하율', '장민준', '정다인', '조은우', '최아린', '한지성'];
  var JOBS = { 1: '반장', 2: '은행직원', 3: '환경부장', 4: '상점지기', 5: '학습부장', 6: '도서부장', 7: '부반장',
               8: '은행직원', 9: '급식도우미', 10: '환경부장', 11: '학습부장', 12: '체육부장', 13: '도서부장', 14: '급식도우미',
               15: '체육부장', 16: '우체부', 17: '급식도우미', 18: '정리왕', 19: '정리왕', 20: '우체부' };

  function seed() {
    var DAY = 86400000;
    var today = new RealDate(); today.setHours(9, 0, 0, 0);
    function when(ago, hour) { var d = new RealDate(today.getTime() - ago * DAY); d.setHours(hour, 30, 0, 0); return d; }
    function mon(d) { return d.getMonth() + 1; }
    function half(d) { return d.getDate() <= 15 ? 1 : 2; }
    var nums = []; for (var i = 1; i <= 20; i++) nums.push(i);
    var ev = [];
    function on(ago, hour, fn) { ev.push({ t: when(ago, hour).getTime(), fn: fn }); }

    // 학급 만들기
    on(42, 8, function (d) {
      G.treasuryDeposit({ type: '기타수입', detail: '학급 운영비 (선생님)', amount: 80000, month: mon(d) });
      nums.forEach(function (n) { G.saveStudent({ editIdx: -1, num: n, name: NAMES[n - 1], balance: 3000 }); });
      [['체육부장', 1500, 2, '체육 시간 준비물·줄 서기'], ['급식도우미', 1000, 3, '배식 돕기와 정리'],
       ['우체부', 1000, 2, '가정통신문 나눠 주기'], ['정리왕', 1000, 2, '사물함·책상 정리 점검']]
        .forEach(function (j) { G.saveJob({ editIdx: -1, name: j[0], salary: j[1], slots: j[2], desc: j[3] }); });
      nums.forEach(function (n) { G.assignJob(n, JOBS[n]); });
      [['연필 세트', 800, 12, '연필 3자루', '문구'], ['짝 바꾸기권', 4000, 3, '다음 자리 바꾸기 때 짝 고르기', '특권']]
        .forEach(function (it) { G.saveItem({ editIdx: -1, name: it[0], price: it[1], stock: it[2], desc: it[3], category: it[4] }); });
    });
    on(22, 8, function (d) { G.treasuryDeposit({ type: '기타수입', detail: '학급 바자회 수익', amount: 30000, month: mon(d) }); });

    // 급여 · 세금 (지난 회차들)
    [36, 21, 6].forEach(function (ago) {
      var pd = when(ago, 13);
      on(ago, 13, function () { G.paySelectedSalaries(mon(pd), half(pd), nums.map(String)); });
      on(ago - 1, 9, function () { G.applyTax({ mode: 'percent', amount: 5, type: '소득세', memo: '', month: mon(pd) }); });
    });

    // 상점에서 산 것들
    function idx(name) { var items = G.getItems(); for (var k = 0; k < items.length; k++) if (items[k].name === name) return k; return 0; }
    [[34, 3, '간식 쿠폰', 1], [33, 7, '칭찬 스티커', 2], [31, 12, '음료 쿠폰', 1], [30, 1, '자리 선택권', 1],
     [27, 15, '연필 세트', 1], [26, 9, '간식 쿠폰', 2], [20, 18, '음료 쿠폰', 1], [19, 5, '숙제 면제권', 1],
     [17, 11, '칭찬 스티커', 3], [15, 20, '간식 쿠폰', 1], [12, 6, '짝 바꾸기권', 1], [10, 14, '음료 쿠폰', 2],
     [8, 2, '연필 세트', 1], [5, 16, '간식 쿠폰', 1], [4, 4, '음료 쿠폰', 1], [3, 19, '칭찬 스티커', 1], [1, 10, '자리 선택권', 1]]
      .forEach(function (b) { on(b[0], 12, function (d) { G.processBuy({ studentNum: b[1], itemIdx: idx(b[2]), qty: b[3], month: mon(d) }); }); });

    // 보너스
    on(24, 14, function (d) { G.payBonus({ studentNums: ['4', '9', '13'], amount: 1000, reason: '수학 단원평가 만점', month: mon(d) }); });
    on(9, 14, function (d) { G.payBonus({ studentNums: ['1', '6', '11', '15', '17'], amount: 500, reason: '교실 대청소 자원봉사', month: mon(d) }); });

    // 적금 (은행직원 2번이 받고 선생님이 승인)
    function saving(ago, dep, amt, days, approve) {
      on(ago, 11, function () {
        var r = G.createSaving({ bankStaffNum: 2, depositorNum: dep, principal: amt, rate: days === 15 ? 5 : 10, days: days });
        if (r && r.ok && approve) G.approveSaving(G.getSavings().length - 1);
      });
    }
    saving(30, 7, 3000, 15, true);
    saving(25, 13, 4000, 30, true);
    saving(16, 1, 2000, 15, true);
    saving(11, 9, 5000, 30, true);
    saving(4, 15, 2000, 15, true);
    on(14, 9, function () { G.processMatureSavings(); });
    on(0, 8, function () { G.processMatureSavings(); });
    saving(0, 20, 1500, 15, false);   // 선생님 승인을 기다리는 적금

    // 건의함
    on(13, 15, function () { G.submitSuggestion({ studentNum: 11, category: '상점 물품', title: '상점에 지우개도 팔아 주세요', body: '연필 세트는 있는데 지우개가 없어요.', reason: '지우개를 자주 잃어버려서요' }); });
    on(7, 15, function () { G.submitSuggestion({ studentNum: 6, category: '직업 · 급여', title: '급식도우미 월급을 올려 주세요', body: '급식도우미는 매일 일하는데 월급이 적은 것 같아요.', reason: '다른 직업보다 일이 많아요' }); });
    on(6, 16, function () { G.replySuggestion(0, '반영', '다음 주부터 지우개(500원)를 들여놓을게요.'); });
    on(2, 15, function () { G.submitSuggestion({ studentNum: 18, category: '불편한 점', title: '금요일 상점 시간을 늘려 주세요', body: '줄이 길어서 못 사는 친구가 있어요.', reason: '' }); });
    on(1, 16, function () { G.replySuggestion(1, '검토중', '학급 회의 안건으로 올려 볼게요.'); });

    ev.sort(function (a, b) { return a.t - b.t; });
    ev.forEach(function (e) { NOW = e.t; try { e.fn(new RealDate(e.t)); } catch (err) { if (window.console) console.warn('미리보기 준비', err); } });
    NOW = null;
  }

  /* ── 화면이 부르는 자리 ───────────────────────────────────── */
  var ready = null;
  window.CE_demoCall = function (fn, args) {
    if (!ready) ready = boot();
    return ready.then(function () {
      return new Promise(function (res, rej) {
        setTimeout(function () {
          try {
            var t = G.table;
            if (fn === 'verifyAdminLogin') return res({ ok: true, isDefault: false });
            if (fn === 'verifyStudentLogin') return res(JSON.parse(JSON.stringify(t.verifyStudentLogin(args[0], G.pw(args[0])))));
            if (!Object.prototype.hasOwnProperty.call(t, fn)) throw new Error('허용되지 않은 요청입니다: ' + fn);
            var out = t[fn].apply(null, args || []);
            res(out === undefined ? null : JSON.parse(JSON.stringify(out)));
          } catch (e) { rej(e); }
        }, 120);
      });
    });
  };
})();
