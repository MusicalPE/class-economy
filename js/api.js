/* ──────────────────────────────────────────────────────────────
   돈워리! — 서버 연결
   화면(GitHub Pages) ↔ 학교 스프레드시트(Apps Script 웹앱)

   화면은 데이터를 갖고 있지 않습니다. 모든 계산과 저장은
   학교 스프레드시트에 붙은 Apps Script 안에서 이루어집니다.
   ────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var KEY = 'CE_API_URL';

  /* ?demo 로 들어오면 학교 시트 없이 지어낸 학급으로 둘러봅니다 (js/demo.js) */
  var DEMO = /[?&]demo(=|&|$)/.test(location.search);
  window.CE_DEMO = DEMO;

  function qs(name) {
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
  }

  /* ?app=<웹앱주소> 로 들어오면 저장해 두고 주소창에서는 지운다.
     한 번 들어온 기기는 다음부터 주소 없이 들어와도 된다. */
  var fromUrl = DEMO ? '' : qs('app');
  if (fromUrl) {
    try { localStorage.setItem(KEY, fromUrl); } catch (e) {}
    try { history.replaceState(null, '', location.pathname); } catch (e) {}
  }

  function getUrl() {
    try { return localStorage.getItem(KEY) || ''; } catch (e) { return ''; }
  }
  function setUrl(u) {
    try { localStorage.setItem(KEY, u); } catch (e) {}
  }

  window.CE_getApiUrl = getUrl;
  window.CE_setApiUrl = setUrl;
  window.CE_clearApiUrl = function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
  };

  /* ── 서버 호출 ──────────────────────────────────────────────
     google.script.run 을 쓰던 자리를 그대로 대신합니다.
     호출하는 쪽 코드는 전과 똑같습니다:  call('getStudents')

     Content-Type 을 text/plain 으로 보내는 것이 중요합니다.
     application/json 으로 보내면 브라우저가 먼저 OPTIONS 요청을
     보내는데, Apps Script 웹앱은 그 요청에 답하지 못해 실패합니다.
     ────────────────────────────────────────────────────────── */
  var demoLoad = null;
  function demoCall(fn, args) {
    if (!demoLoad) {
      demoLoad = new Promise(function (res, rej) {
        var sc = document.createElement('script');
        sc.src = 'js/demo.js?v=2.2.0';
        sc.onload = res;
        sc.onerror = function () { rej(new Error('미리보기를 불러오지 못했어요.')); };
        document.head.appendChild(sc);
      });
    }
    return demoLoad.then(function () { return window.CE_demoCall(fn, args); });
  }

  window.call = function (fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    if (DEMO) return demoCall(fn, args);
    var url = getUrl();

    if (!url) {
      showSetup();
      return Promise.reject(new Error('연결된 학급이 없습니다.'));
    }

    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ fn: fn, args: args }),
      redirect: 'follow'
    }).then(function (r) {
      if (!r.ok) throw new Error('서버가 응답하지 않습니다 (' + r.status + ')');
      return r.text();
    }).then(function (text) {
      var d;
      try {
        d = JSON.parse(text);
      } catch (e) {
        throw new Error('서버 주소가 올바르지 않거나 배포 설정이 잘못되었습니다.');
      }
      if (d && d.__error) throw new Error(d.__error);
      if (d && Object.prototype.hasOwnProperty.call(d, '__r')) return d.__r;
      return d;
    });
  };

  /* ── 처음 들어왔을 때: 학급 연결 화면 ───────────────────────── */
  function showSetup() {
    if (document.getElementById('ce-setup')) return;

    var wrap = document.createElement('div');
    wrap.id = 'ce-setup';
    wrap.setAttribute('style',
      'position:fixed;inset:0;z-index:99999;background:#f0f2f7;' +
      'display:flex;align-items:center;justify-content:center;padding:20px;' +
      "font-family:'Noto Sans KR',sans-serif");

    var card = document.createElement('div');
    card.setAttribute('style',
      'background:#fff;border-radius:14px;padding:32px 28px;max-width:460px;width:100%;' +
      'box-shadow:0 4px 24px rgba(0,0,0,.12)');

    var h = document.createElement('div');
    h.setAttribute('style', 'font-size:19px;font-weight:700;color:#111827;margin-bottom:10px');
    h.textContent = '학급 연결이 필요합니다';
    card.appendChild(h);

    var p = document.createElement('div');
    p.setAttribute('style', 'font-size:13.5px;color:#6b7280;line-height:1.65;margin-bottom:20px');
    p.textContent = '선생님께 받은 접속 주소로 들어오면 이 화면은 나오지 않습니다. '
      + '선생님이라면 스프레드시트에서 배포한 웹앱 주소를 아래에 붙여넣어 주세요.';
    card.appendChild(p);

    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'https://script.google.com/macros/s/.../exec';
    input.setAttribute('style',
      'width:100%;padding:11px 13px;border:1px solid #e2e6ef;border-radius:9px;' +
      'font-size:13px;margin-bottom:12px;font-family:inherit');
    card.appendChild(input);

    var msg = document.createElement('div');
    msg.setAttribute('style', 'font-size:12.5px;color:#e3342f;min-height:18px;margin-bottom:12px');
    card.appendChild(msg);

    var btn = document.createElement('button');
    btn.textContent = '연결하기';
    btn.setAttribute('style',
      'width:100%;padding:12px;border:0;border-radius:9px;background:#1a56db;color:#fff;' +
      'font-size:14.5px;font-weight:700;cursor:pointer;font-family:inherit');
    card.appendChild(btn);

    btn.onclick = function () {
      var v = (input.value || '').trim();
      if (!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(v)) {
        msg.textContent = '웹앱 주소는 /exec 로 끝나야 합니다.';
        return;
      }
      msg.style.color = '#6b7280';
      msg.textContent = '연결을 확인하는 중...';
      btn.disabled = true;

      setUrl(v);
      fetch(v, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ fn: 'ping', args: [] }),
        redirect: 'follow'
      }).then(function (r) { return r.text(); })
        .then(function (t) {
          var d = JSON.parse(t);
          if (d && d.__error) throw new Error(d.__error);
          location.href = location.pathname;
        })
        .catch(function () {
          window.CE_clearApiUrl();
          btn.disabled = false;
          msg.style.color = '#e3342f';
          msg.textContent = '연결하지 못했습니다. 주소와 배포 권한(모든 사용자)을 확인해 주세요.';
        });
    };

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') btn.click();
    });

    wrap.appendChild(card);
    document.body.appendChild(wrap);
    input.focus();
  }

  window.CE_showSetup = showSetup;

  /* ── 홈 화면에 추가해 앱처럼 쓰기 ──────────────────────────── */

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js', { scope: './' })['catch'](function () {});
    });
  }

  // 안드로이드·크롬에서 설치할 수 있을 때만 버튼을 띄웁니다.
  var deferred = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferred = e;
    showInstallChip();
  });
  window.addEventListener('appinstalled', function () {
    deferred = null;
    var c = document.getElementById('ce-install');
    if (c) c.remove();
  });

  /* 지금 보이는 화면의 시계를 찾아 그 옆자리를 돌려줍니다.
     로그인 화면에는 시계가 없어서 그때는 아래쪽에 띄웁니다. */
  function hostForChip() {
    var ids = ['topbar-clock', 'topbar-clock-student'];
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el && el.offsetParent !== null) return el.parentNode;
    }
    return null;
  }

  function placeChip() {
    var b = document.getElementById('ce-install');
    if (!b) return;
    var host = hostForChip();
    if (host) {
      if (b.parentNode !== host) host.appendChild(b);
      b.className = 'ce-install-inline';
    } else {
      if (b.parentNode !== document.body) document.body.appendChild(b);
      b.className = 'ce-install-float';
    }
  }

  function showInstallChip() {
    if (document.getElementById('ce-install')) return;
    var b = document.createElement('button');
    b.id = 'ce-install';
    b.type = 'button';
    b.innerHTML = '<i class="ti ti-download"></i><span>앱으로 설치</span>';
    b.title = '홈 화면에 추가해 앱처럼 씁니다';
    b.onclick = function () {
      if (!deferred) { b.remove(); return; }
      deferred.prompt();
      deferred.userChoice['finally'](function () {
        deferred = null;
        b.remove();
      });
    };
    document.body.appendChild(b);
    placeChip();
    // 로그인하면 화면이 바뀌므로 자리를 다시 잡아 줍니다.
    setInterval(placeChip, 1500);
  }

  /* ── 미리보기 안내 ─────────────────────────────────────────── */
  if (DEMO) {
    // 미리보기 로그인이 진짜 학급 접속에 섞이지 않도록 이 창의 로그인 기억은 지웁니다.
    try { sessionStorage.removeItem('cls_session'); } catch (e) {}
    window.addEventListener('pagehide', function () {
      try { sessionStorage.removeItem('cls_session'); } catch (e) {}
    });
    var who = (/[?&]demo=([a-z]+)/.exec(location.search) || [])[1] || '';
    var startDemo = function () {
      var st = document.createElement('style');
      st.textContent =
        '.ce-demo-note{background:#FFF4D6;color:#6B4E0E;border-radius:10px;padding:10px 12px;' +
        'font-size:13px;line-height:1.6;margin:0 0 14px;text-align:left}' +
        '.ce-demo-note b{color:#4A3608}' +
        '.ce-demo-tag{position:fixed;left:50%;transform:translateX(-50%);' +
        'bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:9000;background:#2F5D4E;color:#fff;' +
        'border-radius:999px;padding:6px 12px;font-size:12px;font-weight:700;opacity:.92;pointer-events:none}';
      document.head.appendChild(st);
      var card = document.querySelector('#login-screen .login-card');
      if (card) {
        var n = document.createElement('div');
        n.className = 'ce-demo-note';
        n.innerHTML = '<b>미리보기 화면이에요.</b> 지어낸 우리 반이라 아무 비밀번호나 넣으면 들어가요. ' +
          '바꾼 내용은 저장되지 않고 새로고침하면 처음으로 돌아가요.';
        card.insertBefore(n, card.firstChild);
      }
      var tag = document.createElement('div');
      tag.className = 'ce-demo-tag';
      tag.textContent = '미리보기 · 지어낸 학급';
      document.body.appendChild(tag);

      // ?demo=teacher, ?demo=student 로 들어오면 바로 그 화면으로
      if (who === 'teacher') {
        var a = document.getElementById('admin-pw');
        if (a && window.doAdminLogin) {
          try { switchLoginTab('teacher'); } catch (e) {}
          a.value = 'demo';
          window.doAdminLogin();
        }
      } else if (who === 'student') {
        var tries = 0;
        var t = setInterval(function () {
          var sel = document.getElementById('login-num');
          tries++;
          if (sel && sel.querySelector('option[value="4"]')) {
            clearInterval(t);
            sel.value = '4';
            try { onSelectStudent(); } catch (e) {}
            document.getElementById('login-pw').value = 'demo';
            window.doStudentLogin();
          } else if (tries > 60) clearInterval(t);
        }, 150);
      }
    };
    if (document.readyState === 'complete') setTimeout(startDemo, 0);
    else window.addEventListener('load', function () { setTimeout(startDemo, 0); });
  }

  /* 주소가 없으면 화면이 뜨기 전에 먼저 막는다 */
  if (!DEMO && !getUrl()) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showSetup);
    } else {
      showSetup();
    }
  }
})();
