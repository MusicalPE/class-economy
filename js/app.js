/* 돈워리! 로고 — 칠판 안의 웃는 동전.
   아이콘(assets/icon.svg)에서 네이비 바탕만 뺀 모양입니다.
   어두운 배경 위에 얹히므로 바탕 없이 그립니다. */
var DW_MARK =
  '<svg viewBox="36 86 440 342" xmlns="http://www.w3.org/2000/svg" aria-label="돈워리!">' +
  '<rect x="46" y="96" width="420" height="288" rx="22" fill="#2F5D4E" stroke="#E9C27E" stroke-width="20"/>' +
  '<rect x="112" y="392" width="288" height="26" rx="13" fill="#E9C27E"/>' +
  '<rect x="146" y="398" width="48" height="14" rx="7" fill="#FFFFFF"/>' +
  '<circle cx="256" cy="240" r="100" fill="#F6C457"/>' +
  '<circle cx="256" cy="240" r="100" fill="none" stroke="#D08C1C" stroke-width="16"/>' +
  '<circle cx="256" cy="240" r="75" fill="none" stroke="#D08C1C" stroke-width="9" opacity=".45"/>' +
  '<circle cx="227" cy="222" r="11" fill="#1B3B30"/>' +
  '<circle cx="285" cy="222" r="11" fill="#1B3B30"/>' +
  '<path d="M220 266c10 23 27 35 36 35s26-12 36-35" fill="none" stroke="#1B3B30"' +
  ' stroke-width="15" stroke-linecap="round"/>' +
  '</svg>';

/* 화면 설정의 미리보기에 쓰는 작은 판 */
var DW_MARK_SM = DW_MARK.replace('<svg ', '<svg style="width:56px;height:56px;display:block;margin:0 auto 6px" ');

/* 아직 초기 비밀번호(1234)를 쓰고 있을 때 띄우는 알림.
   누구나 들어올 수 있는 상태라 그냥 지나치지 않게 위쪽에 붙여 둡니다. */
function showDefaultPwNotice() {
  if (document.getElementById('dw-pw-notice')) return;

  var bar = document.createElement('div');
  bar.id = 'dw-pw-notice';

  var txt = document.createElement('div');
  txt.className = 'dw-pw-txt';
  txt.innerHTML = '<strong>아직 초기 비밀번호(1234)를 쓰고 있습니다.</strong>' +
                  '<span>주소를 아는 사람은 누구나 관리자로 들어올 수 있습니다. 비밀번호를 바꿔 주세요.</span>';

  var go = document.createElement('button');
  go.className = 'dw-pw-go';
  go.textContent = '바꾸러 가기';
  go.onclick = function () {
    try { showPage('passwords'); } catch (e) {}
    bar.remove();
  };

  var later = document.createElement('button');
  later.className = 'dw-pw-later';
  later.textContent = '나중에';
  later.onclick = function () { bar.remove(); };

  bar.appendChild(txt);
  bar.appendChild(go);
  bar.appendChild(later);
  document.body.appendChild(bar);
}

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var S = {
  month: 5,
  role: null,
  loggedInStudent: null,
  students: [],
  jobs: [],
  assignments: [],
  salaryCfg: [],
  items: [],
  shopPerms: [],
  ledger: [],
  pendingCount: 0,
  pendingSavingsCount: 0,
  shopkeeper: null,
  pwList: [],
  pwRequests: [],
  bankPerms: [],
  bankSettings: {
    rate15: 5,
    rate30: 10
  },
  bankStaff: null,
  loginSettings: {},
  roleLocked: null
};
var chartBar = null,
    chartTrend = null,
  chartInOut = null;
var JOB_PAL = ['#1a56db', '#0e9f6e', '#d97706', '#e3342f', '#7c3aed', '#0891b2', '#be185d', '#65a30d'];
var fmt = function fmt(n) {
  return Number(n).toLocaleString('ko-KR') + '원';
};
function loading(show) {
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '처리 중...';
  document.getElementById('loading').classList.toggle('show', show);
  document.getElementById('loading-text').textContent = text;
}
function showMsg(id, text) {
  var ok = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var el = document.getElementById(id);
  el.className = 'msg-box ' + (ok ? 'msg-ok' : 'msg-err');
  el.textContent = (ok ? '✓ ' : '⚠ ') + text;
  el.style.display = 'block';
  setTimeout(function () {
    return el.style.display = 'none';
  }, 4500);
}
function openModal(id) {
  document.getElementById(id).classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}
document.querySelectorAll('.modal-bg').forEach(function (m) {
  return m.addEventListener('click', function (e) {
    if (e.target === m) m.classList.remove('open');
  });
});
function getJobName(num) {
  var a = S.assignments.find(function (a) {
    return String(a.studentNum) === String(num);
  });
  return a ? a.jobName : null;
}
function assignedCount(jn) {
  return S.assignments.filter(function (a) {
    return a.jobName === jn;
  }).length;
}
function getJobPerms(jn) {
  return S.shopPerms.filter(function (p) {
    return p.jobName === jn;
  });
}
/* call() 은 js/api.js 로 옮겼습니다 (fetch 방식). */
function switchLoginTab(tab) {
  document.querySelectorAll('.login-tab').forEach(function (t, i) {
    return t.classList.toggle('active', tab === 'student' && i === 0 || tab === 'teacher' && i === 1);
  });
  document.getElementById('form-student').classList.toggle('active', tab === 'student');
  document.getElementById('form-teacher').classList.toggle('active', tab === 'teacher');
}
function loadStudentList() {
  return _loadStudentList.apply(this, arguments);
}
function _loadStudentList() {
  _loadStudentList = _asyncToGenerator(_regenerator().m(function _callee() {
    var sel, timer, students, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          sel = document.getElementById('login-num');
          sel.innerHTML = '<option value="">⏳ 학생 목록 불러오는 중...</option>';
          sel.disabled = true;
          timer = setTimeout(function () {
            sel.innerHTML = '<option value="">⚠️ 응답 없음 — 새로고침 해주세요</option>';
            sel.disabled = false;
          }, 20000);
          _context.p = 1;
          _context.n = 2;
          return call('getStudentsForLogin');
        case 2:
          students = _context.v;
          clearTimeout(timer);
          S.students = students || [];
          sel.innerHTML = '<option value="">-- 번호를 선택하세요 --</option>';
          if (S.students.length === 0) {
            sel.innerHTML = '<option value="">등록된 학생 없음 (교사 로그인 후 추가)</option>';
          } else {
            S.students.forEach(function (s) {
              return sel.insertAdjacentHTML('beforeend', "<option value=\"".concat(s.num, "\">").concat(s.num, "\uBC88 ").concat(s.name, "</option>"));
            });
          }
          sel.disabled = false;
          call('getLoginSettings').then(function (s) {
            if (s) applyLoginSettings(s);
          }).catch(function () {});
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          clearTimeout(timer);
          console.error('학생 목록 로드 실패:', _t);
          sel.innerHTML = '<option value="">⚠️ 불러오기 실패 — 새로고침</option>';
          sel.disabled = false;
        case 4:
          return _context.a(2);
      }
    }, _callee, null, [[1, 3]]);
  }));
  return _loadStudentList.apply(this, arguments);
}
function onSelectStudent() {
  var num = document.getElementById('login-num').value;
  var s = S.students.find(function (s) {
    return String(s.num) === String(num);
  });
  document.getElementById('login-name-disp').textContent = s ? s.name : '번호를 선택하면 이름이 표시됩니다';
}
function doStudentLogin() {
  return _doStudentLogin.apply(this, arguments);
}
function _doStudentLogin() {
  _doStudentLogin = _asyncToGenerator(_regenerator().m(function _callee2() {
    var num, pw, msg, res, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          num = document.getElementById('login-num').value, pw = document.getElementById('login-pw').value;
          msg = document.getElementById('student-login-msg');
          msg.style.display = 'none';
          if (num) {
            _context2.n = 1;
            break;
          }
          msg.style.display = 'block';
          msg.textContent = '⚠ 번호를 선택하세요';
          return _context2.a(2);
        case 1:
          if (pw) {
            _context2.n = 2;
            break;
          }
          msg.style.display = 'block';
          msg.textContent = '⚠ 비밀번호를 입력하세요';
          return _context2.a(2);
        case 2:
          loading(true, '로그인 중...');
          _context2.p = 3;
          _context2.n = 4;
          return call('verifyStudentLogin', num, pw);
        case 4:
          res = _context2.v;
          if (res.ok) {
            _context2.n = 5;
            break;
          }
          msg.style.display = 'block';
          msg.textContent = '⚠ ' + res.msg;
          return _context2.a(2);
        case 5:
          S.role = 'student';
          S.loggedInStudent = res.data;
          S.month = nowMonth();
          saveSession('student', {
            studentNum: num
          });
          enterStudentMode();
          _context2.n = 7;
          break;
        case 6:
          _context2.p = 6;
          _t2 = _context2.v;
          msg.style.display = 'block';
          msg.textContent = '⚠ ' + (_t2 && (_t2.message || _t2.toString()) || '알 수 없는 오류');
          try { console.error('학생 로그인 오류:', _t2); } catch (e) {}
        case 7:
          _context2.p = 7;
          loading(false);
          return _context2.f(7);
        case 8:
          return _context2.a(2);
      }
    }, _callee2, null, [[3, 6, 7, 8]]);
  }));
  return _doStudentLogin.apply(this, arguments);
}
function doAdminLogin() {
  return _doAdminLogin.apply(this, arguments);
}
function _doAdminLogin() {
  _doAdminLogin = _asyncToGenerator(_regenerator().m(function _callee3() {
    var pw, msg, res, d, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          pw = document.getElementById('admin-pw').value;
          msg = document.getElementById('teacher-login-msg');
          msg.style.display = 'none';
          if (pw) {
            _context3.n = 1;
            break;
          }
          msg.style.display = 'block';
          msg.textContent = '⚠ 비밀번호를 입력하세요';
          return _context3.a(2);
        case 1:
          loading(true, '로그인 중...');
          _context3.p = 2;
          _context3.n = 3;
          return call('verifyAdminLogin', pw);
        case 3:
          res = _context3.v;
          if (res.ok) {
            if (res.isDefault) { try { setTimeout(showDefaultPwNotice, 400); } catch (e) {} }
            _context3.n = 4;
            break;
          }
          msg.style.display = 'block';
          msg.textContent = '⚠ 비밀번호가 올바르지 않습니다';
          return _context3.a(2);
        case 4:
          S.role = 'teacher';
          _context3.n = 5;
          return call('loadAll');
        case 5:
          d = _context3.v;
          S.students = d.students || [];
          S.jobs = d.jobs || [];
          S.assignments = d.assignments || [];
          S.salaryCfg = d.salaryCfg || [];
          S.items = d.items || [];
          S.shopPerms = d.shopPerms || [];
          S.ledger = d.ledger || [];
          S.pendingCount = d.pendingCount || 0;
          if (d.loginSettings) {
            S.loginSettings = d.loginSettings;
            applyLoginSettings(d.loginSettings);
          }
          S.bankPerms = d.bankPerms || [];
          if (d.bankSettings) S.bankSettings = d.bankSettings;
          S.pendingSavingsCount = d.pendingSavingsCount || 0;
      S.treasuryBalance = d.treasuryBalance || 0;
      S.suggestionCount = d.suggestionCount || 0;
      try { updateSugBadge(); } catch (e) {}
          try { console.log('loadAll 수신:', d && {students:(d.students||[]).length, jobs:(d.jobs||[]).length, items:(d.items||[]).length, ledger:(d.ledger||[]).length}); } catch (e) {}
          updateSavingsBadge();
          saveSession('teacher');
          enterAdminMode();
          _context3.n = 7;
          break;
        case 6:
          _context3.p = 6;
          _t3 = _context3.v;
          msg.style.display = 'block';
          msg.textContent = '⚠ ' + (_t3 && (_t3.message || _t3.toString()) || '알 수 없는 오류');
          try { console.error('교사 로그인 오류:', _t3); } catch (e) {}
        case 7:
          _context3.p = 7;
          loading(false);
          return _context3.f(7);
        case 8:
          return _context3.a(2);
      }
    }, _callee3, null, [[2, 6, 7, 8]]);
  }));
  return _doAdminLogin.apply(this, arguments);
}
function doLogout() {
  if (!confirm('로그아웃 하시겠습니까?')) return;
  clearSession();
  S.role = null;
  S.loggedInStudent = null;
  S.shopkeeper = null;
  document.getElementById('student-screen').style.display = 'none';
  document.getElementById('admin-screen').classList.remove('show');
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('login-pw').value = '';
  document.getElementById('admin-pw').value = '';
  document.getElementById('student-login-msg').style.display = 'none';
  document.getElementById('teacher-login-msg').style.display = 'none';
}
function enterStudentMode() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-screen').classList.remove('show');
  document.getElementById('student-screen').style.display = 'block';
  renderStudentDashboard();
}
function renderStudentDashboard() {
  var d = S.loggedInStudent;
  if (!d) return;
  var s = d.student;
  document.getElementById('st-chip-name').textContent = "".concat(s.num, "\uBC88 ").concat(s.name);
  document.getElementById('st-avatar').textContent = s.name[0];
  document.getElementById('st-name').textContent = s.name;
  document.getElementById('st-job-label').textContent = "".concat(s.num, "\uBC88 \xB7 ") + (d.job ? "\uC9C1\uC5C5: ".concat(d.job.name) : '직업: 미배정');
  document.getElementById('st-balance').textContent = fmt(s.balance);
  var mLedger = d.ledger.filter(function (l) {
    return String(l.month) === String(S.month);
  });
  var inc = mLedger.filter(function (l) {
    return l.amount > 0;
  }).reduce(function (sm, l) {
    return sm + l.amount;
  }, 0);
  var exp = mLedger.filter(function (l) {
    return l.amount < 0;
  }).reduce(function (sm, l) {
    return sm + Math.abs(l.amount);
  }, 0);
  document.getElementById('st-income').textContent = '+' + fmt(inc);
  document.getElementById('st-expense').textContent = '-' + fmt(exp);
  var bm = {
    '급여': 'badge-green',
    '보너스': 'badge-purple',
    '세금': 'badge-red',
    '물품구입': 'badge-yellow',
    '수동조정': 'badge-gray'
  };
  document.getElementById('st-ledger').innerHTML = d.ledger.slice(0, 15).map(function (l) {
    var detailHtml = l.detail;
    var mm = String(l.detail || '').match(/만기\s*(\d{4}-\d{2}-\d{2})/);
    if (!mm && l.type === '적금납입') {
      var cand = null, list = (d.mySavings || []);
      for (var q = 0; q < list.length; q++) {
        if (String(list[q].startDate) === String(l.date) &&
            Number(list[q].principal) === Math.abs(Number(l.amount))) { cand = list[q]; break; }
      }
      if (cand) mm = [null, cand.maturityDate];
    }
    if (mm) {
      var base = String(l.detail).replace(/\s*·\s*만기\s*\d{4}-\d{2}-\d{2}/, '');
      detailHtml = base + '<br><span style="font-size:11px;color:#d97706;font-weight:600">(만기 예정일: ' + mm[1] + ')</span>';
    }
    return "<tr>\n    <td style=\"font-size:12px\">".concat(l.date, "</td>\n    <td><span class=\"badge ").concat(bm[l.type] || 'badge-gray', "\">").concat(l.type, "</span></td>\n    <td style=\"font-size:12px;color:var(--muted)\">").concat(detailHtml, "</td>\n    <td style=\"color:").concat(l.amount > 0 ? 'var(--c2)' : 'var(--cd)', ";font-weight:600\">").concat(l.amount > 0 ? '+' : '').concat(fmt(l.amount), "</td>\n    <td style=\"color:var(--c1)\">").concat(fmt(l.balance), "</td></tr>");
  }).join('') || '<tr><td colspan="5" class="empty">거래 내역이 없습니다</td></tr>';
  var _skb = document.getElementById('st-sk-btn');
  if (_skb) _skb.style.display = 'none';
  var _bkb = document.getElementById('st-bank-btn');
  if (_bkb) _bkb.style.display = 'none';
  try { stLoadRoleData(); } catch (e) { try { console.error('역할 카드 초기화 실패:', e); } catch (x) {} }
  try { initSuggestionForm(); } catch (e) {}
}
function doChangeStudentPw() {
  return _doChangeStudentPw.apply(this, arguments);
}
function _doChangeStudentPw() {
  _doChangeStudentPw = _asyncToGenerator(_regenerator().m(function _callee4() {
    var cur, nw, cf, res;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          cur = document.getElementById('st-cur-pw').value, nw = document.getElementById('st-new-pw').value, cf = document.getElementById('st-confirm-pw').value;
          if (!(!cur || !nw || !cf)) {
            _context4.n = 1;
            break;
          }
          showMsg('st-pw-msg', '모든 항목을 입력하세요', false);
          return _context4.a(2);
        case 1:
          loading(true);
          _context4.p = 2;
          _context4.n = 3;
          return call('changeStudentPwDirect', S.loggedInStudent.student.num, cur, nw, cf);
        case 3:
          res = _context4.v;
          if (res.ok) {
            _context4.n = 4;
            break;
          }
          showMsg('st-pw-msg', res.msg, false);
          return _context4.a(2);
        case 4:
          showMsg('st-pw-msg', '비밀번호가 변경되었습니다!');
          ['st-cur-pw', 'st-new-pw', 'st-confirm-pw'].forEach(function (id) {
            return document.getElementById(id).value = '';
          });
        case 5:
          _context4.p = 5;
          loading(false);
          return _context4.f(5);
        case 6:
          return _context4.a(2);
      }
    }, _callee4, null, [[2,, 5, 6]]);
  }));
  return _doChangeStudentPw.apply(this, arguments);
}
function openSkLoginFromStudent() {
  return _openSkLoginFromStudent.apply(this, arguments);
}
function _openSkLoginFromStudent() {
  _openSkLoginFromStudent = _asyncToGenerator(_regenerator().m(function _callee5() {
    var d, s, types, cats, canFull, canStock, canPrice, data;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          d = S.loggedInStudent;
          if (!(!d || !d.shopPerms || !d.shopPerms.length)) {
            _context5.n = 1;
            break;
          }
          return _context5.a(2);
        case 1:
          s = d.student, types = d.shopPerms.map(function (p) {
            return p.perm;
          }), cats = d.shopPerms.map(function (p) {
            return p.category;
          });
          canFull = types.includes('전체관리'), canStock = canFull || types.includes('재고관리'), canPrice = canFull || types.includes('가격변경');
          S.shopkeeper = {
            studentNum: s.num,
            name: s.name,
            jobName: d.job ? d.job.name : '',
            perms: {
              canSell: true,
              canChangePrice: canPrice,
              canManageStock: canStock,
              canFullManage: canFull,
              allowedCategories: cats.includes('전체') ? ['전체'] : cats
            }
          };
          loading(true, '상점 준비 중...');
          _context5.p = 2;
          _context5.n = 3;
          return call('loadAll');
        case 3:
          data = _context5.v;
          S.students = data.students || [];
          S.jobs = data.jobs || [];
          S.assignments = data.assignments || [];
          S.items = data.items || [];
          S.shopPerms = data.shopPerms || [];
          S.ledger = data.ledger || [];
          S.month = S.month || nowMonth();
          document.getElementById('student-screen').style.display = 'none';
          document.getElementById('admin-screen').classList.add('show');
          lockSidebarForRole('shop');
          document.getElementById('sk-banner').classList.add('show');
          document.getElementById('sk-banner-name').textContent = "".concat(s.name, " (").concat(d.job ? d.job.name : '상점지기', ") \uC0C1\uC810 \uC6B4\uC601 \uC911");
          document.getElementById('sk-banner-perms').textContent = "\uAD8C\uD55C: ".concat(types.join(' · '));
          showPage('sk-store');
        case 4:
          _context5.p = 4;
          loading(false);
          return _context5.f(4);
        case 5:
          return _context5.a(2);
      }
    }, _callee5, null, [[2,, 4, 5]]);
  }));
  return _openSkLoginFromStudent.apply(this, arguments);
}
function enterAdminMode() {
  try { applyCurrentMonth(); } catch (e) {}
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('student-screen').style.display = 'none';
  document.getElementById('admin-screen').classList.add('show');
  updatePwBadge();
  renderDashboard();
}
function updatePwBadge() {}
function showPage(id) {
  var _dashboard$charts$stu, _dashboard$charts$stu2;
  document.querySelectorAll('.page').forEach(function (p) {
    return p.classList.remove('active');
  });
  document.querySelectorAll('.nav-item').forEach(function (n) {
    return n.classList.remove('active');
  });
  document.getElementById('page-' + id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(function (n) {
    var _n$getAttribute;
    if ((_n$getAttribute = n.getAttribute('onclick')) !== null && _n$getAttribute !== void 0 && _n$getAttribute.includes("'".concat(id, "'"))) n.classList.add('active');
  });
  (_dashboard$charts$stu = (_dashboard$charts$stu2 = {
    dashboard: renderDashboard,
    charts: renderCharts,
    students: renderStudents,
    jobs: renderJobs,
    assign: renderAssign,
    salary: renderSalarySettings,
    tax: renderTax,
    shop: renderShop,
    shopperms: renderShopPerms,
    savings: renderSavings,
    passwords: renderPasswords,
    reset: renderReset,
    treasury: renderTreasury,
    suggestions: renderSuggestions,
    ledger: renderLedger,
    settings: renderSettings,
    'sk-store': renderSkStore,
    'bank-mode': renderBankMode
  })[id]) === null || _dashboard$charts$stu === void 0 || (function () {
    try { _dashboard$charts$stu.call(_dashboard$charts$stu2); }
    catch (err) {
      try { console.error('페이지 렌더링 오류 [' + id + ']:', err); } catch (e) {}
      try { alert('화면 표시 중 오류가 발생했습니다.\n' + (err && err.message ? err.message : err)); } catch (e) {}
    }
  })();
}
function onChangeMonth() {
  S.month = parseInt(document.getElementById('curMonth').value);
  renderSalarySettings();
  renderDashboard();
}
function renderDashboard() {
  var total = S.students.reduce(function (s, st) {
      return s + st.balance;
    }, 0),
    mL = S.ledger.filter(function (l) {
      return String(l.month) === String(S.month);
    });
  var salary = mL.filter(function (l) {
      return l.type === '급여';
    }).reduce(function (s, l) {
      return s + l.amount;
    }, 0),
    tax = mL.filter(function (l) {
      return l.type === '세금';
    }).reduce(function (s, l) {
      return s + Math.abs(l.amount);
    }, 0),
    shop = mL.filter(function (l) {
      return l.type === '물품구입';
    }).reduce(function (s, l) {
      return s + Math.abs(l.amount);
    }, 0);
  document.getElementById('dash-stats').innerHTML = "<div class=\"stat\" style=\"border-color:var(--c2);border-width:1.5px\"><div class=\"stat-label\">\uD559\uAE09 \uAE08\uACE0</div><div class=\"stat-value green\">".concat(fmt(S.treasuryBalance || 0), "</div></div><div class=\"stat\"><div class=\"stat-label\">\uCD1D \uC720\uD1B5 \uD654\uD3D0</div><div class=\"stat-value blue\">").concat(fmt(total), "</div></div><div class=\"stat\"><div class=\"stat-label\">").concat(S.month, "\uC6D4 \uAE09\uC5EC</div><div class=\"stat-value green\">").concat(fmt(salary), "</div></div><div class=\"stat\"><div class=\"stat-label\">").concat(S.month, "\uC6D4 \uC138\uAE08</div><div class=\"stat-value red\">").concat(fmt(tax), "</div></div><div class=\"stat\"><div class=\"stat-label\">").concat(S.month, "\uC6D4 \uBB3C\uD488\uC9C0\uCD9C</div><div class=\"stat-value yellow\">").concat(fmt(shop), "</div></div><div class=\"stat\"><div class=\"stat-label\">\uD559\uC0DD \uC218</div><div class=\"stat-value\">").concat(S.students.length, "\uBA85</div></div>");
  document.getElementById('dash-table').innerHTML = S.students.length ? S.students.map(function (s) {
    var jn = getJobName(s.num);
    var inc = mL.filter(function (l) {
        return String(l.studentNum) === String(s.num) && l.amount > 0;
      }).reduce(function (sm, l) {
        return sm + l.amount;
      }, 0),
      exp = mL.filter(function (l) {
        return String(l.studentNum) === String(s.num) && l.amount < 0;
      }).reduce(function (sm, l) {
        return sm + Math.abs(l.amount);
      }, 0);
    return "<tr><td>".concat(s.num, "</td><td><strong>").concat(s.name, "</strong></td><td>").concat(jn ? "<span class=\"badge badge-blue\">".concat(jn, "</span>") : '<span class="badge badge-gray">미배정</span>', "</td><td><strong style=\"color:var(--c1)\">").concat(fmt(s.balance), "</strong></td><td style=\"color:var(--c2)\">+").concat(fmt(inc), "</td><td style=\"color:var(--cd)\">").concat(exp ? '-' + fmt(exp) : '-', "</td></tr>");
  }).join('') : '<tr><td colspan="6" class="empty">학생이 없습니다</td></tr>';
}
function getSortedStudents() {
  var _document$getElementB;
  var m = ((_document$getElementB = document.getElementById('sort-mode')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || 'num';
  return _toConsumableArray(S.students).sort(function (a, b) {
    return m === 'desc' ? b.balance - a.balance : m === 'asc' ? a.balance - b.balance : a.num - b.num;
  });
}
function renderCharts() {
  var _S$students$find, _S$students$find2, _document$getElementB2, _ranked$;
  if (!S.students.length) return;
  var sorted = getSortedStudents(),
    bals = sorted.map(function (s) {
      return s.balance;
    }),
    labels = sorted.map(function (s) {
      return "".concat(s.num, "\uBC88 ").concat(s.name);
    });
  var total = bals.reduce(function (a, b) {
      return a + b;
    }, 0),
    avg = Math.round(total / bals.length),
    max = Math.max.apply(Math, _toConsumableArray(bals)),
    min = Math.min.apply(Math, _toConsumableArray(bals));
  document.getElementById('chart-stats').innerHTML = "<div class=\"stat\"><div class=\"stat-label\">\uD569\uACC4</div><div class=\"stat-value blue\" style=\"font-size:18px\">".concat(fmt(total), "</div></div><div class=\"stat\"><div class=\"stat-label\">\uD3C9\uADE0</div><div class=\"stat-value green\" style=\"font-size:18px\">").concat(fmt(avg), "</div></div><div class=\"stat\"><div class=\"stat-label\">\uCD5C\uACE0 \uC794\uC561</div><div class=\"stat-value yellow\" style=\"font-size:18px\">").concat(fmt(max), "<span style=\"font-size:11px;color:var(--muted);font-weight:400;display:block\">").concat(((_S$students$find = S.students.find(function (s) {
    return s.balance === max;
  })) === null || _S$students$find === void 0 ? void 0 : _S$students$find.name) || '', "</span></div></div><div class=\"stat\"><div class=\"stat-label\">\uCD5C\uC800 \uC794\uC561</div><div class=\"stat-value red\" style=\"font-size:18px\">").concat(fmt(min), "<span style=\"font-size:11px;color:var(--muted);font-weight:400;display:block\">").concat(((_S$students$find2 = S.students.find(function (s) {
    return s.balance === min;
  })) === null || _S$students$find2 === void 0 ? void 0 : _S$students$find2.name) || '', "</span></div></div><div class=\"stat\"><div class=\"stat-label\">\uACA9\uCC28</div><div class=\"stat-value purple\" style=\"font-size:18px\">").concat(fmt(max - min), "</div></div>");
  var cm = ((_document$getElementB2 = document.getElementById('color-mode')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.value) || 'rank',
    ranked = _toConsumableArray(S.students).sort(function (a, b) {
      return b.balance - a.balance;
    });
  var _th = THEMES[S.theme || (S.loginSettings && S.loginSettings.theme) || 'blue'] || THEMES.blue;
  var _pal = themePalette(_th);
  var cols = sorted.map(function (s) {
    if (cm === 'single') return hexAlpha(_th.c1, 0.75);
    if (cm === 'job') {
      var ji = _toConsumableArray(new Set(S.students.map(function (x) {
        return getJobName(x.num) || '미배정';
      }))).indexOf(getJobName(s.num) || '미배정');
      return _pal[ji % _pal.length];
    }
    var ri = ranked.findIndex(function (r) {
      return r.num === s.num;
    });
    return ri === 0 ? _th.c1d : ri === 1 ? _th.c1 : ri === 2 ? _th.g3 : hexAlpha(_th.c1, 0.55);
  });
  sizeChartWrap('chart-bar-wrap', sorted.length, 62);
  if (chartBar) chartBar.destroy();
  chartBar = new Chart(document.getElementById('chart-bar'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '잔액',
        data: bals,
        backgroundColor: cols,
        borderRadius: 6,
        borderSkipped: false
      }, {
        label: '평균',
        type: 'line',
        data: sorted.map(function () {
          return avg;
        }),
        borderColor: '#e3342f',
        borderWidth: 2,
        borderDash: [6, 4],
        pointRadius: 0,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 11
            },
            boxWidth: 12
          }
        },
        tooltip: {
          callbacks: {
            label: function label(ctx) {
              return " ".concat(Number(ctx.raw).toLocaleString(), "\uC6D0");
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function callback(v) {
              return v.toLocaleString() + '원';
            },
            font: {
              size: 11
            }
          },
          grid: {
            color: '#f0f2f7'
          }
        },
        x: {
          ticks: {
            font: {
              size: 11
            },
            autoSkip: false,
            maxRotation: 60,
            minRotation: 0
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
  renderTrendChart();
  renderInOutChart();
}
function renderTrendChart() {
  var _document$getElementB3;
  var type = ((_document$getElementB3 = document.getElementById('trend-type')) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.value) || 'all',
    months = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
  var ds = [];
  if (type === 'all') {
    var cols = {
      급여: {
        bg: 'rgba(14,159,110,.6)',
        bc: '#0e9f6e'
      },
      세금: {
        bg: 'rgba(227,52,47,.6)',
        bc: '#e3342f'
      },
      물품구입: {
        bg: 'rgba(217,119,6,.6)',
        bc: '#d97706'
      }
    };
    ['급여', '세금', '물품구입'].forEach(function (t) {
      return ds.push({
        label: t,
        data: months.map(function (m) {
          return S.ledger.filter(function (l) {
            return String(l.month) === String(m) && l.type === t;
          }).reduce(function (s, l) {
            return s + Math.abs(l.amount);
          }, 0);
        }),
        backgroundColor: cols[t].bg,
        borderColor: cols[t].bc,
        borderWidth: 2,
        fill: false,
        tension: .3,
        pointRadius: 4
      });
    });
  } else ds.push({
    label: type,
    data: months.map(function (m) {
      return S.ledger.filter(function (l) {
        return String(l.month) === String(m) && l.type === type;
      }).reduce(function (s, l) {
        return s + Math.abs(l.amount);
      }, 0);
    }),
    backgroundColor: hexAlpha(curTheme().c1, 0.15),
    borderColor: curTheme().c1,
    borderWidth: 2,
    fill: true,
    tension: .3,
    pointRadius: 4
  });
  if (chartTrend) chartTrend.destroy();
  chartTrend = new Chart(document.getElementById('chart-trend'), {
    type: 'line',
    data: {
      labels: months.map(function (m) {
        return m + '월';
      }),
      datasets: ds
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 11
            },
            boxWidth: 12
          }
        },
        tooltip: {
          callbacks: {
            label: function label(ctx) {
              return " ".concat(Number(ctx.raw).toLocaleString(), "\uC6D0");
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function callback(v) {
              return v.toLocaleString() + '원';
            },
            font: {
              size: 11
            }
          },
          grid: {
            color: '#f0f2f7'
          }
        },
        x: {
          ticks: {
            font: {
              size: 11
            },
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}
function renderInOutChart() {
  var mL = S.ledger.filter(function (l) {
      return String(l.month) === String(S.month);
    }),
    sorted = getSortedStudents();
  sizeChartWrap('chart-inout-wrap', sorted.length, 78);
  if (chartInOut) chartInOut.destroy();
  chartInOut = new Chart(document.getElementById('chart-inout'), {
    type: 'bar',
    data: {
      labels: sorted.map(function (s) {
        return "".concat(s.num, "\uBC88 ").concat(s.name);
      }),
      datasets: [{
        label: '수입',
        data: sorted.map(function (s) {
          return mL.filter(function (l) {
            return String(l.studentNum) === String(s.num) && l.amount > 0;
          }).reduce(function (sm, l) {
            return sm + l.amount;
          }, 0);
        }),
        backgroundColor: 'rgba(14,159,110,.7)',
        borderRadius: 4
      }, {
        label: '지출',
        data: sorted.map(function (s) {
          return mL.filter(function (l) {
            return String(l.studentNum) === String(s.num) && l.amount < 0;
          }).reduce(function (sm, l) {
            return sm + Math.abs(l.amount);
          }, 0);
        }),
        backgroundColor: 'rgba(227,52,47,.7)',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 11
            },
            boxWidth: 12
          }
        },
        tooltip: {
          callbacks: {
            label: function label(ctx) {
              return " ".concat(Number(ctx.raw).toLocaleString(), "\uC6D0");
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function callback(v) {
              return v.toLocaleString() + '원';
            },
            font: {
              size: 11
            }
          },
          grid: {
            color: '#f0f2f7'
          }
        },
        x: {
          ticks: {
            font: {
              size: 11
            },
            autoSkip: false,
            maxRotation: 60,
            minRotation: 0
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}
function renderStudents() {
  document.getElementById('student-empty').style.display = S.students.length ? 'none' : 'block';
  document.getElementById('student-table').innerHTML = S.students.map(function (s, i) {
    var jn = getJobName(s.num);
    return "<tr><td>".concat(s.num, "</td><td><strong>").concat(s.name, "</strong></td><td>").concat(jn ? "<span class=\"badge badge-blue\">".concat(jn, "</span>") : '<span class="badge badge-gray">미배정</span>', "</td><td style=\"color:var(--c1);font-weight:600\">").concat(fmt(s.initial !== undefined ? s.initial : s.balance), "</td><td style=\"color:var(--c1);font-weight:600\">").concat(fmt(s.balance), "</td><td><div class=\"row-btns\"><button class=\"btn btn-sm\" onclick=\"openStudentModal(").concat(i, ")\"><i class=\"ti ti-edit\"></i></button><button class=\"btn btn-sm\" onclick=\"openBalanceModal(").concat(i, ")\"><i class=\"ti ti-coins\"></i></button><button class=\"btn btn-sm btn-danger\" onclick=\"doDeleteStudent(").concat(i, ")\"><i class=\"ti ti-trash\"></i></button></div></td></tr>");
  }).join('') || '<tr><td colspan="6" class="empty">없음</td></tr>';
}
function openStudentModal(i) {
  document.getElementById('s-modal-title').textContent = i === -1 ? '학생 추가' : '학생 수정';
  document.getElementById('s-idx').value = i;
  var s = i === -1 ? {
    num: '',
    name: '',
    balance: 0,
    initial: 0
  } : S.students[i];
  document.getElementById('s-num').value = s.num;
  document.getElementById('s-name').value = s.name;
  document.getElementById('s-balance').value = (s.initial !== undefined && s.initial !== null) ? s.initial : s.balance;
  openModal('modal-student');
}
function doSaveStudent() {
  return _doSaveStudent.apply(this, arguments);
}
function _doSaveStudent() {
  _doSaveStudent = _asyncToGenerator(_regenerator().m(function _callee6() {
    var num, name, bal, idx;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          num = parseInt(document.getElementById('s-num').value) || 0, name = document.getElementById('s-name').value.trim(), bal = parseInt(document.getElementById('s-balance').value) || 0, idx = parseInt(document.getElementById('s-idx').value);
          if (name) {
            _context6.n = 1;
            break;
          }
          alert('이름 입력');
          return _context6.a(2);
        case 1:
          loading(true);
          _context6.p = 2;
          _context6.n = 3;
          return call('saveStudent', {
            num: num,
            name: name,
            balance: bal,
            editIdx: idx
          });
        case 3:
          var _res6 = _context6.v;
          var _newBal = (_res6 && typeof _res6.balance === 'number') ? _res6.balance : bal;
          if (idx === -1) S.students.push({
            num: num,
            name: name,
            balance: _newBal,
            initial: bal
          });else {
            S.students[idx].num = num;
            S.students[idx].name = name;
            S.students[idx].initial = bal;
            S.students[idx].balance = _newBal;
          }
          closeModal('modal-student');
          renderStudents();
          renderDashboard();
        case 4:
          _context6.p = 4;
          loading(false);
          return _context6.f(4);
        case 5:
          return _context6.a(2);
      }
    }, _callee6, null, [[2,, 4, 5]]);
  }));
  return _doSaveStudent.apply(this, arguments);
}
function doDeleteStudent(_x) {
  return _doDeleteStudent.apply(this, arguments);
}
function _doDeleteStudent() {
  _doDeleteStudent = _asyncToGenerator(_regenerator().m(function _callee7(i) {
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          if (confirm("".concat(S.students[i].name, " \uC0AD\uC81C?"))) {
            _context7.n = 1;
            break;
          }
          return _context7.a(2);
        case 1:
          loading(true);
          _context7.p = 2;
          _context7.n = 3;
          return call('deleteStudent', i);
        case 3:
          S.students.splice(i, 1);
          renderStudents();
          renderDashboard();
        case 4:
          _context7.p = 4;
          loading(false);
          return _context7.f(4);
        case 5:
          return _context7.a(2);
      }
    }, _callee7, null, [[2,, 4, 5]]);
  }));
  return _doDeleteStudent.apply(this, arguments);
}
function openBalanceModal(i) {
  var s = S.students[i];
  document.getElementById('bal-info').textContent = "".concat(s.name, " \uD604\uC7AC: ").concat(fmt(s.balance));
  document.getElementById('bal-idx').value = i;
  document.getElementById('bal-amount').value = '';
  document.getElementById('bal-memo').value = '';
  openModal('modal-balance');
}
function doAdjustBalance() {
  return _doAdjustBalance.apply(this, arguments);
}
function _doAdjustBalance() {
  _doAdjustBalance = _asyncToGenerator(_regenerator().m(function _callee8() {
    var i, amt, memo, res;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          i = parseInt(document.getElementById('bal-idx').value), amt = parseInt(document.getElementById('bal-amount').value) || 0, memo = document.getElementById('bal-memo').value;
          if (amt) {
            _context8.n = 1;
            break;
          }
          alert('금액 입력');
          return _context8.a(2);
        case 1:
          loading(true);
          _context8.p = 2;
          _context8.n = 3;
          return call('adjustBalance', i, amt, memo);
        case 3:
          res = _context8.v;
          S.students[i].balance = res.balance;
          closeModal('modal-balance');
          _context8.n = 4;
          return loadLedger();
        case 4:
          renderStudents();
          renderDashboard();
        case 5:
          _context8.p = 5;
          loading(false);
          return _context8.f(5);
        case 6:
          return _context8.a(2);
      }
    }, _callee8, null, [[2,, 5, 6]]);
  }));
  return _doAdjustBalance.apply(this, arguments);
}
function renderJobs() {
  document.getElementById('job-table').innerHTML = S.jobs.map(function (j, i) {
    var cur = assignedCount(j.name),
      pct = j.slots >= 99 ? 0 : Math.min(100, Math.round(cur / j.slots * 100)),
      perms = getJobPerms(j.name);
    return "<tr><td><strong>".concat(j.name, "</strong></td><td style=\"color:var(--c2);font-weight:600\">").concat(fmt(j.salary), "</td><td><div class=\"slot-ctrl\"><button class=\"btn btn-sm\" onclick=\"doUpdateSlot(").concat(i, ",-1)\">\u2212</button><span>").concat(j.slots >= 99 ? '∞' : j.slots, "</span><button class=\"btn btn-sm\" onclick=\"doUpdateSlot(").concat(i, ",1)\">+</button></div></td><td>").concat(cur, "\uBA85").concat(j.slots < 99 ? "<div class=\"progress-bar\"><div class=\"progress-fill\" style=\"width:".concat(pct, "%;background:").concat(pct >= 100 ? 'var(--cd)' : 'var(--c1)', "\"></div></div>") : '', "</td><td><div class=\"perm-chips\">").concat(perms.length ? perms.map(function (p) {
      return "<span class=\"perm-chip ".concat(p.perm, "\">").concat(p.perm, "</span>");
    }).join('') : '<span style="font-size:11px;color:var(--muted)">없음</span>', "</div></td><td style=\"font-size:12px;color:var(--muted)\">").concat(j.desc || '-', "</td><td><div class=\"row-btns\"><button class=\"btn btn-sm\" onclick=\"openJobModal(").concat(i, ")\"><i class=\"ti ti-edit\"></i></button><button class=\"btn btn-sm btn-danger\" onclick=\"doDeleteJob(").concat(i, ")\"><i class=\"ti ti-trash\"></i></button></div></td></tr>");
  }).join('') || '<tr><td colspan="7" class="empty">없음</td></tr>';
}
function openJobModal(i) {
  document.getElementById('j-modal-title').textContent = i === -1 ? '직업 추가' : '직업 수정';
  document.getElementById('j-idx').value = i;
  var j = i === -1 ? {
    name: '',
    salary: '',
    slots: 1,
    desc: ''
  } : S.jobs[i];
  document.getElementById('j-name').value = j.name;
  document.getElementById('j-salary').value = j.salary;
  slotTemp = j.slots;
  document.getElementById('j-slots').value = slotTemp;
  document.getElementById('j-slots-disp').textContent = slotTemp >= 99 ? '∞' : slotTemp;
  document.getElementById('j-desc').value = j.desc || '';
  openModal('modal-job');
}
var slotTemp = 1;
function changeSlot(d) {
  slotTemp = Math.max(1, Math.min(99, slotTemp + d));
  document.getElementById('j-slots').value = slotTemp;
  document.getElementById('j-slots-disp').textContent = slotTemp >= 99 ? '∞' : slotTemp;
}
function doSaveJob() {
  return _doSaveJob.apply(this, arguments);
}
function _doSaveJob() {
  _doSaveJob = _asyncToGenerator(_regenerator().m(function _callee9() {
    var name, salary, slots, desc, idx;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          name = document.getElementById('j-name').value.trim(), salary = parseInt(document.getElementById('j-salary').value) || 0, slots = parseInt(document.getElementById('j-slots').value) || 1, desc = document.getElementById('j-desc').value.trim(), idx = parseInt(document.getElementById('j-idx').value);
          if (name) {
            _context9.n = 1;
            break;
          }
          alert('직업명 입력');
          return _context9.a(2);
        case 1:
          loading(true);
          _context9.p = 2;
          _context9.n = 3;
          return call('saveJob', {
            name: name,
            salary: salary,
            slots: slots,
            desc: desc,
            editIdx: idx
          });
        case 3:
          if (idx === -1) S.jobs.push({
            name: name,
            salary: salary,
            slots: slots,
            desc: desc
          });else S.jobs[idx] = {
            name: name,
            salary: salary,
            slots: slots,
            desc: desc
          };
          closeModal('modal-job');
          renderJobs();
        case 4:
          _context9.p = 4;
          loading(false);
          return _context9.f(4);
        case 5:
          return _context9.a(2);
      }
    }, _callee9, null, [[2,, 4, 5]]);
  }));
  return _doSaveJob.apply(this, arguments);
}
function doDeleteJob(_x2) {
  return _doDeleteJob.apply(this, arguments);
}
function _doDeleteJob() {
  _doDeleteJob = _asyncToGenerator(_regenerator().m(function _callee0(i) {
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          if (confirm('삭제?')) {
            _context0.n = 1;
            break;
          }
          return _context0.a(2);
        case 1:
          loading(true);
          _context0.p = 2;
          _context0.n = 3;
          return call('deleteJob', i);
        case 3:
          S.jobs.splice(i, 1);
          renderJobs();
        case 4:
          _context0.p = 4;
          loading(false);
          return _context0.f(4);
        case 5:
          return _context0.a(2);
      }
    }, _callee0, null, [[2,, 4, 5]]);
  }));
  return _doDeleteJob.apply(this, arguments);
}
function doUpdateSlot(_x3, _x4) {
  return _doUpdateSlot.apply(this, arguments);
}
function _doUpdateSlot() {
  _doUpdateSlot = _asyncToGenerator(_regenerator().m(function _callee1(i, d) {
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          loading(true);
          _context1.p = 1;
          _context1.n = 2;
          return call('updateJobSlot', i, d);
        case 2:
          S.jobs[i].slots = Math.max(1, Math.min(99, S.jobs[i].slots + d));
          renderJobs();
        case 3:
          _context1.p = 3;
          loading(false);
          return _context1.f(3);
        case 4:
          return _context1.a(2);
      }
    }, _callee1, null, [[1,, 3, 4]]);
  }));
  return _doUpdateSlot.apply(this, arguments);
}
function renderAssign() {
  document.getElementById('assign-student').innerHTML = S.students.map(function (s) {
    return "<option value=\"".concat(s.num, "\">").concat(s.num, "\uBC88 ").concat(s.name, "</option>");
  }).join('');
  document.getElementById('assign-job').innerHTML = "<option value=\"\">\uBBF8\uBC30\uC815</option>" + S.jobs.map(function (j) {
    var cur = assignedCount(j.name),
      full = j.slots < 99 && cur >= j.slots;
    return "<option value=\"".concat(j.name, "\" ").concat(full ? 'disabled' : '', ">").concat(j.name, " (").concat(cur, "/").concat(j.slots >= 99 ? '∞' : j.slots, ") - ").concat(fmt(j.salary)).concat(full ? ' [만원]' : '', "</option>");
  }).join('');
  document.getElementById('assign-overview').innerHTML = S.jobs.map(function (j) {
    var asgn = S.assignments.filter(function (a) {
      return a.jobName === j.name;
    }).map(function (a) {
      return S.students.find(function (s) {
        return String(s.num) === String(a.studentNum);
      });
    }).filter(Boolean);
    return "<div class=\"assign-job-block\"><div class=\"assign-job-head\"><span style=\"font-weight:600\">".concat(j.name, "</span><span class=\"badge ").concat(asgn.length >= j.slots && j.slots < 99 ? 'badge-red' : 'badge-blue', "\">").concat(asgn.length, "/").concat(j.slots >= 99 ? '∞' : j.slots, "</span><span style=\"font-size:12px;color:var(--muted)\">").concat(fmt(j.salary), "/\uC6D4</span>").concat(getJobPerms(j.name).length ? '<span class="badge badge-purple">상점권한</span>' : '', "</div><div>").concat(asgn.length ? asgn.map(function (s) {
      return "<span class=\"tag-s\">".concat(s.num, "\uBC88 ").concat(s.name, "</span>");
    }).join('') : '<span style="font-size:12px;color:var(--muted)">없음</span>', "</div></div>");
  }).join('');
}
function doAssign() {
  return _doAssign.apply(this, arguments);
}
function _doAssign() {
  _doAssign = _asyncToGenerator(_regenerator().m(function _callee10() {
    var num, jn, idx, s;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          num = document.getElementById('assign-student').value, jn = document.getElementById('assign-job').value;
          loading(true);
          _context10.p = 1;
          _context10.n = 2;
          return call('assignJob', num, jn);
        case 2:
          idx = S.assignments.findIndex(function (a) {
            return String(a.studentNum) === String(num);
          });
          if (jn === '') {
            if (idx >= 0) S.assignments.splice(idx, 1);
          } else {
            if (idx >= 0) S.assignments[idx].jobName = jn;else S.assignments.push({
              studentNum: num,
              jobName: jn
            });
          }
          s = S.students.find(function (s) {
            return String(s.num) === String(num);
          });
          showMsg('assign-msg', "".concat((s === null || s === void 0 ? void 0 : s.name) || num, "\uC5D0\uAC8C ").concat(jn || '미배정', " \uBC30\uC815 \uC644\uB8CC"));
          renderAssign();
        case 3:
          _context10.p = 3;
          loading(false);
          return _context10.f(3);
        case 4:
          return _context10.a(2);
      }
    }, _callee10, null, [[1,, 3, 4]]);
  }));
  return _doAssign.apply(this, arguments);
}
function renderSalarySettings() {
  document.getElementById('salary-month-label').textContent = "".concat(S.month, "\uC6D4 \uAE09\uC5EC \uC124\uC815");
  document.getElementById('salary-settings').innerHTML = S.jobs.map(function (j, i) {
    var cfg = S.salaryCfg.find(function (c) {
        return String(c.month) === String(S.month) && c.jobName === j.name;
      }),
      val = cfg ? cfg.salary : '';
    return "<div class=\"form-row-s\"><label class=\"form-label-s\">".concat(j.name, " <span style=\"color:var(--muted);font-weight:400\">(\uAE30\uBCF8: ").concat(fmt(j.salary), ")</span></label><input type=\"number\" value=\"").concat(val, "\" placeholder=\"").concat(j.salary, "\" onchange=\"doSetSalary(").concat(i, ",'").concat(j.name, "',this.value)\" style=\"border-color:").concat(val ? 'var(--c1)' : 'var(--border)', "\"></div>");
  }).join('');
}
function doSetSalary(_x5, _x6, _x7) {
  return _doSetSalary.apply(this, arguments);
}
function _doSetSalary() {
  _doSetSalary = _asyncToGenerator(_regenerator().m(function _callee11(ji, jn, val) {
    var idx;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          loading(true);
          _context11.p = 1;
          _context11.n = 2;
          return call('setSalaryConfig', S.month, jn, val === '' ? null : parseInt(val));
        case 2:
          idx = S.salaryCfg.findIndex(function (c) {
            return String(c.month) === String(S.month) && c.jobName === jn;
          });
          if (val === '') {
            if (idx >= 0) S.salaryCfg.splice(idx, 1);
          } else {
            if (idx >= 0) S.salaryCfg[idx].salary = parseInt(val);else S.salaryCfg.push({
              month: S.month,
              jobName: jn,
              salary: parseInt(val)
            });
          }
        case 3:
          _context11.p = 3;
          loading(false);
          return _context11.f(3);
        case 4:
          return _context11.a(2);
      }
    }, _callee11, null, [[1,, 3, 4]]);
  }));
  return _doSetSalary.apply(this, arguments);
}
function renderTax() {
  document.getElementById('tax-student').innerHTML = "<option value=\"\">\uC804\uCCB4 \uD559\uC0DD</option>" + S.students.map(function (s) {
    return "<option value=\"".concat(s.num, "\">").concat(s.num, "\uBC88 ").concat(s.name, "</option>");
  }).join('');
  var rows = S.ledger.filter(function (l) {
    return l.type === '세금';
  }).slice(0, 15);
  document.getElementById('tax-history').innerHTML = rows.length ? rows.map(function (l) {
    return "<tr><td>".concat(l.date, "</td><td>").concat(l.studentName, "</td><td><span class=\"badge badge-red\">").concat(l.detail.split(' - ')[0], "</span></td><td style=\"color:var(--cd);font-weight:600\">-").concat(fmt(Math.abs(l.amount)), "</td><td style=\"font-size:12px;color:var(--muted)\">").concat(l.detail.split(' - ')[1] || '-', "</td></tr>");
  }).join('') : '<tr><td colspan="5" class="empty">없음</td></tr>';
}
function doTax() {
  return _doTax.apply(this, arguments);
}
function _doTax() {
  _doTax = _asyncToGenerator(_regenerator().m(function _callee13() {
    var sn, type, amount, mode, memo, res, fresh;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.p = _context13.n) {
        case 0:
          sn = document.getElementById('tax-student').value, type = document.getElementById('tax-type').value, amount = parseFloat(document.getElementById('tax-amount').value) || 0, mode = document.getElementById('tax-mode').value, memo = document.getElementById('tax-memo').value;
          if (amount) {
            _context13.n = 1;
            break;
          }
          showMsg('tax-msg', '금액 입력', false);
          return _context13.a(2);
        case 1:
          loading(true);
          _context13.p = 2;
          _context13.n = 3;
          return call('applyTax', {
            studentNums: sn ? [sn] : [],
            type: type,
            amount: amount,
            mode: mode,
            memo: memo,
            month: S.month
          });
        case 3:
          res = _context13.v;
          _context13.n = 4;
          return call('loadAll');
        case 4:
          fresh = _context13.v;
          S.students = fresh.students;
          S.ledger = fresh.ledger;
          document.getElementById('tax-amount').value = '';
          showMsg('tax-msg', "".concat(res.count, "\uBA85\uC5D0\uAC8C \uC138\uAE08\uC774 \uBD80\uACFC\uB418\uC5C8\uC2B5\uB2C8\uB2E4."));
          renderTax();
          renderDashboard();
        case 5:
          _context13.p = 5;
          loading(false);
          return _context13.f(5);
        case 6:
          return _context13.a(2);
      }
    }, _callee13, null, [[2,, 5, 6]]);
  }));
  return _doTax.apply(this, arguments);
}
function renderShop() {
  var rows = '';
  for (var i = 0; i < S.items.length; i++) {
    var it = S.items[i];
    var st = Number(it.stock);
    var stockTxt, stockStyle = '';
    if (st < 0) { stockTxt = '무제한'; }
    else if (st === 0) { stockTxt = '0'; stockStyle = 'color:var(--cd);font-weight:700'; }
    else if (st <= 3) { stockTxt = String(st); stockStyle = 'color:var(--cy);font-weight:600'; }
    else { stockTxt = String(st); }

    var btn;
    if (it.autoRefill && it.refillQty > 0) {
      btn = '<span class="badge badge-blue" title="매일 자정 자동 리필">매일 ' + it.refillQty + '개</span>';
    } else if (st < 0) {
      btn = '<span style="font-size:11px;color:var(--muted)">-</span>';
    } else {
      var done = S.restockDone && S.restockDone[it.name];
      if (done) {
        btn = '<span class="badge badge-gray" title="다음 주 월요일부터 가능">이번 주 완료</span>';
      } else {
        btn = '<button class="btn btn-sm btn-green" onclick="doRestock(' + i + ')">'
            + '<i class="ti ti-refresh"></i> 재입고</button>';
      }
    }

    rows += '<tr><td><strong>' + it.name + '</strong></td>'
          + '<td><span class="badge badge-gray">' + (it.category || '기타') + '</span></td>'
          + '<td style="color:var(--cy);font-weight:600">' + fmt(it.price) + '</td>'
          + '<td style="' + stockStyle + '">' + stockTxt + '</td>'
          + '<td>' + btn + '</td>'
          + '<td style="font-size:12px;color:var(--muted)">' + (it.desc || '-') + '</td>'
          + '<td><div class="row-btns">'
          + '<button class="btn btn-sm" onclick="openItemModal(' + i + ')"><i class="ti ti-edit"></i></button>'
          + '<button class="btn btn-sm btn-danger" onclick="doDeleteItem(' + i + ')"><i class="ti ti-trash"></i></button>'
          + '</div></td></tr>';
  }
  document.getElementById('shop-items-table').innerHTML = rows
    || '<tr><td colspan="7" class="empty">등록된 물품이 없습니다</td></tr>';

  document.getElementById('buy-student').innerHTML = S.students.map(function (s) {
    return '<option value="' + s.num + '">' + s.num + '번 ' + s.name + ' (' + fmt(s.balance) + ')</option>';
  }).join('');
  document.getElementById('buy-item').innerHTML = S.items.map(function (it, i) {
    return '<option value="' + i + '">' + it.name + ' [' + (it.category || '기타') + '] - ' + fmt(it.price) + '</option>';
  }).join('');
  updateBuyPrice();
  loadRestockStatus();
}

// 재입고 가능 상태 조회
function loadRestockStatus() {
  call('getRestockStatus').then(function (list) {
    if (!list) return;
    S.restockDone = {};
    for (var i = 0; i < list.length; i++) {
      if (list[i].done) S.restockDone[list[i].name] = true;
    }
    var tb = document.getElementById('shop-items-table');
    if (tb && document.getElementById('page-shop').classList.contains('active')) {
      renderShopRowsOnly();
    }
  })['catch'](function () {});
}

// 버튼 상태만 다시 그리기 (무한 루프 방지)
function renderShopRowsOnly() {
  var rows = '';
  for (var i = 0; i < S.items.length; i++) {
    var it = S.items[i];
    var st = Number(it.stock);
    var stockTxt, stockStyle = '';
    if (st < 0) { stockTxt = '무제한'; }
    else if (st === 0) { stockTxt = '0'; stockStyle = 'color:var(--cd);font-weight:700'; }
    else if (st <= 3) { stockTxt = String(st); stockStyle = 'color:var(--cy);font-weight:600'; }
    else { stockTxt = String(st); }

    var btn;
    if (it.autoRefill && it.refillQty > 0) {
      btn = '<span class="badge badge-blue" title="매일 자정 자동 리필">매일 ' + it.refillQty + '개</span>';
    } else if (st < 0) {
      btn = '<span style="font-size:11px;color:var(--muted)">-</span>';
    } else if (S.restockDone && S.restockDone[it.name]) {
      btn = '<span class="badge badge-gray" title="다음 주 월요일부터 가능">이번 주 완료</span>';
    } else {
      btn = '<button class="btn btn-sm btn-green" onclick="doRestock(' + i + ')">'
          + '<i class="ti ti-refresh"></i> 재입고</button>';
    }

    rows += '<tr><td><strong>' + it.name + '</strong></td>'
          + '<td><span class="badge badge-gray">' + (it.category || '기타') + '</span></td>'
          + '<td style="color:var(--cy);font-weight:600">' + fmt(it.price) + '</td>'
          + '<td style="' + stockStyle + '">' + stockTxt + '</td>'
          + '<td>' + btn + '</td>'
          + '<td style="font-size:12px;color:var(--muted)">' + (it.desc || '-') + '</td>'
          + '<td><div class="row-btns">'
          + '<button class="btn btn-sm" onclick="openItemModal(' + i + ')"><i class="ti ti-edit"></i></button>'
          + '<button class="btn btn-sm btn-danger" onclick="doDeleteItem(' + i + ')"><i class="ti ti-trash"></i></button>'
          + '</div></td></tr>';
  }
  document.getElementById('shop-items-table').innerHTML = rows
    || '<tr><td colspan="7" class="empty">등록된 물품이 없습니다</td></tr>';
}

// 재입고 실행
function doRestock(idx) {
  var it = S.items[idx];
  if (!it) return;
  var msg = it.name + ' 재입고\n\n현재 재고: ' + it.stock + '개\n\n'
          + '[확인] 1~20개 랜덤 재입고\n[취소] 수량 직접 입력\n\n'
          + '※ 재입고는 주 1회만 가능합니다.';
  var useRandom = confirm(msg);
  var fixed = null;

  if (!useRandom) {
    var typed = prompt(it.name + ' 재입고 수량을 입력하세요.\n(취소하면 재입고하지 않습니다)', '10');
    if (typed === null) return;
    fixed = parseInt(typed, 10);
    if (isNaN(fixed) || fixed < 1) { alert('1 이상의 숫자를 입력해 주세요.'); return; }
  }

  loading(true, '재입고 중...');
  call('restockItem', idx, fixed).then(function (res) {
    if (!res || !res.ok) { alert((res && res.msg) || '재입고에 실패했습니다.'); return null; }
    S.items[idx].stock = res.stock;
    S.restockDone = S.restockDone || {};
    S.restockDone[res.name] = true;
    alert('✓ ' + res.name + ' 재입고 완료\n\n'
        + (res.random ? '랜덤 입고: ' : '입고: ') + res.amount + '개\n'
        + '현재 재고: ' + res.stock + '개');
    renderShopRowsOnly();
  })['catch'](function (e) {
    alert('오류: ' + (e && e.message ? e.message : e));
  }).then(function () { loading(false); });
}

function updateBuyPrice() {
  var ii = parseInt(document.getElementById('buy-item').value) || 0,
    qty = parseInt(document.getElementById('buy-qty').value) || 1,
    it = S.items[ii];
  document.getElementById('buy-price').value = it ? it.price * qty : 0;
}
function openItemModal(i) {
  var asSk = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  document.getElementById('it-modal-title').textContent = i === -1 ? '물품 추가' : '물품 수정';
  document.getElementById('it-idx').value = i;
  document.getElementById('it-as-sk').value = asSk ? '1' : '0';
  var it = i === -1 ? {
    name: '',
    price: '',
    stock: -1,
    desc: '',
    category: ''
  } : S.items[i];
  document.getElementById('it-name').value = it.name;
  document.getElementById('it-price').value = it.price;
  document.getElementById('it-stock').value = it.stock;
  document.getElementById('it-desc').value = it.desc || '';
  document.getElementById('it-category').value = it.category || '';
  var auto = !!it.autoRefill;
  document.getElementById('it-auto').checked = auto;
  document.getElementById('it-refill-qty').value = it.refillQty || 1;
  document.getElementById('it-refill-box').style.display = auto ? 'block' : 'none';
  openModal('modal-item');
}

function onAutoRefillToggle() {
  var on = document.getElementById('it-auto').checked;
  document.getElementById('it-refill-box').style.display = on ? 'block' : 'none';
}
function doSaveItem() {
  return _doSaveItem.apply(this, arguments);
}
function _doSaveItem() {
  _doSaveItem = _asyncToGenerator(_regenerator().m(function _callee14() {
    var name, price, stock, desc, category, idx, asSk, d, res;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.p = _context14.n) {
        case 0:
          name = document.getElementById('it-name').value.trim(), price = parseInt(document.getElementById('it-price').value) || 0, stock = parseInt(document.getElementById('it-stock').value), desc = document.getElementById('it-desc').value.trim(), category = document.getElementById('it-category').value.trim() || '기타', idx = parseInt(document.getElementById('it-idx').value), asSk = document.getElementById('it-as-sk').value === '1';
          if (name) {
            _context14.n = 1;
            break;
          }
          alert('물품명 입력');
          return _context14.a(2);
        case 1:
          loading(true);
          _context14.p = 2;
          d = {
            name: name,
            price: price,
            stock: stock,
            desc: desc,
            category: category,
            editIdx: idx,
            autoRefill: document.getElementById('it-auto').checked,
            refillQty: parseInt(document.getElementById('it-refill-qty').value) || 1
          };
          if (!(asSk && S.shopkeeper)) {
            _context14.n = 5;
            break;
          }
          _context14.n = 3;
          return call('shopkeeperSaveItem', {
            shopkeeperNum: S.shopkeeper.studentNum,
            itemData: d
          });
        case 3:
          res = _context14.v;
          if (res.ok) {
            _context14.n = 4;
            break;
          }
          showMsg('sk-full-msg', res.msg, false);
          closeModal('modal-item');
          return _context14.a(2);
        case 4:
          _context14.n = 6;
          break;
        case 5:
          _context14.n = 6;
          return call('saveItem', d);
        case 6:
          var _ar = document.getElementById('it-auto').checked;
          var _aq = parseInt(document.getElementById('it-refill-qty').value) || 1;
          if (idx === -1) S.items.push({
            name: name, price: price, stock: stock, desc: desc,
            category: category, autoRefill: _ar, refillQty: _aq
          });else S.items[idx] = {
            name: name, price: price, stock: stock, desc: desc,
            category: category, autoRefill: _ar, refillQty: _aq
          };
          closeModal('modal-item');
          renderShop();
          if (asSk) renderSkStore();
        case 7:
          _context14.p = 7;
          loading(false);
          return _context14.f(7);
        case 8:
          return _context14.a(2);
      }
    }, _callee14, null, [[2,, 7, 8]]);
  }));
  return _doSaveItem.apply(this, arguments);
}
function doDeleteItem(_x8) {
  return _doDeleteItem.apply(this, arguments);
}
function _doDeleteItem() {
  _doDeleteItem = _asyncToGenerator(_regenerator().m(function _callee15(i) {
    var asSk,
      res,
      _args15 = arguments;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.p = _context15.n) {
        case 0:
          asSk = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : false;
          if (confirm('삭제?')) {
            _context15.n = 1;
            break;
          }
          return _context15.a(2);
        case 1:
          loading(true);
          _context15.p = 2;
          if (!(asSk && S.shopkeeper)) {
            _context15.n = 5;
            break;
          }
          _context15.n = 3;
          return call('shopkeeperDeleteItem', {
            shopkeeperNum: S.shopkeeper.studentNum,
            itemIdx: i
          });
        case 3:
          res = _context15.v;
          if (res.ok) {
            _context15.n = 4;
            break;
          }
          showMsg('sk-full-msg', res.msg, false);
          return _context15.a(2);
        case 4:
          _context15.n = 6;
          break;
        case 5:
          _context15.n = 6;
          return call('deleteItem', i);
        case 6:
          S.items.splice(i, 1);
          renderShop();
          if (asSk) renderSkStore();
        case 7:
          _context15.p = 7;
          loading(false);
          return _context15.f(7);
        case 8:
          return _context15.a(2);
      }
    }, _callee15, null, [[2,, 7, 8]]);
  }));
  return _doDeleteItem.apply(this, arguments);
}
function doBuy() {
  return _doBuy.apply(this, arguments);
}
function _doBuy() {
  _doBuy = _asyncToGenerator(_regenerator().m(function _callee16() {
    var sn, ii, qty, res, si;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.p = _context16.n) {
        case 0:
          sn = document.getElementById('buy-student').value, ii = parseInt(document.getElementById('buy-item').value), qty = parseInt(document.getElementById('buy-qty').value) || 1;
          loading(true);
          _context16.p = 1;
          _context16.n = 2;
          return call('processBuy', {
            studentNum: sn,
            itemIdx: ii,
            qty: qty,
            month: S.month
          });
        case 2:
          res = _context16.v;
          if (res.ok) {
            _context16.n = 3;
            break;
          }
          showMsg('buy-msg', res.msg, false);
          return _context16.a(2);
        case 3:
          si = S.students.findIndex(function (s) {
            return String(s.num) === String(sn);
          });
          if (si >= 0) S.students[si].balance = res.balance;
          if (S.items[ii].stock >= 0) S.items[ii].stock -= qty;
          _context16.n = 4;
          return loadLedger();
        case 4:
          showMsg('buy-msg', "\uAD6C\uC785 \uC644\uB8CC! \uC794\uC561: ".concat(fmt(res.balance)));
          renderShop();
          renderDashboard();
        case 5:
          _context16.p = 5;
          loading(false);
          return _context16.f(5);
        case 6:
          return _context16.a(2);
      }
    }, _callee16, null, [[1,, 5, 6]]);
  }));
  return _doBuy.apply(this, arguments);
}
function renderShopPerms() {
  document.getElementById('perm-table').innerHTML = S.shopPerms.map(function (p, i) {
    var asgn = S.assignments.filter(function (a) {
      return a.jobName === p.jobName;
    }).map(function (a) {
      return S.students.find(function (s) {
        return String(s.num) === String(a.studentNum);
      });
    }).filter(Boolean);
    return "<tr><td><strong>".concat(p.jobName, "</strong></td><td><span class=\"badge badge-gray\">").concat(p.category, "</span></td><td><span class=\"perm-chip ").concat(p.perm, "\">").concat(p.perm, "</span></td><td>").concat(asgn.length ? asgn.map(function (s) {
      return "<span class=\"tag-s\">".concat(s.num, "\uBC88 ").concat(s.name, "</span>");
    }).join('') : '<span style="font-size:12px;color:var(--muted)">없음</span>', "</td><td><div class=\"row-btns\"><button class=\"btn btn-sm\" onclick=\"openPermModal(").concat(i, ")\"><i class=\"ti ti-edit\"></i></button><button class=\"btn btn-sm btn-danger\" onclick=\"doDeletePerm(").concat(i, ")\"><i class=\"ti ti-trash\"></i></button></div></td></tr>");
  }).join('') || '<tr><td colspan="5" class="empty">없음</td></tr>';
  try { renderBankPerms(); } catch (e) {}
  try { restoreSections(['shop', 'bank']); } catch (e) {}
}
function openPermModal(i) {
  document.getElementById('perm-modal-title').textContent = i === -1 ? '권한 추가' : '권한 수정';
  document.getElementById('perm-idx').value = i;
  document.getElementById('perm-job').innerHTML = S.jobs.map(function (j) {
    return "<option value=\"".concat(j.name, "\">").concat(j.name, "</option>");
  }).join('');
  var p = i === -1 ? {
    jobName: '',
    category: '전체',
    perm: '판매'
  } : S.shopPerms[i];
  document.getElementById('perm-job').value = p.jobName;
  document.getElementById('perm-cat').value = p.category;
  document.getElementById('perm-type').value = p.perm;
  openModal('modal-perm');
}
function doSavePerm() {
  return _doSavePerm.apply(this, arguments);
}
function _doSavePerm() {
  _doSavePerm = _asyncToGenerator(_regenerator().m(function _callee17() {
    var jn, cat, perm, idx;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.p = _context17.n) {
        case 0:
          jn = document.getElementById('perm-job').value, cat = document.getElementById('perm-cat').value.trim() || '전체', perm = document.getElementById('perm-type').value, idx = parseInt(document.getElementById('perm-idx').value);
          if (jn) {
            _context17.n = 1;
            break;
          }
          alert('직업 선택');
          return _context17.a(2);
        case 1:
          loading(true);
          _context17.p = 2;
          _context17.n = 3;
          return call('saveShopPerm', {
            jobName: jn,
            category: cat,
            perm: perm,
            editIdx: idx
          });
        case 3:
          if (idx === -1) S.shopPerms.push({
            jobName: jn,
            category: cat,
            perm: perm
          });else S.shopPerms[idx] = {
            jobName: jn,
            category: cat,
            perm: perm
          };
          closeModal('modal-perm');
          renderShopPerms();
          renderJobs();
        case 4:
          _context17.p = 4;
          loading(false);
          return _context17.f(4);
        case 5:
          return _context17.a(2);
      }
    }, _callee17, null, [[2,, 4, 5]]);
  }));
  return _doSavePerm.apply(this, arguments);
}
function doDeletePerm(_x9) {
  return _doDeletePerm.apply(this, arguments);
}
function _doDeletePerm() {
  _doDeletePerm = _asyncToGenerator(_regenerator().m(function _callee18(i) {
    return _regenerator().w(function (_context18) {
      while (1) switch (_context18.p = _context18.n) {
        case 0:
          if (confirm('삭제?')) {
            _context18.n = 1;
            break;
          }
          return _context18.a(2);
        case 1:
          loading(true);
          _context18.p = 2;
          _context18.n = 3;
          return call('deleteShopPerm', i);
        case 3:
          S.shopPerms.splice(i, 1);
          renderShopPerms();
          renderJobs();
        case 4:
          _context18.p = 4;
          loading(false);
          return _context18.f(4);
        case 5:
          return _context18.a(2);
      }
    }, _callee18, null, [[2,, 4, 5]]);
  }));
  return _doDeletePerm.apply(this, arguments);
}
function renderPasswords() {
  return _renderPasswords.apply(this, arguments);
}
function _renderPasswords() {
  loading(true, '비밀번호 목록 불러오는 중...');
  call('getAllPasswords').then(function (list) {
    S.pwList = list || [];
    var rows = '';
    for (var i = 0; i < S.pwList.length; i++) {
      var p = S.pwList[i];
      rows += '<tr><td>' + p.num + '</td><td><strong>' + p.name + '</strong></td>'
        + '<td><code style="background:#f3f4f6;padding:2px 8px;border-radius:5px;font-size:13px">' + p.password + '</code></td>'
        + '<td><div class="pw-row-edit">'
        + '<input type="text" id="pw-new-' + p.num + '" placeholder="새 비밀번호" style="width:120px;padding:4px 8px;font-size:12px">'
        + '<button class="btn btn-sm btn-primary" onclick="doSetStudentPw(\'' + p.num + '\')">변경</button>'
        + '</div></td>'
        + '<td><button class="btn btn-sm" onclick="doResetStudentPw(\'' + p.num + '\',\'' + p.name + '\')">'
        + '<i class="ti ti-refresh"></i> 번호로 초기화</button></td></tr>';
    }
    var tb = document.getElementById('pw-table');
    if (tb) tb.innerHTML = rows || '<tr><td colspan="5" class="empty">등록된 학생이 없습니다</td></tr>';
  })['catch'](function (e) {
    try { console.error('비밀번호 목록 오류:', e); } catch (x) {}
    var tb2 = document.getElementById('pw-table');
    if (tb2) tb2.innerHTML = '<tr><td colspan="5" class="empty">불러오지 못했습니다: '
      + (e && e.message ? e.message : e) + '</td></tr>';
  }).then(function () { loading(false); });
}

function doChangeAdminPw() {
  return _doChangeAdminPw.apply(this, arguments);
}
function _doChangeAdminPw() {
  _doChangeAdminPw = _asyncToGenerator(_regenerator().m(function _callee20() {
    var cur, nw, res;
    return _regenerator().w(function (_context20) {
      while (1) switch (_context20.p = _context20.n) {
        case 0:
          cur = document.getElementById('admin-cur-pw').value, nw = document.getElementById('admin-new-pw').value;
          if (!(!cur || !nw)) {
            _context20.n = 1;
            break;
          }
          showMsg('admin-pw-msg', '모두 입력하세요', false);
          return _context20.a(2);
        case 1:
          loading(true);
          _context20.p = 2;
          _context20.n = 3;
          return call('changeAdminPw', cur, nw);
        case 3:
          res = _context20.v;
          if (res.ok) {
            _context20.n = 4;
            break;
          }
          showMsg('admin-pw-msg', res.msg, false);
          return _context20.a(2);
        case 4:
          showMsg('admin-pw-msg', '교사 비밀번호가 변경되었습니다.');
          document.getElementById('admin-cur-pw').value = '';
          document.getElementById('admin-new-pw').value = '';
        case 5:
          _context20.p = 5;
          loading(false);
          return _context20.f(5);
        case 6:
          return _context20.a(2);
      }
    }, _callee20, null, [[2,, 5, 6]]);
  }));
  return _doChangeAdminPw.apply(this, arguments);
}
function doSetStudentPw(_x0) {
  return _doSetStudentPw.apply(this, arguments);
}
function _doSetStudentPw() {
  _doSetStudentPw = _asyncToGenerator(_regenerator().m(function _callee21(num) {
    var el, nw;
    return _regenerator().w(function (_context21) {
      while (1) switch (_context21.p = _context21.n) {
        case 0:
          el = document.getElementById("pw-new-".concat(num)), nw = el.value.trim();
          if (nw) {
            _context21.n = 1;
            break;
          }
          alert('새 비밀번호를 입력하세요');
          return _context21.a(2);
        case 1:
          loading(true);
          _context21.p = 2;
          _context21.n = 3;
          return call('setStudentPwAdmin', num, nw);
        case 3:
          el.value = '';
          _context21.n = 4;
          return renderPasswords();
        case 4:
          alert("".concat(num, "\uBC88 \uD559\uC0DD \uBE44\uBC00\uBC88\uD638 \uBCC0\uACBD \uC644\uB8CC"));
        case 5:
          _context21.p = 5;
          loading(false);
          return _context21.f(5);
        case 6:
          return _context21.a(2);
      }
    }, _callee21, null, [[2,, 5, 6]]);
  }));
  return _doSetStudentPw.apply(this, arguments);
}
function doResetStudentPw(_x1, _x10) {
  return _doResetStudentPw.apply(this, arguments);
}
function _doResetStudentPw() {
  _doResetStudentPw = _asyncToGenerator(_regenerator().m(function _callee22(num, name) {
    return _regenerator().w(function (_context22) {
      while (1) switch (_context22.p = _context22.n) {
        case 0:
          if (confirm("".concat(name, "(").concat(num, "\uBC88) \uBE44\uBC00\uBC88\uD638\uB97C ").concat(num, "(\uC73C)\uB85C \uCD08\uAE30\uD654\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?"))) {
            _context22.n = 1;
            break;
          }
          return _context22.a(2);
        case 1:
          loading(true);
          _context22.p = 2;
          _context22.n = 3;
          return call('resetStudentPw', num);
        case 3:
          _context22.n = 4;
          return renderPasswords();
        case 4:
          _context22.p = 4;
          loading(false);
          return _context22.f(4);
        case 5:
          return _context22.a(2);
      }
    }, _callee22, null, [[2,, 4, 5]]);
  }));
  return _doResetStudentPw.apply(this, arguments);
}
function doResetAll() {
  return _doResetAll.apply(this, arguments);
}
function _doResetAll() {
  _doResetAll = _asyncToGenerator(_regenerator().m(function _callee23() {
    return _regenerator().w(function (_context23) {
      while (1) switch (_context23.p = _context23.n) {
        case 0:
          if (confirm('모든 학생의 비밀번호를 출석번호로 초기화하시겠습니까?')) {
            _context23.n = 1;
            break;
          }
          return _context23.a(2);
        case 1:
          loading(true, '초기화 중...');
          _context23.p = 2;
          _context23.n = 3;
          return call('resetAllPasswords');
        case 3:
          _context23.n = 4;
          return renderPasswords();
        case 4:
          _context23.p = 4;
          loading(false);
          return _context23.f(4);
        case 5:
          return _context23.a(2);
      }
    }, _callee23, null, [[2,, 4, 5]]);
  }));
  return _doResetAll.apply(this, arguments);
}
function loadLedger() {
  return _loadLedger.apply(this, arguments);
}
function _loadLedger() {
  _loadLedger = _asyncToGenerator(_regenerator().m(function _callee26() {
    var _t6;
    return _regenerator().w(function (_context26) {
      while (1) switch (_context26.n) {
        case 0:
          _context26.n = 1;
          return call('getLedger', 'all');
        case 1:
          _t6 = _context26.v;
          if (_t6) {
            _context26.n = 2;
            break;
          }
          _t6 = [];
        case 2:
          S.ledger = _t6;
        case 3:
          return _context26.a(2);
      }
    }, _callee26);
  }));
  return _loadLedger.apply(this, arguments);
}
function renderLedger() {
  var filter = document.getElementById('ledger-filter').value;
  var rows = S.ledger.filter(function (l) {
    return filter === 'all' || l.type === filter;
  });
  var empty = document.getElementById('ledger-empty');
  if (!rows.length) {
    document.getElementById('ledger-table').innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  var bm = {
    '급여': 'badge-green', '급여취소': 'badge-gray', '보너스': 'badge-purple',
    '세금': 'badge-red', '물품구입': 'badge-yellow', '수동조정': 'badge-gray',
    '적금납입': 'badge-blue', '적금해약': 'badge-green'
  };
  var html = '';
  for (var i = 0; i < rows.length; i++) {
    var l = rows[i];
    var isIn = l.amount > 0;
    var tre = (l.treasury === null || l.treasury === undefined || l.treasury === '')
      ? '<span style="font-size:11px;color:var(--muted)">-</span>'
      : '<span style="color:var(--c2);font-weight:600">' + fmt(l.treasury) + '</span>';
    html += '<tr>'
      + '<td style="font-size:12px">' + l.date + '</td>'
      + '<td>' + l.studentName + '</td>'
      + '<td><span class="badge ' + (bm[l.type] || 'badge-gray') + '">' + l.type + '</span></td>'
      + '<td style="font-size:12px;color:var(--muted)">' + l.detail + '</td>'
      + '<td style="color:' + (isIn ? 'var(--c2)' : 'var(--cd)') + ';font-weight:600">'
      + (isIn ? '+' : '') + fmt(l.amount) + '</td>'
      + '<td style="color:var(--c1);font-weight:600">' + fmt(l.balance) + '</td>'
      + '<td>' + tre + '</td></tr>';
  }
  document.getElementById('ledger-table').innerHTML = html;
}
function openSkLogin() {
  document.getElementById('sk-login-num').value = '';
  document.getElementById('sk-login-msg').style.display = 'none';
  openModal('modal-sk-login');
}
function doSkLogin() {
  return _doSkLogin.apply(this, arguments);
}
function _doSkLogin() {
  _doSkLogin = _asyncToGenerator(_regenerator().m(function _callee27() {
    var num, perms, s, asgn;
    return _regenerator().w(function (_context27) {
      while (1) switch (_context27.p = _context27.n) {
        case 0:
          num = document.getElementById('sk-login-num').value.trim();
          if (num) {
            _context27.n = 1;
            break;
          }
          showMsg('sk-login-msg', '번호 입력', false);
          return _context27.a(2);
        case 1:
          loading(true);
          _context27.p = 2;
          _context27.n = 3;
          return call('getStudentShopPerms', num);
        case 3:
          perms = _context27.v;
          if (perms.canSell) {
            _context27.n = 4;
            break;
          }
          showMsg('sk-login-msg', '상점 권한이 없습니다.', false);
          return _context27.a(2);
        case 4:
          s = S.students.find(function (s) {
            return String(s.num) === String(num);
          });
          if (s) {
            _context27.n = 5;
            break;
          }
          showMsg('sk-login-msg', '학생 없음', false);
          return _context27.a(2);
        case 5:
          asgn = S.assignments.find(function (a) {
            return String(a.studentNum) === String(num);
          });
          S.shopkeeper = {
            studentNum: num,
            name: s.name,
            jobName: (asgn === null || asgn === void 0 ? void 0 : asgn.jobName) || '',
            perms: perms
          };
          closeModal('modal-sk-login');
          activateSkMode();
        case 6:
          _context27.p = 6;
          loading(false);
          return _context27.f(6);
        case 7:
          return _context27.a(2);
      }
    }, _callee27, null, [[2,, 6, 7]]);
  }));
  return _doSkLogin.apply(this, arguments);
}
function activateSkMode() {
  var sk = S.shopkeeper;
  if (!sk) return;
  document.getElementById('sk-banner').classList.add('show');
  document.getElementById('sk-banner-name').textContent = "".concat(sk.name, " (").concat(sk.jobName, ") \uC0C1\uC810 \uC6B4\uC601 \uC911");
  var pl = [];
  if (sk.perms.canFullManage) pl.push('전체관리');else {
    if (sk.perms.canSell) pl.push('판매');
    if (sk.perms.canChangePrice) pl.push('가격변경');
    if (sk.perms.canManageStock) pl.push('재고관리');
  }
  document.getElementById('sk-banner-perms').textContent = "\uAD8C\uD55C: ".concat(pl.join(' · '), " | \uCE74\uD14C\uACE0\uB9AC: ").concat(sk.perms.allowedCategories.join(', '));
  lockSidebarForRole('shop');
  document.querySelectorAll('.sk-only').forEach(function (el) {
    return el.classList.add('show');
  });
  showPage('sk-store');
}
function exitSkMode() {
  S.shopkeeper = null;
  document.getElementById('sk-banner').classList.remove('show');
  document.querySelectorAll('.sk-only').forEach(function (el) {
    return el.classList.remove('show');
  });
  unlockSidebar();
  if (S.role === 'student') {
    document.getElementById('admin-screen').classList.remove('show');
    document.getElementById('student-screen').style.display = 'block';
  } else showPage('dashboard');
}
function openBankPermModal(i) {
  document.getElementById('bankperm-modal-title').textContent = i === -1 ? '은행 권한 추가' : '은행 권한 수정';
  document.getElementById('bankperm-idx').value = i;
  document.getElementById('bankperm-job').innerHTML = S.jobs.map(function (j) {
    return "<option value=\"".concat(j.name, "\">").concat(j.name, "</option>");
  }).join('');
  if (i >= 0) {
    document.getElementById('bankperm-job').value = S.bankPerms[i].jobName;
    document.getElementById('bankperm-role').value = S.bankPerms[i].role;
  }
  openModal('modal-bankperm');
}
function doSaveBankPerm() {
  return _doSaveBankPerm.apply(this, arguments);
}
function _doSaveBankPerm() {
  _doSaveBankPerm = _asyncToGenerator(_regenerator().m(function _callee28() {
    var jn, role, idx;
    return _regenerator().w(function (_context28) {
      while (1) switch (_context28.p = _context28.n) {
        case 0:
          jn = document.getElementById('bankperm-job').value, role = document.getElementById('bankperm-role').value, idx = parseInt(document.getElementById('bankperm-idx').value);
          if (jn) {
            _context28.n = 1;
            break;
          }
          alert('직업 선택');
          return _context28.a(2);
        case 1:
          loading(true);
          _context28.p = 2;
          _context28.n = 3;
          return call('saveBankPerm', {
            jobName: jn,
            role: role,
            editIdx: idx
          });
        case 3:
          if (idx === -1) S.bankPerms.push({
            jobName: jn,
            role: role
          });else S.bankPerms[idx] = {
            jobName: jn,
            role: role
          };
          closeModal('modal-bankperm');
          renderBankPerms();
        case 4:
          _context28.p = 4;
          loading(false);
          return _context28.f(4);
        case 5:
          return _context28.a(2);
      }
    }, _callee28, null, [[2,, 4, 5]]);
  }));
  return _doSaveBankPerm.apply(this, arguments);
}
function doDeleteBankPerm(_x13) {
  return _doDeleteBankPerm.apply(this, arguments);
}
function _doDeleteBankPerm() {
  _doDeleteBankPerm = _asyncToGenerator(_regenerator().m(function _callee29(i) {
    return _regenerator().w(function (_context29) {
      while (1) switch (_context29.p = _context29.n) {
        case 0:
          if (confirm('삭제?')) {
            _context29.n = 1;
            break;
          }
          return _context29.a(2);
        case 1:
          loading(true);
          _context29.p = 2;
          _context29.n = 3;
          return call('deleteBankPerm', i);
        case 3:
          S.bankPerms.splice(i, 1);
          renderBankPerms();
        case 4:
          _context29.p = 4;
          loading(false);
          return _context29.f(4);
        case 5:
          return _context29.a(2);
      }
    }, _callee29, null, [[2,, 4, 5]]);
  }));
  return _doDeleteBankPerm.apply(this, arguments);
}
function doSaveBankSettings() {
  return _doSaveBankSettings.apply(this, arguments);
}
function _doSaveBankSettings() {
  _doSaveBankSettings = _asyncToGenerator(_regenerator().m(function _callee30() {
    var r15, r30;
    return _regenerator().w(function (_context30) {
      while (1) switch (_context30.p = _context30.n) {
        case 0:
          r15 = parseFloat(document.getElementById('bank-rate15').value) || 5, r30 = parseFloat(document.getElementById('bank-rate30').value) || 10;
          loading(true);
          _context30.p = 1;
          _context30.n = 2;
          return call('saveBankSettings', {
            rate15: r15,
            rate30: r30
          });
        case 2:
          S.bankSettings = {
            rate15: r15,
            rate30: r30
          };
          showMsg('bank-settings-msg', '기본 이자율이 저장되었습니다.');
        case 3:
          _context30.p = 3;
          loading(false);
          return _context30.f(3);
        case 4:
          return _context30.a(2);
      }
    }, _callee30, null, [[1,, 3, 4]]);
  }));
  return _doSaveBankSettings.apply(this, arguments);
}
function doInitTrigger() {
  return _doInitTrigger.apply(this, arguments);
}
function _doInitTrigger() {
  _doInitTrigger = _asyncToGenerator(_regenerator().m(function _callee31() {
    return _regenerator().w(function (_context31) {
      while (1) switch (_context31.p = _context31.n) {
        case 0:
          if (confirm('매일 오전 9시에 만기 적금을 자동 처리하는 트리거를 설정합니다.\n기존 트리거는 삭제됩니다. 계속하시겠습니까?')) {
            _context31.n = 1;
            break;
          }
          return _context31.a(2);
        case 1:
          loading(true);
          _context31.p = 2;
          _context31.n = 3;
          return call('initSavingsTrigger');
        case 3:
          showMsg('bank-settings-msg', '자동 트리거 설정 완료! 매일 오전 9시에 만기 적금이 자동 해약됩니다.');
        case 4:
          _context31.p = 4;
          loading(false);
          return _context31.f(4);
        case 5:
          return _context31.a(2);
      }
    }, _callee31, null, [[2,, 4, 5]]);
  }));
  return _doInitTrigger.apply(this, arguments);
}
function doProcessMature() {
  return _doProcessMature.apply(this, arguments);
}
function _doProcessMature() {
  _doProcessMature = _asyncToGenerator(_regenerator().m(function _callee32() {
    var res, fresh;
    return _regenerator().w(function (_context32) {
      while (1) switch (_context32.p = _context32.n) {
        case 0:
          if (confirm('지금 만기가 된 적금을 처리하시겠습니까?')) {
            _context32.n = 1;
            break;
          }
          return _context32.a(2);
        case 1:
          loading(true, '만기 적금 처리 중...');
          _context32.p = 2;
          _context32.n = 3;
          return call('processMatureSavings');
        case 3:
          res = _context32.v;
          _context32.n = 4;
          return call('loadAll');
        case 4:
          fresh = _context32.v;
          S.students = fresh.students;
          S.ledger = fresh.ledger;
          S.pendingSavingsCount = fresh.pendingSavingsCount || 0;
          updateSavingsBadge();
          showMsg('bank-settings-msg', "\uB9CC\uAE30 \uCC98\uB9AC \uC644\uB8CC: ".concat(res.processed, "\uAC74"));
          renderSavings();
          renderDashboard();
        case 5:
          _context32.p = 5;
          loading(false);
          return _context32.f(5);
        case 6:
          return _context32.a(2);
      }
    }, _callee32, null, [[2,, 5, 6]]);
  }));
  return _doProcessMature.apply(this, arguments);
}
function tInitForm() {
  document.getElementById('t-depositor').innerHTML = S.students.map(function (s) {
    return "<option value=\"".concat(s.num, "\">").concat(s.num, "\uBC88 ").concat(s.name, " (").concat(fmt(s.balance), ")</option>");
  }).join('');
  tUpdateDepositorBal();
  tOnDaysChange();
}
function tUpdateDepositorBal() {
  var num = document.getElementById('t-depositor').value,
    s = S.students.find(function (s) {
      return String(s.num) === String(num);
    });
  document.getElementById('t-depositor-bal').value = s ? fmt(s.balance) : '';
}
function tOnDaysChange() {
  var days = parseInt(document.getElementById('t-days').value) || 15;
  var def = days === 15 ? S.bankSettings.rate15 || 5 : S.bankSettings.rate30 || 10;
  document.getElementById('t-rate-slider').value = def;
  tOnRateSlider(def);
}
function tOnRateSlider(val) {
  var v = parseFloat(val) || 0;
  document.getElementById('t-rate-display').textContent = v.toFixed(1) + '%';
  tUpdateCalc();
}
function tSetRate(r) {
  document.getElementById('t-rate-slider').value = r;
  tOnRateSlider(r);
}
function tUpdateCalc() {
  var principal = Number(document.getElementById('t-principal').value) || 0;
  var rate = parseFloat(document.getElementById('t-rate-slider').value) || 0;
  var days = parseInt(document.getElementById('t-days').value) || 15;
  var def = days === 15 ? S.bankSettings.rate15 || 5 : S.bankSettings.rate30 || 10;
  var hint = document.getElementById('t-rate-hint');
  if (hint) hint.textContent = "(\uAE30\uBCF8: ".concat(def, "%)");
  var payout = Math.round(principal * (1 + rate / 100));
  var el = document.getElementById('t-payout');
  if (el) el.textContent = payout > 0 ? "\uB9CC\uAE30 \uC218\uB839: ".concat(fmt(payout), " (\uC774\uC790 ").concat(fmt(payout - principal), ")") : '납입 원금을 입력하세요';
}
function doTeacherCreateSaving() {
  return _doTeacherCreateSaving.apply(this, arguments);
}
function _doTeacherCreateSaving() {
  _doTeacherCreateSaving = _asyncToGenerator(_regenerator().m(function _callee33() {
    var depositorNum, principal, days, rate, res, si;
    return _regenerator().w(function (_context33) {
      while (1) switch (_context33.p = _context33.n) {
        case 0:
          depositorNum = document.getElementById('t-depositor').value;
          principal = Number(document.getElementById('t-principal').value) || 0;
          days = parseInt(document.getElementById('t-days').value) || 15;
          rate = parseFloat(document.getElementById('t-rate-slider').value) || 0;
          if (!(!principal || principal <= 0)) {
            _context33.n = 1;
            break;
          }
          showMsg('t-saving-msg', '납입 원금을 입력하세요', false);
          return _context33.a(2);
        case 1:
          loading(true, '적금 개설 중...');
          _context33.p = 2;
          _context33.n = 3;
          return call('createSavingByTeacher', {
            depositorNum: depositorNum,
            principal: principal,
            days: days,
            rate: rate
          });
        case 3:
          res = _context33.v;
          if (res.ok) {
            _context33.n = 4;
            break;
          }
          showMsg('t-saving-msg', res.msg, false);
          return _context33.a(2);
        case 4:
          si = S.students.findIndex(function (s) {
            return String(s.num) === String(depositorNum);
          });
          if (si >= 0) S.students[si].balance = res.balance;
          document.getElementById('t-principal').value = '';
          tUpdateDepositorBal();
          tOnDaysChange();
          showMsg('t-saving-msg', '적금이 개설되었습니다!');
          _context33.n = 5;
          return renderSavings();
        case 5:
          renderDashboard();
        case 6:
          _context33.p = 6;
          loading(false);
          return _context33.f(6);
        case 7:
          return _context33.a(2);
      }
    }, _callee33, null, [[2,, 6, 7]]);
  }));
  return _doTeacherCreateSaving.apply(this, arguments);
}
function updateSavingsBadge() {
  var b = document.getElementById('savings-badge'),
    pb = document.getElementById('savings-pending-badge');
  if (S.pendingSavingsCount > 0) {
    if (b) {
      b.style.display = 'inline';
      b.textContent = S.pendingSavingsCount;
    }
    if (pb) {
      pb.style.display = 'inline';
      pb.textContent = S.pendingSavingsCount + '건 대기';
    }
  } else {
    if (b) b.style.display = 'none';
    if (pb) pb.style.display = 'none';
  }
}
function renderSavings() {
  return _renderSavings.apply(this, arguments);
}
function _renderSavings() {
  _renderSavings = _asyncToGenerator(_regenerator().m(function _callee34() {
    var savings, pending, active, done, totalP, totalExp, today, _t7;
    return _regenerator().w(function (_context34) {
      while (1) switch (_context34.p = _context34.n) {
        case 0:
          tInitForm();
          loading(true, '적금 목록 불러오는 중...');
          _context34.p = 1;
          _context34.n = 2;
          return call('getSavings', 'all');
        case 2:
          _t7 = _context34.v;
          if (_t7) {
            _context34.n = 3;
            break;
          }
          _t7 = [];
        case 3:
          savings = _t7;
          pending = savings.filter(function (s) {
            return s.status === '승인대기';
          });
          active = savings.filter(function (s) {
            return s.status === '진행중';
          });
          done = savings.filter(function (s) {
            return ['해약완료', '조기해약', '거절'].includes(s.status);
          });
          S.pendingSavingsCount = pending.length;
          updateSavingsBadge();
          totalP = active.reduce(function (sm, s) {
            return sm + Number(s.principal);
          }, 0);
          totalExp = active.reduce(function (sm, s) {
            return sm + Math.round(Number(s.principal) * (1 + Number(s.rate) / 100));
          }, 0);
          document.getElementById('savings-stats').innerHTML = "\n      <div class=\"stat\"><div class=\"stat-label\">\uC2B9\uC778 \uB300\uAE30</div><div class=\"stat-value\" style=\"color:var(--cy)\">".concat(pending.length, "\uAC74</div></div>\n      <div class=\"stat\"><div class=\"stat-label\">\uC9C4\uD589 \uC911 \uC801\uAE08</div><div class=\"stat-value\" style=\"color:#d97706\">").concat(active.length, "\uAC74</div></div>\n      <div class=\"stat\"><div class=\"stat-label\">\uB0A9\uC785 \uC6D0\uAE08 \uD569\uACC4</div><div class=\"stat-value\" style=\"color:#d97706;font-size:18px\">").concat(fmt(totalP), "</div></div>\n      <div class=\"stat\"><div class=\"stat-label\">\uB9CC\uAE30 \uC608\uC0C1 \uD569\uACC4</div><div class=\"stat-value green\" style=\"font-size:18px\">").concat(fmt(totalExp), "</div></div>");
          today = new Date().toISOString().slice(0, 10);
          document.getElementById('savings-pending-table').innerHTML = pending.length ? pending.map(function (s) {
            var _S$students$find3;
            var interest = Math.round(Number(s.principal) * (Number(s.rate) / 100));
            var staffName = ((_S$students$find3 = S.students.find(function (x) {
              return String(x.num) === String(s.bankStaffNum);
            })) === null || _S$students$find3 === void 0 ? void 0 : _S$students$find3.name) || s.bankStaffNum;
            return "<tr style=\"background:#fffbeb\">\n        <td><strong>".concat(s.depositorName, "</strong> (").concat(s.depositorNum, "\uBC88)</td>\n        <td style=\"color:#d97706;font-weight:600\">").concat(fmt(s.principal), "</td>\n        <td><strong style=\"color:#d97706\">").concat(s.rate, "%</strong></td><td>").concat(s.days, "\uC77C</td>\n        <td style=\"font-size:12px\">").concat(s.startDate, "</td><td style=\"font-size:12px\">").concat(s.maturityDate, "</td>\n        <td style=\"color:var(--c2)\">+").concat(fmt(interest), "</td>\n        <td style=\"font-size:12px\">").concat(staffName, "</td>\n        <td><div class=\"row-btns\">\n          <button class=\"btn btn-sm btn-green\" onclick=\"doApproveSaving(").concat(s.idx, ")\"><i class=\"ti ti-check\"></i> \uC2B9\uC778</button>\n          <button class=\"btn btn-sm btn-danger\" onclick=\"doRejectSaving(").concat(s.idx, ")\"><i class=\"ti ti-x\"></i> \uAC70\uC808</button>\n        </div></td></tr>");
          }).join('') : '<tr><td colspan="9" class="empty">대기 중인 적금 신청이 없습니다</td></tr>';
          document.getElementById('savings-active-table').innerHTML = active.length ? active.map(function (s) {
            var interest = Math.round(Number(s.principal) * (Number(s.rate) / 100));
            var isNear = String(s.maturityDate) <= today;
            return "<tr>\n        <td><strong>".concat(s.depositorName, "</strong> (").concat(s.depositorNum, "\uBC88)</td>\n        <td style=\"color:#d97706;font-weight:600\">").concat(fmt(s.principal), "</td>\n        <td>").concat(s.rate, "%</td><td>").concat(s.days, "\uC77C</td>\n        <td style=\"font-size:12px\">").concat(s.startDate, "</td>\n        <td style=\"font-size:12px;color:").concat(isNear ? 'var(--cd)' : 'inherit', ";font-weight:").concat(isNear ? '700' : '400', "\">").concat(s.maturityDate).concat(isNear ? ' ⚠' : '', "</td>\n        <td style=\"color:var(--c2)\">+").concat(fmt(interest), "</td>\n        <td>").concat(isNear ? '<span class="badge badge-red">만기도래</span>' : '<span class="badge badge-yellow">진행중</span>', "</td>\n        <td><button class=\"btn btn-sm btn-danger\" onclick=\"doCancelSaving(").concat(s.idx, ")\">\uC870\uAE30\uD574\uC57D</button></td></tr>");
          }).join('') : '<tr><td colspan="9" class="empty">진행 중인 적금이 없습니다</td></tr>';
          document.getElementById('savings-done-table').innerHTML = done.length ? done.map(function (s) {
            var paid = Number(s.paidAmount);
            var badge = s.status === '해약완료' ? 'badge-green' : s.status === '조기해약' ? 'badge-gray' : 'badge-red';
            return "<tr style=\"opacity:.8\">\n        <td>".concat(s.depositorName, " (").concat(s.depositorNum, "\uBC88)</td>\n        <td>").concat(fmt(s.principal), "</td><td>").concat(s.rate, "%</td><td>").concat(s.days, "\uC77C</td>\n        <td style=\"font-size:12px\">").concat(s.startDate, "</td><td style=\"font-size:12px\">").concat(s.maturityDate, "</td>\n        <td style=\"font-weight:600\">").concat(paid ? fmt(paid) : '-', "</td>\n        <td><span class=\"badge ").concat(badge, "\">").concat(s.status, "</span></td></tr>");
          }).join('') : '<tr><td colspan="8" class="empty">완료된 적금이 없습니다</td></tr>';
        case 4:
          _context34.p = 4;
          loading(false);
          return _context34.f(4);
        case 5:
          return _context34.a(2);
      }
    }, _callee34, null, [[1,, 4, 5]]);
  }));
  return _renderSavings.apply(this, arguments);
}
function doApproveSaving(_x14) {
  return _doApproveSaving.apply(this, arguments);
}
function _doApproveSaving() {
  _doApproveSaving = _asyncToGenerator(_regenerator().m(function _callee35(idx) {
    var res, fresh;
    return _regenerator().w(function (_context35) {
      while (1) switch (_context35.p = _context35.n) {
        case 0:
          if (confirm('이 적금을 승인하시겠습니까?\n승인 즉시 예금주 잔액에서 원금이 차감됩니다.')) {
            _context35.n = 1;
            break;
          }
          return _context35.a(2);
        case 1:
          loading(true);
          _context35.p = 2;
          _context35.n = 3;
          return call('approveSaving', idx);
        case 3:
          res = _context35.v;
          if (res.ok) {
            _context35.n = 4;
            break;
          }
          alert('⚠ ' + res.msg);
          return _context35.a(2);
        case 4:
          _context35.n = 5;
          return call('loadAll');
        case 5:
          fresh = _context35.v;
          S.students = fresh.students;
          S.ledger = fresh.ledger;
          S.pendingSavingsCount = fresh.pendingSavingsCount || 0;
          updateSavingsBadge();
          renderSavings();
          renderDashboard();
        case 6:
          _context35.p = 6;
          loading(false);
          return _context35.f(6);
        case 7:
          return _context35.a(2);
      }
    }, _callee35, null, [[2,, 6, 7]]);
  }));
  return _doApproveSaving.apply(this, arguments);
}
function doRejectSaving(_x15) {
  return _doRejectSaving.apply(this, arguments);
}
function _doRejectSaving() {
  _doRejectSaving = _asyncToGenerator(_regenerator().m(function _callee36(idx) {
    return _regenerator().w(function (_context36) {
      while (1) switch (_context36.p = _context36.n) {
        case 0:
          if (confirm('이 적금 신청을 거절하시겠습니까?')) {
            _context36.n = 1;
            break;
          }
          return _context36.a(2);
        case 1:
          loading(true);
          _context36.p = 2;
          _context36.n = 3;
          return call('rejectSaving', idx);
        case 3:
          _context36.n = 4;
          return renderSavings();
        case 4:
          _context36.p = 4;
          loading(false);
          return _context36.f(4);
        case 5:
          return _context36.a(2);
      }
    }, _callee36, null, [[2,, 4, 5]]);
  }));
  return _doRejectSaving.apply(this, arguments);
}
function doCancelSaving(_x16) {
  return _doCancelSaving.apply(this, arguments);
}
function _doCancelSaving() {
  _doCancelSaving = _asyncToGenerator(_regenerator().m(function _callee37(idx) {
    var fresh;
    return _regenerator().w(function (_context37) {
      while (1) switch (_context37.p = _context37.n) {
        case 0:
          if (confirm('조기 해약 시 이자 없이 원금만 반환됩니다.\n계속하시겠습니까?')) {
            _context37.n = 1;
            break;
          }
          return _context37.a(2);
        case 1:
          loading(true);
          _context37.p = 2;
          _context37.n = 3;
          return call('cancelSavingEarly', idx);
        case 3:
          _context37.n = 4;
          return call('loadAll');
        case 4:
          fresh = _context37.v;
          S.students = fresh.students;
          S.ledger = fresh.ledger;
          renderSavings();
          renderDashboard();
        case 5:
          _context37.p = 5;
          loading(false);
          return _context37.f(5);
        case 6:
          return _context37.a(2);
      }
    }, _callee37, null, [[2,, 5, 6]]);
  }));
  return _doCancelSaving.apply(this, arguments);
}
function openBankLogin() {
  document.getElementById('bank-login-num').value = '';
  document.getElementById('bank-login-msg').style.display = 'none';
  openModal('modal-bank-login');
}
function doBankLogin() {
  return _doBankLogin.apply(this, arguments);
}
function _doBankLogin() {
  _doBankLogin = _asyncToGenerator(_regenerator().m(function _callee38() {
    var num, asgn, perm, s;
    return _regenerator().w(function (_context38) {
      while (1) switch (_context38.p = _context38.n) {
        case 0:
          num = document.getElementById('bank-login-num').value.trim();
          if (num) {
            _context38.n = 1;
            break;
          }
          showMsg('bank-login-msg', '번호 입력', false);
          return _context38.a(2);
        case 1:
          loading(true);
          _context38.p = 2;
          asgn = S.assignments.find(function (a) {
            return String(a.studentNum) === String(num);
          }), perm = asgn ? S.bankPerms.find(function (p) {
            return p.jobName === asgn.jobName;
          }) : null;
          if (perm) {
            _context38.n = 3;
            break;
          }
          showMsg('bank-login-msg', '은행 권한이 없습니다.', false);
          return _context38.a(2);
        case 3:
          s = S.students.find(function (s) {
            return String(s.num) === String(num);
          });
          if (s) {
            _context38.n = 4;
            break;
          }
          showMsg('bank-login-msg', '학생 없음', false);
          return _context38.a(2);
        case 4:
          S.bankStaff = {
            studentNum: num,
            name: s.name,
            jobName: asgn.jobName,
            role: perm.role
          };
          closeModal('modal-bank-login');
          activateBankMode();
        case 5:
          _context38.p = 5;
          loading(false);
          return _context38.f(5);
        case 6:
          return _context38.a(2);
      }
    }, _callee38, null, [[2,, 5, 6]]);
  }));
  return _doBankLogin.apply(this, arguments);
}
function activateBankMode() {
  var bk = S.bankStaff;
  if (!bk) return;
  document.getElementById('bank-banner').classList.add('show');
  document.getElementById('bank-banner-name').textContent = "".concat(bk.name, " (").concat(bk.jobName, ") \uC740\uD589 \uCC3D\uAD6C \uC6B4\uC601 \uC911");
  document.getElementById('bank-banner-role').textContent = "\uC5ED\uD560: \uC740\uD589\uC9C1\uC6D0";
  lockSidebarForRole('bank');
  document.getElementById('nav-bank').style.display = 'flex';
  showPage('bank-mode');
}
function exitBankMode() {
  S.bankStaff = null;
  document.getElementById('bank-banner').classList.remove('show');
  document.getElementById('nav-bank').style.display = 'none';
  unlockSidebar();
  if (S.role === 'student') {
    document.getElementById('admin-screen').classList.remove('show');
    document.getElementById('student-screen').style.display = 'block';
  } else showPage('dashboard');
}
function openBankLoginFromStudent() {
  return _openBankLoginFromStudent.apply(this, arguments);
}
function _openBankLoginFromStudent() {
  _openBankLoginFromStudent = _asyncToGenerator(_regenerator().m(function _callee39() {
    var d, s, data;
    return _regenerator().w(function (_context39) {
      while (1) switch (_context39.p = _context39.n) {
        case 0:
          d = S.loggedInStudent;
          if (!(!d || !d.bankRole)) {
            _context39.n = 1;
            break;
          }
          return _context39.a(2);
        case 1:
          s = d.student;
          S.bankStaff = {
            studentNum: s.num,
            name: s.name,
            jobName: d.job ? d.job.name : '',
            role: d.bankRole
          };
          loading(true, '은행 준비 중...');
          _context39.p = 2;
          _context39.n = 3;
          return call('loadAll');
        case 3:
          data = _context39.v;
          S.students = data.students || [];
          S.jobs = data.jobs || [];
          S.assignments = data.assignments || [];
          S.bankPerms = data.bankPerms || [];
          if (data.bankSettings) S.bankSettings = data.bankSettings;
          document.getElementById('student-screen').style.display = 'none';
          document.getElementById('admin-screen').classList.add('show');
          lockSidebarForRole('bank');
          document.getElementById('bank-banner').classList.add('show');
          document.getElementById('bank-banner-name').textContent = "".concat(s.name, " (").concat(d.job ? d.job.name : '은행', ") \uC740\uD589 \uCC3D\uAD6C \uC6B4\uC601 \uC911");
          document.getElementById('bank-banner-role').textContent = '역할: 은행직원';
          document.getElementById('nav-bank').style.display = 'flex';
          showPage('bank-mode');
        case 4:
          _context39.p = 4;
          loading(false);
          return _context39.f(4);
        case 5:
          return _context39.a(2);
      }
    }, _callee39, null, [[2,, 4, 5]]);
  }));
  return _openBankLoginFromStudent.apply(this, arguments);
}
function onBankDaysChange() {
  var days = parseInt(document.getElementById('bank-days').value) || 15;
  var def = days === 15 ? S.bankSettings.rate15 || 5 : S.bankSettings.rate30 || 10;
  document.getElementById('bank-rate-slider').value = def;
  onRateSliderInput(def);
}
function onRateSliderInput(val) {
  var v = parseFloat(val) || 0;
  document.getElementById('rate-big-display').textContent = v.toFixed(1) + '%';
  document.querySelectorAll('.rate-preset-btn').forEach(function (b) {
    return b.classList.toggle('active', parseFloat(b.textContent) === v);
  });
  updateBankCalc();
}
function setRatePreset(r) {
  document.getElementById('bank-rate-slider').value = r;
  onRateSliderInput(r);
}
function updateBankCalc() {
  var _document$getElementB4, _document$getElementB5;
  var slider = document.getElementById('bank-rate-slider');
  if (!slider) return;
  var days = parseInt((_document$getElementB4 = document.getElementById('bank-days')) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4.value) || 15;
  var hint = document.getElementById('bank-rate-hint');
  if (hint) {
    var def = days === 15 ? S.bankSettings.rate15 || 5 : S.bankSettings.rate30 || 10;
    hint.textContent = "(\uAE30\uBCF8: ".concat(def, "%)");
  }
  var principal = Number((_document$getElementB5 = document.getElementById('bank-principal')) === null || _document$getElementB5 === void 0 ? void 0 : _document$getElementB5.value) || 0;
  var rate = parseFloat(slider.value) || 0;
  var payout = Math.round(principal * (1 + rate / 100));
  var payoutEl = document.getElementById('bank-payout');
  if (payoutEl) payoutEl.textContent = payout > 0 ? "\uB9CC\uAE30 \uC218\uB839: ".concat(fmt(payout), " (\uC774\uC790 ").concat(fmt(payout - principal), ")") : '납입 원금을 입력하세요';
}
function updateBankDepositorBalance() {
  var _document$getElementB6;
  var num = (_document$getElementB6 = document.getElementById('bank-depositor')) === null || _document$getElementB6 === void 0 ? void 0 : _document$getElementB6.value,
    s = S.students.find(function (s) {
      return String(s.num) === String(num);
    });
  var el = document.getElementById('bank-depositor-bal');
  if (el) el.value = s ? fmt(s.balance) : '';
}
function renderBankMode() {
  var bk = S.bankStaff;
  if (!bk) return;
  document.getElementById('bank-mode-title').textContent = "".concat(bk.name, "\uC758 \uC740\uD589 \uCC3D\uAD6C");
  document.getElementById('bank-depositor').innerHTML = S.students.map(function (s) {
    var isSelf = String(s.num) === String(bk.studentNum);
    return "<option value=\"" + s.num + "\">" + s.num + "번 " + s.name
         + (isSelf ? " (나)" : "") + " - " + fmt(s.balance) + "</option>";
  }).join('');
  updateBankDepositorBalance();
  onBankDaysChange();
  renderBankMySavings();
}
function doCreateSaving() {
  return _doCreateSaving.apply(this, arguments);
}
function _doCreateSaving() {
  _doCreateSaving = _asyncToGenerator(_regenerator().m(function _callee40() {
    var bk, depositorNum, principal, days, rate, res;
    return _regenerator().w(function (_context40) {
      while (1) switch (_context40.p = _context40.n) {
        case 0:
          bk = S.bankStaff;
          if (bk) {
            _context40.n = 1;
            break;
          }
          return _context40.a(2);
        case 1:
          depositorNum = document.getElementById('bank-depositor').value;
          principal = Number(document.getElementById('bank-principal').value) || 0;
          days = parseInt(document.getElementById('bank-days').value) || 15;
          rate = parseFloat(document.getElementById('bank-rate-slider').value) || 0;
          if (!(!principal || principal <= 0)) {
            _context40.n = 2;
            break;
          }
          showMsg('bank-create-msg', '납입 원금을 입력하세요', false);
          return _context40.a(2);
        case 2:
          loading(true, '적금 신청 중...');
          _context40.p = 3;
          _context40.n = 4;
          return call('createSaving', {
            bankStaffNum: bk.studentNum,
            depositorNum: depositorNum,
            principal: principal,
            days: days,
            rate: rate
          });
        case 4:
          res = _context40.v;
          if (res.ok) {
            _context40.n = 5;
            break;
          }
          showMsg('bank-create-msg', res.msg, false);
          return _context40.a(2);
        case 5:
          document.getElementById('bank-principal').value = '';
          onBankDaysChange();
          showMsg('bank-create-msg', '✓ 적금 신청 완료! 교사 승인 후 적금이 시작됩니다.');
          renderBankMySavings();
        case 6:
          _context40.p = 6;
          loading(false);
          return _context40.f(6);
        case 7:
          return _context40.a(2);
      }
    }, _callee40, null, [[3,, 6, 7]]);
  }));
  return _doCreateSaving.apply(this, arguments);
}
function renderBankMySavings() {
  return _renderBankMySavings.apply(this, arguments);
}
function _renderBankMySavings() {
  _renderBankMySavings = _asyncToGenerator(_regenerator().m(function _callee41() {
    var bk, savings, mine, today, _t8, _t9;
    return _regenerator().w(function (_context41) {
      while (1) switch (_context41.p = _context41.n) {
        case 0:
          bk = S.bankStaff;
          if (bk) {
            _context41.n = 1;
            break;
          }
          return _context41.a(2);
        case 1:
          _context41.p = 1;
          _context41.n = 2;
          return call('getSavings', 'all');
        case 2:
          _t8 = _context41.v;
          if (_t8) {
            _context41.n = 3;
            break;
          }
          _t8 = [];
        case 3:
          savings = _t8;
          mine = savings.filter(function (s) {
            return String(s.bankStaffNum) === String(bk.studentNum);
          });
          today = new Date().toISOString().slice(0, 10);
          document.getElementById('bank-my-savings').innerHTML = mine.length ? mine.map(function (s) {
            var interest = Math.round(Number(s.principal) * (Number(s.rate) / 100));
            var isNear = s.status === '진행중' && String(s.maturityDate) <= today;
            var badgeMap = {
              '승인대기': 'badge-yellow',
              '진행중': isNear ? 'badge-red' : 'badge-blue',
              '해약완료': 'badge-green',
              '조기해약': 'badge-gray',
              '거절': 'badge-red'
            };
            return "<tr>\n        <td><strong>".concat(s.depositorName, "</strong> (").concat(s.depositorNum, "\uBC88)</td>\n        <td style=\"color:#d97706;font-weight:600\">").concat(fmt(s.principal), "</td>\n        <td><strong>").concat(s.rate, "%</strong></td><td>").concat(s.days, "\uC77C</td>\n        <td style=\"font-size:12px\">").concat(s.startDate, "</td><td style=\"font-size:12px\">").concat(s.maturityDate, "</td>\n        <td style=\"color:var(--c2)\">+").concat(fmt(interest), "</td>\n        <td><span class=\"badge ").concat(badgeMap[s.status] || 'badge-gray', "\">").concat(s.status, "</span></td></tr>");
          }).join('') : '<tr><td colspan="8" class="empty">신청한 적금이 없습니다</td></tr>';
          _context41.n = 5;
          break;
        case 4:
          _context41.p = 4;
          _t9 = _context41.v;
        case 5:
          return _context41.a(2);
      }
    }, _callee41, null, [[1, 4]]);
  }));
  return _renderBankMySavings.apply(this, arguments);
}
function lockSidebarForRole(mode) {
  S.roleLocked = mode;
  var sidebar = document.querySelector('.sidebar');
  sidebar.querySelectorAll('.nav-item').forEach(function (el) {
    return el.classList.add('locked');
  });
  sidebar.querySelectorAll('.nav-section').forEach(function (el) {
    return el.classList.add('locked');
  });
  if (mode === 'shop') {
    var ns = document.getElementById('nav-sk');
    if (ns) {
      ns.style.display = 'flex';
      ns.classList.add('show');
      ns.classList.remove('locked');
    }
    var nb0 = document.getElementById('nav-bank');
    if (nb0) nb0.style.display = 'none';
  } else if (mode === 'bank') {
    var nb = document.getElementById('nav-bank');
    if (nb) {
      nb.style.display = 'flex';
      nb.classList.add('show');
      nb.classList.remove('locked');
    }
    var ns0 = document.getElementById('nav-sk');
    if (ns0) ns0.style.display = 'none';
  }
  if (!document.getElementById('role-lock-notice')) {
    var notice = document.createElement('div');
    notice.id = 'role-lock-notice';
    notice.className = 'role-lock-notice';
    notice.innerHTML = '<i class="ti ti-lock"></i> 역할 모드 중에는 다른 메뉴를 사용할 수 없습니다.';
    sidebar.appendChild(notice);
  }
  document.querySelectorAll('.topbar-right .topbar-btn').forEach(function (b) {
    if (b.textContent.indexOf('급여') >= 0) b.style.display = 'none';
  });
  var monthSel = document.getElementById('curMonth');
  if (monthSel) monthSel.style.display = 'none';
}
function unlockSidebar() {
  S.roleLocked = null;
  var sidebar = document.querySelector('.sidebar');
  sidebar.querySelectorAll('.nav-item').forEach(function (el) {
    return el.classList.remove('locked');
  });
  sidebar.querySelectorAll('.nav-section').forEach(function (el) {
    return el.classList.remove('locked');
  });
  var notice = document.getElementById('role-lock-notice');
  if (notice) notice.remove();
  var ns = document.getElementById('nav-sk');
  if (ns) { ns.style.display = 'none'; ns.classList.remove('show'); }
  var nb = document.getElementById('nav-bank');
  if (nb) { nb.style.display = 'none'; nb.classList.remove('show'); }
  document.querySelectorAll('.topbar-right .topbar-btn').forEach(function (b) {
    return b.style.display = '';
  });
  var monthSel = document.getElementById('curMonth');
  if (monthSel) monthSel.style.display = '';
}
function convertGDriveUrl(url) {
  var m = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  return m ? "https://drive.google.com/uc?export=view&id=".concat(m[1]) : url;
}
function applyLoginSettings(s) {
  if (!s) return;
  document.getElementById('login-title-text').textContent = s.title || '돈워리!';
  document.getElementById('login-subtitle-text').textContent = s.subtitle || '우리 반 경제를 함께 운영해요';
  var titleEls = [document.getElementById('app-title-admin'), document.getElementById('app-title-student')];
  titleEls.forEach(function (el) {
    if (el) el.textContent = s.title || '돈워리!';
  });
  document.title = s.title || '돈워리!';
  var wrap = document.getElementById('login-logo-icon-wrap');
  if (s.logoType === 'url' && s.logoUrl) {
    var url = convertGDriveUrl(s.logoUrl);
    wrap.innerHTML = '';
    var im = document.createElement('img');
    im.src = url;
    im.alt = 'logo';
    im.style.cssText = 'width:72px;height:72px;object-fit:contain;border-radius:14px;margin-bottom:8px;display:block;margin-left:auto;margin-right:auto';
    wrap.appendChild(im);
  } else if (s.logoType === 'emoji' && s.emoji) {
    wrap.innerHTML = "<span style=\"font-size:54px;display:block;margin-bottom:8px;line-height:1\">".concat(s.emoji, "</span>");
  } else {
    wrap.innerHTML = DW_MARK;
  }
  if (s.theme) { try { applyTheme(s.theme); } catch (e) {} }
  try { applyIconColor(s.iconColor || 'theme'); } catch (e) {}
  S.loginSettings = s;
}
function renderSettings() {
  var s = S.loginSettings || {};
  document.getElementById('cfg-title').value = s.title || '';
  document.getElementById('cfg-subtitle').value = s.subtitle || '';
  var logoType = s.logoType || 'default';
  document.querySelectorAll('input[name="cfg-logo-type"]').forEach(function (r) {
    return r.checked = r.value === logoType;
  });
  document.getElementById('cfg-emoji').value = s.emoji || '';
  document.getElementById('cfg-logo-url').value = s.logoUrl || '';
  document.getElementById('cfg-emoji-wrap').style.display = logoType === 'emoji' ? 'block' : 'none';
  document.getElementById('cfg-url-wrap').style.display = logoType === 'url' ? 'block' : 'none';
  updateSettingsPreview();
  try { renderThemePicker(); } catch (e) {}
  try { renderIconPicker(); } catch (e) {}
  try { applyTheme(S.theme || (S.loginSettings && S.loginSettings.theme) || 'blue'); } catch (e) {}
}
function onCfgLogoTypeChange() {
  var _document$querySelect;
  var type = ((_document$querySelect = document.querySelector('input[name="cfg-logo-type"]:checked')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value) || 'default';
  document.getElementById('cfg-emoji-wrap').style.display = type === 'emoji' ? 'block' : 'none';
  document.getElementById('cfg-url-wrap').style.display = type === 'url' ? 'block' : 'none';
  updateSettingsPreview();
}
function pickEmoji(e) {
  document.getElementById('cfg-emoji').value = e;
  updateSettingsPreview();
}
function updateSettingsPreview() {
  var _document$querySelect2;
  var title = document.getElementById('cfg-title').value || '돈워리!';
  var subtitle = document.getElementById('cfg-subtitle').value || '우리 반 경제를 함께 운영해요';
  var type = ((_document$querySelect2 = document.querySelector('input[name="cfg-logo-type"]:checked')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.value) || 'default';
  var emoji = document.getElementById('cfg-emoji').value;
  var url = document.getElementById('cfg-logo-url').value;
  document.getElementById('preview-title').textContent = title;
  document.getElementById('preview-subtitle').textContent = subtitle;
  var pw = document.getElementById('preview-logo-wrap');
  if (type === 'url' && url) {
    var direct = convertGDriveUrl(url);
    pw.innerHTML = '';
    var im2 = document.createElement('img');
    im2.src = direct;
    im2.alt = 'logo';
    im2.style.cssText = 'width:56px;height:56px;object-fit:contain;border-radius:10px;margin-bottom:6px;display:block;margin-left:auto;margin-right:auto';
    pw.appendChild(im2);
  } else if (type === 'emoji' && emoji) {
    pw.innerHTML = "<span style=\"font-size:44px;display:block;margin-bottom:6px;line-height:1\">".concat(emoji, "</span>");
  } else {
    pw.innerHTML = DW_MARK_SM;
  }
}
function doSaveSettings() {
  return _doSaveSettings.apply(this, arguments);
}
function _doSaveSettings() {
  _doSaveSettings = _asyncToGenerator(_regenerator().m(function _callee42() {
    var _document$querySelect3;
    var settings, res;
    return _regenerator().w(function (_context42) {
      while (1) switch (_context42.p = _context42.n) {
        case 0:
          settings = {
            title: document.getElementById('cfg-title').value.trim() || '돈워리!',
            subtitle: document.getElementById('cfg-subtitle').value.trim() || '우리 반 경제를 함께 운영해요',
            logoType: ((_document$querySelect3 = document.querySelector('input[name="cfg-logo-type"]:checked')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.value) || 'default',
            emoji: document.getElementById('cfg-emoji').value.trim(),
            logoUrl: document.getElementById('cfg-logo-url').value.trim(),
            theme: S.theme || (S.loginSettings && S.loginSettings.theme) || 'blue',
            iconColor: S.iconColor || (S.loginSettings && S.loginSettings.iconColor) || 'theme'
          };
          loading(true, '저장 중...');
          _context42.p = 1;
          _context42.n = 2;
          return call('saveLoginSettings', settings);
        case 2:
          res = _context42.v;
          if (res.ok) {
            _context42.n = 3;
            break;
          }
          showMsg('settings-msg', '저장 실패', false);
          return _context42.a(2);
        case 3:
          S.loginSettings = settings;
          applyLoginSettings(settings);
          showMsg('settings-msg', '저장 완료! 로그인 화면에 즉시 적용되었습니다.');
        case 4:
          _context42.p = 4;
          loading(false);
          return _context42.f(4);
        case 5:
          return _context42.a(2);
      }
    }, _callee42, null, [[1,, 4, 5]]);
  }));
  return _doSaveSettings.apply(this, arguments);
}
function doResetSettings() {
  return _doResetSettings.apply(this, arguments);
}
function _doResetSettings() {
  _doResetSettings = _asyncToGenerator(_regenerator().m(function _callee43() {
    var defaults;
    return _regenerator().w(function (_context43) {
      while (1) switch (_context43.p = _context43.n) {
        case 0:
          if (confirm('기본값으로 초기화하시겠습니까?')) {
            _context43.n = 1;
            break;
          }
          return _context43.a(2);
        case 1:
          defaults = {
            theme: 'blue',
            iconColor: 'theme',
            title: '돈워리!',
            subtitle: '우리 반 경제를 함께 운영해요',
            logoType: 'default',
            emoji: '',
            logoUrl: ''
          };
          loading(true);
          _context43.p = 2;
          _context43.n = 3;
          return call('saveLoginSettings', defaults);
        case 3:
          S.loginSettings = defaults;
          applyLoginSettings(defaults);
          renderSettings();
          showMsg('settings-msg', '기본값으로 초기화되었습니다.');
        case 4:
          _context43.p = 4;
          loading(false);
          return _context43.f(4);
        case 5:
          return _context43.a(2);
      }
    }, _callee43, null, [[2,, 4, 5]]);
  }));
  return _doResetSettings.apply(this, arguments);
}
function saveSession(role) {
  var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  try {
    sessionStorage.setItem('cls_session', JSON.stringify(_objectSpread({
      role: role
    }, extra)));
  } catch (e) {}
}
function clearSession() {
  try {
    sessionStorage.removeItem('cls_session');
  } catch (e) {}
}
function initApp() {
  return _initApp.apply(this, arguments);
}
function _initApp() {
  _initApp = _asyncToGenerator(_regenerator().m(function _callee44() {
    var session, sessionTimer, d, data, _t0;
    return _regenerator().w(function (_context44) {
      while (1) switch (_context44.p = _context44.n) {
        case 0:
          loadStudentList();
          session = null;
          try {
            session = JSON.parse(sessionStorage.getItem('cls_session') || 'null');
          } catch (e) {}
          if (session) {
            _context44.n = 1;
            break;
          }
          return _context44.a(2);
        case 1:
          loading(true, '세션 복원 중...');
          sessionTimer = setTimeout(function () {
            clearSession();
            loading(false);
          }, 12000);
          _context44.p = 2;
          if (!(session.role === 'teacher')) {
            _context44.n = 4;
            break;
          }
          _context44.n = 3;
          return call('loadAll');
        case 3:
          d = _context44.v;
          clearTimeout(sessionTimer);
          S.role = 'teacher';
          S.students = d.students || [];
          S.jobs = d.jobs || [];
          S.assignments = d.assignments || [];
          S.salaryCfg = d.salaryCfg || [];
          S.items = d.items || [];
          S.shopPerms = d.shopPerms || [];
          S.ledger = d.ledger || [];
          S.pendingCount = d.pendingCount || 0;
          S.bankPerms = d.bankPerms || [];
          if (d.bankSettings) S.bankSettings = d.bankSettings;
          S.pendingSavingsCount = d.pendingSavingsCount || 0;
      S.treasuryBalance = d.treasuryBalance || 0;
      S.suggestionCount = d.suggestionCount || 0;
      try { updateSugBadge(); } catch (e) {}
          if (d.loginSettings) {
            S.loginSettings = d.loginSettings;
            applyLoginSettings(d.loginSettings);
          }
          enterAdminMode();
          _context44.n = 6;
          break;
        case 4:
          if (!(session.role === 'student' && session.studentNum)) {
            _context44.n = 6;
            break;
          }
          _context44.n = 5;
          return call('refreshStudentData', session.studentNum);
        case 5:
          data = _context44.v;
          clearTimeout(sessionTimer);
          if (data && data.student) {
            S.role = 'student';
            S.loggedInStudent = data;
            S.month = nowMonth();
            enterStudentMode();
          } else {
            clearSession();
          }
        case 6:
          _context44.n = 8;
          break;
        case 7:
          _context44.p = 7;
          _t0 = _context44.v;
          clearTimeout(sessionTimer);
          clearSession();
        case 8:
          _context44.p = 8;
          loading(false);
          return _context44.f(8);
        case 9:
          return _context44.a(2);
      }
    }, _callee44, null, [[2, 7, 8, 9]]);
  }));
  return _initApp.apply(this, arguments);
}
window.onload = function () {
  try { startClock(); } catch (e) {}
  try { applyCurrentMonth(); } catch (e) {}
  return initApp();
};

// ── 복원: 은행 권한 렌더링 ──────────────────────────────
function renderBankPerms() {
  var r15 = document.getElementById('bank-rate15');
  var r30 = document.getElementById('bank-rate30');
  if (r15) r15.value = (S.bankSettings && S.bankSettings.rate15) || 5;
  if (r30) r30.value = (S.bankSettings && S.bankSettings.rate30) || 10;

  var perms = S.bankPerms || [];
  var assigns = S.assignments || [];
  var studs = S.students || [];
  var rows = '';
  for (var i = 0; i < perms.length; i++) {
    var p = perms[i];
    var names = '';
    for (var k = 0; k < assigns.length; k++) {
      if (assigns[k].jobName !== p.jobName) continue;
      for (var m = 0; m < studs.length; m++) {
        if (String(studs[m].num) === String(assigns[k].studentNum)) {
          names += '<span class="tag-s">' + studs[m].num + '번 ' + studs[m].name + '</span>';
        }
      }
    }
    if (!names) names = '<span style="font-size:11px;color:var(--muted)">없음</span>';
    rows += '<tr><td><strong>' + p.jobName + '</strong></td>'
          + '<td><span class="badge badge-yellow">' + p.role + '</span></td>'
          + '<td>' + names + '</td>'
          + '<td><div class="row-btns">'
          + '<button class="btn btn-sm" onclick="openBankPermModal(' + i + ')"><i class="ti ti-edit"></i></button>'
          + '<button class="btn btn-sm btn-danger" onclick="doDeleteBankPerm(' + i + ')"><i class="ti ti-trash"></i></button>'
          + '</div></td></tr>';
  }
  if (!rows) rows = '<tr><td colspan="4" class="empty">등록된 은행 권한이 없습니다</td></tr>';
  var tb = document.getElementById('bankperm-table');
  if (tb) tb.innerHTML = rows;
}

// ── 복원: 상점지기 화면 렌더링 ───────────────────────────
function renderSkStore() {
  var sk = S.shopkeeper;
  if (!sk) return;
  var p = sk.perms || {};
  var items = S.items || [];
  var studs = S.students || [];
  var allowAll = (p.allowedCategories || []).indexOf('전체') >= 0;

  var vis = [];
  for (var i = 0; i < items.length; i++) {
    var cat = items[i].category || '기타';
    if (allowAll || (p.allowedCategories || []).indexOf(cat) >= 0) vis.push(i);
  }

  var t = document.getElementById('sk-store-title');
  if (t) t.textContent = sk.name + '의 상점';

  var buyerSel = document.getElementById('sk-buy-student');
  if (buyerSel) {
    var bo = '';
    for (var a = 0; a < studs.length; a++) {
      var isSelf = String(studs[a].num) === String(sk.studentNum);
      bo += '<option value="' + studs[a].num + '">' + studs[a].num + '번 ' + studs[a].name
          + (isSelf ? ' (나)' : '') + ' - ' + fmt(studs[a].balance) + '</option>';
    }
    buyerSel.innerHTML = bo;
  }

  var itemSel = document.getElementById('sk-buy-item');
  if (itemSel) {
    var io = '';
    for (var b = 0; b < vis.length; b++) {
      var ri = vis[b], it = items[ri];
      io += '<option value="' + ri + '">' + it.name + ' [' + (it.category || '기타') + '] - '
          + fmt(it.price) + ' (재고:' + (it.stock < 0 ? '무제한' : it.stock) + ')</option>';
    }
    itemSel.innerHTML = io;
  }
  if (typeof skUpdatePrice === 'function') skUpdatePrice();

  var svEl = document.getElementById('sk-stock-view');
  if (svEl) {
    var sv = '';
    for (var v = 0; v < vis.length; v++) {
      var itv = items[vis[v]];
      var st = itv.stock;
      var badge, stockTxt;
      if (st < 0) { badge = '<span class="badge badge-blue">무제한</span>'; stockTxt = '무제한'; }
      else if (st === 0) { badge = '<span class="badge badge-red">품절</span>'; stockTxt = '0개'; }
      else if (st <= 3) { badge = '<span class="badge badge-yellow">부족</span>'; stockTxt = st + '개'; }
      else { badge = '<span class="badge badge-green">충분</span>'; stockTxt = st + '개'; }
      sv += '<tr><td><strong>' + itv.name + '</strong></td>'
          + '<td><span class="badge badge-gray">' + (itv.category || '기타') + '</span></td>'
          + '<td style="color:var(--cy);font-weight:600">' + fmt(itv.price) + '</td>'
          + '<td style="font-weight:600">' + stockTxt + '</td>'
          + '<td>' + badge + '</td></tr>';
    }
    if (!sv) sv = '<tr><td colspan="5" class="empty">판매 가능한 물품이 없습니다</td></tr>';
    svEl.innerHTML = sv;
  }

  var priceSec = document.getElementById('sk-price-section');
  if (priceSec) {
    priceSec.style.display = p.canChangePrice ? 'block' : 'none';
    if (p.canChangePrice) {
      var ph = '';
      for (var c1 = 0; c1 < vis.length; c1++) {
        var ri1 = vis[c1], it1 = items[ri1];
        ph += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap">'
            + '<span style="min-width:120px;font-weight:600">' + it1.name + '</span>'
            + '<span class="badge badge-gray">' + (it1.category || '기타') + '</span>'
            + '<div class="pw-row-edit"><input type="number" id="sk-price-' + ri1 + '" value="' + it1.price + '" style="width:100px">'
            + '<button class="btn btn-sm btn-purple" onclick="skChangePrice(' + ri1 + ')">변경</button></div></div>';
      }
      if (!ph) ph = '<div class="empty">관리 가능한 물품이 없습니다</div>';
      var pl = document.getElementById('sk-price-list');
      if (pl) pl.innerHTML = ph;
    }
  }

  var stockSec = document.getElementById('sk-stock-section');
  if (stockSec) {
    stockSec.style.display = p.canManageStock ? 'block' : 'none';
    if (p.canManageStock) {
      var sh2 = '';
      for (var c2 = 0; c2 < vis.length; c2++) {
        var ri2 = vis[c2], it2 = items[ri2];
        sh2 += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap">'
             + '<span style="min-width:120px;font-weight:600">' + it2.name + '</span>'
             + '<span class="badge badge-gray">재고:' + (it2.stock < 0 ? '무제한' : it2.stock) + '</span>'
             + '<div class="pw-row-edit"><input type="number" id="sk-stock-' + ri2 + '" value="' + it2.stock + '" style="width:100px">'
             + '<button class="btn btn-sm btn-purple" onclick="skChangeStock(' + ri2 + ')">변경</button></div></div>';
      }
      if (!sh2) sh2 = '<div class="empty">관리 가능한 물품이 없습니다</div>';
      var sl = document.getElementById('sk-stock-list');
      if (sl) sl.innerHTML = sh2;
    }
  }

  var fullSec = document.getElementById('sk-full-section');
  if (fullSec) {
    fullSec.style.display = p.canFullManage ? 'block' : 'none';
    if (p.canFullManage) {
      var fh = '';
      for (var c3 = 0; c3 < vis.length; c3++) {
        var ri3 = vis[c3], it3 = items[ri3];
        fh += '<tr><td><strong>' + it3.name + '</strong></td>'
            + '<td><span class="badge badge-gray">' + (it3.category || '기타') + '</span></td>'
            + '<td style="color:var(--cy);font-weight:600">' + fmt(it3.price) + '</td>'
            + '<td>' + (it3.stock < 0 ? '무제한' : it3.stock) + '</td>'
            + '<td><div class="row-btns">'
            + '<button class="btn btn-sm" onclick="openItemModal(' + ri3 + ',true)"><i class="ti ti-edit"></i></button>'
            + '<button class="btn btn-sm btn-danger" onclick="doDeleteItem(' + ri3 + ',true)"><i class="ti ti-trash"></i></button>'
            + '</div></td></tr>';
      }
      if (!fh) fh = '<tr><td colspan="5" class="empty">물품이 없습니다</td></tr>';
      var ft = document.getElementById('sk-full-table');
      if (ft) ft.innerHTML = fh;
    }
  }

  var today = new Date().toISOString().slice(0, 10);
  var led = S.ledger || [];
  var lh = '';
  for (var d = 0; d < led.length; d++) {
    var l = led[d];
    if (l.type !== '물품구입' || String(l.date) !== today) continue;
    lh += '<tr><td style="font-size:12px">' + l.date + '</td><td>' + l.studentName + '</td>'
        + '<td style="font-size:12px">' + l.detail + '</td>'
        + '<td style="color:var(--cd);font-weight:600">' + fmt(Math.abs(l.amount)) + '</td></tr>';
  }
  if (!lh) lh = '<tr><td colspan="4" class="empty">오늘 판매 내역이 없습니다</td></tr>';
  var lt = document.getElementById('sk-ledger-today');
  if (lt) lt.innerHTML = lh;
}


// ── 복원: 상점지기 판매 금액 자동 계산 ──────────────────
function skUpdatePrice() {
  var itemSel = document.getElementById('sk-buy-item');
  var priceEl = document.getElementById('sk-buy-price');
  if (!itemSel || !priceEl) return;
  var ri = parseInt(itemSel.value, 10);
  if (isNaN(ri)) { priceEl.value = ''; return; }
  var qEl = document.getElementById('sk-buy-qty');
  var qty = parseInt(qEl ? qEl.value : 1, 10);
  if (isNaN(qty) || qty < 1) qty = 1;
  var it = (S.items || [])[ri];
  priceEl.value = it ? (it.price * qty) : '';
}

// ── 복원: 상점지기 판매 처리 ────────────────────────────
function skDoBuy() {
  var sk = S.shopkeeper;
  if (!sk) return;
  var bn = document.getElementById('sk-buy-student').value;
  var ri = parseInt(document.getElementById('sk-buy-item').value, 10);
  var qty = parseInt(document.getElementById('sk-buy-qty').value, 10);
  if (isNaN(qty) || qty < 1) qty = 1;
  if (isNaN(ri)) { showMsg('sk-buy-msg', '물품을 선택하세요', false); return; }

  loading(true, '판매 처리 중...');
  call('processBuyByShopkeeper', {
    shopkeeperNum: sk.studentNum, buyerNum: bn, itemIdx: ri, qty: qty, month: S.month
  }).then(function (res) {
    if (!res || !res.ok) {
      showMsg('sk-buy-msg', (res && res.msg) || '판매에 실패했습니다', false);
      return null;
    }
    for (var i = 0; i < S.students.length; i++) {
      if (String(S.students[i].num) === String(bn)) S.students[i].balance = res.balance;
    }
    if (S.items[ri] && S.items[ri].stock >= 0) S.items[ri].stock -= qty;
    var buyer = null;
    for (var j = 0; j < S.students.length; j++) {
      if (String(S.students[j].num) === String(bn)) buyer = S.students[j];
    }
    showMsg('sk-buy-msg', '판매 완료! ' + (buyer ? buyer.name : '') + ' 잔액: ' + fmt(res.balance));
    return call('getLedger', 'all');
  }).then(function (led) {
    if (led) S.ledger = led;
    renderSkStore();
  })['catch'](function (err) {
    showMsg('sk-buy-msg', '오류: ' + (err && err.message ? err.message : err), false);
  }).then(function () {
    loading(false);
  });
}


// ══════════════════════════════════════════════
//  학생 대시보드 내 역할 업무 (상점 / 은행)
// ══════════════════════════════════════════════
var stRole = { items: [], students: [], perms: null, hasBank: false };

function stLoadRoleData() {
  var d = S.loggedInStudent;
  if (!d) return;
  var hasShop = d.shopPerms && d.shopPerms.length > 0;
  var hasBank = !!d.bankRole;
  document.getElementById('st-shop-card').style.display = hasShop ? 'block' : 'none';
  document.getElementById('st-bank-card').style.display = hasBank ? 'block' : 'none';
  if (!hasShop && !hasBank) return;

  if (hasShop) {
    var types = [], cats = [];
    for (var i = 0; i < d.shopPerms.length; i++) {
      types.push(d.shopPerms[i].perm);
      cats.push(d.shopPerms[i].category);
    }
    var canFull = types.indexOf('전체관리') >= 0;
    stRole.perms = {
      canSell: true,
      canChangePrice: canFull || types.indexOf('가격변경') >= 0,
      canManageStock: canFull || types.indexOf('재고관리') >= 0,
      canFullManage: canFull,
      allowedCategories: cats.indexOf('전체') >= 0 ? ['전체'] : cats
    };
    document.getElementById('st-shop-role').textContent = types.join(' · ');
  }
  stRole.hasBank = hasBank;

  call('loadAll').then(function (data) {
    if (!data) return;
    stRole.students = data.students || [];
    stRole.items = data.items || [];
    S.ledger = data.ledger || [];
    if (data.bankSettings) S.bankSettings = data.bankSettings;
    if (hasShop) stRenderShop();
    if (hasBank) stRenderBank();
  })['catch'](function (e) {
    try { console.error('역할 데이터 로드 실패:', e); } catch (x) {}
  });
}

// ── 상점 ──────────────────────────────────────
function stVisibleItems() {
  var p = stRole.perms || { allowedCategories: [] };
  var all = p.allowedCategories.indexOf('전체') >= 0;
  var out = [];
  for (var i = 0; i < stRole.items.length; i++) {
    var cat = stRole.items[i].category || '기타';
    if (all || p.allowedCategories.indexOf(cat) >= 0) out.push(i);
  }
  return out;
}

function stRenderShop() {
  var me = S.loggedInStudent.student;
  var vis = stVisibleItems();
  var p = stRole.perms || {};

  var bo = '';
  for (var a = 0; a < stRole.students.length; a++) {
    var s = stRole.students[a];
    var self = String(s.num) === String(me.num);
    bo += '<option value="' + s.num + '">' + s.num + '번 ' + s.name
        + (self ? ' (나)' : '') + ' - ' + fmt(s.balance) + '</option>';
  }
  document.getElementById('st-sk-buyer').innerHTML = bo;

  var io = '';
  for (var b = 0; b < vis.length; b++) {
    var it = stRole.items[vis[b]];
    io += '<option value="' + vis[b] + '">' + it.name + ' [' + (it.category || '기타') + '] - '
        + fmt(it.price) + '</option>';
  }
  document.getElementById('st-sk-item').innerHTML = io;
  stSkUpdatePrice();

  var sv = '';
  for (var v = 0; v < vis.length; v++) {
    var iv = stRole.items[vis[v]], st = iv.stock, badge, txt;
    if (st < 0) { badge = '<span class="badge badge-blue">무제한</span>'; txt = '무제한'; }
    else if (st === 0) { badge = '<span class="badge badge-red">품절</span>'; txt = '0개'; }
    else if (st <= 3) { badge = '<span class="badge badge-yellow">부족</span>'; txt = st + '개'; }
    else { badge = '<span class="badge badge-green">충분</span>'; txt = st + '개'; }
    sv += '<tr><td><strong>' + iv.name + '</strong></td>'
        + '<td><span class="badge badge-gray">' + (iv.category || '기타') + '</span></td>'
        + '<td style="color:var(--cy);font-weight:600">' + fmt(iv.price) + '</td>'
        + '<td style="font-weight:600">' + txt + '</td><td>' + badge + '</td></tr>';
  }
  if (!sv) sv = '<tr><td colspan="5" class="empty">판매 가능한 물품이 없습니다</td></tr>';
  document.getElementById('st-sk-stock').innerHTML = sv;

  var pb = document.getElementById('st-sk-price-box');
  pb.style.display = p.canChangePrice ? 'block' : 'none';
  if (p.canChangePrice) {
    var ph = '';
    for (var c1 = 0; c1 < vis.length; c1++) {
      var r1 = vis[c1], i1 = stRole.items[r1];
      ph += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">'
          + '<span style="min-width:110px;font-weight:600">' + i1.name + '</span>'
          + '<input type="number" id="st-sk-p-' + r1 + '" value="' + i1.price + '" style="width:100px">'
          + '<button class="btn btn-sm btn-purple" onclick="stSkChangePrice(' + r1 + ')">변경</button></div>';
    }
    document.getElementById('st-sk-price-list').innerHTML = ph || '<div class="empty">없음</div>';
  }

  var sb = document.getElementById('st-sk-stock-box');
  sb.style.display = p.canManageStock ? 'block' : 'none';
  if (p.canManageStock) {
    var sh = '';
    for (var c2 = 0; c2 < vis.length; c2++) {
      var r2 = vis[c2], i2 = stRole.items[r2];
      sh += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">'
          + '<span style="min-width:110px;font-weight:600">' + i2.name + '</span>'
          + '<input type="number" id="st-sk-s-' + r2 + '" value="' + i2.stock + '" style="width:100px">'
          + '<button class="btn btn-sm btn-purple" onclick="stSkChangeStock(' + r2 + ')">변경</button></div>';
    }
    document.getElementById('st-sk-stock-list').innerHTML = sh || '<div class="empty">없음</div>';
  }
}

function stSkUpdatePrice() {
  var sel = document.getElementById('st-sk-item');
  var out = document.getElementById('st-sk-price');
  if (!sel || !out) return;
  var ri = parseInt(sel.value, 10);
  if (isNaN(ri)) { out.value = ''; return; }
  var q = parseInt(document.getElementById('st-sk-qty').value, 10);
  if (isNaN(q) || q < 1) q = 1;
  var it = stRole.items[ri];
  out.value = it ? fmt(it.price * q) : '';
}

function stSkDoBuy() {
  var me = S.loggedInStudent.student;
  var bn = document.getElementById('st-sk-buyer').value;
  var ri = parseInt(document.getElementById('st-sk-item').value, 10);
  var q = parseInt(document.getElementById('st-sk-qty').value, 10);
  if (isNaN(q) || q < 1) q = 1;
  if (isNaN(ri)) { showMsg('st-sk-msg', '물품을 선택하세요', false); return; }
  loading(true, '판매 처리 중...');
  call('processBuyByShopkeeper', {
    shopkeeperNum: me.num, buyerNum: bn, itemIdx: ri, qty: q, month: S.month
  }).then(function (res) {
    if (!res || !res.ok) { showMsg('st-sk-msg', (res && res.msg) || '판매 실패', false); return; }
    showMsg('st-sk-msg', '판매 완료! 잔액: ' + fmt(res.balance));
    document.getElementById('st-sk-qty').value = 1;
    return call('refreshStudentData', me.num).then(function (d) {
      if (d) { S.loggedInStudent = d; renderStudentDashboard(); }
      stLoadRoleData();
    });
  })['catch'](function (e) {
    showMsg('st-sk-msg', '오류: ' + (e && e.message ? e.message : e), false);
  }).then(function () { loading(false); });
}

function stSkChangePrice(ri) {
  var me = S.loggedInStudent.student;
  var v = parseInt(document.getElementById('st-sk-p-' + ri).value, 10);
  if (isNaN(v) || v < 0) { showMsg('st-sk-price-msg', '올바른 가격을 입력하세요', false); return; }
  loading(true);
  call('shopkeeperChangePrice', { shopkeeperNum: me.num, itemIdx: ri, newPrice: v })
    .then(function (res) {
      if (!res || !res.ok) { showMsg('st-sk-price-msg', (res && res.msg) || '실패', false); return; }
      stRole.items[ri].price = v;
      showMsg('st-sk-price-msg', '가격이 변경되었습니다');
      stRenderShop();
    })['catch'](function (e) { showMsg('st-sk-price-msg', '오류: ' + e, false); })
    .then(function () { loading(false); });
}

function stSkChangeStock(ri) {
  var me = S.loggedInStudent.student;
  var v = parseInt(document.getElementById('st-sk-s-' + ri).value, 10);
  if (isNaN(v)) { showMsg('st-sk-stock-msg', '올바른 재고를 입력하세요', false); return; }
  loading(true);
  call('shopkeeperChangeStock', { shopkeeperNum: me.num, itemIdx: ri, newStock: v })
    .then(function (res) {
      if (!res || !res.ok) { showMsg('st-sk-stock-msg', (res && res.msg) || '실패', false); return; }
      stRole.items[ri].stock = v;
      showMsg('st-sk-stock-msg', '재고가 변경되었습니다');
      stRenderShop();
    })['catch'](function (e) { showMsg('st-sk-stock-msg', '오류: ' + e, false); })
    .then(function () { loading(false); });
}

// ── 은행 ──────────────────────────────────────
function stRenderBank() {
  var me = S.loggedInStudent.student;
  var o = '';
  for (var i = 0; i < stRole.students.length; i++) {
    var s = stRole.students[i];
    var self = String(s.num) === String(me.num);
    o += '<option value="' + s.num + '">' + s.num + '번 ' + s.name
       + (self ? ' (나)' : '') + ' - ' + fmt(s.balance) + '</option>';
  }
  document.getElementById('st-bk-depositor').innerHTML = o;
  stBkUpdateBal();
  stBkOnDaysChange();
  stBkLoadList();
}

function stBkUpdateBal() {
  var n = document.getElementById('st-bk-depositor').value;
  var s = null;
  for (var i = 0; i < stRole.students.length; i++) {
    if (String(stRole.students[i].num) === String(n)) s = stRole.students[i];
  }
  document.getElementById('st-bk-bal').value = s ? fmt(s.balance) : '';
}

function stBkOnDaysChange() {
  var d = parseInt(document.getElementById('st-bk-days').value, 10) || 15;
  var def = d === 15 ? (S.bankSettings.rate15 || 5) : (S.bankSettings.rate30 || 10);
  document.getElementById('st-bk-slider').value = def;
  document.getElementById('st-bk-hint').textContent = '(기본: ' + def + '%)';
  stBkOnSlider(def);
}

function stBkOnSlider(v) {
  var n = parseFloat(v) || 0;
  document.getElementById('st-bk-rate-disp').textContent = n.toFixed(1) + '%';
  stBkUpdateCalc();
}

function stBkSetRate(r) {
  document.getElementById('st-bk-slider').value = r;
  stBkOnSlider(r);
}

function stBkUpdateCalc() {
  var p = Number(document.getElementById('st-bk-principal').value) || 0;
  var r = parseFloat(document.getElementById('st-bk-slider').value) || 0;
  var payout = Math.round(p * (1 + r / 100));
  document.getElementById('st-bk-payout').textContent =
    payout > 0 ? '만기 수령: ' + fmt(payout) + ' (이자 ' + fmt(payout - p) + ')' : '납입 원금을 입력하세요';
}

function stBkCreate() {
  var me = S.loggedInStudent.student;
  var dn = document.getElementById('st-bk-depositor').value;
  var pr = Number(document.getElementById('st-bk-principal').value) || 0;
  var dy = parseInt(document.getElementById('st-bk-days').value, 10) || 15;
  var rt = parseFloat(document.getElementById('st-bk-slider').value) || 0;
  if (pr <= 0) { showMsg('st-bk-msg', '납입 원금을 입력하세요', false); return; }
  loading(true, '적금 신청 중...');
  call('createSaving', { bankStaffNum: me.num, depositorNum: dn, principal: pr, days: dy, rate: rt })
    .then(function (res) {
      if (!res || !res.ok) { showMsg('st-bk-msg', (res && res.msg) || '신청 실패', false); return; }
      document.getElementById('st-bk-principal').value = '';
      stBkOnDaysChange();
      showMsg('st-bk-msg', '적금 신청 완료! 선생님 승인 후 시작됩니다.');
      stBkLoadList();
    })['catch'](function (e) {
      showMsg('st-bk-msg', '오류: ' + (e && e.message ? e.message : e), false);
    }).then(function () { loading(false); });
}

function stBkLoadList() {
  var me = S.loggedInStudent.student;
  call('getSavings', 'all').then(function (all) {
    var el = document.getElementById('st-bk-list');
    if (!el) return;
    all = all || [];
    var bm = { '승인대기': 'badge-yellow', '진행중': 'badge-blue', '해약완료': 'badge-green', '조기해약': 'badge-gray', '거절': 'badge-red' };
    var rows = '';
    for (var i = 0; i < all.length; i++) {
      var s = all[i];
      if (String(s.bankStaffNum) !== String(me.num)) continue;
      rows += '<tr><td><strong>' + s.depositorName + '</strong> (' + s.depositorNum + '번)</td>'
            + '<td style="color:#d97706;font-weight:600">' + fmt(s.principal) + '</td>'
            + '<td>' + s.rate + '%</td><td>' + s.days + '일</td>'
            + '<td style="font-size:12px">' + s.maturityDate + '</td>'
            + '<td><span class="badge ' + (bm[s.status] || 'badge-gray') + '">' + s.status + '</span></td></tr>';
    }
    el.innerHTML = rows
      ? '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>예금주</th><th>원금</th><th>이자율</th><th>기간</th><th>만기일</th><th>상태</th></tr></thead><tbody>' + rows + '</tbody></table></div>'
      : '<div class="empty">신청한 적금이 없습니다</div>';
  })['catch'](function () {});
}


// ══════════════════════════════════════════════
//  상단바 시계 + 현재 월 자동 선택
// ══════════════════════════════════════════════
function nowMonth() {
  return new Date().getMonth() + 1;
}

function applyCurrentMonth() {
  var m = nowMonth();
  S.month = m;
  var d = new Date().getDate();
  S.half = (d <= 15) ? '1' : '2';
  var hs = document.getElementById('curHalf');
  if (hs) hs.value = S.half;
  var sel = document.getElementById('curMonth');
  if (!sel) return;
  var found = false;
  for (var i = 0; i < sel.options.length; i++) {
    if (String(sel.options[i].value) === String(m)) { found = true; break; }
  }
  if (found) sel.value = String(m);
}

function tickClock() {
  var d = new Date();
  var days = ['일', '월', '화', '수', '목', '금', '토'];
  var hh = d.getHours();
  var ampm = hh < 12 ? '오전' : '오후';
  var h12 = hh % 12; if (h12 === 0) h12 = 12;
  var mm = d.getMinutes(); if (mm < 10) mm = '0' + mm;
  var txt = d.getFullYear() + '년 ' + (d.getMonth() + 1) + '월 ' + d.getDate() + '일 ('
          + days[d.getDay()] + ') ' + ampm + ' ' + h12 + ':' + mm;

  var a = document.getElementById('topbar-clock');
  if (a) a.textContent = txt;
  var b = document.getElementById('topbar-clock-student');
  if (b) b.textContent = txt;
}

function startClock() {
  tickClock();
  setInterval(tickClock, 30000);
}


// ── 거래내역 월 교정 ────────────────────────────
function doRepairMonths() {
  if (!confirm('거래내역의 월 값을 실제 거래 날짜 기준으로 다시 계산합니다.\n계속하시겠습니까?')) return;
  loading(true, '거래내역 점검 중...');
  call('repairLedgerMonths').then(function (res) {
    if (!res || !res.ok) { showMsg('repair-msg', '점검에 실패했습니다', false); return; }
    showMsg('repair-msg', '완료! 전체 ' + res.total + '건 중 ' + res.fixed + '건을 바로잡았습니다.');
    return call('loadAll').then(function (d) {
      if (d) {
        S.ledger = d.ledger || [];
        S.students = d.students || [];
        renderDashboard();
      }
    });
  })['catch'](function (e) {
    showMsg('repair-msg', '오류: ' + (e && e.message ? e.message : e), false);
  }).then(function () { loading(false); });
}


// ══════════════════════════════════════════════
//  테마 색상
// ══════════════════════════════════════════════
var THEMES = {
  donworry: { name: '돈워리 기본', c1: '#1F3A5F', c1d: '#142942', c1l: '#e8edf5', g1: '#15283F', g2: '#1F3A5F', g3: '#2E5D4E' },
  blue:   { name: '기본 파랑', c1: '#1a56db', c1d: '#1340a8', c1l: '#e8f0fe', g1: '#1340a8', g2: '#1a56db', g3: '#3b82f6' },
  green:  { name: '숲 초록',   c1: '#0e9f6e', c1d: '#057a53', c1l: '#def7ec', g1: '#057a53', g2: '#0e9f6e', g3: '#34d399' },
  purple: { name: '보라',      c1: '#7c3aed', c1d: '#5b21b6', c1l: '#ede9fe', g1: '#5b21b6', g2: '#7c3aed', g3: '#a78bfa' },
  pink:   { name: '분홍',      c1: '#db2777', c1d: '#9d174d', c1l: '#fce7f3', g1: '#9d174d', g2: '#db2777', g3: '#f472b6' },
  orange: { name: '주황',      c1: '#d97706', c1d: '#92400e', c1l: '#fef3c7', g1: '#92400e', g2: '#d97706', g3: '#fbbf24' },
  teal:   { name: '청록',      c1: '#0891b2', c1d: '#155e75', c1l: '#cffafe', g1: '#155e75', g2: '#0891b2', g3: '#22d3ee' },
  navy:   { name: '남색',      c1: '#1e3a8a', c1d: '#172554', c1l: '#dbeafe', g1: '#172554', g2: '#1e3a8a', g3: '#3b82f6' },
  gray:   { name: '차분한 회색', c1: '#475569', c1d: '#1e293b', c1l: '#f1f5f9', g1: '#1e293b', g2: '#475569', g3: '#94a3b8' }
};

function applyTheme(key) {
  var t = THEMES[key] || THEMES.donworry;
  var r = document.documentElement;
  r.style.setProperty('--c1', t.c1);
  r.style.setProperty('--c1d', t.c1d);
  r.style.setProperty('--c1l', t.c1l);
  // 위쪽에서 은은하게 비치는 금빛. 어느 테마를 골라도 같이 따라붙습니다.
  var glow = 'radial-gradient(900px 460px at 50% -8%, rgba(246,196,87,.18), transparent 62%),';
  var login = document.getElementById('login-screen');
  if (login) {
    login.style.background = glow +
      'linear-gradient(135deg,' + t.g1 + ' 0%,' + t.g2 + ' 52%,' + t.g3 + ' 100%)';
  }
  var pv = document.getElementById('preview-bg');
  if (pv) {
    pv.style.background = glow +
      'linear-gradient(135deg,' + t.g1 + ' 0%,' + t.g2 + ' 55%,' + t.g3 + ' 100%)';
  }
  var prof = document.querySelector('.profile-card');
  if (prof) {
    prof.style.background = 'linear-gradient(135deg,' + t.g2 + ' 0%,' + t.g3 + ' 100%)';
  }
  S.theme = key;
  if (!S.iconColor || S.iconColor === 'theme') {
    try { document.documentElement.style.setProperty('--icon', t.c1); } catch (e) {}
  }
}

function renderThemePicker() {
  var box = document.getElementById('theme-picker');
  if (!box) return;
  var cur = S.theme || (S.loginSettings && S.loginSettings.theme) || 'blue';
  var html = '';
  for (var k in THEMES) {
    if (!THEMES.hasOwnProperty(k)) continue;
    var t = THEMES[k];
    var on = (k === cur);
    html += '<button onclick="pickTheme(\'' + k + '\')" '
          + 'style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 12px;'
          + 'border:2px solid ' + (on ? t.c1 : 'var(--border)') + ';border-radius:10px;'
          + 'background:' + (on ? t.c1l : '#fff') + ';cursor:pointer;font-family:inherit;min-width:84px">'
          + '<span style="display:block;width:52px;height:26px;border-radius:6px;'
          + 'background:linear-gradient(135deg,' + t.g1 + ',' + t.g2 + ',' + t.g3 + ')"></span>'
          + '<span style="font-size:11px;font-weight:' + (on ? '700' : '500') + ';color:'
          + (on ? t.c1d : 'var(--muted)') + '">' + t.name + (on ? ' ✓' : '') + '</span>'
          + '</button>';
  }
  box.innerHTML = html;
}

function pickTheme(key) {
  applyTheme(key);
  renderThemePicker();
  loading(true, '테마 저장 중...');
  var s = S.loginSettings || {};
  call('saveLoginSettings', {
    title: s.title || '돈워리!',
    subtitle: s.subtitle || '우리 반 경제를 함께 운영해요',
    logoType: s.logoType || 'default',
    emoji: s.emoji || '',
    logoUrl: s.logoUrl || '',
    theme: key,
    iconColor: S.iconColor || s.iconColor || 'theme'
  }).then(function () {
    S.loginSettings = S.loginSettings || {};
    S.loginSettings.theme = key;
  })['catch'](function () {}).then(function () { loading(false); });
}


// ── 학생 수에 따라 그래프 폭 자동 조절 ─────────────
function sizeChartWrap(wrapId, count, perItem) {
  var el = document.getElementById(wrapId);
  if (!el) return;
  var per = perItem || 60;
  var need = count * per;
  var parent = el.parentNode;
  var avail = parent ? parent.clientWidth : 0;
  if (need > avail) {
    el.style.width = need + 'px';
    el.style.minWidth = need + 'px';
  } else {
    el.style.width = '100%';
    el.style.minWidth = '100%';
  }
}


// ── 테마 색상 헬퍼 ──────────────────────────────
function curTheme() {
  return THEMES[S.theme || (S.loginSettings && S.loginSettings.theme) || 'blue'] || THEMES.blue;
}
function hexAlpha(hex, a) {
  var h = String(hex).replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  var r = parseInt(h.substring(0, 2), 16);
  var g = parseInt(h.substring(2, 4), 16);
  var b = parseInt(h.substring(4, 6), 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}
// 테마 기준 직업별 팔레트 (명도 단계로 파생)
function themePalette(t) {
  return [t.c1, t.g3, t.c1d, hexAlpha(t.c1, 0.6), t.g2,
          hexAlpha(t.g3, 0.7), hexAlpha(t.c1d, 0.7), hexAlpha(t.g2, 0.45)];
}
// 로고 클릭 → 대시보드
function goHome() {
  if (S.roleLocked) return;
  if (S.role === 'teacher') showPage('dashboard');
}


// ══════════════════════════════════════════════
//  초기화
// ══════════════════════════════════════════════
function renderReset() {
  var sel = document.getElementById('reset-student');
  if (!sel) return;
  var o = '';
  for (var i = 0; i < S.students.length; i++) {
    var s = S.students[i];
    o += '<option value="' + s.num + '">' + s.num + '번 ' + s.name
       + ' - 현재 ' + fmt(s.balance) + '</option>';
  }
  sel.innerHTML = o || '<option value="">학생이 없습니다</option>';
  updateResetPreview();
}

function updateResetPreview() {
  var sel = document.getElementById('reset-student');
  var out = document.getElementById('reset-student-preview');
  if (!sel || !out) return;
  var num = sel.value;
  var s = null;
  for (var i = 0; i < S.students.length; i++) {
    if (String(S.students[i].num) === String(num)) s = S.students[i];
  }
  if (!s) { out.value = ''; return; }
  var init = (s.initial !== undefined && s.initial !== null) ? s.initial : s.balance;
  out.value = fmt(init);
}

function doResetStudent() {
  var sel = document.getElementById('reset-student');
  var num = sel ? sel.value : '';
  if (!num) { showMsg('reset-student-msg', '학생을 선택하세요', false); return; }
  var s = null;
  for (var i = 0; i < S.students.length; i++) {
    if (String(S.students[i].num) === String(num)) s = S.students[i];
  }
  var nm = s ? (s.num + '번 ' + s.name) : num;
  if (!confirm(nm + ' 학생의 거래내역과 적금을 모두 삭제하고\n잔액을 초기 잔액으로 되돌립니다.\n\n되돌릴 수 없습니다. 계속하시겠습니까?')) return;
  if (!confirm('한 번 더 확인합니다.\n' + nm + ' 학생을 초기화할까요?')) return;

  loading(true, '초기화 중...');
  call('resetStudentData', num).then(function (res) {
    if (!res || !res.ok) { showMsg('reset-student-msg', (res && res.msg) || '초기화 실패', false); return; }
    showMsg('reset-student-msg', nm + ' 초기화 완료 (거래 ' + res.deleted + '건, 적금 ' + res.savings + '건 삭제 · 잔액 ' + fmt(res.balance) + ')');
    return call('loadAll').then(function (d) {
      if (d) {
        S.students = d.students || [];
        S.ledger = d.ledger || [];
        renderReset();
        renderDashboard();
      }
    });
  })['catch'](function (e) {
    showMsg('reset-student-msg', '오류: ' + (e && e.message ? e.message : e), false);
  }).then(function () { loading(false); });
}

function doResetClass(mode) {
  var isAll = (mode === 'all');
  var title = isAll ? '전체 초기화' : '거래 기록 초기화';
  var detail = isAll
    ? '거래내역, 적금, 학생 명단, 직업 배정, 비밀번호가\n모두 삭제됩니다.'
    : '모든 학생의 거래내역과 적금이 삭제되고\n잔액이 초기 잔액으로 되돌아갑니다.';

  if (!confirm('[' + title + ']\n\n' + detail + '\n\n되돌릴 수 없습니다. 계속하시겠습니까?')) return;

  var word = isAll ? '전체초기화' : '초기화';
  var typed = prompt('실수를 막기 위한 확인입니다.\n\n계속하려면 아래 단어를 그대로 입력하세요:\n\n' + word);
  if (typed === null) return;
  if (String(typed).trim() !== word) {
    showMsg('reset-class-msg', '입력한 단어가 다릅니다. 취소되었습니다.', false);
    return;
  }

  loading(true, '초기화 중...');
  call('resetClassData', mode).then(function (res) {
    if (!res || !res.ok) { showMsg('reset-class-msg', '초기화 실패', false); return; }
    showMsg('reset-class-msg', title + ' 완료되었습니다.');
    return call('loadAll').then(function (d) {
      if (d) {
        S.students = d.students || [];
        S.assignments = d.assignments || [];
        S.ledger = d.ledger || [];
        S.pendingSavingsCount = d.pendingSavingsCount || 0;
      S.treasuryBalance = d.treasuryBalance || 0;
      S.suggestionCount = d.suggestionCount || 0;
      try { updateSugBadge(); } catch (e) {}
        renderReset();
        renderDashboard();
        try { updateSavingsBadge(); } catch (e) {}
      }
    });
  })['catch'](function (e) {
    showMsg('reset-class-msg', '오류: ' + (e && e.message ? e.message : e), false);
  }).then(function () { loading(false); });
}


// ══════════════════════════════════════════════
//  학급 금고
// ══════════════════════════════════════════════
function renderTreasury() {
  loading(true, '금고 내역 불러오는 중...');
  var filter = document.getElementById('tre-filter');
  var f = filter ? filter.value : 'all';

  call('getTreasuryStats', S.month).then(function (st) {
    if (!st) return;
    S.treasuryBalance = st.balance;
    var el = document.getElementById('tre-balance');
    if (el) el.textContent = fmt(st.balance);
    var sg = document.getElementById('tre-stats');
    if (sg) {
      sg.innerHTML =
        '<div class="stat"><div class="stat-label">' + S.month + '월 수입</div>'
        + '<div class="stat-value green" style="font-size:19px">+' + fmt(st.monthIncome) + '</div></div>'
        + '<div class="stat"><div class="stat-label">' + S.month + '월 지출</div>'
        + '<div class="stat-value red" style="font-size:19px">-' + fmt(st.monthExpense) + '</div></div>'
        + '<div class="stat"><div class="stat-label">누적 수입</div>'
        + '<div class="stat-value" style="font-size:19px;color:var(--c2)">' + fmt(st.income) + '</div></div>'
        + '<div class="stat"><div class="stat-label">누적 지출</div>'
        + '<div class="stat-value" style="font-size:19px;color:var(--cd)">' + fmt(st.expense) + '</div></div>';
    }
    return call('getTreasuryLedger', 300);
  }).then(function (rows) {
    rows = rows || [];
    var bm = { '세금': 'badge-red', '물품판매': 'badge-yellow', '기부': 'badge-green',
               '벌금': 'badge-red', '학급행사': 'badge-blue' };
    var html = '';
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      if (f !== 'all' && r.flow !== f) continue;
      var isIn = r.amount > 0;
      html += '<tr>'
        + '<td style="font-size:12px">' + r.date + '</td>'
        + '<td><span class="badge ' + (isIn ? 'badge-green' : 'badge-red') + '">' + r.flow + '</span></td>'
        + '<td><span class="badge ' + (bm[r.type] || 'badge-gray') + '">' + r.type + '</span></td>'
        + '<td style="font-size:12px;color:var(--muted)">' + (r.detail || '-') + '</td>'
        + '<td style="font-weight:600;color:' + (isIn ? 'var(--c2)' : 'var(--cd)') + '">'
        + (isIn ? '+' : '-') + fmt(Math.abs(r.amount)) + '</td>'
        + '<td style="color:var(--c1);font-weight:600">' + fmt(r.balance) + '</td></tr>';
    }
    var tb = document.getElementById('tre-table');
    if (tb) tb.innerHTML = html || '<tr><td colspan="6" class="empty">금고 거래 내역이 없습니다</td></tr>';
  })['catch'](function (e) {
    try { console.error('금고 로드 오류:', e); } catch (x) {}
  }).then(function () { loading(false); });
}

function doTreasurySpend() {
  var type = document.getElementById('tre-spend-type').value;
  var amt = Number(document.getElementById('tre-spend-amount').value) || 0;
  var detail = document.getElementById('tre-spend-detail').value.trim();
  if (amt <= 0) { showMsg('tre-spend-msg', '금액을 입력하세요', false); return; }
  if (!confirm('학급 금고에서 ' + fmt(amt) + '을 지출합니다.\n\n항목: ' + type
      + (detail ? '\n내용: ' + detail : '') + '\n\n계속하시겠습니까?')) return;

  loading(true, '지출 처리 중...');
  call('treasurySpend', { type: type, detail: detail, amount: amt, month: S.month })
    .then(function (res) {
      if (!res || !res.ok) { showMsg('tre-spend-msg', (res && res.msg) || '지출 실패', false); return; }
      document.getElementById('tre-spend-amount').value = '';
      document.getElementById('tre-spend-detail').value = '';
      showMsg('tre-spend-msg', '지출 완료! 금고 잔액: ' + fmt(res.balance));
      renderTreasury();
    })['catch'](function (e) {
      showMsg('tre-spend-msg', '오류: ' + (e && e.message ? e.message : e), false);
    }).then(function () { loading(false); });
}

function doTreasuryDeposit() {
  var type = document.getElementById('tre-dep-type').value;
  var amt = Number(document.getElementById('tre-dep-amount').value) || 0;
  var detail = document.getElementById('tre-dep-detail').value.trim();
  if (amt <= 0) { showMsg('tre-dep-msg', '금액을 입력하세요', false); return; }

  loading(true, '입금 처리 중...');
  call('treasuryDeposit', { type: type, detail: detail, amount: amt, month: S.month })
    .then(function (res) {
      if (!res || !res.ok) { showMsg('tre-dep-msg', (res && res.msg) || '입금 실패', false); return; }
      document.getElementById('tre-dep-amount').value = '';
      document.getElementById('tre-dep-detail').value = '';
      showMsg('tre-dep-msg', '입금 완료! 금고 잔액: ' + fmt(res.balance));
      renderTreasury();
    })['catch'](function (e) {
      showMsg('tre-dep-msg', '오류: ' + (e && e.message ? e.message : e), false);
    }).then(function () { loading(false); });
}


// ── 학급 운영비 예산 지원 ────────────────────────
function doTreasuryBudget() {
  var type = document.getElementById('tre-budget-type').value;
  var amt = Number(document.getElementById('tre-budget-amount').value) || 0;
  var detail = document.getElementById('tre-budget-detail').value.trim();
  if (amt <= 0) { showMsg('tre-budget-msg', '금액을 입력하세요', false); return; }
  if (!confirm('학급 금고에 ' + fmt(amt) + '을 예산으로 지원합니다.\n\n항목: ' + type
      + (detail ? '\n내용: ' + detail : '') + '\n\n계속하시겠습니까?')) return;

  loading(true, '예산 지원 중...');
  call('treasuryDeposit', { type: type, detail: detail || type, amount: amt, month: S.month })
    .then(function (res) {
      if (!res || !res.ok) { showMsg('tre-budget-msg', (res && res.msg) || '지원 실패', false); return; }
      document.getElementById('tre-budget-amount').value = '';
      document.getElementById('tre-budget-detail').value = '';
      showMsg('tre-budget-msg', '예산 지원 완료! 금고 잔액: ' + fmt(res.balance));
      renderTreasury();
    })['catch'](function (e) {
      showMsg('tre-budget-msg', '오류: ' + (e && e.message ? e.message : e), false);
    }).then(function () { loading(false); });
}


// ── 재입고 제한 해제 ────────────────────────────
function doResetRestock() {
  if (!confirm('이번 주 재입고 제한을 모두 해제합니다.\n모든 물품을 다시 재입고할 수 있게 됩니다.\n\n계속하시겠습니까?')) return;
  loading(true, '해제 중...');
  call('resetRestockLimit', null).then(function (res) {
    if (!res || !res.ok) { showMsg('reset-restock-msg', '해제 실패', false); return; }
    S.restockDone = {};
    showMsg('reset-restock-msg', '재입고 제한이 해제되었습니다.');
  })['catch'](function (e) {
    showMsg('reset-restock-msg', '오류: ' + (e && e.message ? e.message : e), false);
  }).then(function () { loading(false); });
}


// ══════════════════════════════════════════════
//  건의사항 - 학생
// ══════════════════════════════════════════════
function initSuggestionForm() {
  var d = S.loggedInStudent;
  if (!d || !d.student) return;
  var nm = document.getElementById('sug-name');
  if (nm) nm.value = d.student.num + '번 ' + d.student.name;
  loadMySuggestions();
}

function doSubmitSuggestion() {
  var d = S.loggedInStudent;
  if (!d || !d.student) return;
  var cat = document.getElementById('sug-category').value;
  var title = document.getElementById('sug-title').value.trim();
  var body = document.getElementById('sug-body').value.trim();
  var reason = document.getElementById('sug-reason').value.trim();

  if (!title) { showMsg('sug-msg', '건의 제목을 입력해 주세요', false); return; }
  if (!body) { showMsg('sug-msg', '건의 내용을 입력해 주세요', false); return; }
  if (!confirm('선생님께 건의를 보냅니다.\n\n제목: ' + title + '\n\n보내시겠습니까?')) return;

  loading(true, '건의 보내는 중...');
  call('submitSuggestion', {
    studentNum: d.student.num, category: cat,
    title: title, body: body, reason: reason
  }).then(function (res) {
    if (!res || !res.ok) { showMsg('sug-msg', (res && res.msg) || '전송 실패', false); return; }
    document.getElementById('sug-title').value = '';
    document.getElementById('sug-body').value = '';
    document.getElementById('sug-reason').value = '';
    showMsg('sug-msg', '건의를 보냈습니다! 선생님이 확인하시면 답변을 볼 수 있어요.');
    loadMySuggestions();
  })['catch'](function (e) {
    showMsg('sug-msg', '오류: ' + (e && e.message ? e.message : e), false);
  }).then(function () { loading(false); });
}

function loadMySuggestions() {
  var d = S.loggedInStudent;
  if (!d || !d.student) return;
  call('getSuggestions', d.student.num).then(function (list) {
    var el = document.getElementById('sug-my-list');
    if (!el) return;
    list = list || [];
    if (!list.length) { el.innerHTML = '<div class="empty">아직 보낸 건의가 없어요</div>'; return; }
    var bm = { '접수': 'badge-yellow', '검토중': 'badge-blue', '반영': 'badge-green', '보류': 'badge-gray' };
    var html = '';
    for (var i = 0; i < list.length; i++) {
      var s = list[i];
      html += '<div style="border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:8px">'
        + '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">'
        + '<span class="badge ' + (bm[s.status] || 'badge-gray') + '">' + s.status + '</span>'
        + '<span class="badge badge-gray">' + s.category + '</span>'
        + '<strong style="font-size:13px">' + s.title + '</strong>'
        + '<span style="font-size:11px;color:var(--muted);margin-left:auto">' + s.date + '</span>'
        + '</div>'
        + '<div style="font-size:12px;color:var(--muted);line-height:1.6">' + s.body + '</div>';
      if (s.reply) {
        html += '<div style="margin-top:8px;padding:10px;background:var(--c1l);border-radius:6px">'
          + '<div style="font-size:11px;font-weight:700;color:var(--c1d);margin-bottom:4px">'
          + '<i class="ti ti-user-check"></i> 선생님 답변 (' + s.replyDate + ')</div>'
          + '<div style="font-size:12px;color:var(--text);line-height:1.6">' + s.reply + '</div></div>';
      }
      html += '</div>';
    }
    el.innerHTML = html;
  })['catch'](function () {});
}

// ══════════════════════════════════════════════
//  건의사항 - 교사
// ══════════════════════════════════════════════
function updateSugBadge() {
  var b = document.getElementById('sug-badge');
  if (!b) return;
  if (S.suggestionCount > 0) { b.style.display = 'inline'; b.textContent = S.suggestionCount; }
  else { b.style.display = 'none'; }
}

function renderSuggestions() {
  loading(true, '건의 목록 불러오는 중...');
  call('getSuggestions', null).then(function (list) {
    list = list || [];
    S.suggestions = list;
    var nNew = 0, nRev = 0, nDone = 0;
    for (var i = 0; i < list.length; i++) {
      if (list[i].status === '접수') nNew++;
      else if (list[i].status === '검토중') nRev++;
      else if (list[i].status === '반영') nDone++;
    }
    S.suggestionCount = nNew;
    updateSugBadge();

    var sg = document.getElementById('sug-stats');
    if (sg) {
      sg.innerHTML =
        '<div class="stat"><div class="stat-label">새 건의</div><div class="stat-value" style="color:var(--cy)">' + nNew + '건</div></div>'
        + '<div class="stat"><div class="stat-label">검토중</div><div class="stat-value blue">' + nRev + '건</div></div>'
        + '<div class="stat"><div class="stat-label">반영됨</div><div class="stat-value green">' + nDone + '건</div></div>'
        + '<div class="stat"><div class="stat-label">전체</div><div class="stat-value">' + list.length + '건</div></div>';
    }

    var f = document.getElementById('sug-filter');
    var fv = f ? f.value : 'all';
    var bm = { '접수': 'badge-yellow', '검토중': 'badge-blue', '반영': 'badge-green', '보류': 'badge-gray' };
    var html = '';
    for (var k = 0; k < list.length; k++) {
      var s = list[k];
      if (fv !== 'all' && s.status !== fv) continue;
      var isNew = (s.status === '접수');
      html += '<div style="border:' + (isNew ? '1.5px solid var(--cy)' : '1px solid var(--border)')
        + ';border-radius:10px;padding:14px;margin-bottom:10px;background:' + (isNew ? '#fffbeb' : '#fff') + '">'
        + '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px">'
        + '<span class="badge ' + (bm[s.status] || 'badge-gray') + '">' + s.status + '</span>'
        + '<span class="badge badge-gray">' + s.category + '</span>'
        + '<strong>' + s.title + '</strong>'
        + '<span style="font-size:12px;color:var(--muted)">' + s.studentName + ' (' + s.studentNum + '번)</span>'
        + '<span style="font-size:11px;color:var(--muted);margin-left:auto">' + s.date + '</span>'
        + '</div>'
        + '<div style="font-size:13px;line-height:1.7;margin-bottom:8px">' + s.body + '</div>';
      if (s.reason) {
        html += '<div style="font-size:12px;color:var(--muted);background:#f9fafb;padding:8px 10px;border-radius:6px;margin-bottom:8px">'
          + '<strong>제안 이유</strong> · ' + s.reason + '</div>';
      }
      if (s.reply) {
        html += '<div style="padding:10px;background:var(--c1l);border-radius:6px;margin-bottom:8px">'
          + '<div style="font-size:11px;font-weight:700;color:var(--c1d);margin-bottom:4px">내 답변 (' + s.replyDate + ')</div>'
          + '<div style="font-size:12px;line-height:1.6">' + s.reply + '</div></div>';
      }
      html += '<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">'
        + '<input type="text" id="sug-reply-' + s.idx + '" placeholder="답변 입력 (선택)" style="flex:1;min-width:180px;padding:6px 10px;font-size:12px" value="' + (s.reply || '') + '">'
        + '<button class="btn btn-sm btn-primary" onclick="doReplySug(' + s.idx + ',\'검토중\')">검토중</button>'
        + '<button class="btn btn-sm btn-green" onclick="doReplySug(' + s.idx + ',\'반영\')">반영</button>'
        + '<button class="btn btn-sm" onclick="doReplySug(' + s.idx + ',\'보류\')">보류</button>'
        + '<button class="btn btn-sm btn-danger" onclick="doDeleteSug(' + s.idx + ')"><i class="ti ti-trash"></i></button>'
        + '</div></div>';
    }
    var el = document.getElementById('sug-list');
    if (el) el.innerHTML = html || '<div class="empty">건의가 없습니다</div>';
  })['catch'](function (e) {
    try { console.error('건의 로드 오류:', e); } catch (x) {}
  }).then(function () { loading(false); });
}

function doReplySug(idx, status) {
  var inp = document.getElementById('sug-reply-' + idx);
  var reply = inp ? inp.value.trim() : '';
  loading(true, '처리 중...');
  call('replySuggestion', idx, status, reply).then(function (res) {
    if (!res || !res.ok) { alert((res && res.msg) || '처리 실패'); return; }
    renderSuggestions();
  })['catch'](function (e) {
    alert('오류: ' + (e && e.message ? e.message : e));
  }).then(function () { loading(false); });
}

function doDeleteSug(idx) {
  if (!confirm('이 건의를 삭제하시겠습니까?\n되돌릴 수 없습니다.')) return;
  loading(true);
  call('deleteSuggestion', idx).then(function () {
    renderSuggestions();
  })['catch'](function (e) {
    alert('오류: ' + (e && e.message ? e.message : e));
  }).then(function () { loading(false); });
}


// ══════════════════════════════════════════════
//  아이콘 색상
// ══════════════════════════════════════════════
var ICON_COLORS = {
  theme:  { name: '테마 색', hex: null },
  blue:   { name: '파랑',   hex: '#1a56db' },
  green:  { name: '초록',   hex: '#0e9f6e' },
  purple: { name: '보라',   hex: '#7c3aed' },
  pink:   { name: '분홍',   hex: '#db2777' },
  orange: { name: '주황',   hex: '#d97706' },
  teal:   { name: '청록',   hex: '#0891b2' },
  slate:  { name: '진회색', hex: '#475569' }
};

function applyIconColor(key) {
  var k = key || 'theme';
  var hex = (ICON_COLORS[k] && ICON_COLORS[k].hex) || curTheme().c1;
  document.documentElement.style.setProperty('--icon', hex);
  S.iconColor = k;
}

function renderIconPicker() {
  var box = document.getElementById('icon-picker');
  if (!box) return;
  var cur = S.iconColor || (S.loginSettings && S.loginSettings.iconColor) || 'theme';
  var html = '';
  for (var k in ICON_COLORS) {
    if (!ICON_COLORS.hasOwnProperty(k)) continue;
    var ic = ICON_COLORS[k];
    var hex = ic.hex || curTheme().c1;
    var on = (k === cur);
    html += '<button onclick="pickIconColor(\'' + k + '\')" '
          + 'style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 12px;'
          + 'border:2px solid ' + (on ? hex : 'var(--border)') + ';border-radius:10px;'
          + 'background:#fff;cursor:pointer;font-family:inherit;min-width:76px">'
          + '<i class="ti ti-palette" style="font-size:24px;color:' + hex + '"></i>'
          + '<span style="font-size:11px;font-weight:' + (on ? '700' : '500') + ';color:'
          + (on ? hex : 'var(--muted)') + '">' + ic.name + (on ? ' ✓' : '') + '</span>'
          + '</button>';
  }
  box.innerHTML = html;
}

function pickIconColor(key) {
  applyIconColor(key);
  renderIconPicker();
  loading(true, '저장 중...');
  var s = S.loginSettings || {};
  call('saveLoginSettings', {
    title: s.title || '돈워리!',
    subtitle: s.subtitle || '우리 반 경제를 함께 운영해요',
    logoType: s.logoType || 'default',
    emoji: s.emoji || '',
    logoUrl: s.logoUrl || '',
    theme: S.theme || s.theme || 'blue',
    iconColor: key
  }).then(function () {
    S.loginSettings = S.loginSettings || {};
    S.loginSettings.iconColor = key;
  })['catch'](function () {}).then(function () { loading(false); });
}


// ══════════════════════════════════════════════
//  급여 지급 (회차별 선택 지급)
// ══════════════════════════════════════════════
var SAL = { targets: [], treasury: 0, picked: {}, label: '' };

function periodLabelText() {
  return S.month + '월 ' + (String(S.half) === '1' ? '상반기' : '하반기');
}

function onChangeHalf() {
  S.half = document.getElementById('curHalf').value;
  renderDashboard();
}

function openSalaryModal() {
  loading(true, '지급 대상 확인 중...');
  call('getSalaryTargets', S.month, S.half).then(function (res) {
    if (!res) { alert('대상을 불러오지 못했습니다.'); return; }
    if (!res.targets || res.targets.length === 0) {
      alert('급여를 지급할 대상이 없습니다.\n직업 배정을 먼저 해주세요.');
      return;
    }
    SAL.targets = res.targets;
    SAL.treasury = res.treasury || 0;
    SAL.label = res.label || periodLabelText();
    SAL.picked = {};
    for (var i = 0; i < SAL.targets.length; i++) {
      // 이미 받은 학생은 기본 해제
      SAL.picked[SAL.targets[i].num] = !SAL.targets[i].paid;
    }
    document.getElementById('sal-modal-title').textContent = SAL.label + ' 급여 지급';
    renderSalaryList();
    openModal('modal-salary');
  })['catch'](function (e) {
    alert('오류: ' + (e && e.message ? e.message : e));
  }).then(function () { loading(false); });
}

function renderSalaryList() {
  var rows = '';
  for (var i = 0; i < SAL.targets.length; i++) {
    var t = SAL.targets[i];
    var on = !!SAL.picked[t.num];
    var paid = t.paid;
    rows += '<tr style="cursor:' + (paid ? 'not-allowed' : 'pointer')
      + ';background:' + (paid ? '#f9fafb' : (on ? '#f5f7ff' : '#fff'))
      + ';opacity:' + (paid ? '.6' : '1') + '"'
      + (paid ? '' : ' onclick="salToggle(\'' + t.num + '\')"') + '>'
      + '<td style="text-align:center">'
      + (paid ? '<i class="ti ti-check" style="color:var(--c2)"></i>'
              : '<input type="checkbox" ' + (on ? 'checked' : '')
                + ' onclick="event.stopPropagation();salToggle(\'' + t.num + '\')">')
      + '</td>'
      + '<td><strong>' + t.num + '번 ' + t.name + '</strong>'
      + (paid ? ' <span class="badge badge-green">지급완료</span>' : '') + '</td>'
      + '<td><span class="badge badge-blue">' + t.jobName + '</span></td>'
      + '<td style="color:var(--c2);font-weight:600">' + fmt(t.amt) + '</td></tr>';
  }
  document.getElementById('sal-list').innerHTML = rows;
  updateSalarySummary();
}

function salToggle(num) {
  for (var i = 0; i < SAL.targets.length; i++) {
    if (String(SAL.targets[i].num) === String(num) && SAL.targets[i].paid) return;
  }
  SAL.picked[num] = !SAL.picked[num];
  renderSalaryList();
}

function salSelectAll(on) {
  for (var i = 0; i < SAL.targets.length; i++) {
    if (SAL.targets[i].paid) { SAL.picked[SAL.targets[i].num] = false; continue; }
    SAL.picked[SAL.targets[i].num] = on;
  }
  renderSalaryList();
}

function updateSalarySummary() {
  var cnt = 0, total = 0, paidCnt = 0;
  for (var i = 0; i < SAL.targets.length; i++) {
    var t = SAL.targets[i];
    if (t.paid) paidCnt++;
    if (SAL.picked[t.num] && !t.paid) { cnt++; total += t.amt; }
  }
  var after = SAL.treasury - total;
  document.getElementById('sal-count').textContent = cnt + '명';
  document.getElementById('sal-total').textContent = fmt(total);
  document.getElementById('sal-treasury').textContent = fmt(SAL.treasury);
  var af = document.getElementById('sal-after');
  af.textContent = fmt(after);
  af.style.color = after < 0 ? 'var(--cd)' : 'var(--c2)';

  var warn = document.getElementById('sal-warn');
  var btn = document.getElementById('sal-pay-btn');
  if (cnt === 0) {
    warn.textContent = paidCnt === SAL.targets.length
      ? SAL.label + ' 급여를 모두 지급했습니다' : '지급할 학생을 선택하세요';
    warn.style.color = 'var(--muted)';
    btn.disabled = true; btn.style.opacity = '.5';
  } else if (after < 0) {
    warn.textContent = '금고 부족: ' + fmt(-after);
    warn.style.color = 'var(--cd)';
    btn.disabled = true; btn.style.opacity = '.5';
  } else {
    warn.textContent = paidCnt > 0 ? ('이미 지급 ' + paidCnt + '명 제외') : '';
    warn.style.color = 'var(--muted)';
    btn.disabled = false; btn.style.opacity = '1';
  }
}

function doPaySelected() {
  var nums = [], cnt = 0, total = 0;
  for (var i = 0; i < SAL.targets.length; i++) {
    var t = SAL.targets[i];
    if (SAL.picked[t.num] && !t.paid) { nums.push(t.num); cnt++; total += t.amt; }
  }
  if (!cnt) return;
  if (SAL.treasury - total < 0) return;

  if (!confirm(SAL.label + ' 급여를 지급합니다.\n\n'
      + '대상: ' + cnt + '명\n'
      + '지급 총액: ' + fmt(total) + '\n'
      + '지급 후 금고: ' + fmt(SAL.treasury - total) + '\n\n계속하시겠습니까?')) return;

  loading(true, '급여 지급 중...');
  call('paySelectedSalaries', S.month, S.half, nums).then(function (res) {
    if (!res || !res.ok) { alert((res && res.msg) || '지급에 실패했습니다.'); return null; }
    closeModal('modal-salary');
    return call('loadAll').then(function (fresh) {
      if (fresh) {
        S.students = fresh.students || [];
        S.ledger = fresh.ledger || [];
        S.treasuryBalance = fresh.treasuryBalance || 0;
        renderDashboard();
      }
      alert('✓ ' + res.label + ' 급여 지급 완료\n\n'
          + '지급 대상: ' + res.count + '명\n'
          + '지급 총액: ' + fmt(res.total) + '\n'
          + '남은 금고: ' + fmt(res.treasuryBalance));
    });
  })['catch'](function (e) {
    alert('오류: ' + (e && e.message ? e.message : e));
  }).then(function () { loading(false); });
}

// 회차 지급 취소
function doCancelPayPeriod() {
  var label = periodLabelText();
  if (!confirm(label + ' 급여 지급을 취소합니다.\n\n'
      + '지급된 금액이 학생 잔액에서 차감되고\n금고로 되돌아갑니다.\n\n계속하시겠습니까?')) return;
  loading(true, '취소 처리 중...');
  call('cancelPayPeriod', S.month, S.half).then(function (res) {
    if (!res || !res.ok) { alert((res && res.msg) || '취소할 기록이 없습니다.'); return null; }
    return call('loadAll').then(function (fresh) {
      if (fresh) {
        S.students = fresh.students || [];
        S.ledger = fresh.ledger || [];
        S.treasuryBalance = fresh.treasuryBalance || 0;
        renderDashboard();
      }
      alert('✓ ' + res.label + ' 급여 취소 완료\n\n'
          + '취소 인원: ' + res.count + '명\n'
          + '회수 금액: ' + fmt(res.refund) + '\n'
          + '금고 잔액: ' + fmt(res.treasuryBalance));
    });
  })['catch'](function (e) {
    alert('오류: ' + (e && e.message ? e.message : e));
  }).then(function () { loading(false); });
}


// ══════════════════════════════════════════════
//  보너스 지급
// ══════════════════════════════════════════════
var BON = { picked: {} };

function openBonusModal() {
  if (!S.students || !S.students.length) {
    alert('학생이 없습니다.\n학생 명단을 먼저 등록해 주세요.');
    return;
  }
  BON.picked = {};
  document.getElementById('bonus-amount').value = '';
  document.getElementById('bonus-reason').value = '';
  renderBonusList();
  openModal('modal-bonus');
}

function renderBonusList() {
  var rows = '';
  for (var i = 0; i < S.students.length; i++) {
    var s = S.students[i];
    var on = !!BON.picked[s.num];
    var jn = getJobName(s.num);
    rows += '<tr style="cursor:pointer;background:' + (on ? '#f5f7ff' : '#fff')
      + '" onclick="bonusToggle(\'' + s.num + '\')">'
      + '<td style="text-align:center"><input type="checkbox" ' + (on ? 'checked' : '')
      + ' onclick="event.stopPropagation();bonusToggle(\'' + s.num + '\')"></td>'
      + '<td><strong>' + s.num + '번 ' + s.name + '</strong></td>'
      + '<td>' + (jn ? '<span class="badge badge-blue">' + jn + '</span>'
                     : '<span class="badge badge-gray">미배정</span>') + '</td>'
      + '<td style="color:var(--c1);font-weight:600">' + fmt(s.balance) + '</td></tr>';
  }
  document.getElementById('bonus-list').innerHTML = rows;
  updateBonusSummary();
}

function bonusToggle(num) {
  BON.picked[num] = !BON.picked[num];
  renderBonusList();
}

function bonusSelectAll(on) {
  for (var i = 0; i < S.students.length; i++) BON.picked[S.students[i].num] = on;
  renderBonusList();
}

function setBonusAmount(v) {
  document.getElementById('bonus-amount').value = v;
  updateBonusSummary();
}

function updateBonusSummary() {
  var amt = Number(document.getElementById('bonus-amount').value) || 0;
  var cnt = 0;
  for (var i = 0; i < S.students.length; i++) {
    if (BON.picked[S.students[i].num]) cnt++;
  }
  var total = amt * cnt;
  var treasury = S.treasuryBalance || 0;
  var after = treasury - total;

  document.getElementById('bonus-count').textContent = cnt + '명';
  document.getElementById('bonus-total').textContent = fmt(total);
  var af = document.getElementById('bonus-after');
  af.textContent = fmt(after);
  af.style.color = after < 0 ? 'var(--cd)' : 'var(--c2)';

  var warn = document.getElementById('bonus-warn');
  var btn = document.getElementById('bonus-pay-btn');
  if (cnt === 0) {
    warn.textContent = '학생을 선택하세요';
    warn.style.color = 'var(--muted)';
    btn.disabled = true; btn.style.opacity = '.5';
  } else if (amt <= 0) {
    warn.textContent = '금액을 입력하세요';
    warn.style.color = 'var(--muted)';
    btn.disabled = true; btn.style.opacity = '.5';
  } else if (after < 0) {
    warn.textContent = '금고 부족: ' + fmt(-after);
    warn.style.color = 'var(--cd)';
    btn.disabled = true; btn.style.opacity = '.5';
  } else {
    warn.textContent = '';
    btn.disabled = false; btn.style.opacity = '1';
  }
}

function doPayBonus() {
  var amt = Number(document.getElementById('bonus-amount').value) || 0;
  var reason = document.getElementById('bonus-reason').value.trim();
  var nums = [], cnt = 0;
  for (var i = 0; i < S.students.length; i++) {
    if (BON.picked[S.students[i].num]) { nums.push(S.students[i].num); cnt++; }
  }
  if (!cnt || amt <= 0) return;
  if (!reason) { alert('지급 사유를 입력해 주세요.'); return; }
  var total = amt * cnt;
  if ((S.treasuryBalance || 0) - total < 0) return;

  if (!confirm('보너스를 지급합니다.\n\n'
      + '대상: ' + cnt + '명\n'
      + '1인당: ' + fmt(amt) + '\n'
      + '총액: ' + fmt(total) + '\n'
      + '사유: ' + reason + '\n\n계속하시겠습니까?')) return;

  loading(true, '보너스 지급 중...');
  call('payBonus', { studentNums: nums, amount: amt, reason: reason, month: S.month })
    .then(function (res) {
      if (!res || !res.ok) { alert((res && res.msg) || '지급에 실패했습니다.'); return null; }
      closeModal('modal-bonus');
      return call('loadAll').then(function (fresh) {
        if (fresh) {
          S.students = fresh.students || [];
          S.ledger = fresh.ledger || [];
          S.treasuryBalance = fresh.treasuryBalance || 0;
          renderDashboard();
        }
        alert('✓ 보너스 지급 완료\n\n'
            + '대상: ' + res.count + '명\n'
            + '총액: ' + fmt(res.total) + '\n'
            + '남은 금고: ' + fmt(res.treasuryBalance));
      });
    })['catch'](function (e) {
      alert('오류: ' + (e && e.message ? e.message : e));
    }).then(function () { loading(false); });
}


// ── 접이식 섹션 ──────────────────────────────────
function toggleSection(key) {
  var head = document.getElementById('acc-head-' + key);
  var body = document.getElementById('acc-body-' + key);
  if (!head || !body) return;
  var closed = body.classList.contains('closed');
  if (closed) { body.classList.remove('closed'); head.classList.remove('closed'); }
  else { body.classList.add('closed'); head.classList.add('closed'); }
  try { sessionStorage.setItem('acc_' + key, closed ? 'open' : 'closed'); } catch (e) {}
}

function restoreSections(keys) {
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i], v = null;
    try { v = sessionStorage.getItem('acc_' + k); } catch (e) {}
    if (v === 'closed') {
      var head = document.getElementById('acc-head-' + k);
      var body = document.getElementById('acc-body-' + k);
      if (head) head.classList.add('closed');
      if (body) body.classList.add('closed');
    }
  }
}


// ── 자동 리필 ────────────────────────────────────
function doInitRefillTrigger() {
  if (!confirm('매일 자정에 자동 리필을 실행하도록 설정합니다.\n\n'
      + '물품별로 "매일 자정 자동 리필"을 켜둔 것만 채워집니다.\n\n계속하시겠습니까?')) return;
  loading(true, '설정 중...');
  call('initRefillTrigger').then(function (res) {
    if (!res || !res.ok) { showMsg('refill-msg', '설정 실패', false); return; }
    showMsg('refill-msg', '자동 리필이 켜졌습니다. 매일 자정에 실행됩니다.');
  })['catch'](function (e) {
    showMsg('refill-msg', '오류: ' + (e && e.message ? e.message : e), false);
  }).then(function () { loading(false); });
}

function doRunRefillNow() {
  if (!confirm('지금 자동 리필을 실행합니다.\n\n자동 리필이 켜진 물품의 재고를 설정 수량까지 채웁니다.\n계속하시겠습니까?')) return;
  loading(true, '리필 중...');
  call('processAutoRefill').then(function (res) {
    if (!res || !res.ok) { showMsg('refill-msg', '리필 실패', false); return null; }
    if (res.refilled === 0) {
      showMsg('refill-msg', '채울 물품이 없습니다. (오늘 이미 리필했거나 재고가 충분함)');
    } else {
      showMsg('refill-msg', res.refilled + '개 물품을 채웠습니다: ' + (res.names || []).join(', '));
    }
    return call('loadAll').then(function (d) {
      if (d) { S.items = d.items || []; renderShop(); }
    });
  })['catch'](function (e) {
    showMsg('refill-msg', '오류: ' + (e && e.message ? e.message : e), false);
  }).then(function () { loading(false); });
}

