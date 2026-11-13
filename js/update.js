/* ──────────────────────────────────────────────────────────────
   돈워리! — 라이브러리 판 확인과 "새 판으로 바꾸는 법" 안내

   화면은 GitHub 에서 늘 최신으로 열리지만, 서버 기능(라이브러리)은
   학급마다 선생님이 버전 숫자를 올려 줘야 새 판이 됩니다.
   선생님 화면에서 지금 판과 최신 판을 견주어, 예전 판이면 알려 줍니다.

   DW_SERVER_LATEST 는 "라이브러리로 실제 배포를 마친" 판 번호입니다.
   gas/Code.gs 를 고쳤더라도 라이브러리 새 버전을 배포하기 전에는
   이 숫자를 올리면 안 됩니다. (올리면 선생님들이 안내대로 해도
   새 판이 없어 헛걸음합니다.)
   ────────────────────────────────────────────────────────────── */
var DW_SERVER_LATEST = '2.1.0';

var DW_SERVER = { checked: false, checking: false, version: '', sheetUrl: '' };

function dwCmpVer(a, b) {
  var x = String(a || '0').split('.'), y = String(b || '0').split('.');
  for (var i = 0; i < 3; i++) {
    var d = (parseInt(x[i], 10) || 0) - (parseInt(y[i], 10) || 0);
    if (d) return d < 0 ? -1 : 1;
  }
  return 0;
}

function dwIsOld() {
  return DW_SERVER.checked && dwCmpVer(DW_SERVER.version, DW_SERVER_LATEST) < 0;
}

function dwScreenVer() {
  var sc = document.querySelector('script[src*="js/app.js"]');
  var m = sc ? /[?&]v=([\d.]+)/.exec(sc.getAttribute('src')) : null;
  return m ? m[1] : '';
}

function dwIsPhone() {
  return /Android|iPhone|iPod|Mobile/i.test(navigator.userAgent || '');
}

/* 선생님 화면이 열리면 한 번 부릅니다. */
function dwCheckServer() {
  if (DW_SERVER.checked || DW_SERVER.checking) return;
  DW_SERVER.checking = true;

  function done(v, url) {
    DW_SERVER.checking = false;
    DW_SERVER.checked = true;
    DW_SERVER.version = v || '';
    DW_SERVER.sheetUrl = url || '';
    dwRenderServer();
  }
  call('getServerInfo').then(function (r) {
    done(r && r.version, r && r.sheetUrl);
  })['catch'](function () {
    // 2.2.0 보다 앞선 판에는 getServerInfo 가 없습니다. 판 번호만 묻습니다.
    call('ping').then(function (r) { done(r && r.version, ''); })
      ['catch'](function () { DW_SERVER.checking = false; });
  });
}

function dwGuideBtn(small) {
  return '<button type="button" class="btn btn-gold' + (small ? ' btn-sm' : '') +
         '" onclick="openUpdateGuide()">새 판으로 바꾸는 법</button>';
}

function dwRenderServer() {
  var old = dwIsOld();
  var v = DW_SERVER.version || '알 수 없음';

  var box = document.getElementById('conn-info');
  if (box) {
    var h = '<div class="conn-row"><span class="k">라이브러리</span><span class="v">';
    h += old
      ? '<b>' + v + '판</b> <span class="badge badge-yellow">새 판 있음</span> ' + dwGuideBtn(true)
      : '<b>' + v + '판</b> <span class="conn-ok">최신 판이에요</span>';
    h += '</span></div>';
    h += '<div class="conn-row"><span class="k">화면</span><span class="v"><b>' +
         (dwScreenVer() || '-') + '판</b> <span class="conn-ok">늘 최신으로 열려요</span></span></div>';
    if (DW_SERVER.sheetUrl) {
      h += '<div class="conn-row"><span class="k">내 시트</span><span class="v">' +
           '<a href="' + DW_SERVER.sheetUrl + '" target="_blank" rel="noopener">스프레드시트 열기</a></span></div>';
    }
    box.innerHTML = h;
  }

  var line = document.getElementById('dw-old-line');
  if (line) {
    if (old) {
      line.innerHTML = '<span>라이브러리가 예전 판이에요. <b>' + v + '판 → ' + DW_SERVER_LATEST +
                       '판</b></span>' + dwGuideBtn(true);
      line.style.display = 'flex';
    } else {
      line.style.display = 'none';
    }
  }
}

/* 다른 창 위에 겹쳐 뜨는 안내 창 */
function openUpdateGuide() {
  closeUpdateGuide();
  var sheet = DW_SERVER.sheetUrl
    ? '<a href="' + DW_SERVER.sheetUrl + '" target="_blank" rel="noopener">내 시트 열기</a>'
    : '돈워리 스프레드시트 열기';

  var bg = document.createElement('div');
  bg.id = 'dw-guide';
  bg.onclick = function (e) { if (e.target === bg) closeUpdateGuide(); };
  bg.innerHTML =
    '<div class="dw-guide-box" role="dialog" aria-label="새 판으로 바꾸는 법">' +
      '<div class="dw-guide-title">라이브러리 새 판으로 바꾸는 법</div>' +
      '<div class="note gold dw-guide-pc">컴퓨터에서 해 주세요. 휴대폰에서는 Apps Script 화면이 잘 열리지 않아요.' +
        (dwIsPhone() ? '<div id="dw-guide-phone"><b>지금은 휴대폰이에요.</b> 컴퓨터에서 선생님 화면을 열고 같은 단추를 눌러 주세요.</div>' : '') +
      '</div>' +
      '<div class="dw-guide-sub">시트와 자료는 그대로 두고, 버전 숫자만 바꿉니다.</div>' +
      '<ol class="dw-guide-steps">' +
        '<li>' + sheet + ' → [확장 프로그램] → [Apps Script]</li>' +
        '<li>왼쪽 [라이브러리]의 <b>CE</b>를 누르고, 버전을 <b>가장 높은 숫자</b>로 바꾼 뒤 [저장]</li>' +
        '<li>[배포] → [배포 관리] → 연필(수정) → 버전 [새 버전] → [배포]' +
          '<div class="dw-guide-tip">주소는 그대로라 학생 주소도 그대로예요. 권한 창이 뜨면 [허용].</div></li>' +
      '</ol>' +
      '<div class="dw-guide-end">다 바꾼 뒤 이 화면을 새로고침하면 새 판이 적용돼요.</div>' +
      '<div class="modal-footer"><button type="button" class="btn btn-primary" onclick="closeUpdateGuide()">닫기</button></div>' +
    '</div>';
  document.body.appendChild(bg);
}

function closeUpdateGuide() {
  var g = document.getElementById('dw-guide');
  if (g) g.remove();
}
